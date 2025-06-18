import React, { memo } from 'react';
import { XCircle, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

// Station Health Status Component
const StationHealthStatus = memo(({ station }) => {
  const getStatusColor = (riskScore) => {
    if (riskScore >= 0.7) return 'text-red-600 bg-red-50';
    if (riskScore >= 0.5) return 'text-orange-600 bg-orange-50';
    if (riskScore >= 0.3) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusIcon = (riskScore) => {
    if (riskScore >= 0.7) return XCircle;
    if (riskScore >= 0.5) return AlertCircle;
    if (riskScore >= 0.3) return AlertTriangle;
    return CheckCircle;
  };

  const StatusIcon = getStatusIcon(station.riskScore);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-slate-900">{station.name}</h4>
          <p className="text-sm text-slate-600">{station.id}</p>
        </div>
        <div className={`p-2 rounded-lg ${getStatusColor(station.riskScore)}`}>
          <StatusIcon className="h-5 w-5" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Risk Score:</span>
          <span className={`font-medium ${getStatusColor(station.riskScore).split(' ')[0]}`}>
            {(station.riskScore * 100).toFixed(1)}%
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Devices:</span>
          <span className="font-medium text-slate-900">{station.devices}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Critical Issues:</span>
          <span className="font-medium text-red-600">{station.critical}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">MTBF:</span>
          <span className="font-medium text-slate-900">{station.mtbf.toFixed(1)}h</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Network Health:</span>
          <span className="font-medium text-blue-600">{station.networkHealth}%</span>
        </div>
      </div>
    </div>
  );
});

StationHealthStatus.displayName = 'StationHealthStatus';

export default StationHealthStatus;
