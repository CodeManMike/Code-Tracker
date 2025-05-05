const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// GitHub OAuth login route
router.get('/github', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = 'http://localhost:5000/api/auth/github/callback';
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`);
});

// GitHub OAuth callback route
router.get('/github/callback', async (req, res) => {
  const code = req.query.code;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Get user info from GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`
      }
    });

    const { id, login, avatar_url } = userResponse.data;

    // Check if user exists in our DB, otherwise create a new one
    let user = await User.findOne({ githubId: id });

    if (!user) {
      user = new User({
        githubId: id,
        username: login,
        accessToken,
        avatarUrl: avatar_url
      });
    } else {
      // Update existing user's token
      user.accessToken = accessToken;
      user.avatarUrl = avatar_url;
    }

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Redirect to frontend with token
    res.redirect(`http://localhost:3000/login-success?token=${token}`);
  } catch (error) {
    console.error('OAuth Error:', error.message);
    res.redirect('http://localhost:3000/login-error');
  }
});

// Get current authenticated user
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-accessToken');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Auth Error:', error.message);
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
});

module.exports = router;
