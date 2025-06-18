import React, { memo, Suspense } from 'react';
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import { Globe, BarChart3, Map } from 'lucide-react';
import { MOCK_DATA } from '../mockData';
import LoadingSpinner from '../LoadingSpinner';
import SafeChart from '../SafeChart';
import { getClusterColor } from '../utils';

// Clustering Tab
const ClusteringTab = memo(() => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-3 text-blue-600" />
            Station Cluster Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {MOCK_DATA.clusterAnalysis.map((cluster, index) => (
              <div key={index} className="p-6 rounded-lg border-2" style={{ borderColor: getClusterColor(cluster.cluster), backgroundColor: `${getClusterColor(cluster.cluster)}10` }}>
                <h4 className="font-semibold text-lg mb-3" style={{ color: getClusterColor(cluster.cluster) }}>
                  {cluster.cluster}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Stations:</span>
                    <span className="font-medium">{cluster.stations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Avg MTBF:</span>
                    <span className="font-medium">{cluster.avgMTBF}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Risk Score:</span>
                    <span className="font-medium">{(cluster.avgRisk * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Passengers:</span>
                    <span className="font-medium">{(cluster.avgPassengers / 1000).toFixed(1)}k</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-3 pt-3 border-t">
                  {cluster.characteristics}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
              Cluster Performance Metrics
            </h3>
            <SafeChart title="Cluster Performance Metrics">
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={MOCK_DATA.clusterAnalysis}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="cluster" />
                  <PolarRadiusAxis angle={90} domain={[0, 1000]} />
                  <Radar name="MTBF" dataKey="avgMTBF" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Radar name="Risk Score" dataKey={(data) => data.avgRisk * 1000} stroke="#dc2626" fill="#dc2626" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </SafeChart>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Map className="h-6 w-6 mr-3 text-blue-600" />
              Station Distribution by Cluster
            </h3>
            <div className="space-y-4">
              {MOCK_DATA.clusterAnalysis.map((cluster, index) => {
                const stations = MOCK_DATA.stations.filter(s => s.cluster === cluster.cluster);
                return (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: getClusterColor(cluster.cluster) }}
                        ></div>
                        {cluster.cluster}
                      </h4>
                      <span className="text-sm text-slate-600">{stations.length} stations</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stations.map((station, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs px-2 py-1 bg-white rounded border"
                          style={{ borderColor: getClusterColor(cluster.cluster) }}
                        >
                          {station.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
});

ClusteringTab.displayName = 'ClusteringTab';

export default ClusteringTab;