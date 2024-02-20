import {Router} from 'express';
import { registerUser } from '../controller/user.controller.js';

const userRouter = Router();

// Register a new user
userRouter.post('/register', registerUser);

export default userRouter;