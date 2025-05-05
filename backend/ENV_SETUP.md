# Environment Variables Setup

Create a `.env` file in this directory with the following variables:

```
MONGO_URI=mongodb://mongo:27017/githubtracker
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
JWT_SECRET=your_jwt_secret
```

## How to get GitHub OAuth credentials

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on "New OAuth App"
3. Fill in the application details:
   - Application name: GitHub Code Tracker
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:5000/api/auth/github/callback
4. Register the application
5. You'll get a Client ID and you'll need to generate a Client Secret
6. Copy these values to your `.env` file

## JWT Secret

Generate a random string for the JWT_SECRET. For example, you can use:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
