// Environment configuration for different deployment stages
const config = {
    development: {
        API_BASE_URL: "http://localhost:8001",
    },
    production: {
        API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://exptracker-backend-91h0.onrender.com",
    }
};

const environment = import.meta.env.MODE || 'development';
export const API_CONFIG = config[environment];

export default API_CONFIG;