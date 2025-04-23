// intrnr/backend/controllers/commentController.js
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../config/db');

const getComments = async (req, res) => {
  try {
    const { post_id } = req.query;
    if (!post_id) {
      return res.status(400).json({ error: 'post_id is required' });
    }
    const db = getDb();
    const comments = await db.collection('comments').find({ post_id }).sort({ created_at: -1 }).toArray();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

const createComment = async (req, res) => {
  try {
    const { post_id, public_key, content } = req.body;
    if (!post_id || !public_key || !content) {
      return res.status(400).json({ error: 'post_id, public_key, and content are required' });
    }
    const newComment = {
      comment_id: uuidv4(),
      post_id,
      public_key,
      content,
      created_at: new Date(),
      likes: 0,
      dislikes: 0,
      liked_by: [],
    };
    const db = getDb();
    await db.collection('comments').insertOne(newComment);
    res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

module.exports = {
  getComments,
  createComment,
};
