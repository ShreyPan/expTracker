# Netlify Deployment Instructions

## 1. Create Netlify Account
- Go to https://netlify.com
- Sign up with GitHub account

## 2. Deploy Frontend
1. Click "New site from Git"
2. Connect to GitHub and select your repository
3. Configure:
   - Branch to deploy: main
   - Base directory: frontend/Track
   - Build command: npm run build
   - Publish directory: frontend/Track/dist

## 3. Environment Variables
In Netlify dashboard, go to Site settings → Environment variables:
- VITE_API_BASE_URL=https://your-backend-domain.railway.app
- VITE_NODE_ENV=production

## 4. Deploy
- Click "Deploy site"
- Your frontend will be available at: https://random-name.netlify.app

## 5. Update Backend CORS
Update your backend's CLIENT_URL environment variable with your Netlify domain:
CLIENT_URL=https://your-app-name.netlify.app

## 6. Custom Domain (Optional)
- Go to Site settings → Domain management
- Add your custom domain