import React, { memo, Suspense } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Thermometer, AlertTriangle, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { MOCK_DATA } from '../mockData';
import LoadingSpinner from '../LoadingSpinner';
import SafeChart from '../SafeChart';

// Fault Patterns Tab
const FaultPatternsTab = memo(() => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Thermometer className="h-6 w-6 mr-3 text-blue-600" />
            Hourly Fault Pattern Analysis
          </h3>
          <SafeChart title="Hourly Fault Pattern Analysis">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={MOCK_DATA.faultPatterns}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" label={{ value: 'Hour of Day', position: 'insideBottom', offset: -10 }} />
                <YAxis label={{ value: 'Fault Count', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="fc111" stackId="1" stroke="#dc2626" fill="#dc2626" name="FC 111" />
                <Area type="monotone" dataKey="fc37" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="FC 37" />
                <Area type="monotone" dataKey="fc40" stackId="1" stroke="#22c55e" fill="#22c55e" name="FC 40" />
                <Area type="monotone" dataKey="fc118" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="FC 118" />
              </AreaChart>
            </ResponsiveContainer>
          </SafeChart>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-3 text-red-600" />
              Top Fault Codes
            </h3>
            <div className="space-y-4">
              {[
                { code: 111, count: 272206, percentage: 58.2 },
                { code: 37, count: 86504, percentage: 18.5 },
                { code: 40, count: 51600, percentage: 11.0 },
                { code: 10, count: 13078, percentage: 2.8 },
                { code: 118, count: 9319, percentage: 2.0 }
              ].map((fault, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-slate-900">FC {fault.code}</span>
                    <span className="text-sm text-slate-600">{fault.count.toLocaleString()} failures</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${fault.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700 w-12 text-right">
                      {fault.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-3 text-blue-600" />
              Peak Failure Times
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-red-800">Peak Hour</span>
                  <span className="text-xl font-bold text-red-900">12:00 PM</span>
                </div>
                <p className="text-sm text-red-700">57 average failures per hour</p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-orange-800">Secondary Peak</span>
                  <span className="text-xl font-bold text-orange-900">4:00 PM</span>
                </div>
                <p className="text-sm text-orange-700">45 average failures per hour</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-green-800">Low Activity</span>
                  <span className="text-xl font-bold text-green-900">12:00 AM</span>
                </div>
                <p className="text-sm text-green-700">11 average failures per hour</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-3 text-blue-600" />
              Failure Trends
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-slate-700">Morning Rush</span>
                </div>
                <span className="text-sm text-red-600">+65% failures</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-slate-700">Evening Peak</span>
                </div>
                <span className="text-sm text-orange-600">+45% failures</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-slate-700">Night Hours</span>
                </div>
                <span className="text-sm text-green-600">-70% failures</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
});

FaultPatternsTab.displayName = 'FaultPatternsTab';

export default FaultPatternsTab;