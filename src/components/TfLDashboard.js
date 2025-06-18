import React, { useState, useEffect, useMemo, useCallback, memo, Suspense } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, AreaChart, Area, ComposedChart, ReferenceLine, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Treemap } from 'recharts';
import { AlertTriangle, Activity, MapPin, TrendingUp, Clock, Zap, Thermometer, Download, Target, Layers, BarChart3, Brain, Shield, Radio, Wifi, Server, Globe, Network, Timer, RefreshCw, GitBranch, Share2, Calendar, Gauge, Cpu, Database, TrendingDown, Award, Crosshair, Bell, Users, Settings, AlertCircle, CheckCircle, XCircle, Wrench, Map, Battery, Signal, Monitor, Maximize2, Info, FileText, Lightbulb, Clipboard } from 'lucide-react';

// Import the mock data
import { MOCK_DATA } from './mockData';

// Import the tabs components
import OverviewTab from './tabs/OverviewTab';
import RealTimeTab from './tabs/RealTimeTab';
import MLAnalyticsTab from './tabs/MLAnalyticsTab';
import SurvivalAnalysisTab from './tabs/SurvivalAnalysisTab';
import HazardModelsTab from './tabs/HazardModelsTab';
import RULPredictionTab from './tabs/RULPredictionTab';
import FaultPatternsTab from './tabs/FaultPatternsTab';
import ClusteringTab from './tabs/ClusteringTab';
import AssociationRulesTab from './tabs/AssociationRulesTab';
import ReliabilityMetricsTab from './tabs/ReliabilityMetricsTab';
import RecommendationsTab from './tabs/RecommendationsTab';

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

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Dashboard Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-red-200 max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-bold text-red-600">Dashboard Error</h2>
            </div>
            <p className="text-slate-600 mb-4">An error occurred while loading the dashboard. Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading Spinner
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center h-64" role="status" aria-label="Loading">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="sr-only">Loading...</span>
  </div>
));

// Main Dashboard Component
function TfLDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [realTimeMode, setRealTimeMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = useCallback((tabId) => {
    if (tabId === activeTab) return;
    
    setIsLoading(true);
    setActiveTab(tabId);
    
    setTimeout(() => setIsLoading(false), 300);
  }, [activeTab]);

  useEffect(() => {
    if (!realTimeMode) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [realTimeMode]);

  const renderTabContent = useCallback(() => {
    if (isLoading) return <LoadingSpinner />;

    switch(activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'realtime':
        return <RealTimeTab />;
      case 'ml-analytics':
        return <MLAnalyticsTab />;
      case 'survival':
        return <SurvivalAnalysisTab />;
      case 'hazard':
        return <HazardModelsTab />;
      case 'rul':
        return <RULPredictionTab />;
      case 'fault-patterns':
        return <FaultPatternsTab />;
      case 'clustering':
        return <ClusteringTab />;
      case 'association':
        return <AssociationRulesTab />;
      case 'reliability':
        return <ReliabilityMetricsTab />;
      case 'recommendations':
        return <RecommendationsTab />;
      default:
        return (
          <div className="flex items-center justify-center h-64 text-slate-500">
            <div className="text-center">
              <Settings className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">Tab Not Found</h3>
              <p className="text-slate-500">Please select a valid tab from the navigation.</p>
            </div>
          </div>
        );
    }
  }, [activeTab, isLoading]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-[1920px] mx-auto p-4 lg:p-6 xl:p-8">
          <header className="bg-slate-900 text-white p-6 xl:p-8 rounded-lg mb-8 shadow-lg">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
              <div>
                <h1 className="text-3xl xl:text-4xl font-bold mb-3 text-white">
                  TfL Advanced Reliability Analytics Dashboard
                </h1>
                <p className="text-slate-300 text-lg xl:text-xl mb-4">AI-Powered Predictive Maintenance & Reliability Engineering</p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm bg-blue-600 px-4 py-2 rounded-md font-medium flex items-center">
                    <Server className="h-4 w-4 mr-2" />
                    302 Devices
                  </span>
                  <span className="text-sm bg-blue-700 px-4 py-2 rounded-md font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    11 Stations
                  </span>
                  <span className="text-sm bg-blue-800 px-4 py-2 rounded-md font-medium flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    XGBoost 98.7% Accuracy
                  </span>
                  <span className="text-sm bg-green-600 px-4 py-2 rounded-md font-medium flex items-center">
                    <Timer className="h-4 w-4 mr-2" />
                    RUL Predictions Active
                  </span>
                </div>
              </div>
              <div className="text-left xl:text-right">
                <div className="flex items-center space-x-3 mb-3">
                  <button
                    onClick={() => setRealTimeMode(!realTimeMode)}
                    className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
                      realTimeMode ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${realTimeMode ? 'bg-white animate-pulse' : 'bg-slate-400'}`}></div>
                    <span>{realTimeMode ? 'Live' : 'Static'}</span>
                  </button>
                  <button className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-slate-300 mb-1">Last Updated: {lastUpdate.toLocaleTimeString()}</p>
                <p className="text-xs text-slate-400">ML Accuracy: 98.7% | Training: 118K records</p>
              </div>
            </div>
          </header>

          <nav className="flex flex-wrap gap-2 mb-8 bg-white p-3 rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
            {ENHANCED_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 xl:px-6 py-3 rounded-md font-medium flex items-center space-x-2 transition-all text-sm whitespace-nowrap ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <main role="main">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default TfLDashboard;