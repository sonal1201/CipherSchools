# CipherStudio 🚀

A full-stack browser-based React IDE with MongoDB authentication. Code, preview, and save React projects in the cloud.

![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Express](https://img.shields.io/badge/Express-4.18-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user auth with MongoDB
- 💻 **Live Code Editor** - Powered by Sandpack with real-time preview
- 📁 **File Management** - Create, rename, and delete files
- 💾 **Auto-save** - Never lose your work (saves every 2 seconds)
- 🎨 **Light/Dark Theme** - Full theme support
- ☁️ **Cloud Storage** - Access projects from anywhere
- 📱 **Responsive Design** - Works on all devices

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sonal1201/CipherSchools.git
cd CipherSchools
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file:
```env
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_secure_jwt_secret"
PORT=3001
```

4. **Setup database**
```bash
npm run prisma:generate
npm run prisma:push
```

5. **Start the application**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

6. **Open your browser**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Sandpack (Code Editor)
- React Router

**Backend:**
- Express.js
- Prisma ORM
- MongoDB
- JWT Authentication
- bcryptjs

## 📦 Project Structure

```
CipherSchools/
├── src/                    # Frontend React app
│   ├── components/         # UI components
│   ├── contexts/           # State management
│   └── utils/              # Utilities
├── server/                 # Backend Express API
│   ├── routes/             # API routes
│   └── middleware/         # Auth middleware
├── prisma/                 # Database schema
└── .env                    # Environment variables
```

## 🎯 Available Scripts

```bash
npm run dev              # Start frontend dev server
npm run server           # Start backend server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:push      # Push schema to database
npm run build            # Build for production
```

## 📖 Usage

1. **Register** - Create an account at http://localhost:5173
2. **Login** - Sign in with your credentials
3. **Create Project** - Click "New Project" on dashboard
4. **Start Coding** - Use the IDE with live preview
5. **Auto-save** - Your work is automatically saved

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects (Protected)
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## 🐛 Troubleshooting

**Backend won't start?**
- Check `.env` file exists with correct MongoDB URL
- Run `npm run prisma:generate`

**Can't connect to database?**
- Verify MongoDB is running
- Check DATABASE_URL in `.env`

**Frontend can't connect to backend?**
- Ensure backend is running on port 3001
- Check browser console for errors

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

Built with ❤️ using React, TypeScript, Express, MongoDB, Prisma, and Sandpack.

---

**Happy Coding! 🎉**

Visit: https://github.com/sonal1201/CipherSchools
