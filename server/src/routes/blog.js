import express from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/blogController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', authenticateToken, isAdmin, createPost);
router.put('/:id', authenticateToken, isAdmin, updatePost);
router.delete('/:id', authenticateToken, isAdmin, deletePost);

export default router;
