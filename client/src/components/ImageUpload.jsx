// components/ImageUpload.jsx - Image upload component for JBest Eyes blog

import React, { useState } from 'react';
import api from '../services/api';

const ImageUpload = ({ onImageUploaded, currentImage = null }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(currentImage);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Upload file
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        onImageUploaded(response.data.data.url);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload image');
      setPreview(currentImage);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUploaded('');
  };

  return (
    <div className="image-upload">
      <label className="form-label">Featured Image</label>
      
      {preview ? (
        <div className="image-preview mb-3">
          <img 
            src={preview} 
            alt="Preview" 
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}
          />
          <div className="mt-2">
            <button 
              type="button"
              onClick={removeImage}
              className="btn btn-danger btn-sm"
            >
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="upload-area mb-3"
          style={{
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#f9fafb'
          }}
        >
          <div className="upload-icon mb-2">
            📸
          </div>
          <p className="text-muted">
            Upload your nature photo or any image for your post
          </p>
        </div>
      )}

      <div className="file-input-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-input"
          disabled={uploading}
        />
        <small className="text-muted">
          Supported formats: JPG, PNG, GIF (max 5MB)
        </small>
      </div>

      {uploading && (
        <div className="mt-2 text-center">
          <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
          <span className="text-muted ml-2">Uploading...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error mt-2" style={{ padding: '0.5rem' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;