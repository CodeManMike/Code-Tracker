# GitHub Code Tracker 🛼

A full-stack web application that tracks how many lines of code you've committed via GitHub. Built using Node.js, React, and MongoDB — all containerized using Docker.

## 🛡️ Tech Stack

- **Frontend**: React + Axios
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: GitHub OAuth
- **Infrastructure**: Docker + Docker Compose

---

## 🚀 Features

- GitHub OAuth login
- Track commits across repositories
- Count lines of code added/deleted
- Store results in MongoDB
- Simple frontend dashboard

---

## 📁 Project Structure

```
github-code-tracker/
├── backend/
│   ├── Dockerfile
│   ├── server.js
│   └── .env
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   │   └── App.js
└── docker-compose.yml
```

---

## 🐳 Docker Setup

### `docker-compose.yml`

```yaml
version: '3.8'

services:
  mongo:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    container_name: backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/githubtracker
      - GITHUB_CLIENT_ID=your_client_id
      - GITHUB_CLIENT_SECRET=your_client_secret
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    container_name: frontend
    ports:
      - "3000:3000"
    stdin_open: true
    tty: true
    depends_on:
      - backend

volumes:
  mongo_data:
```

---

## 📦 Backend (`/backend`)

### `Dockerfile`

```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
```

### `server.js` (Basic Example)

```js
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGO_URI);

app.get('/auth/github', (req, res) => {
  // GitHub OAuth flow here
});

app.get('/commits/:username', async (req, res) => {
  const username = req.params.username;
  // Fetch commits using GitHub API and count lines of code
  // Store in MongoDB and return the summary
  res.send({ username, linesAdded: 123, linesDeleted: 45 });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 🎨 Frontend (`/frontend`)

### `Dockerfile`

```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

### `App.js` (Basic Example)

```jsx
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(`/commits/${username}`);
    setResult(res.data);
  };

  return (
    <div>
      <h1>GitHub LOC Tracker</h1>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <button onClick={fetchData}>Check</button>
      {result && (
        <div>
          <p>Lines Added: {result.linesAdded}</p>
          <p>Lines Deleted: {result.linesDeleted}</p>
        </div>
      )}
    </div>
  );
}

export default App;
```

---

## 🔐 GitHub OAuth Setup

1. Register your app on [GitHub Developer Settings](https://github.com/settings/developers)
2. Set your callback URL: `http://localhost:5000/auth/github/callback`
3. Copy the Client ID and Secret into your `.env` file in `/backend`

---

## 🏃‍♂️ Running the App

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)
- MongoDB: running on `localhost:27017`

---

## ✅ Todo

- [ ] Full GitHub OAuth flow
- [ ] Commit stats with pagination
- [ ] Filter by repo/date
- [ ] Store user history

---

## 🧠 Tips

- Use GitHub's `/repos/:owner/:repo/stats/contributors` or commit history endpoints
- Consider GitHub GraphQL API for complex queries
- Use CRON jobs if you want regular updates

---

## 📜 License

MIT
