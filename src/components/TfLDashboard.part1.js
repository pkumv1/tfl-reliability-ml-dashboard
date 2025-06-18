// Part 1 of TfLDashboard.js - This file will be combined later
// Contains: Imports, Constants, Mock Data, Utility Functions, Error Boundary, Loading Spinner, Safe Chart Wrapper, Tooltips, Station Health Status, Overview Tab, Real-time Tab, ML Analytics Tab

import React, { useState, useEffect, useMemo, useCallback, memo, Suspense } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, AreaChart, Area, ComposedChart, ReferenceLine, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Treemap } from 'recharts';
import { AlertTriangle, Activity, MapPin, TrendingUp, Clock, Zap, Thermometer, Download, Target, Layers, BarChart3, Brain, Shield, Radio, Wifi, Server, Globe, Network, Timer, RefreshCw, GitBranch, Share2, Calendar, Gauge, Cpu, Database, TrendingDown, Award, Crosshair, Bell, Users, Settings, AlertCircle, CheckCircle, XCircle, Wrench, Map, Battery, Signal, Monitor, Maximize2, Info, FileText, Lightbulb, Clipboard } from 'lucide-react';

// Constants
const FAULT_TYPE_COLORS = {
  'Infant Mortality': '#dc2626',
  'Wear-out': '#ea580c',
  'Early-life': '#eab308',
  'Protective': '#22c55e',
  'Normal Operation': '#3b82f6'
};

const SIGNIFICANCE_COLORS = {
  'Critical': '#dc2626',
  'High': '#ea580c',
  'Medium': '#eab308',
  'Protective': '#22c55e'
};

const CATEGORY_COLORS = {
  'Operational': '#dc2626',
  'Performance': '#ea580c',
  'Hardware': '#3b82f6',
  'Service': '#22c55e',
  'Configuration': '#8b5cf6',
  'Payment': '#f97316',
  'Environmental': '#06b6d4'
};

const CLUSTER_COLORS = {
  'High-Volume': '#dc2626',
  'Critical': '#ea580c',
  'Stable': '#22c55e',
  'Efficient': '#3b82f6',
  'Moderate': '#8b5cf6'
};

const MODEL_COLORS = {
  'Logistic Regression': '#ef4444',
  'Random Forest': '#22c55e',
  'XGBoost': '#3b82f6',
  'CatBoost': '#8b5cf6',
  'KNN': '#f97316',
  'ANN': '#06b6d4'
};

// Enhanced tab configuration
const ENHANCED_TABS = [
  { id: 'overview', label: 'System Overview', icon: BarChart3 },
  { id: 'realtime', label: 'Real-time Monitor', icon: Radio },
  { id: 'ml-analytics', label: 'ML Analytics', icon: Brain },
  { id: 'survival', label: 'Survival Analysis', icon: Activity },
  { id: 'hazard', label: 'Hazard Models', icon: Target },
  { id: 'rul', label: 'RUL Prediction', icon: Timer },
  { id: 'fault-patterns', label: 'Fault Patterns', icon: Thermometer },
  { id: 'clustering', label: 'Device Clustering', icon: Globe },
  { id: 'association', label: 'Association Rules', icon: Network },
  { id: 'reliability', label: 'Reliability Metrics', icon: Shield },
  { id: 'recommendations', label: 'Recommendations', icon: TrendingUp }
];

// Export components and constants that will be used in the main file
export {
  FAULT_TYPE_COLORS,
  SIGNIFICANCE_COLORS,
  CATEGORY_COLORS,
  CLUSTER_COLORS,
  MODEL_COLORS,
  ENHANCED_TABS
};