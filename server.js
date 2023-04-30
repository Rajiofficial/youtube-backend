import express from 'express';
import cors from 'cors';
import connect from './db/connectDb.js';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';

// web server
const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://kavyatube.netlify.app'],
    credentials: true,
  })
);

// dotenv environment setup
dotenv.config();

// middlewares

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
    stack: err.stack,
  });
});

let port = process.env.PORT || 4006;

app.listen(port, async () => {
  console.log(`The App is running on the port ${port}`);
  // connect to the database
  await connect();
});
