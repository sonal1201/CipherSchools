# CipherStudio 🚀

A modern, full-stack browser-based React IDE with MongoDB authentication. Create, edit, and preview React projects directly in your browser with real-time updates and cloud-based project storage.

![CipherStudio](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Express](https://img.shields.io/badge/Express-4.18-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
![Prisma](https://img.shields.io/badge/Prisma-5.x-blue)

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login** with secure JWT tokens
- **Password Hashing** using bcryptjs
- **Protected Routes** for Dashboard and IDE
- **Session Persistence** with token-based authentication
- **Logout Confirmation Dialog** for safe logout
- **MongoDB + Prisma ORM** for reliable data storage

### 💻 IDE Features
- **Live Code Editor** powered by Sandpack with Monaco Editor
- **Real-time Preview** that updates instantly as you type
- **File Management** - Create, rename, and delete files
- **Auto-save** every 2 seconds (never lose your work!)
- **Alphabetically Sorted Projects** in the sidebar
- **Cloud Storage** - Access your projects from any device

### 🎨 UI/UX
- **Modern Landing Page** with CTA buttons and animated background
- **Light/Dark Theme Toggle** with full theme support across all pages
- **Custom Logo Integration** throughout the application
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Clean Dashboard** with project cards and user profile
- **Smooth Navigation** with proper redirects and back buttons

### 🚀 Performance
- **Lightning Fast** with Vite build tool
- **Hot Module Reloading** for instant feedback
- **Optimized API** with request validation
- **MongoDB ObjectID Validation** to prevent errors
- **Zero Linter Errors** - Clean, production-ready code

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 16+ and npm
- **MongoDB** database (local or MongoDB Atlas)
- **Git** (for cloning the repository)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd reactCode
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:
```bash
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_secure_jwt_secret_key"
PORT=3001
```

**Example MongoDB Connection Strings:**
- **Local:** `mongodb://localhost:27017/cipherstudio`
- **MongoDB Atlas:** `mongodb+srv://username:password@cluster.mongodb.net/cipherstudio`

### 4. Database Setup

Generate Prisma Client and push schema to database:
```bash
npm run prisma:generate
npm run prisma:push
```

### 5. Start the Servers

**Option 1: Run both servers in separate terminals**

Terminal 1 - Backend Server:
```bash
npm run server
```

Terminal 2 - Frontend Dev Server:
```bash
npm run dev
```

**Option 2: Run both servers in the same terminal (Windows PowerShell)**
```powershell
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "npm run server"
Start-Sleep -Seconds 3
npm run dev
```

### 6. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/api/health

## 🏗️ Project Structure

```
reactCode/
├── src/                          # Frontend React Application
│   ├── components/
│   │   ├── Dashboard.tsx         # User dashboard with projects
│   │   ├── IDE.tsx              # Main code editor with Sandpack
│   │   ├── Landing.tsx          # Landing page with CTA
│   │   ├── Login.tsx            # User login page
│   │   ├── Register.tsx         # User registration page
│   │   ├── Sidebar.tsx          # Project navigation sidebar
│   │   ├── FileExplorer.tsx     # File tree component
│   │   ├── ProtectedRoute.tsx   # Route protection wrapper
│   │   └── ui/                  # Reusable UI components
│   ├── contexts/
│   │   ├── AuthContext.tsx      # Authentication state management
│   │   ├── ProjectContext.tsx   # Project state management
│   │   └── ThemeContext.tsx     # Theme & settings management
│   ├── utils/
│   │   ├── storage.ts           # API calls for project storage
│   │   ├── defaultFiles.ts      # Default project template
│   │   └── clearOldData.ts      # Local storage cleanup
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── assest/
│   │   └── chiperlogo.png       # Application logo
│   ├── App.tsx                  # Main app with routing
│   └── main.tsx                 # Application entry point
│
├── server/                       # Backend Express API
│   ├── index.ts                 # Express server setup
│   ├── prisma.ts                # Prisma client instance
│   ├── middleware/
│   │   └── auth.ts              # JWT authentication middleware
│   └── routes/
│       ├── auth.ts              # Authentication routes
│       └── projects.ts          # Project CRUD routes
│
├── prisma/
│   └── schema.prisma            # Database schema definition
│
├── .env                         # Environment variables (create this!)
├── env.template                 # Environment variables template
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── tailwind.config.js           # Tailwind CSS configuration
```

## 📖 Usage Guide

### Creating Your First Account
1. Visit http://localhost:5173
2. Click **"Get Started"** on the landing page
3. Fill in your name, email, and password
4. Click **"Create Account"**
5. You'll be automatically redirected to the dashboard

### Creating a New Project
1. On the dashboard, click **"New Project"**
2. Enter a project name and description
3. Click **"Create"**
4. Start coding immediately in the IDE!

### Managing Files in the IDE
- **Create File:** Click the `+` icon in the file explorer
- **Rename File:** Hover over a file and click the edit icon
- **Delete File:** Hover over a file and click the trash icon
- **Switch Files:** Click on any file to edit it

### Saving Your Work
- **Auto-save:** Your work is automatically saved every 2 seconds
- **Manual Save:** Click the "Save" button (Ctrl+S)
- All projects are stored in MongoDB and accessible from any device

### Theme Switching
Click the sun/moon icon in the header to toggle between light and dark modes. Your preference is saved automatically.

### Logging Out
1. Click your profile icon in the top-right
2. Click **"Logout"**
3. Confirm in the dialog
4. You'll be redirected to the landing page

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Sandpack** - In-browser code bundler
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for auth
- **bcryptjs** - Password hashing
- **TypeScript** - Type safety
- **tsx** - TypeScript execution

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `GET /api/projects` - Get all user projects (protected)
- `GET /api/projects/:id` - Get specific project (protected)
- `POST /api/projects` - Create new project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Health
- `GET /api/health` - Server health check

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start frontend dev server (Vite)
npm run server       # Start backend server with hot reload

# Database
npm run prisma:generate  # Generate Prisma Client
npm run prisma:push      # Push schema to database
npm run prisma:studio    # Open Prisma Studio (GUI)

# Production
npm run build        # Build frontend for production
npm run preview      # Preview production build
```

## 🔒 Security Features

- ✅ **Password Hashing** with bcryptjs (10 salt rounds)
- ✅ **JWT Authentication** with secure token generation
- ✅ **Protected API Routes** with authentication middleware
- ✅ **MongoDB ObjectID Validation** to prevent injection
- ✅ **Environment Variables** for sensitive data
- ✅ **CORS Configuration** for API security
- ✅ **User-specific Data** - Users can only access their own projects

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if .env file exists and has correct values
cat .env

# Regenerate Prisma Client
npm run prisma:generate
```

### Database connection errors
```bash
# Verify MongoDB is running (if local)
# OR check MongoDB Atlas connection string

# Test connection by running Prisma Studio
npx prisma studio
```

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:3001`
- Check browser console for CORS errors
- Verify API_URL in `src/contexts/AuthContext.tsx` and `src/utils/storage.ts`

### "Malformed ObjectID" errors
- This should be fixed with ObjectID validation
- If you see it, clear browser localStorage and try again

## 📦 Build for Production

### Frontend
```bash
npm run build
```
Output will be in `dist/` folder. Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Backend
```bash
# Set NODE_ENV=production in .env
# Use a process manager like PM2
pm2 start server/index.ts --name cipherstudio-api
```

Deploy to:
- Heroku
- Railway
- DigitalOcean
- AWS/Azure/GCP

## 🌟 Key Features Explained

### Sandpack Integration
Sandpack provides a complete in-browser React environment:
- Monaco Editor (VS Code's editor)
- Real-time compilation and bundling
- Live error reporting
- Hot module replacement
- No backend required for code execution

### Prisma ORM
Prisma provides type-safe database access:
- Auto-generated TypeScript types
- Migration management
- Query optimization
- Support for multiple databases

### JWT Authentication Flow
1. User registers/logs in
2. Server validates credentials and generates JWT
3. Frontend stores token in localStorage
4. Token sent with every API request
5. Server verifies token before processing requests

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- **Sandpack** - Amazing in-browser bundler
- **Prisma** - Excellent ORM for TypeScript
- **Tailwind CSS** - Beautiful utility-first CSS
- **React Team** - For the incredible framework
- **MongoDB** - Flexible NoSQL database

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the environment setup
3. Ensure all dependencies are installed
4. Check that MongoDB is accessible

---

**Built with ❤️ using React + TypeScript + Express + MongoDB + Prisma**

**Happy Coding! 🎉**

Visit your CipherStudio at [http://localhost:5173](http://localhost:5173)
