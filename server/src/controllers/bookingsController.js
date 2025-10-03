import { query } from '../config/database.js';
import { sendBookingConfirmation } from '../utils/email.js';

export const getAllBookings = async (req, res) => {
  try {
    const result = await query('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json({ bookings: result.rows });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM bookings WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ booking: result.rows[0] });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { guest_name, guest_email, guest_phone, check_in, check_out, room_id, guests, message } = req.body;

    const result = await query(
      'INSERT INTO bookings (guest_name, guest_email, guest_phone, check_in, check_out, room_id, guests, message) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [guest_name, guest_email, guest_phone, check_in, check_out, room_id, guests, message]
    );

    const booking = result.rows[0];

    // Send confirmation email (don't block the response on email failure)
    sendBookingConfirmation(booking).catch(emailError => {
      console.error('Failed to send booking confirmation email:', emailError);
      // Email failure shouldn't break the booking creation
    });

    res.status(201).json({ booking });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await query(
      'UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ booking: result.rows[0] });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};
