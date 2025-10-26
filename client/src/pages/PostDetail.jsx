// pages/PostDetail.jsx - Post detail page with comments for JBest Eyes blog

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await postService.getPost(id);
      setPost(result.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentAdded = (updatedPost) => {
    setPost(updatedPost.data);
    setShowCommentForm(false);
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(id);
        navigate('/');
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <LoadingSpinner message="Loading post..." />;
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="alert alert-error">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center">
        <div className="card">
          <div className="card-body">
            <h3>Post not found</h3>
            <p className="text-muted">The post you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="post-detail">
      {/* Post Header */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="post-meta mb-3">
            <div className="flex-between">
              <div className="flex gap-2">
                {post.category && (
                  <span 
                    className="category-badge"
                    style={{ 
                      backgroundColor: post.category.color || '#667eea' 
                    }}
                  >
                    {post.category.name}
                  </span>
                )}
                <span className="text-small text-muted">
                  Published on {formatDate(post.createdAt)}
                </span>
              </div>
              <div className="post-actions flex gap-2">
                <Link 
                  to={`/edit/${post._id}`} 
                  className="btn btn-secondary btn-sm"
                >
                  Edit
                </Link>
                <button 
                  onClick={handleDeletePost}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <h1 className="post-title mb-3">{post.title}</h1>
          
          <div className="post-stats flex gap-4 text-small text-muted mb-3">
            <span>👁 {post.viewCount || 0} views</span>
            <span>💬 {post.comments?.length || 0} comments</span>
            {post.updatedAt !== post.createdAt && (
              <span>✏️ Updated {formatDate(post.updatedAt)}</span>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="post-tags mb-3">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="tag"
                  style={{
                    background: '#f1f5f9',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.875rem',
                    marginRight: '0.5rem',
                    marginBottom: '0.5rem',
                    display: 'inline-block'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="card mb-4">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            style={{
              width: '100%',
              maxHeight: '500px',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
        </div>
      )}

      {/* Post Content */}
      <div className="card mb-4">
        <div className="card-body">
          <div 
            className="post-content"
            style={{
              lineHeight: '1.8',
              fontSize: '1.1rem',
              whiteSpace: 'pre-wrap'
            }}
          >
            {post.content}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="card">
        <div className="card-header">
          <div className="flex-between">
            <h3>Comments ({post.comments?.length || 0})</h3>
            <button 
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="btn btn-primary btn-sm"
            >
              {showCommentForm ? 'Cancel' : 'Add Comment'}
            </button>
          </div>
        </div>
        
        <div className="card-body">
          {showCommentForm && (
            <div className="mb-4">
              <CommentForm 
                postId={post._id} 
                onCommentAdded={handleCommentAdded}
                onCancel={() => setShowCommentForm(false)}
              />
            </div>
          )}

          <CommentList comments={post.comments || []} />
        </div>
      </div>

      {/* Navigation */}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-secondary">
          ← Back to All Posts
        </Link>
      </div>
    </article>
  );
};

export default PostDetail;