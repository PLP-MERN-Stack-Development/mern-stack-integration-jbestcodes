// routes/posts.js - Routes for JBest Eyes blog posts

const express = require('express');
const router = express.Router();

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment
} = require('../controllers/postController');

const { validatePost, validateComment } = require('../middleware/validation');

// Routes
router.route('/')
  .get(getPosts)
  .post(validatePost, createPost);

router.route('/:id')
  .get(getPost)
  .put(validatePost, updatePost)
  .delete(deletePost);

router.route('/:id/comments')
  .post(validateComment, addComment);

module.exports = router;