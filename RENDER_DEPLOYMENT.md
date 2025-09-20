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