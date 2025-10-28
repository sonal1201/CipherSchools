# CipherStudio

A modern, browser-based React IDE with real-time preview, project management, and cloud storage.

---

## 🏗️ Project Structure

This project is separated into **frontend** and **backend**:

```
CompletedProject/
├── reactCode/          # Frontend (React + Vite)
│   ├── src/
│   ├── package.json
│   └── vercel.json
│
└── backend/            # Backend (Express + Prisma + MongoDB)
    ├── src/
    ├── prisma/
    ├── package.json
    └── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB database (MongoDB Atlas recommended)
- npm or yarn

### 1. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET
npm run prisma:generate
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2. Setup Frontend

```bash
cd reactCode
npm install
cp .env.example .env
# Edit .env with VITE_API_URL=http://localhost:5000/api
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📦 Deployment

### Backend Deployment (Railway/Render)

See `backend/DEPLOYMENT.md` for detailed instructions.

**Railway (Recommended)**:
1. Push backend to GitHub
2. Connect to Railway
3. Add environment variables
4. Deploy!

**Render (Free Tier)**:
1. Create Web Service on Render
2. Connect GitHub repo
3. Add environment variables
4. Deploy!

After deployment, you'll get a URL like:
- Railway: `https://your-app.up.railway.app`
- Render: `https://your-app.onrender.com`

### Frontend Deployment (Vercel)

1. Update `.env.production` in frontend:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

2. Deploy to Vercel:
   ```bash
   cd reactCode
   vercel
   ```

3. Set environment variable in Vercel dashboard:
   - `VITE_API_URL` → Your backend URL + `/api`

---

## ✨ Features

- ✅ **Browser-based IDE** - Code React components instantly
- ✅ **Real-time Preview** - See changes as you type
- ✅ **Project Management** - Create, save, and organize projects
- ✅ **Authentication** - Secure user accounts with JWT
- ✅ **Cloud Storage** - Projects saved to MongoDB
- ✅ **Responsive UI** - Works on desktop and mobile
- ✅ **Dark/Light Theme** - Toggle between themes
- ✅ **File Explorer** - Manage multiple files per project

---

## 🛠️ Tech Stack

**Frontend**:
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router
- Sandpack (CodeSandbox)
- Axios

**Backend**:
- Express.js
- Prisma ORM
- MongoDB
- JWT Authentication
- bcryptjs
- TypeScript

---

## 📝 Environment Variables

### Backend (.env)

```env
DATABASE_URL=mongodb+srv://...
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Development

### Backend

```bash
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm run prisma:studio # Open Prisma Studio
```

### Frontend

```bash
cd reactCode
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 📄 License

MIT

---

## 👤 Author

Created as part of CipherSchools assignment
