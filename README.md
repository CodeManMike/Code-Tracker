# GitHub Code Tracker 🛼

A full-stack web application that tracks how many lines of code you've committed via GitHub. Built using Node.js, React, and MongoDB — all containerized using Docker.

## 🛡️ Tech Stack

- **Frontend**: React + Axios + Chakra UI
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: GitHub OAuth
- **Infrastructure**: Docker + Docker Compose

## 🚀 Features

- GitHub OAuth login
- Track commits across repositories
- Count lines of code added/deleted
- Store results in MongoDB
- Simple frontend dashboard

## 📁 Project Structure

```
github-code-tracker/
├── backend/
│   ├── Dockerfile
│   ├── models/
│   │   ├── User.js
│   │   └── CodeStat.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── github.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── NavBar.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── LoginSuccess.js
│   │   │   ├── LoginError.js
│   │   │   └── NotFound.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── docker-compose.yml
```

## 🔐 GitHub OAuth Setup

1. Register your app on [GitHub Developer Settings](https://github.com/settings/developers)
2. Set your callback URL: `http://localhost:5000/api/auth/github/callback`
3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGO_URI=mongodb://mongo:27017/githubtracker
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   JWT_SECRET=your_jwt_secret
   ```

## 🏃‍♂️ Running the App

1. Make sure you have Docker and Docker Compose installed
2. Clone this repository
3. Create the `.env` file in the backend directory with your GitHub OAuth credentials
4. Run the following command:

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)
- MongoDB: running on `localhost:27017`

## 💻 Development

If you want to run the app without Docker for development:

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
yarn install
yarn start
```

## 📜 License

MIT
