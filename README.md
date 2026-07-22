# Waypoint
# Waypoint – AI Career Helper

> An AI-powered career guidance platform that helps students explore suitable career paths based on their interests, skills, and goals.

---

## Overview

Waypoint is a full-stack web application developed to provide intelligent career guidance using AI. The platform enables users to interact with an AI assistant that offers career recommendations, learning suggestions, and guidance based on user input.

The application follows a client-server architecture with a React frontend and a Node.js/Express backend.

---

## Features

- AI-powered career guidance
- Interactive chat interface
- Modern and responsive user interface
- REST API integration
- Backend service architecture
- File upload support
- Modular project structure

---

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript (ES6+)
- Tailwind CSS

### Backend
- Node.js
- Express.js

### AI
- Google Gemini API 

### Tools
- Git
- GitHub
- Visual Studio Code

---

## Project Structure

```text
waypoint-ai/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── utils/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── .gitignore
├── eslint.config.js
└── package-lock.json
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/madhushree1801/Waypoint.git
```

### Navigate to the project

```bash
cd Waypoint
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder.

Example:

```env
GEMINI_API_KEY=actual_key
PORT=5000
```

Start the backend server:

```bash
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Future Enhancements

- User Authentication
- Resume Analysis
- Learning Roadmaps
- Internship Recommendations
- Interview Preparation
- Career Progress Dashboard

---

## Learning Outcomes

This project helped in understanding:

- Full Stack Web Development
- REST API Development
- AI Integration
- React Application Development
- Backend Architecture
- Git & GitHub Workflow

---

## Author

**Madhushree**

Computer Science Engineering Student

GitHub: https://github.com/madhushree1801

---

## License

This project is intended for educational purposes.
