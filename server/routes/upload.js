// routes/upload.js - Upload routes for JBest Eyes blog

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// @desc    Upload image
// @route   POST /api/upload/image
// @access  Public (simplified for assignment)
const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    // Return the file URL
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.status(200).json({
      success: true,
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: fileUrl
      }
    });
  } catch (error) {
    next(error);
  }
};

// Upload route with multer middleware
router.post('/image', upload.single('image'), uploadImage);

module.exports = router;