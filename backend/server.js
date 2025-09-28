require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Security middleware (disabled CSP for development)
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

// Rate limiting (relaxed for development)
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500, // limit each IP to 500 requests per windowMs
    message: {
        message: "Too many requests from this IP, please try again later."
    }
});

const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes  
    max: 100, // limit each IP to 100 auth requests per windowMs (much higher for development)
    message: {
        message: "Too many authentication attempts, please try again later."
    }
});

// Temporarily disable rate limiting for development
// app.use(limiter);

// CORS configuration - allows both development and production origins
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3000"
];

// Add CLIENT_URL from environment if it exists
if (process.env.CLIENT_URL) {
    allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 200
    })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

connectDB();

// Health check endpoint for deployment services
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'ExpTracker Backend API is running successfully!',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Temporarily disable auth rate limiting for development
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve static files with proper CORS headers
app.use("/uploads", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
}, cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:3000"],
    credentials: true
}), express.static(path.join(__dirname, "uploads")));

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));