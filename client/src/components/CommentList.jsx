// components/CommentList.jsx - Comment list component for JBest Eyes blog

import React from 'react';

const CommentList = ({ comments }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center text-muted">
        <p>No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <div className="comment-author">
            {comment.author}
          </div>
          <div className="comment-content">
            {comment.content}
          </div>
          <div className="comment-date">
            {formatDate(comment.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;