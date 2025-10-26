// components/PostCard.jsx - Post card component for JBest Eyes blog

import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <article className="card">
      {post.featuredImage && (
        <div className="post-image">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover'
            }}
          />
        </div>
      )}
      
      <div className="card-body">
        <div className="post-meta mb-2">
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
        </div>
        
        <h3 className="post-title mb-2">
          <Link 
            to={`/posts/${post._id}`}
            style={{ 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'block'
            }}
          >
            {post.title}
          </Link>
        </h3>
        
        <p className="post-excerpt text-muted mb-3">
          {post.excerpt || truncateContent(post.content)}
        </p>
        
        <div className="post-stats flex-between text-small text-muted">
          <span>{formatDate(post.createdAt)}</span>
          <div className="flex gap-3">
            <span>👁 {post.viewCount || 0} views</span>
            <span>💬 {post.comments?.length || 0} comments</span>
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        <div className="flex-between">
          <Link 
            to={`/posts/${post._id}`} 
            className="btn btn-primary btn-sm"
          >
            Read More
          </Link>
          <div className="post-tags">
            {post.tags && post.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="tag"
                style={{
                  background: '#f1f5f9',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  marginLeft: '0.25rem'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;