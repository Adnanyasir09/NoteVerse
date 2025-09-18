# 📒 MERN Notes Manager App

A complete **MERN stack Notes Manager** with authentication, role-based access (user/admin), and a modern React + Tailwind frontend.  
This project uses **MongoDB, Express, React (Vite), Node.js, JWT authentication, and Tailwind CSS**.

---

## ✨ Features
- 🔐 **User Authentication** (register/login with JWT)  
- 📝 **Create, Edit, Delete Notes** (per user)  
- 👨‍💼 **Admin Panel** (view/manage all users & notes)  
- 🎨 **Modern UI** with Tailwind + responsive design  
- 🛡️ **Protected Routes** (role-based access control)  
- ⚡ **Vite** for fast React development  

---

## ⚙️ Installation & Setup

### 🔧 Prerequisites
- Node.js >= 20 (recommended by [Vite docs](https://vitejs.dev/guide/))
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- VS Code (optional, for development)

---

### 🚀 Backend (Express + Mongoose)
```bash
# from root
cd server
npm init -y
npm i express mongoose bcryptjs jsonwebtoken dotenv cors
npm i -D nodemon

# dev
npx nodemon index.js

---

### 🚀 Frontend 
```bash

# from root
npm create vite@latest client
# select -> react, javascript
cd client
npm install

# Tailwind setup (from [Tailwind Vite guide](https://tailwindcss.com/docs/guides/vite))
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# runtime deps
npm i axios react-router-dom

npm run dev

