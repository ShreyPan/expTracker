# ExpTracker - Advanced Personal Finance Management System

A production-ready, full-stack personal finance management application built with modern React and Node.js, featuring advanced security, real-time analytics, and comprehensive financial tracking.

## 🚀 Key Features

### 💳 **Financial Management**
- **Smart Income Tracking** - Multi-source income management with categorization
- **Expense Management** - Category-based expense tracking with detailed analytics
- **Real-time Balance Calculation** - Automatic balance updates (Income - Expenses)
- **Transaction History** - Chronological view with search and filtering capabilities
- **Data Export** - Export financial data to Excel/CSV formats

### 📊 **Advanced Analytics & Visualization**
- **Interactive Dashboard** - Real-time financial overview with key metrics
- **Visual Charts** - Multiple chart types using Recharts library:
  - Pie charts for financial overview and income distribution
  - Bar charts for income trends and expense patterns
  - Line charts with gradients for expense tracking over time
- **Time-based Analysis** - Last 30/60 days financial insights
- **Category Analysis** - Breakdown by expense categories and income sources

### 🔐 **Enterprise-Level Security**
- **Advanced JWT Authentication** - Dual token system (15min access + 7-day refresh tokens)
- **Automatic Token Refresh** - Seamless token renewal without user interruption
- **Comprehensive Input Validation** - Joi-based validation with detailed error messages
- **Security Middleware** - Rate limiting, CORS protection, and security headers
- **Password Security** - bcrypt hashing with salt rounds
- **File Upload Security** - MIME type validation and secure file handling

### 🎨 **Modern User Experience**
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Real-time Notifications** - Toast notifications for user feedback
- **Loading States** - Skeleton loading and progress indicators
- **Modal Interfaces** - Clean overlay forms for data entry
- **Interactive Elements** - Hover effects and smooth transitions

## 🛠️ Tech Stack

### **Frontend Technologies**
- **React 19.1.0** - Modern UI library with latest features
- **Vite 6.3.5** - Lightning-fast build tool and development server
- **Tailwind CSS 4.1.8** - Utility-first CSS framework for responsive design
- **Recharts 2.15.3** - Powerful data visualization library
- **React Router DOM 7.6.2** - Declarative client-side routing
- **Axios 1.9.0** - Promise-based HTTP client with interceptors
- **React Hot Toast 2.5.2** - Beautiful toast notifications
- **Moment.js 2.30.1** - Date manipulation and formatting
- **React Icons 5.5.0** - Popular icon library
- **Emoji Picker React 4.12.2** - Interactive emoji selection

### **Backend Technologies**
- **Node.js + Express 5.1.0** - High-performance server framework
- **MongoDB + Mongoose 8.15.1** - NoSQL database with elegant ODM
- **JWT + Refresh Tokens** - Secure authentication with automatic renewal
- **bcryptjs 3.0.2** - Industry-standard password hashing
- **Joi** - Comprehensive schema validation
- **Helmet** - Security middleware for HTTP headers
- **Express Rate Limit** - Request rate limiting protection
- **Multer 2.0.1** - Multipart/form-data file upload handling
- **CORS 2.8.5** - Cross-Origin Resource Sharing configuration
- **dotenv 16.5.0** - Environment variable management

### **Database Design**
- **Optimized Schema** - Efficient data models with proper indexing
- **Aggregation Pipelines** - Complex data analysis with MongoDB aggregations
- **Relationship Management** - User-based data isolation and referencing

## 📁 Project Architecture

