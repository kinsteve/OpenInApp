import {Router} from 'express';
import { protect } from '../middleware/auth.middlware.js';
import { createSubTask, deleteSubTask, getSubTasks, updateSubTask } from '../controller/subtask.controller.js';

const subTaskRouter = Router();


subTaskRouter
.post('/createSubTask',protect,createSubTask)
.patch('/updateSubTask/:subTaskId',protect , updateSubTask)
.patch('/deleteSubTask/:subTaskId',protect,deleteSubTask)
.get('/getSubTasks', protect , getSubTasks)

export default subTaskRouter;