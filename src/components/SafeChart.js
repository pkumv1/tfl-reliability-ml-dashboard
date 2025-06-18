import React, { memo } from 'react';
import { AlertTriangle } from 'lucide-react';

// Safe Chart Wrapper
const SafeChart = memo(({ children, fallback = null, title }) => {
  try {
    return (
      <div role="img" aria-label={title ? `Chart: ${title}` : "Data visualization"}>
        {children}
      </div>
    );
  } catch (error) {
    console.error('Chart rendering error:', error);
    return fallback || (
      <div className="flex items-center justify-center h-64 text-slate-500" role="alert">
        <AlertTriangle className="h-8 w-8 mr-2" />
        <span>Chart temporarily unavailable</span>
      </div>
    );
  }
});

SafeChart.displayName = 'SafeChart';

export default SafeChart;
