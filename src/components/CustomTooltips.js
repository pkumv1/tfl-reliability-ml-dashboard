import React, { memo } from 'react';
import { getSignificanceColor, getCategoryColor, formatPercent } from './utils';

// Enhanced Tooltips
export const CoxTooltip = memo(({ active, payload }) => {
  if (!active || !payload?.length) return null;
  
  const data = payload[0].payload;
  return (
    <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
      <p className="font-semibold text-slate-900">{data.faultCode}</p>
      <p className="text-sm text-slate-600">Hazard Ratio: {data.expCoef?.toFixed(2)}</p>
      <p className="text-sm text-slate-600">Coefficient: {data.coef?.toFixed(3)}</p>
      <p className="text-sm text-slate-600">Z-value: {data.zValue?.toFixed(2)}</p>
      <p className="text-sm text-slate-600">
        95% CI: [{data.expCoefLower?.toFixed(2)}, {data.expCoefUpper?.toFixed(2)}]
      </p>
      <p className="text-sm font-medium" style={{ color: getSignificanceColor(data.significance) }}>
        {data.significance}
      </p>
    </div>
  );
});

export const FeatureTooltip = memo(({ active, payload }) => {
  if (!active || !payload?.length) return null;
  
  const data = payload[0].payload;
  return (
    <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
      <p className="font-semibold text-slate-900">{data.feature}</p>
      <p className="text-sm text-slate-600">Importance: {data.importance > 1 ? data.importance.toFixed(2) : formatPercent(data.importance)}</p>
      <p className="text-sm text-slate-600">Category: {data.category}</p>
      <p className="text-sm text-slate-600">Rank: #{data.rank}</p>
    </div>
  );
});

export const ModelTooltip = memo(({ active, payload }) => {
  if (!active || !payload?.length) return null;
  
  const data = payload[0].payload;
  return (
    <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
      <p className="font-semibold text-slate-900">{data.model}</p>
      <p className="text-sm text-slate-600">Accuracy: {formatPercent(data.accuracy)}</p>
      <p className="text-sm text-slate-600">ROC-AUC: {data.rocAuc?.toFixed(4)}</p>
      <p className="text-sm text-slate-600">F1-Score: {formatPercent(data.f1Score)}</p>
    </div>
  );
});

CoxTooltip.displayName = 'CoxTooltip';
FeatureTooltip.displayName = 'FeatureTooltip';
ModelTooltip.displayName = 'ModelTooltip';
