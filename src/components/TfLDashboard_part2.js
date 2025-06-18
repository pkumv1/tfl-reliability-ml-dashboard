green-700">11 average failures per hour</p>
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

// Main Dashboard Component
function TfLDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [realTimeMode, setRealTimeMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = useCallback((tabId) => {
    if (tabId === activeTab) return;
    
    setIsLoading(true);
    setActiveTab(tabId);
    
    setTimeout(() => setIsLoading(false), 300);
  }, [activeTab]);

  useEffect(() => {
    if (!realTimeMode) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [realTimeMode]);

  const renderTabContent = useCallback(() => {
    if (isLoading) return <LoadingSpinner />;

    switch(activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'realtime':
        return <RealTimeTab />;
      case 'ml-analytics':
        return <MLAnalyticsTab />;
      case 'survival':
        return <SurvivalAnalysisTab />;
      case 'hazard':
        return <HazardModelsTab />;
      case 'rul':
        return <RULPredictionTab />;
      case 'fault-patterns':
        return <FaultPatternsTab />;
      case 'clustering':
        return <ClusteringTab />;
      case 'association':
        return <AssociationRulesTab />;
      case 'reliability':
        return <ReliabilityMetricsTab />;
      case 'recommendations':
        return <RecommendationsTab />;
      default:
        return (
          <div className="flex items-center justify-center h-64 text-slate-500">
            <div className="text-center">
              <Settings className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">Tab Not Found</h3>
              <p className="text-slate-500">Please select a valid tab from the navigation.</p>
            </div>
          </div>
        );
    }
  }, [activeTab, isLoading]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-[1920px] mx-auto p-4 lg:p-6 xl:p-8">
          <header className="bg-slate-900 text-white p-6 xl:p-8 rounded-lg mb-8 shadow-lg">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
              <div>
                <h1 className="text-3xl xl:text-4xl font-bold mb-3 text-white">
                  TfL Advanced Reliability Analytics Dashboard
                </h1>
                <p className="text-slate-300 text-lg xl:text-xl mb-4">AI-Powered Predictive Maintenance & Reliability Engineering</p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm bg-blue-600 px-4 py-2 rounded-md font-medium flex items-center">
                    <Server className="h-4 w-4 mr-2" />
                    302 Devices
                  </span>
                  <span className="text-sm bg-blue-700 px-4 py-2 rounded-md font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    11 Stations
                  </span>
                  <span className="text-sm bg-blue-800 px-4 py-2 rounded-md font-medium flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    XGBoost 98.7% Accuracy
                  </span>
                  <span className="text-sm bg-green-600 px-4 py-2 rounded-md font-medium flex items-center">
                    <Timer className="h-4 w-4 mr-2" />
                    RUL Predictions Active
                  </span>
                </div>
              </div>
              <div className="text-left xl:text-right">
                <div className="flex items-center space-x-3 mb-3">
                  <button
                    onClick={() => setRealTimeMode(!realTimeMode)}
                    className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
                      realTimeMode ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${realTimeMode ? 'bg-white animate-pulse' : 'bg-slate-400'}`}></div>
                    <span>{realTimeMode ? 'Live' : 'Static'}</span>
                  </button>
                  <button className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-slate-300 mb-1">Last Updated: {lastUpdate.toLocaleTimeString()}</p>
                <p className="text-xs text-slate-400">ML Accuracy: 98.7% | Training: 118K records</p>
              </div>
            </div>
          </header>

          <nav className="flex flex-wrap gap-2 mb-8 bg-white p-3 rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
            {ENHANCED_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 xl:px-6 py-3 rounded-md font-medium flex items-center space-x-2 transition-all text-sm whitespace-nowrap ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <main role="main">
            {renderTabContent()}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default TfLDashboard;