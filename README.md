# GitHub Code Tracker

A full-stack web application that tracks how many lines of code you've committed via GitHub. Built using Node.js, React, and MongoDB — all containerized using Docker.

## Running with Docker

### Prerequisites

- Docker and Docker Compose installed on your machine
- GitHub OAuth credentials (Client ID and Secret)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd github-code-tracker
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   JWT_SECRET=your_jwt_secret
   ```

   You can generate a random JWT secret with:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. Build and start the Docker containers:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

### Getting GitHub OAuth Credentials

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: GitHub Code Tracker
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:5000/api/auth/github/callback
4. Register the application
5. Copy the Client ID and generate a Client Secret
6. Add these values to your `.env` file

## Usage

1. Visit http://localhost:3000 in your browser
2. Click "Login" or "Get Started" to authenticate with GitHub
3. Once logged in, you'll see your repositories listed in the dashboard
4. Click "Analyze" on any repository to fetch code statistics
5. View your total lines added/deleted and commit counts
