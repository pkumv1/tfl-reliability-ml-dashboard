import React, { memo, Suspense } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Activity, Thermometer, Shield } from 'lucide-react';
import { MOCK_DATA } from '../mockData';
import LoadingSpinner from '../LoadingSpinner';
import SafeChart from '../SafeChart';

// Survival Analysis Tab
const SurvivalAnalysisTab = memo(() => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Activity className="h-6 w-6 mr-3 text-blue-600" />
            Survival Curves by Fault Code
          </h3>
          <SafeChart title="Survival Curves by Fault Code">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={MOCK_DATA.survivalCurves}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b" 
                  label={{ value: 'Time (minutes)', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  stroke="#64748b" 
                  label={{ value: 'Survival Probability', angle: -90, position: 'insideLeft' }}
                  domain={[0, 1]}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="fc111" stroke="#dc2626" strokeWidth={3} name="FC 111" />
                <Line type="monotone" dataKey="fc37" stroke="#f59e0b" strokeWidth={3} name="FC 37" />
                <Line type="monotone" dataKey="fc40" stroke="#22c55e" strokeWidth={3} name="FC 40" />
                <Line type="monotone" dataKey="fc118" stroke="#3b82f6" strokeWidth={3} name="FC 118" />
                <Line type="monotone" dataKey="fc10" stroke="#8b5cf6" strokeWidth={3} name="FC 10" />
                <Line type="monotone" dataKey="baseline" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" name="Baseline" />
              </LineChart>
            </ResponsiveContainer>
          </SafeChart>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Thermometer className="h-6 w-6 mr-3 text-blue-600" />
              Weibull Analysis Results
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-3 font-medium text-slate-600 text-sm">Fault Code</th>
                    <th className="text-left p-3 font-medium text-slate-600 text-sm">Shape (β)</th>
                    <th className="text-left p-3 font-medium text-slate-600 text-sm">Scale (η)</th>
                    <th className="text-left p-3 font-medium text-slate-600 text-sm">Median Life</th>
                    <th className="text-left p-3 font-medium text-slate-600 text-sm">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_DATA.weibullAnalysis.slice(0, 5).map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="p-3 font-medium">FC {item.faultCode}</td>
                      <td className="p-3">{item.shape.toFixed(2)}</td>
                      <td className="p-3">{item.scale.toFixed(2)}</td>
                      <td className="p-3">{item.medianLifetime.toFixed(1)} min</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                          item.failureType === 'Infant Mortality' ? 'bg-red-100 text-red-800' :
                          item.failureType === 'Wear-out' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.failureType}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-3 text-blue-600" />
              Failure Distribution by Type
            </h3>
            <SafeChart title="Failure Distribution by Type">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Infant Mortality', value: 6, color: '#dc2626' },
                      { name: 'Wear-out', value: 1, color: '#ea580c' },
                      { name: 'Early-life', value: 1, color: '#eab308' }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value})`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {[
                      { color: '#dc2626' },
                      { color: '#ea580c' },
                      { color: '#eab308' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
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

SurvivalAnalysisTab.displayName = 'SurvivalAnalysisTab';

export default SurvivalAnalysisTab;