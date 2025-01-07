// 
import express from 'express';
import {config} from 'dotenv';
import connectToDB from './connect.js';
import { currencyRouter } from './route/crypto.js';

config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/currencies', currencyRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);  
  res.status(500).json({ error: "Internal Server Error." });
});

connectToDB()
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err.message);
    process.exit(1); 
  });
