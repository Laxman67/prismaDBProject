import express from 'express';
import { configDotenv } from 'dotenv';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';
import commentsRouter from './routes/commentsRoute.js';

configDotenv();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.status(201).json({
    success: true, message: "All Ok"
  });
});

// User Router
app.use('/api/user', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentsRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

});