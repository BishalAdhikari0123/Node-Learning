// 
import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './connect.js';
import { currencyRouter } from './route/crypto.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware for logging requests (optional, for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/currencies', currencyRouter);

// Handle invalid routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error details
  res.status(500).json({ error: "Internal Server Error." });
});

// Connect to the database and start the server
connectToDB()
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err.message);
    process.exit(1); // Stops the server if DB connection fails
  });
