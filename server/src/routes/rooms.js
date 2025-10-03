import express from 'express';
import {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/roomsController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', authenticateToken, isAdmin, createRoom);
router.put('/:id', authenticateToken, isAdmin, updateRoom);
router.delete('/:id', authenticateToken, isAdmin, deleteRoom);

export default router;
