import React, { memo } from 'react';

// Loading Spinner
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center h-64" role="status" aria-label="Loading">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="sr-only">Loading...</span>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
