// pages/EditPost.jsx - Edit post page for JBest Eyes blog

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService, categoryService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ImageUpload from '../components/ImageUpload';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    featuredImage: ''
  });

  useEffect(() => {
    fetchCategories();
    fetchPost();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const result = await categoryService.getAllCategories();
      setCategories(result.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchPost = async () => {
    try {
      setLoading(true);
      const result = await postService.getPost(id);
      const post = result.data;
      
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        category: post.category._id || '',
        tags: post.tags ? post.tags.join(', ') : '',
        featuredImage: post.featuredImage || ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const postData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      await postService.updatePost(id, postData);
      
      setSuccess(true);
      setTimeout(() => {
        navigate(`/posts/${id}`);
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading post..." />;
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="alert alert-success">
          <h3>✅ Post Updated Successfully!</h3>
          <p>Redirecting to your updated post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-post">
      <div className="card">
        <div className="card-header">
          <h2>Edit Your Story</h2>
          <p className="text-muted">
            Update your post with new insights or corrections
          </p>
        </div>
        
        <div className="card-body">
          {error && (
            <div className="alert alert-error mb-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="What's your story about?"
                required
                maxLength="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="excerpt" className="form-label">Excerpt</label>
              <input
                type="text"
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Brief description of your post (optional)"
                maxLength="200"
              />
            </div>

            <div className="form-group">
              <ImageUpload 
                onImageUploaded={(imageUrl) => setFormData(prev => ({ ...prev, featuredImage: imageUrl }))}
                currentImage={formData.featuredImage}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">Content *</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Tell your story..."
                required
                rows="10"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tags" className="form-label">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="form-input"
                placeholder="daily-life, business, coding, parenting"
              />
              <small className="text-muted">
                Separate tags with commas
              </small>
            </div>

            <div className="flex gap-2">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? 'Updating...' : 'Update Post'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate(`/posts/${id}`)}
                className="btn btn-secondary"
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {saving && <LoadingSpinner message="Updating your post..." />}
    </div>
  );
};

export default EditPost;