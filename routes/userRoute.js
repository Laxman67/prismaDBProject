import { Router } from 'express';

const userRouter = Router();
import { createUser, deleteUser, fetchUsers, updateUser } from '../controller/UserConroller.js';


userRouter.get('/', fetchUsers);
userRouter.post('/create', createUser);
userRouter.put('/update/:id', updateUser);
userRouter.delete('/delete/:id', deleteUser);

export default userRouter;