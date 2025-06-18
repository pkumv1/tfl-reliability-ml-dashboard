import React, { memo, Suspense } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Timer, Calendar, Gauge } from 'lucide-react';
import { MOCK_DATA } from '../mockData';
import LoadingSpinner from '../LoadingSpinner';
import SafeChart from '../SafeChart';

// RUL Prediction Tab
const RULPredictionTab = memo(() => {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Timer className="h-6 w-6 mr-3 text-blue-600" />
            Device RUL Predictions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Device ID</th>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Fault Code</th>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">RUL (Days)</th>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Confidence</th>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Priority</th>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Timeframe</th>
                  <th className="text-left p-4 font-medium text-slate-600 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_DATA.rulPredictions.map((prediction, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="p-4 font-medium">{prediction.deviceId}</td>
                    <td className="p-4">FC {prediction.faultCode}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{prediction.rulDays}</span>
                        <span className="text-xs text-slate-500">
                          ({prediction.lowerCI} - {prediction.upperCI})
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${prediction.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{(prediction.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getPriorityColor(prediction.priority)}`}>
                        {prediction.priority}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{prediction.failureTimeframe}</td>
                    <td className="p-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Schedule Maintenance
                      </button>
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
              <Calendar className="h-6 w-6 mr-3 text-blue-600" />
              Failure Timeline Distribution
            </h3>
            <SafeChart title="Failure Timeline Distribution">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={MOCK_DATA.failureTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="timeframe" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="devices" fill="#3b82f6" name="Devices Expected to Fail" />
                </BarChart>
              </ResponsiveContainer>
            </SafeChart>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Gauge className="h-6 w-6 mr-3 text-blue-600" />
              RUL Confidence Distribution
            </h3>
            <SafeChart title="RUL Confidence Distribution">
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={MOCK_DATA.rulPredictions}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="deviceId" />
                  <PolarRadiusAxis angle={90} domain={[0, 1]} />
                  <Radar name="Confidence" dataKey="confidence" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </SafeChart>
          </div>
        </div>
      </div>
    </Suspense>
  );
});

RULPredictionTab.displayName = 'RULPredictionTab';

export default RULPredictionTab;