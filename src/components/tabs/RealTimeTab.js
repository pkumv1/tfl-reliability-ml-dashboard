import React, { memo, useState, useEffect, useMemo, Suspense } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CheckCircle, AlertTriangle, XCircle, Radio, Timer, BarChart3 } from 'lucide-react';
import { MOCK_DATA } from '../mockData';
import LoadingSpinner from '../LoadingSpinner';
import SafeChart from '../SafeChart';

// Real-time Tab
const RealTimeTab = memo(() => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parse RUL data and select critical devices based on lowest RUL days
  const criticalDevices = useMemo(() => {
    const devices = [
      { device: '19060', type: 'Device', location: 'Network', health: 45, prediction: 8.5, confidence: 92, status: 'critical', faultCode: 111, occurrences: 23138 },
      { device: '7758', type: 'Device', location: 'Network', health: 55, prediction: 12.2, confidence: 85, status: 'critical', faultCode: 111, occurrences: 4260 },
      { device: '7952', type: 'Device', location: 'Network', health: 60, prediction: 14.8, confidence: 88, status: 'critical', faultCode: 111, occurrences: 5738 },
      { device: '18625', type: 'Device', location: 'Network', health: 65, prediction: 16.3, confidence: 82, status: 'warning', faultCode: 111, occurrences: 4307 },
      { device: '18913', type: 'Device', location: 'Network', health: 70, prediction: 18.9, confidence: 90, status: 'warning', faultCode: 111, occurrences: 3167 },
      { device: '8912', type: 'Device', location: 'Network', health: 75, prediction: 25.6, confidence: 78, status: 'operational', faultCode: 37, occurrences: 2156 },
      { device: '9345', type: 'Device', location: 'Network', health: 85, prediction: 42.3, confidence: 85, status: 'operational', faultCode: 40, occurrences: 1523 }
    ];
    return devices;
  }, []);

  const getStatusDot = (status) => {
    switch(status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'operational': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthBarColor = (health) => {
    if (health >= 85) return 'bg-green-500';
    if (health >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPredictionTextColor = (prediction) => {
    if (prediction <= 5) return 'text-red-600';
    if (prediction <= 10) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleAnalyze = (device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDevice(null);
    // Re-enable body scroll
    document.body.style.overflow = 'unset';
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Ensure body scroll is re-enabled on cleanup
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Mock detailed data for the selected device
  const getDeviceDetails = (device) => {
    return {
      faultHistory: [
        { date: '2024-06-23', faultCode: device.faultCode, duration: '45 min', severity: 'High' },
        { date: '2024-06-20', faultCode: device.faultCode, duration: '32 min', severity: 'Medium' },
        { date: '2024-06-18', faultCode: device.faultCode, duration: '28 min', severity: 'Medium' },
        { date: '2024-06-15', faultCode: device.faultCode, duration: '52 min', severity: 'High' },
        { date: '2024-06-12', faultCode: device.faultCode, duration: '18 min', severity: 'Low' }
      ],
      coOccurrences: [
        { faultCode: 'FC_37', correlation: 0.78, occurrences: 342, lift: 2.34 },
        { faultCode: 'FC_40', correlation: 0.65, occurrences: 287, lift: 1.87 },
        { faultCode: 'FC_118', correlation: 0.52, occurrences: 198, lift: 1.45 },
        { faultCode: 'FC_27', correlation: 0.45, occurrences: 156, lift: 1.32 }
      ],
      performance: {
        mtbf: device.faultCode === 111 ? 294.38 : device.faultCode === 37 ? 342.18 : 425.67,
        availability: device.health / 100,
        failureRate: (100 - device.health) / 100,
        maintenanceCost: device.status === 'critical' ? 12500 : device.status === 'warning' ? 8500 : 5500
      }
    };
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Operational</p>
                <p className="text-2xl font-bold text-green-900">2</p>
                <p className="text-xs text-green-700">RUL &gt; 25 days</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">Warning</p>
                <p className="text-2xl font-bold text-yellow-900">2</p>
                <p className="text-xs text-yellow-700">RUL 15-20 days</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Critical</p>
                <p className="text-2xl font-bold text-red-900">3</p>
                <p className="text-xs text-red-700">RUL &lt; 15 days</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </section>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Critical Device Monitoring</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600">{criticalDevices.length} devices shown</span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analyze All</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-4 font-medium text-slate-600 uppercase tracking-wide text-xs">DEVICE</th>
                  <th className="text-left p-4 font-medium text-slate-600 uppercase tracking-wide text-xs">FAULT CODE</th>
                  <th className="text-left p-4 font-medium text-slate-600 uppercase tracking-wide text-xs">OCCURRENCES</th>
                  <th className="text-left p-4 font-medium text-slate-600 uppercase tracking-wide text-xs">HEALTH</th>
                  <th className="text-left p-4 font-medium text-slate-600 uppercase tracking-wide text-xs">RUL PREDICTION</th>
                  <th className="text-left p-4 font-medium text-slate-600 uppercase tracking-wide text-xs">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {criticalDevices.map((device, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusDot(device.status)}`}></div>
                        <span className="font-medium text-slate-900">Device {device.device}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                        FC {device.faultCode}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{device.occurrences.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 w-20">
                          <div 
                            className={`h-2 rounded-full ${getHealthBarColor(device.health)}`}
                            style={{ width: `${device.health}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-900 w-10">{device.health}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className={`text-lg font-bold ${getPredictionTextColor(device.prediction)}`}>
                          {device.prediction} days
                        </div>
                        <div className="text-xs text-slate-500">
                          {device.confidence}% confidence
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleAnalyze(device)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors"
                      >
                        <BarChart3 className="h-4 w-4" />
                        <span>Analyze</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device Analysis Modal */}
        {isModalOpen && selectedDevice && (
          <DeviceAnalysisModal 
            device={selectedDevice} 
            onClose={closeModal} 
            getDeviceDetails={getDeviceDetails}
          />
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 xl:col-span-2">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <Activity className="h-6 w-6 mr-3 text-blue-600" />
              Real-time Device Health Trends
            </h3>
            <SafeChart title="Real-time Device Health Trends">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={MOCK_DATA.realTimeMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="timestamp" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="activeDevices" stroke="#3b82f6" strokeWidth={3} name="Active Devices" />
                  <Line type="monotone" dataKey="faults" stroke="#dc2626" strokeWidth={3} name="Faults" />
                  <Line type="monotone" dataKey="criticalRulDevices" stroke="#f59e0b" strokeWidth={3} name="Critical Devices" />
                </LineChart>
              </ResponsiveContainer>
            </SafeChart>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { device: '19060', time: '10:00:15 AM', rul: '8.5 days', code: '111', status: 'critical', message: 'Critical alert' },
                { device: '7758', time: '9:58:42 AM', rul: '12.2 days', code: '111', status: 'warning', message: 'High priority' },
                { device: '7952', time: '9:45:18 AM', rul: '14.8 days', code: '111', status: 'scheduled', message: 'Maintenance scheduled' },
                { device: '18625', time: '9:32:05 AM', rul: '16.3 days', code: '111', status: 'monitoring', message: 'Monitoring update' },
                { device: '8912', time: '9:15:43 AM', rul: '25.6 days', code: '37', status: 'stable', message: 'Stable operation' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'critical' ? 'bg-red-500' :
                    activity.status === 'warning' ? 'bg-orange-500' :
                    activity.status === 'scheduled' ? 'bg-yellow-500' :
                    activity.status === 'monitoring' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.message} - Device {activity.device}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                    <span className={`text-xs ${
                      activity.status === 'critical' ? 'text-red-600' :
                      activity.status === 'warning' ? 'text-orange-600' :
                      activity.status === 'scheduled' ? 'text-yellow-600' :
                      activity.status === 'monitoring' ? 'text-blue-600' : 'text-green-600'
                    }`}>RUL: {activity.rul} (FC_{activity.code})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Timer className="h-6 w-6 mr-3 text-blue-600" />
            Failure Prediction Timeline
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-red-700">&lt; 10 Days</div>
              <div className="text-xs text-red-500 mt-1">Device 19060</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-orange-700">10-15 Days</div>
              <div className="text-xs text-orange-500 mt-1">Devices 7758, 7952, 18625</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <div className="text-sm text-yellow-700">15-20 Days</div>
              <div className="text-xs text-yellow-500 mt-1">Devices 18913, 18921</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">Many</div>
              <div className="text-sm text-green-700">20+ Days</div>
              <div className="text-xs text-green-500 mt-1">Multiple devices</div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
});

// Device Analysis Modal Component
const DeviceAnalysisModal = memo(({ device, onClose, getDeviceDetails }) => {
  const details = getDeviceDetails(device);
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8 max-h-[90vh] flex flex-col relative">
        {/* Fixed Header with prominent close button */}
        <div className="p-6 border-b border-slate-200 bg-white rounded-t-lg flex-shrink-0 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Device {device.device} Analysis
              </h2>
              <p className="text-sm text-slate-500 mt-1">Press ESC or click outside to close</p>
            </div>
            <button 
              onClick={onClose}
              className="ml-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm"
              aria-label="Close modal"
              title="Close"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-grow scroll-smooth scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
          {/* Scroll indicator - shows when content is scrollable */}
          <div className="text-center text-sm text-slate-500 italic">
            ↓ Scroll for more details ↓
          </div>
          {/* Device Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Status</p>
              <p className={`text-lg font-bold ${
                device.status === 'critical' ? 'text-red-600' :
                device.status === 'warning' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {device.status.toUpperCase()}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">RUL Prediction</p>
              <p className="text-lg font-bold text-slate-900">{device.prediction} days</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Confidence</p>
              <p className="text-lg font-bold text-slate-900">{device.confidence}%</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Health Score</p>
              <p className="text-lg font-bold text-slate-900">{device.health}%</p>
            </div>
          </div>

          {/* Fault History */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-600" />
              Recent Fault History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium text-slate-600">Date</th>
                    <th className="text-left p-3 text-sm font-medium text-slate-600">Fault Code</th>
                    <th className="text-left p-3 text-sm font-medium text-slate-600">Duration</th>
                    <th className="text-left p-3 text-sm font-medium text-slate-600">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {details.faultHistory.map((fault, index) => (
                    <tr key={index}>
                      <td className="p-3">{fault.date}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                          FC_{fault.faultCode}
                        </span>
                      </td>
                      <td className="p-3">{fault.duration}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          fault.severity === 'High' ? 'bg-red-100 text-red-800' :
                          fault.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {fault.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fault Co-occurrences */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <Network className="h-5 w-5 mr-2 text-blue-600" />
              Fault Co-occurrences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.coOccurrences.map((co, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-900">{co.faultCode}</span>
                    <span className="text-sm text-slate-600">{co.occurrences} occurrences</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Correlation:</span>
                      <span className="font-medium">{(co.correlation * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Lift:</span>
                      <span className="font-medium">{co.lift.toFixed(2)}x</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-slate-600">MTBF</p>
                <p className="text-xl font-bold text-slate-900">
                  {details.performance.mtbf.toFixed(1)} hours
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Availability</p>
                <p className="text-xl font-bold text-slate-900">
                  {(details.performance.availability * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Failure Rate</p>
                <p className="text-xl font-bold text-red-600">
                  {(details.performance.failureRate * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Est. Maintenance Cost</p>
                <p className="text-xl font-bold text-slate-900">
                  £{details.performance.maintenanceCost.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 rounded-b-lg flex-shrink-0 sticky bottom-0 bg-opacity-95">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-slate-500 order-2 sm:order-1">
              Generated on {new Date().toLocaleString()}
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 w-full sm:w-auto order-1 sm:order-2">
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium w-full sm:w-auto"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium w-full sm:w-auto">
                Schedule Maintenance
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium w-full sm:w-auto">
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Add missing imports
import { Activity, Clock, Network, TrendingUp } from 'lucide-react';

RealTimeTab.displayName = 'RealTimeTab';
DeviceAnalysisModal.displayName = 'DeviceAnalysisModal';

export default RealTimeTab;