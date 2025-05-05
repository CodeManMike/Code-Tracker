const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CodeStat = require('../models/CodeStat');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

// Get repositories for authenticated user
router.get('/repos', auth, async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${req.user.accessToken}`
      },
      params: {
        sort: 'updated',
        per_page: 100
      }
    });

    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      private: repo.private,
      url: repo.html_url,
      description: repo.description,
      updatedAt: repo.updated_at
    }));

    res.json(repos);
  } catch (error) {
    console.error('GitHub API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// Get code stats for a specific repository
router.get('/stats/:owner/:repo', auth, async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const repoFullName = `${owner}/${repo}`;

    // Get commit stats from GitHub
    const response = await axios.get(`https://api.github.com/repos/${repoFullName}/stats/contributors`, {
      headers: {
        Authorization: `token ${req.user.accessToken}`
      }
    });

    // Find stats for the current user
    const userStats = response.data.find(
      stat => stat.author.login === req.user.username
    );

    if (!userStats) {
      return res.json({
        repository: repoFullName,
        linesAdded: 0,
        linesDeleted: 0,
        commitCount: 0
      });
    }

    // Calculate total lines added/deleted
    let totalAdded = 0;
    let totalDeleted = 0;
    const commitCount = userStats.total;

    userStats.weeks.forEach(week => {
      totalAdded += week.a;
      totalDeleted += week.d;
    });

    // Store stats in database
    const codeStat = await CodeStat.findOneAndUpdate(
      { user: req.user._id, repository: repoFullName },
      {
        linesAdded: totalAdded,
        linesDeleted: totalDeleted,
        commitCount,
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({
      repository: repoFullName,
      linesAdded: totalAdded,
      linesDeleted: totalDeleted,
      commitCount,
      lastUpdated: codeStat.lastUpdated
    });
  } catch (error) {
    console.error('GitHub API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch repository stats' });
  }
});

// Get all stats for the current user
router.get('/stats', auth, async (req, res) => {
  try {
    const stats = await CodeStat.find({ user: req.user._id }).sort({ lastUpdated: -1 });

    // Calculate totals
    const totals = stats.reduce(
      (acc, stat) => {
        acc.linesAdded += stat.linesAdded;
        acc.linesDeleted += stat.linesDeleted;
        acc.commitCount += stat.commitCount;
        return acc;
      },
      { linesAdded: 0, linesDeleted: 0, commitCount: 0 }
    );

    res.json({
      stats,
      totals
    });
  } catch (error) {
    console.error('Database Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

module.exports = router;
