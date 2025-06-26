// File: src/index.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mainRouter from './routes/index.js'; // Jalur ini sudah benar sekarang

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', mainRouter);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
}); 