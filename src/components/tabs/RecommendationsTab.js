import React, { memo, Suspense } from 'react';
import { AlertTriangle, Shield, TrendingUp, Clipboard, Lightbulb, FileText } from 'lucide-react';
import { MOCK_DATA } from '../mockData';
import LoadingSpinner from '../LoadingSpinner';

// Recommendations Tab
const RecommendationsTab = memo(() => {
  const getTypeColor = (type) => {
    switch(type) {
      case 'Critical': return 'border-red-200 bg-red-50';
      case 'Preventive': return 'border-yellow-200 bg-yellow-50';
      case 'Optimization': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Critical': return AlertTriangle;
      case 'Preventive': return Shield;
      case 'Optimization': return TrendingUp;
      default: return Info;
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Critical Actions</p>
                <p className="text-2xl font-bold text-red-900">2</p>
                <p className="text-xs text-red-700">Immediate attention required</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Preventive Actions</p>
                <p className="text-2xl font-bold text-yellow-900">1</p>
                <p className="text-xs text-yellow-700">Scheduled maintenance</p>
              </div>
              <Shield className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Optimizations</p>
                <p className="text-2xl font-bold text-green-900">1</p>
                <p className="text-xs text-green-700">Performance improvements</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Clipboard className="h-6 w-6 mr-3 text-blue-600" />
            Action Recommendations
          </h3>
          <div className="space-y-6">
            {MOCK_DATA.recommendations.map((rec, index) => {
              const TypeIcon = getTypeIcon(rec.type);
              return (
                <div key={index} className={`p-6 rounded-lg border-2 ${getTypeColor(rec.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        <TypeIcon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">{rec.title}</h4>
                        <p className="text-sm text-slate-600 mb-3">{rec.description}</p>
                        <div className="flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getPriorityBadge(rec.priority)}`}>
                            {rec.priority} Priority
                          </span>
                          <span className="text-xs text-slate-500">ETA: {rec.eta}</span>
                          <span className="text-xs text-slate-500">Impact: {rec.impact}</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Take Action
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Lightbulb className="h-6 w-6 mr-3 text-blue-600" />
              Process Improvement Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Monitoring Strategy</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Monitor reset patterns (frequency and duration)</li>
                  <li>• Track service durations continuously</li>
                  <li>• Consider environmental conditions impact</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-2">Preventive Maintenance</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• HostType_2 devices need more frequent checks</li>
                  <li>• Systems with reset patterns need intervention</li>
                  <li>• Focus on entry-point components</li>
                </ul>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-800 mb-2">Data Quality</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Improve categorization of reset reasons</li>
                  <li>• NULL values in ReasonForReset are predictive</li>
                  <li>• Enhance diagnostic data collection</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <FileText className="h-6 w-6 mr-3 text-blue-600" />
              Key Findings Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                <div>
                  <p className="font-medium text-slate-900">Temporal metrics dominate</p>
                  <p className="text-sm text-slate-600">ResetsSinceEOD and ResetDuration are top predictors</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                <div>
                  <p className="font-medium text-slate-900">Activation errors critical</p>
                  <p className="text-sm text-slate-600">More predictive than invalid transactions</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                <div>
                  <p className="font-medium text-slate-900">Entry points matter most</p>
                  <p className="text-sm text-slate-600">Entry metrics outweigh exit metrics in prediction</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <div>
                  <p className="font-medium text-slate-900">Environmental impact confirmed</p>
                  <p className="text-sm text-slate-600">Temperature extremes correlate with failures</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                <div>
                  <p className="font-medium text-slate-900">EMV system sensitivity</p>
                  <p className="text-sm text-slate-600">EMV processing shows higher failure correlation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
});

// Add missing import
import { Info } from 'lucide-react';

RecommendationsTab.displayName = 'RecommendationsTab';

export default RecommendationsTab;