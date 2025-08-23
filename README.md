# ExpTracker - Expense Tracking Application

A full-stack expense tracking application built with React and Node.js.

## Features

- **User Authentication** - Secure signup and login functionality
- **Dashboard** - Comprehensive overview of finances
- **Expense Management** - Add, edit, and delete expenses
- **Income Management** - Track income sources
- **Visual Analytics** - Charts and graphs for financial insights
- **File Uploads** - Receipt and document management
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **Recharts** - Data visualization
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload handling
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
expTracker/
├── backend/                 # Server-side application
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── uploads/           # File uploads (gitignored)
│   ├── package.json       # Backend dependencies
│   └── server.js          # Entry point
├── frontend/Track/         # Client-side application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShreyPan/expTracker.git
   cd expTracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file with your configurations
   echo "MONGODB_URI=your_mongodb_connection_string" > .env
   echo "JWT_SECRET=your_jwt_secret" >> .env
   echo "PORT=5000" >> .env
   
   # Start the backend server
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/Track
   npm install
   
   # Start the development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Dashboard
- `GET /api/dashboard` - Get dashboard data

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Income
- `GET /api/income` - Get all income
- `POST /api/income` - Create new income
- `PUT /api/income/:id` - Update income
- `DELETE /api/income/:id` - Delete income

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/ShreyPan/expTracker](https://github.com/ShreyPan/expTracker)
