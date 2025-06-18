import React, { memo, Suspense } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Cell } from 'recharts';
import { Network, GitBranch, Share2 } from 'lucide-react';
import { MOCK_DATA } from '../mockData';
import LoadingSpinner from '../LoadingSpinner';
import SafeChart from '../SafeChart';

// Association Rules Tab
const AssociationRulesTab = memo(() => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Network className="h-6 w-6 mr-3 text-blue-600" />
            Fault Code Association Rules
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Antecedent</th>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Consequent</th>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Support</th>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Confidence</th>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Lift</th>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Conviction</th>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Strength</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_DATA.associationRules.map((rule, index) => {
                  const strength = rule.lift > 2 ? 'Strong' : rule.lift > 1.5 ? 'Moderate' : 'Weak';
                  const strengthColor = strength === 'Strong' ? 'text-green-600' : strength === 'Moderate' ? 'text-yellow-600' : 'text-red-600';
                  
                  return (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="p-4 font-medium">{rule.antecedent}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span>→</span>
                          <span className="font-medium">{rule.consequent}</span>
                        </div>
                      </td>
                      <td className="p-4">{(rule.support * 100).toFixed(1)}%</td>
                      <td className="p-4">{(rule.confidence * 100).toFixed(1)}%</td>
                      <td className="p-4">{rule.lift.toFixed(2)}</td>
                      <td className="p-4">{rule.conviction.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`font-medium ${strengthColor}`}>{strength}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <GitBranch className="h-6 w-6 mr-3 text-blue-600" />
              Rule Lift Distribution
            </h3>
            <SafeChart title="Rule Lift Distribution">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={MOCK_DATA.associationRules}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="antecedent" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="lift" fill="#3b82f6" name="Lift Value">
                    {MOCK_DATA.associationRules.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.lift > 2 ? '#22c55e' : entry.lift > 1.5 ? '#f59e0b' : '#dc2626'} 
                      />
                    ))}
                  </Bar>
                  <ReferenceLine y={1} stroke="#6b7280" strokeDasharray="3 3" label="Baseline" />
                </BarChart>
              </ResponsiveContainer>
            </SafeChart>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Share2 className="h-6 w-6 mr-3 text-blue-600" />
              Key Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-medium text-red-800 mb-2">Strong Association Found</h4>
                <p className="text-sm text-red-700">
                  FC_111 → FC_37 with 78% confidence and 2.34x lift
                </p>
                <p className="text-xs text-red-600 mt-1">
                  When FC_111 occurs, FC_37 is 2.34 times more likely to follow
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-800 mb-2">Combined Patterns</h4>
                <p className="text-sm text-orange-700">
                  FC_37 + FC_40 → FC_111 with 72% confidence
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Multiple fault codes together predict subsequent failures
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Maintenance Recommendation</h4>
                <p className="text-sm text-blue-700">
                  Monitor devices showing FC_111 for potential cascading failures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
});

AssociationRulesTab.displayName = 'AssociationRulesTab';

export default AssociationRulesTab;