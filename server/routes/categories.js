// routes/categories.js - Routes for JBest Eyes blog categories

const express = require('express');
const router = express.Router();

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const { validateCategory } = require('../middleware/validation');

// Routes
router.route('/')
  .get(getCategories)
  .post(validateCategory, createCategory);

router.route('/:id')
  .get(getCategory)
  .put(validateCategory, updateCategory)
  .delete(deleteCategory);

module.exports = router;