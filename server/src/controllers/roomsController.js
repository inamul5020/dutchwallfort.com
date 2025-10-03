import { query } from '../config/database.js';

export const getAllRooms = async (req, res) => {
  try {
    const result = await query('SELECT * FROM rooms ORDER BY created_at DESC');
    res.json({ rooms: result.rows });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM rooms WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ room: result.rows[0] });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
};

export const createRoom = async (req, res) => {
  try {
    const { name, description, price, capacity, amenities, images } = req.body;

    const result = await query(
      'INSERT INTO rooms (name, description, price, capacity, amenities, images) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, capacity, JSON.stringify(amenities || []), JSON.stringify(images || [])]
    );

    res.status(201).json({ room: result.rows[0] });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, capacity, amenities, images } = req.body;

    const result = await query(
      'UPDATE rooms SET name = $1, description = $2, price = $3, capacity = $4, amenities = $5, images = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [name, description, price, capacity, JSON.stringify(amenities || []), JSON.stringify(images || []), id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ room: result.rows[0] });
  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({ error: 'Failed to update room' });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM rooms WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ error: 'Failed to delete room' });
  }
};
