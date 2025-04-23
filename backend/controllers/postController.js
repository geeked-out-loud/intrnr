// intrnr/backend/controllers/postController.js
const { getDB } = require('../config/db');

exports.getPosts = async (req, res) => {
  console.log("GET /post hit");
  try {
    const db = getDB();
    const { search } = req.query;
    let query = {};
    if (search) {
      // Use regular expressions to search in the title or content fields (case-insensitive)
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } }
        ]
      };
    }
    const posts = await db.collection("posts").find(query).toArray();
    console.log("Posts from DB:", posts.length);
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts from DB:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const db = getDB();
    const newPost = {
      ...req.body,
      created_at: new Date(),
      updated_at: new Date(),
    };
    await db.collection("posts").insertOne(newPost);
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
};
