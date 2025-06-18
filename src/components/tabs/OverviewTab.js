import React, { memo, useMemo, Suspense } from 'react';
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Scatter, Cell, PieChart, Pie } from 'recharts';
import { Server, MapPin, AlertTriangle, Activity, Clock, Brain, TrendingUp, Users } from 'lucide-react';
import { MOCK_DATA } from '../mockData';
import LoadingSpinner from '../LoadingSpinner';
import SafeChart from '../SafeChart';
import StationHealthStatus from '../StationHealthStatus';
import { getClusterColor } from '../utils';

// Overview Tab
const OverviewTab = memo(() => {
  const systemMetrics = useMemo(() => {
    const totalDevices = 302;
    const totalStations = 11;
    const totalCritical = MOCK_DATA.stations.reduce((sum, station) => sum + station.critical, 0);
    const avgAvailability = MOCK_DATA.stations.reduce((sum, station) => sum + station.availability, 0) / MOCK_DATA.stations.length;
    const avgMTBF = MOCK_DATA.stations.reduce((sum, station) => sum + station.mtbf, 0) / MOCK_DATA.stations.length;
    
    return { totalDevices, totalStations, totalCritical, avgAvailability, avgMTBF };
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="space-y-8">
        <section className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Total Devices</p>
                <p className="text-2xl font-bold text-blue-900">{systemMetrics.totalDevices}</p>
                <p className="text-xs text-blue-700">Across {systemMetrics.totalStations} stations</p>
              </div>
              <Server className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Active Stations</p>
                <p className="text-2xl font-bold text-green-900">{systemMetrics.totalStations}</p>
                <p className="text-xs text-green-700">Full network coverage</p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Critical Issues</p>
                <p className="text-2xl font-bold text-red-900">{systemMetrics.totalCritical}</p>
                <p className="text-xs text-red-700">Immediate attention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">System Availability</p>
                <p className="text-2xl font-bold text-purple-900">{systemMetrics.avgAvailability.toFixed(1)}%</p>
                <p className="text-xs text-purple-700">Above 95% target</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">Average MTBF</p>
                <p className="text-2xl font-bold text-orange-900">{systemMetrics.avgMTBF.toFixed(0)}h</p>
                <p className="text-xs text-orange-700">Improving trend</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">ML Accuracy</p>
                <p className="text-2xl font-bold text-green-900">98.7%</p>
                <p className="text-xs text-green-700">XGBoost performance</p>
              </div>
              <Brain className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </section>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <MapPin className="h-6 w-6 mr-3 text-blue-600" />
            Station Health Overview ({systemMetrics.totalDevices} devices across {systemMetrics.totalStations} stations)
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {MOCK_DATA.stations.map(station => (
              <StationHealthStatus key={station.id} station={station} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 xl:col-span-2">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-3 text-blue-600" />
              Risk Score vs MTBF Analysis
            </h3>
            <SafeChart title="Risk Score vs MTBF Analysis">
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={MOCK_DATA.stations}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="mtbf" 
                    stroke="#64748b" 
                    label={{ value: 'MTBF (hours)', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    dataKey="riskScore" 
                    stroke="#64748b" 
                    label={{ value: 'Risk Score', angle: -90, position: 'insideLeft' }}
                    domain={[0, 1]}
                  />
                  <Tooltip />
                  {MOCK_DATA.stations.map((station, index) => (
                    <Scatter 
                      key={index}
                      dataKey="riskScore" 
                      fill={getClusterColor(station.cluster)}
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </SafeChart>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Users className="h-6 w-6 mr-3 text-blue-600" />
              Network Distribution
            </h3>
            <SafeChart title="Network Distribution">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={MOCK_DATA.clusterAnalysis}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ cluster, stations }) => `${cluster} (${stations})`}
                    outerRadius={120}
                    dataKey="stations"
                  >
                    {MOCK_DATA.clusterAnalysis.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getClusterColor(entry.cluster)} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </SafeChart>
          </div>
        </div>
      </div>
    </Suspense>
  );
});

OverviewTab.displayName = 'OverviewTab';

export default OverviewTab;
