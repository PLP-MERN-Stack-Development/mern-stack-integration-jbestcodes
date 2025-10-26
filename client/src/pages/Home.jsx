// pages/Home.jsx - Home page component for JBest Eyes blog

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService, categoryService } from '../services/api';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  // Fetch initial data
  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  // Fetch posts when filters change
  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, searchTerm, currentPage]);

  const fetchCategories = async () => {
    try {
      const result = await categoryService.getAllCategories();
      setCategories(result.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await postService.getAllPosts(
        currentPage, 
        6, 
        selectedCategory || null, 
        searchTerm || null
      );
      setPosts(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts();
  };

  if (loading && posts.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home">
      {/* Welcome Section */}
      <section className="welcome-section mb-4">
        <div className="card">
          <div className="card-body text-center">
            <h2>Welcome to JBest Eyes</h2>
            <p className="text-muted">
              Join me on my journey through daily life adventures, business explorations, 
              coding challenges, and the beautiful chaos of parenting. Here you'll find 
              authentic stories, nature photography, and insights from my ever-evolving perspective.
            </p>
            <Link to="/create" className="btn btn-primary">
              Share Your Story
            </Link>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section mb-4">
        <div className="card">
          <div className="card-body">
            <div className="flex-between mb-3">
              <h3>Latest Posts</h3>
              <div className="flex gap-2">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="form-select"
                  style={{ minWidth: '150px' }}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ maxWidth: '300px' }}
              />
              <button type="submit" className="btn btn-secondary">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-4">
          {error}
        </div>
      )}

      {/* Posts Grid */}
      <section className="posts-section">
        {posts.length === 0 && !loading ? (
          <div className="card">
            <div className="card-body text-center">
              <h3>No posts found</h3>
              <p className="text-muted">
                {searchTerm || selectedCategory 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Be the first to share a story!'}
              </p>
              <Link to="/create" className="btn btn-primary">
                Create First Post
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-2">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="pagination mt-4 text-center">
                <div className="flex-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn btn-secondary btn-sm"
                  >
                    Previous
                  </button>
                  
                  <span className="text-muted">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
                    disabled={currentPage === pagination.pages}
                    className="btn btn-secondary btn-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {loading && posts.length > 0 && (
        <div className="text-center mt-4">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default Home;