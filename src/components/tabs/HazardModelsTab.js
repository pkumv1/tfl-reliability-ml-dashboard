import React, { memo, Suspense } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell, LineChart, Line } from 'recharts';
import { Target, Activity, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { MOCK_DATA } from '../mockData';
import LoadingSpinner from '../LoadingSpinner';
import SafeChart from '../SafeChart';
import { CoxTooltip } from '../CustomTooltips';
import { getSignificanceColor } from '../utils';

// Hazard Models Tab
const HazardModelsTab = memo(() => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-3 text-blue-600" />
            Cox Regression Hazard Ratios
          </h3>
          <SafeChart title="Cox Regression Hazard Ratios">
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={MOCK_DATA.coxRegressionResults} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="faultCode" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60}
                  interval={0}
                />
                <YAxis />
                <Tooltip content={<CoxTooltip />} />
                <ReferenceLine y={1} stroke="#6b7280" strokeDasharray="3 3" label="Baseline (HR=1)" />
                <Bar dataKey="expCoef" name="Hazard Ratio">
                  {MOCK_DATA.coxRegressionResults.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getSignificanceColor(entry.significance)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </SafeChart>
          
          {/* Table visualization as fallback */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-3 font-medium text-slate-600 text-sm">Fault Code</th>
                  <th className="text-left p-3 font-medium text-slate-600 text-sm">Hazard Ratio</th>
                  <th className="text-left p-3 font-medium text-slate-600 text-sm">Coefficient</th>
                  <th className="text-left p-3 font-medium text-slate-600 text-sm">95% CI</th>
                  <th className="text-left p-3 font-medium text-slate-600 text-sm">P-Value</th>
                  <th className="text-left p-3 font-medium text-slate-600 text-sm">Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_DATA.coxRegressionResults.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="p-3 font-medium">{item.faultCode}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg">{item.expCoef.toFixed(2)}</span>
                        {item.expCoef > 1 && <TrendingUp className="h-4 w-4 text-red-500" />}
                        {item.expCoef < 1 && <TrendingDown className="h-4 w-4 text-green-500" />}
                      </div>
                    </td>
                    <td className="p-3">{item.coef.toFixed(3)}</td>
                    <td className="p-3 text-sm">[{item.expCoefLower.toFixed(2)}, {item.expCoefUpper.toFixed(2)}]</td>
                    <td className="p-3">{item.pValue.toFixed(3)}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        item.significance === 'Critical' ? 'bg-red-100 text-red-800' :
                        item.significance === 'High' ? 'bg-orange-100 text-orange-800' :
                        item.significance === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.significance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Activity className="h-6 w-6 mr-3 text-blue-600" />
              Baseline Hazard Function
            </h3>
            <SafeChart title="Baseline Hazard Function">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={MOCK_DATA.baselineHazard}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Line type="monotone" dataKey="hazard" stroke="#dc2626" strokeWidth={2} name="Hazard" dot={false} />
                  <Line type="monotone" dataKey="smoothed" stroke="#3b82f6" strokeWidth={3} name="Smoothed" />
                </LineChart>
              </ResponsiveContainer>
            </SafeChart>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Info className="h-6 w-6 mr-3 text-blue-600" />
              Model Statistics
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">Concordance Score</span>
                  <span className="text-lg font-bold text-slate-900">0.76</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium text-slate-600 mb-1">Observations</p>
                  <p className="text-xl font-bold text-slate-900">505,551</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium text-slate-600 mb-1">Events</p>
                  <p className="text-xl font-bold text-slate-900">505,551</p>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-800 mb-2">Top Risk Factors</p>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• FC_111: 33.56x hazard ratio</li>
                  <li>• FC_38: 8.74x hazard ratio</li>
                  <li>• FC_118: 3.44x hazard ratio</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800 mb-2">Protective Factors</p>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• FC_27: 0.40x hazard ratio</li>
                  <li>• FC_15: 0.24x hazard ratio</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
});

HazardModelsTab.displayName = 'HazardModelsTab';

export default HazardModelsTab;