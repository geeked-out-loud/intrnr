```markdown
# Intrnr

A blockchain-enabled, self-sovereign-identity community forum built with Next.js (frontend), Node.js/Express (backend), and MongoDB.  
Users sign up and log in with BIP39 mnemonic recovery phrases; posts, comments, likes/dislikes are stored on-chain–inspired structures but persisted in MongoDB.

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Tech Stack](#tech-stack)  
3. [Features](#features)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Running Locally](#running-locally)  
5. [Environment Variables](#environment-variables)  
6. [API Reference](#api-reference)  
   - [Auth Routes](#auth-routes)  
   - [Post Routes](#post-routes)  
   - [Comment Routes](#comment-routes)  
   - [Engagement Routes](#engagement-routes)  
7. [Frontend Pages & Components](#frontend-pages--components)  
8. [Folder Structure](#folder-structure)  
9. [Testing](#testing)  
10. [Contributing](#contributing)  
11. [License](#license)  

---

## Project Overview

Intrnr is a decentralized-style community forum where users control their own identity through mnemonic seed phrases (BIP39).  
No passwords are stored on-server. Instead, the user’s public key is stored in MongoDB; the private key and mnemonic remain local.  
This design enhances privacy, reduces attack surface, and embraces Web3 principles for web applications.

---

## Tech Stack

- **Frontend**: Next.js (React)  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Crypto**: BIP39 for mnemonics, SHA-256 for key derivation  
- **Auth**: Mnemonic-based recovery and keypair validation  
- **Styling**: Inline CSS in React (can swap to CSS-in-JS or Tailwind)  
- **Dev Tools**: VS Code, Postman/Curl, MongoDB Compass

---

## Features

- **Signup**: Generate a 12-word mnemonic → derive keypair → store public key + user details  
- **Login**: Enter mnemonic → derive public key → match against stored public key  
- **Create Posts**: Title, content, optional attachments, set visibility (public/private/followers)  
- **View Feed**: Scrollable feed of public posts, sticky search bar, sidebar nav  
- **Post Interactions**: Like, dislike, comment (persisted in `engagement` & `comments` collections)  
- **Recovery**: Download mnemonic, verify phrase on signup

---

## Getting Started

### Prerequisites

- Node.js v16+  
- npm or Yarn  
- MongoDB (local or Atlas)

### Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/intrnr.git
   cd intrnr
   ```

2. **Install backend dependencies**  
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**  
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally

1. **Start MongoDB** (if local):  
   ```bash
   mongod --dbpath /path/to/your/db
   ```

2. **Backend**  
   ```bash
   cd intrnr/backend
   npm run dev   # or `node app.js`
   ```

3. **Frontend**  
   ```bash
   cd ../frontend
   npm run dev   # runs on http://localhost:3000
   ```

Now navigate to:
- `http://localhost:3000` for the Next.js app  
- `http://localhost:5000` for backend API

---

## Environment Variables

Create a `.env` file in `backend/`:
```
MONGO_URI=mongodb://localhost:27017
DB_NAME=intrnrDB
PORT=5000
```

---

## API Reference

### Auth Routes
- **POST** `/auth/signup`  
  - **Body**: `{ name, username, email, password }`  
  - **Response**: `{ success, mnemonic, privateKey }`
- **POST** `/auth/login`  
  - **Body**: `{ email, mnemonic }`  
  - **Response**: `{ success, message }`
- **GET** `/auth/userinfo`  
  - Returns logged-in user details (placeholder).

### Post Routes
- **GET** `/post`  
  - **Query**: `?visibility=public` (default)  
  - **Response**: `{ posts: [ ... ] }`
- **POST** `/post`  
  - **Body**: `{ created_by, title, content, visibility, attachment_add }`
- **POST** `/post/:postId/like`  
  - **Body**: `{ public_key }`
- **POST** `/post/:postId/dislike`  
  - **Body**: `{ public_key }`
- **POST** `/post/:postId/comment`  
  - **Body**: `{ public_key, comment }`

### Comment Routes
- **GET** `/comment?post_id=<postId>`  
- **POST** `/comment`  
  - **Body**: `{ post_id, public_key, content }`

### Engagement Routes
- **GET** `/engagement?post_id=<postId>`  
- **POST** `/engagement`  
  - **Body**: `{ post_id, action: 'like'|'dislike', public_key }`

---

## Frontend Pages & Components

- `/app/page.js` – Landing page with scroll animation & email hint  
- `/app/signup/page.js` – Signup with mnemonic generation & verification  
- `/app/login/page.js` – Login via mnemonic entry  
- `/app/feed/page.js` – Main feed with sidebar, search, modal post view  
- `/components/Receptionist.js` – Dark-card illustration component

---

## Folder Structure

```
intrnr/
│
├─ backend/
│   ├─ app.js
│   ├─ config/db.js
│   ├─ controllers/
│   │    ├─ authController.js
│   │    ├─ postController.js
│   │    ├─ commentController.js
│   │    └─ engagementController.js
│   ├─ crypto/keys.js
│   ├─ routes/
│   │    ├─ auth.js
│   │    ├─ post.js
│   │    ├─ comment.js
│   │    └─ engagement.js
│   └─ package.json
│
└─ frontend/
    ├─ app/
    │    ├─ page.js
    │    ├─ signup/page.js
    │    ├─ login/page.js
    │    ├─ feed/page.js
    │    └─ components/Receptionist.js
    ├─ public/logo.png
    └─ package.json
```

---

## Testing

- Use **Postman** or **cURL** to hit each endpoint.  
- Frontend manual QA: signup → download mnemonic → verify phrase → view feed → interact.

---

## Contributing

1. Fork this repo  
2. Create a feature branch: `git checkout -b feature/YourFeature`  
3. Commit & push: `git push origin feature/YourFeature`  
4. Open a Pull Request

---

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.
```
