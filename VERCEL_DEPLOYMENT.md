# Vercel Deployment Instructions

## 1. Create Vercel Account
- Go to https://vercel.com
- Sign up with GitHub account

## 2. Deploy Frontend
1. Click "New Project"
2. Import your GitHub repository
3. Configure:
   - Framework Preset: Vite
   - Root Directory: frontend/Track
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install

## 3. Environment Variables
In Vercel dashboard, go to Settings → Environment Variables:
- VITE_API_BASE_URL=https://your-backend-domain.railway.app
- VITE_NODE_ENV=production

## 4. Deploy
- Click "Deploy"
- Wait for deployment to complete
- Your frontend will be available at: https://your-app.vercel.app

## 5. Update Backend CORS
Update your backend's CLIENT_URL environment variable with your Vercel domain:
CLIENT_URL=https://your-app.vercel.app

## 6. Custom Domain (Optional)
- Go to Settings → Domains
- Add your custom domain