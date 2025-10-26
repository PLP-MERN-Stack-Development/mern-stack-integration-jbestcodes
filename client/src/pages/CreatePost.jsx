// pages/CreatePost.jsx - Create post page for JBest Eyes blog

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService, categoryService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ImageUpload from '../components/ImageUpload';

const CreatePost = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // New category creation states
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#667eea'
  });
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    featuredImage: ''
  });

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const result = await categoryService.getAllCategories();
      setCategories(result.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) return;
    
    setCategoryLoading(true);
    setCategoryError(null);

    try {
      const result = await categoryService.createCategory(newCategory);
      
      // Add new category to the list
      setCategories(prev => [...prev, result.data]);
      
      // Select the new category automatically
      setFormData(prev => ({
        ...prev,
        category: result.data._id
      }));
      
      // Reset form and hide it
      setNewCategory({ name: '', description: '', color: '#667eea' });
      setShowCategoryForm(false);
      
    } catch (err) {
      setCategoryError(err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Failed to create category');
    } finally {
      setCategoryLoading(false);
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
    setLoading(true);
    setError(null);

    try {
      // Prepare form data
      const postData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      const result = await postService.createPost(postData);
      
      setSuccess(true);
      setTimeout(() => {
        navigate(`/posts/${result.data._id}`);
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="alert alert-success">
          <h3>🎉 Post Created Successfully!</h3>
          <p>Redirecting to your new post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="create-post">
      <div className="card">
        <div className="card-header">
          <h2>Share Your Story</h2>
          <p className="text-muted">
            Write about your daily adventures, business insights, coding experiences, or parenting moments
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
              <div className="flex gap-2">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                  style={{ flex: 1 }}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button 
                  type="button"
                  onClick={() => setShowCategoryForm(!showCategoryForm)}
                  className="btn btn-secondary btn-sm"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {showCategoryForm ? 'Cancel' : 'New Category'}
                </button>
              </div>
              
              {showCategoryForm && (
                <div className="mt-3 p-3" style={{ background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h5>Create New Category</h5>
                  <div className="grid grid-2 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Category name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                      className="form-input"
                      maxLength="50"
                    />
                    <input
                      type="color"
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                      className="form-input"
                      style={{ height: '45px' }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    className="form-input mb-2"
                    maxLength="200"
                  />
                  <button 
                    type="button"
                    onClick={handleCreateCategory}
                    className="btn btn-primary btn-sm"
                    disabled={!newCategory.name.trim() || categoryLoading}
                  >
                    {categoryLoading ? 'Creating...' : 'Create'}
                  </button>
                  {categoryError && (
                    <div className="text-red text-small mt-1">{categoryError}</div>
                  )}
                </div>
              )}
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
              <small className="text-muted">
                If left empty, will be auto-generated from content
              </small>
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
                placeholder="Tell your story... Share your experiences, insights, and thoughts"
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
                placeholder="daily-life, business, coding, parenting, photography"
              />
              <small className="text-muted">
                Separate tags with commas
              </small>
            </div>

            <div className="flex gap-2">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Publishing...' : 'Publish Post'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="btn btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {loading && <LoadingSpinner message="Publishing your post..." />}
    </div>
  );
};

export default CreatePost;