```
expTracker/
├── backend/                          # Server-side application
│   ├── config/
│   │   └── db.js                    # MongoDB connection configuration
│   ├── controllers/                 # Business logic handlers
│   │   ├── authController.js        # Authentication & user management
│   │   ├── dashboardController.js   # Dashboard analytics aggregation
│   │   ├── expenseController.js     # Expense CRUD operations
│   │   └── incomeController.js      # Income CRUD operations
│   ├── middleware/                  # Custom middleware functions
│   │   ├── authMiddleware.js        # JWT token verification
│   │   ├── validation.js            # Joi input validation schemas
│   │   ├── errorHandler.js          # Global error handling
│   │   └── uploadMiddleware.js      # File upload processing
│   ├── models/                      # Database schemas
│   │   ├── User.js                  # User model with password hashing
│   │   ├── Expense.js               # Expense model with indexing
│   │   └── Income.js                # Income model with indexing
│   ├── routes/                      # API route definitions
│   │   ├── authRoutes.js            # Authentication endpoints
│   │   ├── dashboardRoutes.js       # Dashboard data endpoints
│   │   ├── expenseRoutes.js         # Expense management endpoints
│   │   └── incomeRoutes.js          # Income management endpoints
│   ├── uploads/                     # File storage (gitignored)
│   ├── .env.example                 # Environment variables template
│   ├── package.json                 # Backend dependencies
│   └── server.js                    # Application entry point
├── frontend/Track/                   # Client-side application
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Charts/              # Chart visualization components
│   │   │   │   ├── CustomBarChart.jsx
│   │   │   │   ├── CustomLineChart.jsx
│   │   │   │   ├── CustomPieChart.jsx
│   │   │   │   └── CustomTooltip.jsx
│   │   │   ├── Dashboard/           # Dashboard-specific components
│   │   │   │   ├── FinanceOverview.jsx
│   │   │   │   ├── RecentTransactions.jsx
│   │   │   │   └── Last30DaysExpenses.jsx
│   │   │   ├── Income/              # Income management components
│   │   │   ├── Expense/             # Expense management components
│   │   │   └── layouts/             # Layout components
│   │   │       ├── DashboardLayout.jsx
│   │   │       ├── Navbar.jsx
│   │   │       └── SideMenu.jsx
│   │   ├── pages/                   # Page-level components
│   │   │   ├── Auth/                # Authentication pages
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   └── Dashboard/           # Dashboard pages
│   │   │       ├── Home.jsx         # Main dashboard
│   │   │       ├── Income.jsx       # Income management
│   │   │       └── Expense.jsx      # Expense management
│   │   ├── context/                 # React Context for state management
│   │   │   └── userContext.jsx      # Global user state
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useUserAuth.jsx      # Authentication hook
│   │   ├── utils/                   # Utility functions
│   │   │   ├── axiosInstance.js     # HTTP client with interceptors
│   │   │   ├── apiPaths.js          # API endpoint constants
│   │   │   ├── helper.js            # Data transformation utilities
│   │   │   └── uploadImage.js       # Image upload utilities
│   │   └── assets/                  # Static assets
│   ├── package.json                 # Frontend dependencies
│   └── vite.config.js              # Vite build configuration
├── .gitignore                       # Git ignore rules
└── README.md                        # Project documentation
```

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5.0 or higher) - [Installation Guide](https://docs.mongodb.com/manual/installation/)
- **npm** or **yarn** - Package manager
- **Git** - Version control

### **Installation & Setup**

#### **1. Clone the Repository**
```bash
git clone https://github.com/ShreyPan/expTracker.git
cd expTracker
```

#### **2. Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file from template
cp .env.example .env

# Edit .env file with your configurations
# Required variables:
# MONGODB_URI=mongodb://localhost:27017/expTracker
# JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters
# JWT_REFRESH_SECRET=your-super-secure-refresh-secret-key-minimum-32-characters
# PORT=5000
# CLIENT_URL=http://localhost:3000

# Start the backend server
npm start
# or for development with auto-restart
npm run dev
```

#### **3. Frontend Setup**
```bash
# Navigate to frontend directory
cd ../frontend/Track

# Install dependencies
npm install

# Start the development server
npm run dev
```

#### **4. Access the Application**
- **Frontend**: `http://localhost:5173` (Vite dev server)
- **Backend API**: `http://localhost:5000`
- **MongoDB**: `mongodb://localhost:27017/expTracker`

### **Environment Variables**

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/expTracker

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters-long
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-key-minimum-32-characters-long

# Server Configuration
PORT=5000
NODE_ENV=development

# Client Configuration
CLIENT_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png

# Rate Limiting Configuration
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_MAX=5
```

## 🌐 API Documentation

### **Authentication Endpoints**
```http
# User Registration
POST /api/v1/auth/register
Content-Type: application/json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "profileImageUrl": "optional_image_url"
}

