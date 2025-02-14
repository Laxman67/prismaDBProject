import { Router } from 'express';
import { createComment, fetchComments, showComment } from '../controller/CommentController.js';



const commentsRouter = Router();


commentsRouter.get('/', fetchComments);
commentsRouter.get('/get/:id', showComment);
commentsRouter.post('/create', createComment);
// commentsRouter.delete('/delete/:id', deletePost);

export default commentsRouter;