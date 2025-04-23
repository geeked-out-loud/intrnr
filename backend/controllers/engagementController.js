// intrnr/backend/controllers/engagementController.js
const { getDb } = require('../config/db');

const getEngagement = async (req, res) => {
  try {
    const { post_id } = req.query;

    if (!post_id) {
      return res.status(400).json({ error: 'post_id is required' });
    }

    const db = getDb();
    const engagement = await db.collection('engagement').findOne({ post_id });

    if (!engagement) {
      return res.status(200).json({ post_id, likes: 0, dislikes: 0, liked_by: [] });
    }

    res.status(200).json(engagement);
  } catch (error) {
    console.error('Error fetching engagement:', error);
    res.status(500).json({ error: 'Failed to fetch engagement' });
  }
};

const updateEngagement = async (req, res) => {
  try {
    const { post_id, action, public_key } = req.body;

    if (!post_id || !action || !public_key) {
      return res.status(400).json({ error: 'post_id, action, and public_key are required' });
    }

    const db = getDb();
    const collection = db.collection('engagement');

    let engagement = await collection.findOne({ post_id });

    if (!engagement) {
      engagement = {
        post_id,
        likes: 0,
        dislikes: 0,
        liked_by: []
      };
      await collection.insertOne(engagement);
    }

    if (action === 'like') {
      if (!engagement.liked_by.includes(public_key)) {
        engagement.likes += 1;
        engagement.liked_by.push(public_key);
      }
    } else if (action === 'dislike') {
      engagement.dislikes += 1;
    } else {
      return res.status(400).json({ error: 'Invalid action. Use "like" or "dislike"' });
    }

    await collection.updateOne(
      { post_id },
      {
        $set: {
          likes: engagement.likes,
          dislikes: engagement.dislikes,
          liked_by: engagement.liked_by
        }
      }
    );

    res.status(200).json({ message: 'Engagement updated', engagement });
  } catch (error) {
    console.error('Error updating engagement:', error);
    res.status(500).json({ error: 'Failed to update engagement' });
  }
};

module.exports = {
  getEngagement,
  updateEngagement,
};
