// pages/Categories.jsx - Categories management page for JBest Eyes blog

import React, { useState, useEffect } from 'react';
import { categoryService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#667eea'
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await categoryService.getAllCategories();
      setCategories(result.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch categories');
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
    setFormLoading(true);
    setFormError(null);

    try {
      await categoryService.createCategory(formData);
      setFormData({ name: '', description: '', color: '#667eea' });
      setShowForm(false);
      await fetchCategories();
    } catch (err) {
      setFormError(err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Failed to create category');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.deleteCategory(id);
        await fetchCategories();
      } catch (err) {
        alert(err.response?.data?.error || 'Failed to delete category');
      }
    }
  };

  const predefinedCategories = [
    { name: 'Daily Life', description: 'Everyday experiences and moments', color: '#48bb78' },
    { name: 'Business Adventures', description: 'Entrepreneurial journeys and insights', color: '#ed8936' },
    { name: 'Coding Journey', description: 'Programming experiences and learning', color: '#667eea' },
    { name: 'Parenting Moments', description: 'Experiences raising children', color: '#f56565' },
    { name: 'Nature Photography', description: 'Photos and stories from nature', color: '#38b2ac' },
    { name: 'Personal Growth', description: 'Self-improvement and reflection', color: '#9f7aea' }
  ];

  const createPredefinedCategories = async () => {
    setFormLoading(true);
    try {
      for (const category of predefinedCategories) {
        try {
          await categoryService.createCategory(category);
        } catch (err) {
          
          console.log(`Category ${category.name} might already exist`);
        }
      }
      await fetchCategories();
    } catch (err) {
      setFormError('Failed to create some categories');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading categories..." />;
  }

  return (
    <div className="categories-page">
      <div className="card mb-4">
        <div className="card-header">
          <div className="flex-between">
            <div>
              <h2>Blog Categories</h2>
              <p className="text-muted">Organize your stories by topic</p>
            </div>
            <div className="flex gap-2">
              {categories.length === 0 && (
                <button 
                  onClick={createPredefinedCategories}
                  className="btn btn-success btn-sm"
                  disabled={formLoading}
                >
                  Setup Default Categories
                </button>
              )}
              <button 
                onClick={() => setShowForm(!showForm)}
                className="btn btn-primary btn-sm"
              >
                {showForm ? 'Cancel' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="card-body" style={{ borderTop: '1px solid #e2e8f0' }}>
            <h4 className="mb-3">Create New Category</h4>
            
            {formError && (
              <div className="alert alert-error mb-3">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-2 gap-3">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Category Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., Daily Life"
                    required
                    maxLength="50"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="color" className="form-label">Color</label>
                  <input
                    type="color"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="form-input"
                    style={{ height: '45px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Brief description of this category"
                  maxLength="200"
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={formLoading}
              >
                {formLoading ? 'Creating...' : 'Create Category'}
              </button>
            </form>
          </div>
        )}
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          {error}
        </div>
      )}

      {categories.length === 0 && !loading ? (
        <div className="card">
          <div className="card-body text-center">
            <h3>No categories yet</h3>
            <p className="text-muted mb-3">
              Create categories to organize your blog posts by topic
            </p>
            <button 
              onClick={createPredefinedCategories}
              className="btn btn-success"
              disabled={formLoading}
            >
              Setup Default Categories
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-3">
          {categories.map((category) => (
            <div key={category._id} className="card">
              <div className="card-body">
                <div className="flex-between mb-2">
                  <span 
                    className="category-badge"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.name}
                  </span>
                  <button 
                    onClick={() => handleDeleteCategory(category._id)}
                    className="btn btn-danger btn-sm"
                    title="Delete category"
                  >
                    ×
                  </button>
                </div>
                
                {category.description && (
                  <p className="text-muted text-small mb-2">
                    {category.description}
                  </p>
                )}
                
                <div className="text-small text-muted">
                  {category.postCount || 0} posts
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {formLoading && <LoadingSpinner message="Processing..." />}
    </div>
  );
};

export default Categories;