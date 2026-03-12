# Postd – Pen Pal Web App

A Next.js web application for TCD students to connect through handwritten-style letters.

---

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Auth**: Firebase Authentication (TCD @tcd.ie email enforcement)
- **Database**: MySQL (local or Railway)
- **File Storage**: Firebase Storage
- **Deployment**: Vercel (frontend) + Railway (MySQL)

---

## Local Setup

### 1. Prerequisites

- Node.js 18+
- MySQL installed locally (or Docker)
- A Firebase project

### 2. Clone & Install

```bash
git clone <your-repo>
cd postd
npm install
```

### 3. Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase credentials and MySQL connection details.

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project called "postd"
3. Enable **Authentication** → Sign-in methods → Email/Password
4. Enable **Storage**
5. Copy your config values into `.env.local`

**TCD Email Restriction** — In Firebase Console → Authentication → Settings → Authorized domains, you can additionally restrict. The app enforces `@tcd.ie` on the frontend and should also validate server-side.

### 5. MySQL Setup

Create the database and tables:

```sql
CREATE DATABASE postd;
USE postd;

CREATE TABLE users (
  id VARCHAR(128) PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  student_id VARCHAR(50),
  bio TEXT,
  quiz_answers JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(128) NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  color VARCHAR(20) DEFAULT '#F5A623',
  likes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id VARCHAR(128) NOT NULL,
  recipient_id VARCHAR(128) NOT NULL,
  subject VARCHAR(255),
  body TEXT NOT NULL,
  canvas_data JSON,
  is_read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (recipient_id) REFERENCES users(id)
);

CREATE TABLE drafts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(128) NOT NULL,
  recipient VARCHAR(255),
  body TEXT,
  canvas_data JSON,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 6. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Page Structure

| Route | Page |
|-------|------|
| `/` | Login / Register |
| `/quiz` | Setup Quiz (runs after first registration) |
| `/bulletin` | Bulletin Board |
| `/account` | My Account + Profile View |
| `/drafter` | Message Drafter |
| `/messages` | Inbox + Outbox |

---

## Deployment

### Frontend → Vercel

```bash
npm install -g vercel
vercel
```

Add all `.env.local` values as Environment Variables in the Vercel dashboard.

### Database → Railway

1. Go to [railway.app](https://railway.app)
2. New Project → Add MySQL
3. Copy the connection string into Vercel env vars:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

---

## Notes

- Only `@tcd.ie` email addresses are accepted at registration
- Full name (first + last) is required — anonymous accounts are not permitted
- Quiz answers are stored in MySQL as JSON and used for pen pal matching