# User Login
POST /api/v1/auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "securePassword123"
}

# Refresh Token
POST /api/v1/auth/refresh-token
Content-Type: application/json
{
  "refreshToken": "your_refresh_token"
}

# Get User Info (Protected)
GET /api/v1/auth/getUser
Authorization: Bearer your_access_token

# Upload Profile Image
POST /api/v1/auth/upload-image
Content-Type: multipart/form-data
Authorization: Bearer your_access_token
Body: image file
```

### **Dashboard Endpoints**
```http
# Get Dashboard Analytics
GET /api/v1/dashboard/data
Authorization: Bearer your_access_token
Response: {
  "totalBalance": 5000,
  "totalIncome": 8000,
  "totalExpense": 3000,
  "last30DaysExpenses": {...},
  "last60DaysIncome": {...},
  "recentTransactions": [...]
}
```

### **Income Management**
```http
# Get All Income (with pagination & filtering)
GET /api/v1/income/get?page=1&limit=10&source=salary&dateFrom=2024-01-01&dateTo=2024-12-31
Authorization: Bearer your_access_token

# Add New Income
POST /api/v1/income/add
Authorization: Bearer your_access_token
Content-Type: application/json
{
  "source": "Salary",
  "amount": 5000,
  "date": "2024-09-10",
  "icon": "💰"
}

# Delete Income
DELETE /api/v1/income/:id
Authorization: Bearer your_access_token
```

### **Expense Management**
```http
# Get All Expenses (with pagination & filtering)
GET /api/v1/expense/get?page=1&limit=10&category=food&amountMin=10&amountMax=500
Authorization: Bearer your_access_token

# Add New Expense
POST /api/v1/expense/add
Authorization: Bearer your_access_token
Content-Type: application/json
{
  "category": "Food",
  "amount": 150,
  "date": "2024-09-10",
  "icon": "🍕"
}

# Delete Expense
DELETE /api/v1/expense/:id
Authorization: Bearer your_access_token
```

### **Response Format**
All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "details": "Detailed error information"
}
```

### **Rate Limiting**
- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 requests per 15 minutes per IP
- **File Upload**: 10 requests per hour per user

### **Security Features**
- **Input Validation**: Comprehensive Joi schema validation
- **Rate Limiting**: IP-based request throttling
- **CORS Protection**: Configured for specific origins
- **Security Headers**: Helmet middleware for HTTP security
- **File Upload Security**: MIME type validation and size limits

## 🏗️ Architecture & Design Patterns

### **Authentication Flow**
1. **Registration/Login** → Server generates access token (15min) + refresh token (7 days)
2. **Token Storage** → Frontend stores tokens in localStorage
3. **Request Interception** → Axios automatically adds Authorization header
4. **Token Refresh** → Automatic renewal when access token expires
5. **Logout** → Tokens removed from storage

### **Data Flow Architecture**
```
User Action → Component State → API Call → Backend Validation → Database → Response → State Update → UI Re-render
```

### **Database Schema Design**
```javascript
// User Model
{
  fullName: String (required, 2-50 chars),
  email: String (required, unique, indexed),
  password: String (required, bcrypt hashed),
  profileImageUrl: String (optional)
}

// Expense Model
{
  userId: ObjectId (ref: User, indexed),
  category: String (required, 1-50 chars),
  amount: Number (required, positive, 2 decimals),
  date: Date (required, indexed),
  icon: String (optional)
}

// Income Model
{
  userId: ObjectId (ref: User, indexed),
  source: String (required, 1-50 chars),
  amount: Number (required, positive, 2 decimals),
  date: Date (required, indexed),
  icon: String (optional)
}
```

### **Performance Optimizations**
- **Database Indexing**: Compound indexes on userId + date for efficient queries
- **Pagination**: Server-side pagination to handle large datasets
- **Aggregation Pipelines**: MongoDB aggregations for complex analytics
- **Request Caching**: Browser caching for static assets
- **Code Splitting**: Vite-based bundling with tree shaking
- **Responsive Images**: Optimized image loading and display

