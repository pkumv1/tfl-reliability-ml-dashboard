import React, { memo, Suspense } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { Brain, Target, Info } from 'lucide-react';
import { MOCK_DATA } from '../mockData';
import LoadingSpinner from '../LoadingSpinner';
import SafeChart from '../SafeChart';
import { ModelTooltip, FeatureTooltip } from '../CustomTooltips';
import { getCategoryColor, getModelColor } from '../utils';

// ML Analytics Tab
const MLAnalyticsTab = memo(() => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Brain className="h-6 w-6 mr-3 text-blue-600" />
            Model Performance Comparison
          </h3>
          <SafeChart title="Model Performance Comparison">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={MOCK_DATA.mlModelResults}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="model" angle={-45} textAnchor="end" height={100} />
                <YAxis domain={[0.9, 1]} />
                <Tooltip content={<ModelTooltip />} />
                <Legend />
                <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy" />
                <Bar dataKey="precision" fill="#22c55e" name="Precision" />
                <Bar dataKey="recall" fill="#f59e0b" name="Recall" />
                <Bar dataKey="f1Score" fill="#8b5cf6" name="F1-Score" />
              </BarChart>
            </ResponsiveContainer>
          </SafeChart>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Target className="h-6 w-6 mr-3 text-blue-600" />
              XGBoost Feature Importance
            </h3>
            <SafeChart title="XGBoost Feature Importance">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={MOCK_DATA.xgboostFeatureImportance} margin={{ top: 20, right: 30, left: 40, bottom: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="feature" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    interval={0}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis />
                  <Tooltip content={<FeatureTooltip />} />
                  <Bar dataKey="importance" name="Importance">
                    {MOCK_DATA.xgboostFeatureImportance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </SafeChart>
            
            {/* Table fallback for XGBoost */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-2 font-medium text-slate-600">Rank</th>
                    <th className="text-left p-2 font-medium text-slate-600">Feature</th>
                    <th className="text-left p-2 font-medium text-slate-600">Importance</th>
                    <th className="text-left p-2 font-medium text-slate-600">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_DATA.xgboostFeatureImportance.slice(0, 5).map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="p-2">#{item.rank}</td>
                      <td className="p-2 font-medium">{item.feature}</td>
                      <td className="p-2">{(item.importance * 100).toFixed(1)}%</td>
                      <td className="p-2">
                        <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: `${getCategoryColor(item.category)}20`, color: getCategoryColor(item.category) }}>
                          {item.category}
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
              <Target className="h-6 w-6 mr-3 text-blue-600" />
              CatBoost Feature Importance
            </h3>
            <SafeChart title="CatBoost Feature Importance">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={MOCK_DATA.catboostFeatureImportance} margin={{ top: 20, right: 30, left: 40, bottom: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="feature" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    interval={0}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis />
                  <Tooltip content={<FeatureTooltip />} />
                  <Bar dataKey="importance" name="Importance">
                    {MOCK_DATA.catboostFeatureImportance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </SafeChart>
            
            {/* Table fallback for CatBoost */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-2 font-medium text-slate-600">Rank</th>
                    <th className="text-left p-2 font-medium text-slate-600">Feature</th>
                    <th className="text-left p-2 font-medium text-slate-600">Importance</th>
                    <th className="text-left p-2 font-medium text-slate-600">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_DATA.catboostFeatureImportance.slice(0, 5).map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="p-2">#{item.rank}</td>
                      <td className="p-2 font-medium">{item.feature}</td>
                      <td className="p-2">{item.importance.toFixed(2)}</td>
                      <td className="p-2">
                        <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: `${getCategoryColor(item.category)}20`, color: getCategoryColor(item.category) }}>
                          {item.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Info className="h-6 w-6 mr-3 text-blue-600" />
            Causation Analysis Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_DATA.causationInsights.map((insight, index) => (
              <div key={index} className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">{insight.category}</h4>
                <p className="text-sm text-slate-600 mb-3">{insight.insight}</p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  insight.impact === 'High' ? 'bg-red-100 text-red-800' :
                  insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  Impact: {insight.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
});

MLAnalyticsTab.displayName = 'MLAnalyticsTab';

export default MLAnalyticsTab;