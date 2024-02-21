import {Router} from 'express';
import {createTask, deleteTask, getAllTasks, updateTask} from '../controller/task.controller.js';
import { protect } from '../middleware/auth.middlware.js';

const taskRouter = Router();


taskRouter
.post('/createTask',protect,createTask)
.patch('/updateTask/:taskId',protect,updateTask)
.patch('/deleteTask/:taskId',protect,deleteTask)
.get('/getTasks',protect,getAllTasks)


export default taskRouter;