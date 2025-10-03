import express from 'express';
import {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessageStatus,
  deleteMessage,
} from '../controllers/messagesController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, isAdmin, getAllMessages);
router.get('/:id', authenticateToken, isAdmin, getMessageById);
router.post('/', createMessage);
router.patch('/:id/status', authenticateToken, isAdmin, updateMessageStatus);
router.delete('/:id', authenticateToken, isAdmin, deleteMessage);

export default router;
