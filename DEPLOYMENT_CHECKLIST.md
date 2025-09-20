# 🚀 Complete Deployment Checklist

## Pre-Deployment Checklist

### Backend Preparation ✅
- [x] Environment variables configured (.env.production)
- [x] Database connection updated (MongoDB Atlas)
- [x] CORS settings configured
- [x] Rate limiting enabled
- [x] JWT secrets set

### Frontend Preparation ✅
- [x] Environment configuration system created
- [x] API URLs updated for production
- [x] Build optimization configured
- [x] Environment files created (.env.production)

## Deployment Steps

### 1. Backend Deployment (Railway/Render)
- [ ] Create Railway/Render account
- [ ] Deploy backend service
- [ ] Set environment variables
- [ ] Test backend endpoints
- [ ] Note down backend URL

### 2. Frontend Deployment (Vercel/Netlify)
- [ ] Create Vercel/Netlify account
- [ ] Deploy frontend with correct build settings
- [ ] Set environment variables (VITE_API_BASE_URL)
- [ ] Test frontend deployment

### 3. Integration Testing
- [ ] Test user registration
- [ ] Test user login
- [ ] Test expense creation
- [ ] Test income creation
- [ ] Test dashboard functionality
- [ ] Test file uploads
- [ ] Test data persistence

## Post-Deployment Configuration

### Security
- [ ] Update CORS origins
- [ ] Enable HTTPS redirects
- [ ] Check JWT token security
- [ ] Verify file upload security

### Performance
- [ ] Test loading speeds
- [ ] Check bundle sizes
- [ ] Monitor database queries
- [ ] Set up error monitoring

### Domain Setup (Optional)
- [ ] Purchase domain
- [ ] Configure DNS records
- [ ] Set up SSL certificates
- [ ] Update environment variables

## Environment Variables Summary

### Backend (.env.production)
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/exptracker
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-key
CLIENT_URL=https://your-frontend-domain.vercel.app
NODE_ENV=production
PORT=8001
```

### Frontend (.env.production)
```
VITE_API_BASE_URL=https://your-backend-domain.railway.app
VITE_NODE_ENV=production
```

## Troubleshooting

### Common Issues
1. **CORS Errors**: Update CLIENT_URL in backend
2. **API Not Found**: Check VITE_API_BASE_URL
3. **Database Connection**: Verify MongoDB connection string
4. **File Uploads**: Check upload middleware and storage

### Testing URLs
- Backend Health: `https://your-backend.railway.app/api/health`
- Frontend: `https://your-app.vercel.app`

## Success Criteria
- [ ] Users can register and login
- [ ] Dashboard loads with correct data
- [ ] Expenses and income can be added/edited/deleted
- [ ] Charts and visualizations work
- [ ] File uploads function properly
- [ ] Mobile responsive design works
- [ ] No console errors in production