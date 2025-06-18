import { SIGNIFICANCE_COLORS, CATEGORY_COLORS, CLUSTER_COLORS, MODEL_COLORS } from './constants';

// Utility functions
export const formatNumber = (num) => num?.toLocaleString() || '0';
export const formatPercent = (num) => `${((num || 0) * 100).toFixed(1)}%`;
export const getSignificanceColor = (significance) => SIGNIFICANCE_COLORS[significance] || '#6b7280';
export const getCategoryColor = (category) => CATEGORY_COLORS[category] || '#6b7280';
export const getClusterColor = (cluster) => CLUSTER_COLORS[cluster] || '#6b7280';
export const getModelColor = (model) => MODEL_COLORS[model] || '#6b7280';
