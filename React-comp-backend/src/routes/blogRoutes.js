import express from 'express';
import { createPost, deletePosts, getAllPost, updatePosts } from '../controllers/blogController.js';


const router = express.Router();

router.get('/posts', getAllPost);
router.post('/posts', createPost);
router.put("/posts/:id", updatePosts);
router.delete("/posts/:id", deletePosts);


export default router;