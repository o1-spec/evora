import * as dotenv from 'dotenv';
// Load environment variables first
dotenv.config();

import app from './app';
import { prisma } from './services/db.service';

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to PostgreSQL database!');

    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 Evora AI-Powered French Learning Platform Running`);
      console.log(`📡 Backend URL: http://localhost:${PORT}`);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error('Fatal: Failed to connect to database during startup:', error);
    process.exit(1);
  }
}

startServer();
