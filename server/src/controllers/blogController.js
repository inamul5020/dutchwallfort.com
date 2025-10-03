import { query } from '../config/database.js';

export const getAllPosts = async (req, res) => {
  try {
    const { status } = req.query;
    let queryText = 'SELECT * FROM blog_posts';
    const params = [];

    if (status && !req.user) {
      queryText += ' WHERE status = $1';
      params.push(status);
    }

    queryText += ' ORDER BY created_at DESC';

    const result = await query(queryText, params);
    res.json({ posts: result.rows });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM blog_posts WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post: result.rows[0] });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, excerpt, featured_image, status } = req.body;

    const result = await query(
      'INSERT INTO blog_posts (title, content, excerpt, featured_image, status, author_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, content, excerpt, featured_image, status || 'draft', req.user.id]
    );

    res.status(201).json({ post: result.rows[0] });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, featured_image, status } = req.body;

    const result = await query(
      'UPDATE blog_posts SET title = $1, content = $2, excerpt = $3, featured_image = $4, status = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [title, content, excerpt, featured_image, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post: result.rows[0] });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
