import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {connectDB} from './config/db.js';
import chalk from 'chalk';
import {notFound , errorHandler} from './middleware/error.middleware.js';
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/task.routes.js';
import subTaskRouter from './routes/subtask.routes.js';

const app = express();

//middleware
app.use(express.json());
app.use(errorHandler);

//routes
app.get('/', (req, res) => {
  res.send('task manager app');
});

// app.use('/api/v1/tasks', tasks);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/task',taskRouter);
app.use('/api/v1/subTask',subTaskRouter);
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(chalk.bold.green(`Server started on port ${port}`));
    });
  } catch (error) {
    console.log(chalk.italic.red(error));
  }
};

start();