import { query } from '../config/database.js';

export const getAllServices = async (req, res) => {
  try {
    const result = await query('SELECT * FROM services ORDER BY created_at DESC');
    res.json({ services: result.rows });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM services WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ service: result.rows[0] });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
};

export const createService = async (req, res) => {
  try {
    const { name, description, price, duration, type } = req.body;

    const result = await query(
      'INSERT INTO services (name, description, price, duration, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, duration, type]
    );

    res.status(201).json({ service: result.rows[0] });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration, type } = req.body;

    const result = await query(
      'UPDATE services SET name = $1, description = $2, price = $3, duration = $4, type = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [name, description, price, duration, type, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ service: result.rows[0] });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
};
