// components/CommentForm.jsx - Comment form component for JBest Eyes blog

import React, { useState } from 'react';
import { postService } from '../services/api';

const CommentForm = ({ postId, onCommentAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    author: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await postService.addComment(postId, formData);
      onCommentAdded(result);
      setFormData({ author: '', content: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-form">
      <h4 className="mb-3">Add a Comment</h4>
      
      {error && (
        <div className="alert alert-error mb-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="author" className="form-label">Your Name *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your name"
            required
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">Comment *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="form-textarea"
            placeholder="Share your thoughts..."
            required
            maxLength="500"
            rows="4"
          />
          <small className="text-muted">
            {formData.content.length}/500 characters
          </small>
        </div>

        <div className="flex gap-2">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;