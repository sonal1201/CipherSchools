# CipherStudio Deployment URLs

## ✅ Build Status: SUCCESS!

Frontend and backend are both deployed and building successfully.

## ⚠️ FINAL STEP: Configure Environment Variables

**Current issue**: Frontend trying to connect to localhost instead of deployed backend.

### 🔧 Configure in Vercel Dashboard

#### Backend Environment Variables
Project: `react-backend-hn7n`
```
FRONTEND_URL=https://cipher-studio-xi.vercel.app
```

#### Frontend Environment Variables
Project: `cipher-studio-xi`
```
VITE_API_URL=https://react-backend-hn7n.vercel.app/api
```

**After adding variables, redeploy both projects!**

---

## 🌐 Live URLs

### Frontend
**URL**: https://cipher-studio-xi.vercel.app

### Backend
**URL**: https://react-backend-hn7n.vercel.app
**API**: https://react-backend-hn7n.vercel.app/api

---

## ⚙️ Vercel Environment Variables

### Backend Project: `react-backend-hn7n`

```env
DATABASE_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
NODE_ENV=production
FRONTEND_URL=https://cipher-studio-xi.vercel.app
```

### Frontend Project: `cipher-studio-xi`

```env
VITE_API_URL=https://react-backend-hn7n.vercel.app/api
```

---

## ✅ Deployment Checklist

- [x] Backend deployed to Vercel
- [ ] Add `FRONTEND_URL` to backend environment variables
- [ ] Redeploy backend
- [ ] Add `VITE_API_URL` to frontend environment variables
- [ ] Redeploy frontend
- [ ] Test login/register functionality
- [ ] Test project creation
- [ ] Test project saving

---

## 🧪 Testing Endpoints

### Health Check
```bash
curl https://react-backend-hn7n.vercel.app/api/health
```

### Root Endpoint
```bash
curl https://react-backend-hn7n.vercel.app/
```

---

## 🐛 Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` is set in backend env variables
- Must be exact: `https://cipher-studio-xi.vercel.app` (no trailing slash)

### 401 Unauthorized
- Check if JWT_SECRET is set in backend
- Verify token is being sent from frontend

### Database Connection
- Verify `DATABASE_URL` is correct in backend env
- Check MongoDB Atlas whitelist (allow 0.0.0.0/0)

---

Last Updated: October 28, 2025

