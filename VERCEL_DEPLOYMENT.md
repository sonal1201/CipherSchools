# 🚀 Deploy to Vercel (All-in-One)

Deploy both your frontend and backend to Vercel in one project!

## 📋 Prerequisites

1. **MongoDB Atlas Account** (Free)
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string

2. **Vercel Account** (Free)
   - Go to https://vercel.com
   - Sign up with GitHub

## 🚀 Deployment Steps

### Step 1: Prepare MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Create a new project or use existing one
3. Click "Build a Database" → Choose **FREE** tier
4. Create cluster (takes 3-5 minutes)
5. **Network Access**: Click "Add IP Address" → **Allow Access from Anywhere** (`0.0.0.0/0`)
6. **Database Access**: Create a database user with username and password
7. Click "Connect" → "Connect your application"
8. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/cipherstudio?retryWrites=true&w=majority
   ```
   Replace `<password>` with your actual password

### Step 2: Deploy to Vercel

1. **Go to https://vercel.com**

2. **Click "Add New" → "Project"**

3. **Import your GitHub repository:**
   - Select `CipherSchools` repository
   - Click "Import"

4. **Configure Project:**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run vercel-build` (or leave default)
   - **Output Directory**: `dist`

5. **Add Environment Variables** (IMPORTANT!):
   Click "Environment Variables" and add these:

   ```env
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/cipherstudio?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-random-string-here-make-it-long
   NODE_ENV=production
   ```

   **How to generate JWT_SECRET:**
   ```bash
   # In your terminal, run:
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. **Click "Deploy"**

7. **Wait 2-3 minutes** for deployment to complete

8. **Your app is live!** 🎉
   - URL: `https://your-project-name.vercel.app`

## 🔍 Testing Your Deployment

1. Visit your Vercel URL
2. Click "Get Started" to register
3. Create a new account
4. Create a new project
5. Start coding in the IDE
6. Verify auto-save works

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"

**Solution:**
- Verify DATABASE_URL is correct in Vercel environment variables
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Ensure password doesn't contain special characters (or URL encode them)

### Issue: "Prisma Client not initialized"

**Solution:**
- Redeploy the project
- Ensure `vercel-build` script includes `prisma generate`
- Check deployment logs for errors

### Issue: "Authentication not working"

**Solution:**
- Verify JWT_SECRET is set in Vercel environment variables
- Check browser console for CORS errors
- Clear browser cache and cookies

### Issue: API routes returning 404

**Solution:**
- Check `vercel.json` is properly configured
- Verify routes are prefixed with `/api/`
- Check deployment logs for build errors

## 📊 Vercel Dashboard

After deployment, you can:

- **View Logs**: Check runtime logs for errors
- **Environment Variables**: Update without redeploying
- **Domains**: Add custom domain
- **Analytics**: See usage stats (on Pro plan)

## 🔄 Updating Your App

After making changes to your code:

1. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```

2. **Vercel auto-deploys!** 
   - No manual action needed
   - Check deployment status on Vercel dashboard

## 📱 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

## 💰 Costs

**Everything is FREE!**
- ✅ Vercel: Free for personal projects (unlimited deployments)
- ✅ MongoDB Atlas: Free tier (512MB storage)
- ✅ SSL Certificate: Included automatically
- ✅ Custom domains: Free (you pay for domain registration only)

## 🎯 What's Deployed

Your Vercel deployment includes:

### Frontend (Static Files)
- React application
- Vite-built optimized bundle
- Sandpack code editor
- All UI components

### Backend (Serverless Functions)
- Express API routes
- JWT authentication
- Prisma ORM
- MongoDB integration

### Features Working
✅ User registration & login  
✅ Project creation & management  
✅ Code editor with live preview  
✅ Auto-save (every 2 seconds)  
✅ Light/Dark theme  
✅ Cloud storage  

## 📚 Helpful Links

- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Prisma Docs**: https://www.prisma.io/docs
- **Your Deployment Logs**: https://vercel.com/dashboard

## 🎉 Success!

Your full-stack CipherStudio app is now live on Vercel!

**Share your app:**
```
https://your-project-name.vercel.app
```

---

**Need help?** Check the Vercel deployment logs or create an issue on GitHub.

