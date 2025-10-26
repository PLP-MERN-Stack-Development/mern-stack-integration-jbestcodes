// Category.js - Mongoose model for JBest Eyes blog categories

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      trim: true,
      unique: true,
      maxlength: [50, 'Category name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    color: {
      type: String,
      default: '#3B82F6', // Default blue color
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color']
    },
    postCount: {
      type: Number,
      default: 0
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual to get posts in this category
CategorySchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'category'
});

// Method to increment post count
CategorySchema.methods.incrementPostCount = function() {
  this.postCount += 1;
  return this.save();
};

// Method to decrement post count
CategorySchema.methods.decrementPostCount = function() {
  if (this.postCount > 0) {
    this.postCount -= 1;
  }
  return this.save();
};

module.exports = mongoose.model('Category', CategorySchema);