## 🔧 Development & Testing

### **Available Scripts**

#### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run test       # Run test suite (if implemented)
npm run lint       # Run ESLint for code quality
```

#### Frontend Scripts
```bash
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint for code quality
```

### **Code Quality**
- **ESLint Configuration**: Consistent code formatting and error detection
- **Input Validation**: Joi schemas for robust data validation
- **Error Handling**: Global error middleware with detailed logging
- **Security Scanning**: Regular dependency audits

### **Browser Support**
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🚢 Deployment

### **Production Deployment Options**

#### **Frontend Deployment**
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

#### **Backend Deployment**
- **Railway** (Recommended)
- **Render**
- **Heroku**
- **AWS EC2**
- **DigitalOcean**

#### **Database Hosting**
- **MongoDB Atlas** (Recommended)
- **AWS DocumentDB**
- **Self-hosted MongoDB**

### **Environment Configuration**
```bash
# Production environment variables
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
JWT_REFRESH_SECRET=your_production_refresh_secret
CLIENT_URL=https://your-frontend-domain.com
```

### **GitHub Actions CI/CD**
This repository now includes GitHub Actions workflows for:
- CI on every pull request and push to `main`
- Render deploy triggers after CI passes on `main`
- Backend and frontend unit tests run as part of CI

To enable deployments, add these repository secrets:
- `RENDER_BACKEND_DEPLOY_HOOK`
- `RENDER_FRONTEND_DEPLOY_HOOK`

If you prefer automatic deployment through Render's GitHub integration instead of deploy hooks, you can leave the deploy workflow in place and skip those secrets.

## 🤝 Contributing

We welcome contributions to ExpTracker! Here's how you can help:

### **Development Process**
1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Make** your changes with proper commit messages
5. **Test** your changes thoroughly
6. **Push** to your fork (`git push origin feature/amazing-feature`)
7. **Submit** a Pull Request with detailed description

### **Contribution Guidelines**
- Follow the existing code style and formatting
- Add comments for complex logic
- Update documentation for new features
- Ensure all tests pass
- Add tests for new functionality

### **Bug Reports**
When reporting bugs, please include:
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots or error messages
- Browser/environment information

### **Feature Requests**
For new features, please:
- Check if the feature already exists
- Provide detailed use case descriptions
- Include mockups or examples if applicable

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 ExpTracker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙋‍♂️ Support & Contact

### **Getting Help**
- 📖 **Documentation**: Check this README and inline code comments
- 🐛 **Issues**: Open an issue on GitHub for bugs or feature requests
- 💬 **Discussions**: Use GitHub Discussions for questions and ideas

### **Project Links**
- 🌐 **Repository**: [https://github.com/ShreyPan/expTracker](https://github.com/ShreyPan/expTracker)
- 📊 **Live Demo**: [Coming Soon]
- 📈 **Project Stats**: ![GitHub stars](https://img.shields.io/github/stars/ShreyPan/expTracker)

### **Developer**
- **GitHub**: [@ShreyPan](https://github.com/ShreyPan)
- **Project**: ExpTracker - Personal Finance Management System

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/ShreyPan/expTracker)
![GitHub language count](https://img.shields.io/github/languages/count/ShreyPan/expTracker)
![GitHub top language](https://img.shields.io/github/languages/top/ShreyPan/expTracker)
![GitHub last commit](https://img.shields.io/github/last-commit/ShreyPan/expTracker)

---

## 🏆 Features Showcase

### **Dashboard Analytics**
- Real-time financial overview with interactive charts
- Recent transactions with category-based filtering
- Income vs expense visualization
- Time-based analysis (30/60 days)

### **Security Implementation**
- JWT-based authentication with refresh tokens
- Input validation and sanitization
- Rate limiting and CORS protection
- Secure file upload handling

### **User Experience**
- Responsive design for all device sizes
- Toast notifications for user feedback
- Loading states and error handling
- Intuitive navigation and layout

### **Technical Excellence**
- Modern React with hooks and context
- RESTful API design with proper status codes
- MongoDB with optimized indexes
- Production-ready deployment configuration

---

**Built with ❤️ using modern web technologies for robust personal finance management.**
