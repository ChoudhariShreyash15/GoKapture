import { Router } from 'express';
import { createTask } from '../controllers/task.controller.js';
import { verifyUser } from '../middleware/user.middleware.js';

const taskRouter = Router();

taskRouter.post('/', createTask);

export default taskRouter;