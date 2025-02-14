import { Router } from 'express';
import { createPost, deletePost, fetchPosts } from '../controller/PostConroller.js';

const postRouter = Router();


postRouter.get('/', fetchPosts);
postRouter.post('/create', createPost);
// postRouter.put('/update/:id', updatePost);
postRouter.delete('/delete/:id', deletePost);

export default postRouter;