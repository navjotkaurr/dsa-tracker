# 📚 DSA Sheet Web App (MERN Stack)

A full-stack web application designed to help students practice and track Data Structures & Algorithms (DSA) topic-wise. This tool allows users to log in, view categorized DSA problems, access learning resources, and mark problems as completed.

---

## 🚀 Features

- 🔐 **JWT-based Authentication**
- 📂 **DSA Topics and Subtopics** organized topic-wise
- 📎 **External Links** to YouTube tutorials, LeetCode, and articles
- ✅ **Progress Tracking** with checkboxes for each problem
- 📊 **Difficulty Level** indicators (Easy, Medium, Hard)
- 🔄 **Persistent User Progress** (stored in MongoDB)

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- React Router
- Redux Toolkit Query
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- JWT for authentication
- MongoDB with Mongoose


## 🧪 Test Credentials

To login and explore the application, use:

- **Email:** john@email.com
- **Password:** 123456

## ⚙️ Environment Setup

Create a `.env` file in the root directory based on the `.env.example` provided.

You'll need to add:
- A valid MongoDB connection string (`MONGO_URI`)
- A JWT secret (`JWT_SECRET`)
