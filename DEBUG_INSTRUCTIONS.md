# Debugging the GitHub Code Tracker App

Since we're experiencing issues with running the app via Docker, here are manual steps to debug and run the application:

## Prerequisites

Make sure you have the following installed:
- Node.js (v14 or later)
- npm
- yarn (for frontend)
- MongoDB (local installation or MongoDB Atlas account)

## Step 1: Set up the Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a `.env` file with the following contents:
   ```
   MONGO_URI=mongodb://localhost:27017/githubtracker
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   JWT_SECRET=your_jwt_secret
   ```

   > Note: You'll need to register an OAuth app on GitHub to get your client ID and secret.
   > For testing without a GitHub OAuth app, you can use placeholder values, but authentication won't work.

3. Install dependencies:
   ```
   npm install
   ```

4. Run the backend server:
   ```
   npm run dev
   ```

   The server should start on http://localhost:5000

## Step 2: Set up MongoDB

If you have MongoDB installed locally:
1. Start MongoDB:
   ```
   mongod --dbpath /path/to/data/directory
   ```

If you prefer to use MongoDB Atlas (cloud solution):
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string and update the MONGO_URI in the backend .env file

## Step 3: Set up the Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Run the frontend development server:
   ```
   yarn start
   ```

   The React app should start on http://localhost:3000

## Common Issues and Debugging

### Backend Issues:

1. **MongoDB Connection Issues:**
   - Ensure MongoDB is running
   - Check your MONGO_URI in .env file
   - Look for MongoDB connection errors in the backend console

2. **Environment Variables:**
   - Make sure all required environment variables are in your .env file
   - Restart the backend server after updating .env

3. **GitHub OAuth:**
   - Ensure your GitHub OAuth app is correctly configured
   - The callback URL should be http://localhost:5000/api/auth/github/callback

### Frontend Issues:

1. **API Connection Issues:**
   - Check that the backend is running on port 5000
   - Verify the proxy setting in package.json is set to http://localhost:5000

2. **Authentication Flow:**
   - Check browser console for errors
   - Ensure cookies/localStorage are enabled in your browser

## Testing the App

1. Open http://localhost:3000 in your browser
2. Click "Login" and authenticate with GitHub
3. You should be redirected to the dashboard after successful authentication
4. Test the repository analysis feature by clicking "Analyze" on repositories

## Next Steps for Production

1. Set up proper error handling and logging
2. Implement more comprehensive data validation
3. Add tests for backend and frontend
4. Set up proper CI/CD pipelines
5. Configure proper security headers and CORS settings
