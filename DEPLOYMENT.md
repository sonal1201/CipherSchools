# 🚀 Deployment Guide for CipherStudio

## Recommended Approach: Split Deployment

Deploy **Frontend** to **Vercel** and **Backend** to **Railway** or **Render**

This is the easiest and most reliable approach for your full-stack app.

---

## Option 1: Frontend (Vercel) + Backend (Railway) ⭐ RECOMMENDED

### Part 1: Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app/)**
2. Click "Start a New Project" → "Deploy from GitHub repo"
3. Select your `CipherSchools` repository
4. **Add Environment Variables:**
   ```
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3001
   NODE_ENV=production
   ```
5. **Add Start Command:**
   - In Settings → Deploy → Start Command: `npm run server`
6. **Deploy!** Railway will give you a URL like: `https://your-app.railway.app`

### Part 2: Deploy Frontend to Vercel

1. **Update API URLs in your code**

Create `.env.production`:
```env
VITE_API_URL=https://your-app.railway.app/api
```

Update `src/contexts/AuthContext.tsx` and `src/utils/storage.ts`:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

2. **Go to [Vercel.com](https://vercel.com/)**
3. Click "Add New" → "Project"
4. Import your `CipherSchools` GitHub repository
5. **Configure Build Settings:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Add Environment Variables:**
   ```
   VITE_API_URL=https://your-app.railway.app/api
   ```
7. **Deploy!**

---

## Option 2: Frontend (Vercel) + Backend (Render)

### Part 1: Deploy Backend to Render

1. **Go to [Render.com](https://render.com/)**
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. **Configure:**
   - Name: `cipherstudio-api`
   - Environment: `Node`
   - Build Command: `npm install && npm run prisma:generate`
   - Start Command: `npm run server`
5. **Add Environment Variables:**
   ```
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3001
   NODE_ENV=production
   ```
6. **Deploy!** You'll get a URL like: `https://cipherstudio-api.onrender.com`

### Part 2: Deploy Frontend to Vercel

Follow the same steps as Option 1, Part 2 above, using your Render backend URL.

---

## Option 3: All-in-One on Vercel (Advanced)

⚠️ **Note:** Requires converting Express routes to Vercel serverless functions. More complex but keeps everything in one place.

### Steps:

1. **Update Environment Variables**

Create `.env.production`:
```env
DATABASE_URL=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret
```

2. **Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

3. **Add Environment Variables on Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add `DATABASE_URL` and `JWT_SECRET`

4. **Redeploy:**
```bash
vercel --prod
```

---

## 📝 Important Notes

### CORS Configuration

Make sure your backend allows your frontend domain. Update `server/index.ts`:

```typescript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend.vercel.app'
  ],
  credentials: true
}));
```

### MongoDB Atlas

For production, use **MongoDB Atlas** (cloud):
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Add to environment variables

### Environment Variables Checklist

**Backend:**
- ✅ DATABASE_URL
- ✅ JWT_SECRET
- ✅ PORT (optional, Railway/Render auto-assign)
- ✅ NODE_ENV=production

**Frontend:**
- ✅ VITE_API_URL (your backend URL)

---

## 🔍 Testing Your Deployment

1. **Test Backend:**
   ```bash
   curl https://your-backend-url/api/health
   ```

2. **Test Frontend:**
   - Visit your Vercel URL
   - Try registering a user
   - Create a project
   - Verify everything works

---

## 🐛 Common Issues

**Issue: "Cannot connect to database"**
- ✅ Check DATABASE_URL is set correctly
- ✅ Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`

**Issue: "CORS error"**
- ✅ Update CORS origin in backend to include Vercel URL
- ✅ Ensure VITE_API_URL is correct

**Issue: "Module not found"**
- ✅ Run `npm run prisma:generate` before deploying
- ✅ Check all dependencies are in `dependencies`, not `devDependencies`

---

## 🎉 Success!

Once deployed, you'll have:
- ✅ Frontend live on Vercel
- ✅ Backend API running on Railway/Render
- ✅ MongoDB Atlas database
- ✅ Accessible from anywhere!

**Frontend URL:** `https://your-project.vercel.app`  
**Backend API:** `https://your-api.railway.app/api`

---

Need help? Check the logs on each platform's dashboard!

