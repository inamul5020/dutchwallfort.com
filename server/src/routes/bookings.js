import express from 'express';
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/bookingsController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, isAdmin, getAllBookings);
router.get('/:id', authenticateToken, isAdmin, getBookingById);
router.post('/', createBooking);
router.patch('/:id/status', authenticateToken, isAdmin, updateBookingStatus);
router.delete('/:id', authenticateToken, isAdmin, deleteBooking);

export default router;
