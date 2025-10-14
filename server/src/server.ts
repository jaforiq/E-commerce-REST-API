import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes';
import { swaggerSpec } from './utils/swagger';
import productRoutes from './routes/productRoutes';
import { connectDatabase } from './config/database';
import employeeRoutes from './routes/employeeRoutes';
import express, { Application, Request, Response } from 'express';

dotenv.config();
//console.log('swagger paths:', Object.keys(swaggerSpec.paths));
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: "*",
    credentials: true,
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});


// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/products', productRoutes);



app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`,
  });
});


// Start server
const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`                                                       
        Server is running on port ${PORT}                  
        API Docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// process.on('unhandledRejection', (err: Error) => {
//   console.error('UNHANDLED REJECTION! 💥 Shutting down...');
//   console.error(err.name, err.message);
//   process.exit(1);
// });

// process.on('uncaughtException', (err: Error) => {
//   console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.error(err.name, err.message);
//   process.exit(1);
// });

startServer();