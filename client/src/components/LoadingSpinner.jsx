// components/LoadingSpinner.jsx - Loading spinner component for JBest Eyes blog

import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p className="text-muted mt-2">{message}</p>
    </div>
  );
};

export default LoadingSpinner;