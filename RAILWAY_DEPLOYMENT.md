# Railway Deployment Instructions

## 1. Create Railway Account
- Go to https://railway.app
- Sign up with GitHub account

## 2. Deploy Backend
1. Go to Railway dashboard
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your expTracker repository
4. Choose the backend folder as root directory
5. Railway will auto-detect Node.js and deploy

## 3. Configure Environment Variables
In Railway dashboard, go to Variables tab and add:
- MONGODB_URI=your_atlas_connection_string
- JWT_SECRET=your_secure_jwt_secret
- JWT_REFRESH_SECRET=your_secure_refresh_secret
- NODE_ENV=production
- CLIENT_URL=https://your-frontend-domain.vercel.app

## 4. Custom Domain (Optional)
- Go to Settings → Domains
- Add custom domain or use Railway's generated domain

Your backend will be available at: https://your-app.railway.app