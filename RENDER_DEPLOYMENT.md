# Render Deployment Instructions

## 1. Create Render Account
- Go to https://render.com
- Sign up with GitHub account

## 2. Deploy Backend
1. Click "New +" → "Web Service"
2. Connect GitHub repository
3. Configure:
   - Name: exptracker-backend
   - Root Directory: backend
   - Build Command: npm install
   - Start Command: npm start
   - Instance Type: Free

## 3. Environment Variables
Add in Render dashboard:
- MONGODB_URI=your_atlas_connection_string
- JWT_SECRET=your_secure_jwt_secret
- JWT_REFRESH_SECRET=your_secure_refresh_secret
- NODE_ENV=production
- CLIENT_URL=https://your-frontend-domain.vercel.app

## 4. Deploy
- Click "Create Web Service"
- Wait for deployment to complete

Your backend will be available at: https://your-app.onrender.com

## 5. Enable Safe Auto-Deploy (Recommended)
To make new commits appear online automatically while keeping production safe:

1. In both Render services (`exptracker-backend` and `exptracker-frontend`), enable **Auto-Deploy**.
2. Keep deployments connected only to the `main` branch.
3. In GitHub repository settings, enable branch protection for `main`:
   - Require pull request before merge.
   - Require status checks to pass before merge.
4. Merge tested changes into `main`.

Once enabled, every push/merge to `main` will trigger a Render deployment automatically.