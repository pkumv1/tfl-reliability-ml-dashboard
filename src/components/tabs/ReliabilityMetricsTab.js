import React, { memo, Suspense } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Treemap } from 'recharts';
import { Clock, Wrench, Activity, AlertTriangle, TrendingUp, Cpu, Database } from 'lucide-react';
import { MOCK_DATA } from '../mockData';
import LoadingSpinner from '../LoadingSpinner';
import SafeChart from '../SafeChart';

// Reliability Metrics Tab
const ReliabilityMetricsTab = memo(() => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Average MTBF</p>
                <p className="text-2xl font-bold text-blue-900">574.5 hrs</p>
                <p className="text-xs text-blue-700">↑ 5.2% from last month</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Average MTTR</p>
                <p className="text-2xl font-bold text-green-900">38.3 hrs</p>
                <p className="text-xs text-green-700">↓ 8.1% from last month</p>
              </div>
              <Wrench className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">Availability</p>
                <p className="text-2xl font-bold text-purple-900">95.4%</p>
                <p className="text-xs text-purple-700">Target: 95%</p>
              </div>
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">Total Failures</p>
                <p className="text-2xl font-bold text-orange-900">468</p>
                <p className="text-xs text-orange-700">This month</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-3 text-blue-600" />
            Reliability Trends (6 Months)
          </h3>
          <SafeChart title="Reliability Trends">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={MOCK_DATA.reliabilityTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="mtbf" fill="#3b82f6" name="MTBF (hours)" />
                <Bar yAxisId="left" dataKey="mttr" fill="#dc2626" name="MTTR (hours)" />
                <Line yAxisId="right" type="monotone" dataKey="availability" stroke="#22c55e" strokeWidth={3} name="Availability (%)" />
                <Line yAxisId="right" type="monotone" dataKey="totalFailures" stroke="#f59e0b" strokeWidth={3} name="Total Failures" />
              </ComposedChart>
            </ResponsiveContainer>
          </SafeChart>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Cpu className="h-6 w-6 mr-3 text-blue-600" />
              Device Reliability Distribution
            </h3>
            <SafeChart title="Device Reliability Distribution">
              <ResponsiveContainer width="100%" height={350}>
                <Treemap
                  data={[
                    { name: 'High Reliability (>800h MTBF)', size: 45, fill: '#22c55e' },
                    { name: 'Good Reliability (600-800h)', size: 30, fill: '#3b82f6' },
                    { name: 'Fair Reliability (400-600h)', size: 15, fill: '#f59e0b' },
                    { name: 'Poor Reliability (<400h)', size: 10, fill: '#dc2626' }
                  ]}
                  dataKey="size"
                  aspectRatio={4/3}
                  stroke="#fff"
                  fill="#8884d8"
                />
              </ResponsiveContainer>
            </SafeChart>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Database className="h-6 w-6 mr-3 text-blue-600" />
              Reliability KPIs
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">System Reliability</span>
                  <span className="text-lg font-bold text-slate-900">94.7%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '94.7%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">Mean Time To Detect</span>
                  <span className="text-lg font-bold text-slate-900">12.5 min</span>
                </div>
                <p className="text-xs text-slate-500">Average detection time for faults</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">First Time Fix Rate</span>
                  <span className="text-lg font-bold text-slate-900">87.3%</span>
                </div>
                <p className="text-xs text-slate-500">Issues resolved on first attempt</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">Preventive Maintenance %</span>
                  <span className="text-lg font-bold text-slate-900">68.5%</span>
                </div>
                <p className="text-xs text-slate-500">Proactive vs reactive maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
});

ReliabilityMetricsTab.displayName = 'ReliabilityMetricsTab';

export default ReliabilityMetricsTab;