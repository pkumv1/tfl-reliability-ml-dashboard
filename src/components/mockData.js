// Mock data for TfL Reliability Dashboard
export const MOCK_DATA = {
  stations: [
    { id: 'TOC1444', name: 'EUSTON', devices: 28, critical: 3, high: 5, medium: 12, low: 8, riskScore: 0.65, mtbf: 512.3, cluster: 'High-Volume', passengerFlow: 45000, energyUsage: 89.2, networkHealth: 78, availability: 94.2, mttr: 45 },
    { id: 'NLR1409', name: 'GOSPEL OAK', devices: 26, critical: 2, high: 4, medium: 10, low: 10, riskScore: 0.42, mtbf: 687.5, cluster: 'Stable', passengerFlow: 12000, energyUsage: 67.8, networkHealth: 92, availability: 98.1, mttr: 32 },
    { id: '0728', name: 'TOTTENHAM COURT ROAD', devices: 32, critical: 4, high: 6, medium: 15, low: 7, riskScore: 0.78, mtbf: 398.2, cluster: 'Critical', passengerFlow: 52000, energyUsage: 95.4, networkHealth: 65, availability: 91.5, mttr: 67 },
    { id: '0534', name: 'CALEDONIAN ROAD', devices: 24, critical: 1, high: 3, medium: 9, low: 11, riskScore: 0.28, mtbf: 892.7, cluster: 'Efficient', passengerFlow: 8500, energyUsage: 45.2, networkHealth: 95, availability: 99.2, mttr: 18 },
    { id: 'TOC5112', name: 'BLACKFRIARS', devices: 29, critical: 3, high: 5, medium: 13, low: 8, riskScore: 0.55, mtbf: 578.9, cluster: 'Moderate', passengerFlow: 28000, energyUsage: 72.1, networkHealth: 85, availability: 96.8, mttr: 38 },
    { id: 'TOC2156', name: 'KINGS CROSS ST PANCRAS', devices: 27, critical: 2, high: 4, medium: 11, low: 10, riskScore: 0.48, mtbf: 723.8, cluster: 'Stable', passengerFlow: 48000, energyUsage: 87.3, networkHealth: 88, availability: 96.5, mttr: 35 },
    { id: 'TOC3401', name: 'PADDINGTON', devices: 30, critical: 3, high: 6, medium: 12, low: 9, riskScore: 0.62, mtbf: 545.7, cluster: 'High-Volume', passengerFlow: 46500, energyUsage: 91.8, networkHealth: 82, availability: 95.1, mttr: 42 },
    { id: 'TOC4782', name: 'VICTORIA', devices: 25, critical: 2, high: 3, medium: 10, low: 10, riskScore: 0.38, mtbf: 812.4, cluster: 'Stable', passengerFlow: 41000, energyUsage: 78.5, networkHealth: 90, availability: 97.3, mttr: 28 },
    { id: 'TOC5923', name: 'WATERLOO', devices: 31, critical: 4, high: 7, medium: 13, low: 7, riskScore: 0.72, mtbf: 458.3, cluster: 'Critical', passengerFlow: 55000, energyUsage: 98.2, networkHealth: 68, availability: 92.8, mttr: 58 },
    { id: 'TOC6754', name: 'LONDON BRIDGE', devices: 24, critical: 1, high: 3, medium: 8, low: 12, riskScore: 0.32, mtbf: 885.9, cluster: 'Efficient', passengerFlow: 38000, energyUsage: 72.9, networkHealth: 93, availability: 98.7, mttr: 22 },
    { id: 'TOC7845', name: 'LIVERPOOL STREET', devices: 26, critical: 2, high: 4, medium: 11, low: 9, riskScore: 0.45, mtbf: 667.2, cluster: 'Moderate', passengerFlow: 42500, energyUsage: 83.7, networkHealth: 86, availability: 96.9, mttr: 31 }
  ],

  realTimeMetrics: [
    { timestamp: '10:00', activeDevices: 137, faults: 12, networkUtilization: 78, powerConsumption: 342, criticalRulDevices: 2, avgRulHours: 204.5 },
    { timestamp: '10:15', activeDevices: 137, faults: 15, networkUtilization: 82, powerConsumption: 356, criticalRulDevices: 3, avgRulHours: 198.2 },
    { timestamp: '10:30', activeDevices: 136, faults: 18, networkUtilization: 85, powerConsumption: 378, criticalRulDevices: 4, avgRulHours: 187.8 },
    { timestamp: '10:45', activeDevices: 135, faults: 21, networkUtilization: 88, powerConsumption: 395, criticalRulDevices: 5, avgRulHours: 175.3 },
    { timestamp: '11:00', activeDevices: 134, faults: 19, networkUtilization: 84, powerConsumption: 387, criticalRulDevices: 4, avgRulHours: 182.6 },
    { timestamp: '11:15', activeDevices: 135, faults: 16, networkUtilization: 81, powerConsumption: 369, criticalRulDevices: 3, avgRulHours: 195.7 },
    { timestamp: '11:30', activeDevices: 136, faults: 14, networkUtilization: 79, powerConsumption: 358, criticalRulDevices: 2, avgRulHours: 208.4 }
  ],

  rulPredictions: [
    { deviceId: '7758', faultCode: 111, rulDays: 12.2, priority: 'Critical', lastFailure: '2024-06-23', expectedRulMinutes: 17561.69, occurrences: 4260, rollingAvgTBF: 294.38, confidence: 0.85, lowerCI: 10.1, upperCI: 14.8, failureTimeframe: 'This Week' },
    { deviceId: '7952', faultCode: 111, rulDays: 14.8, priority: 'Critical', lastFailure: '2024-06-23', expectedRulMinutes: 38670.86, occurrences: 5738, rollingAvgTBF: 212.75, confidence: 0.88, lowerCI: 12.5, upperCI: 17.6, failureTimeframe: 'Next 2 Weeks' },
    { deviceId: '18625', faultCode: 111, rulDays: 16.3, priority: 'Critical', lastFailure: '2024-06-23', expectedRulMinutes: 40699.78, occurrences: 4307, rollingAvgTBF: 166.82, confidence: 0.82, lowerCI: 13.8, upperCI: 19.2, failureTimeframe: 'Next 2 Weeks' },
    { deviceId: '18913', faultCode: 111, rulDays: 18.9, priority: 'High', lastFailure: '2024-06-23', expectedRulMinutes: 126894.36, occurrences: 3167, rollingAvgTBF: 188.57, confidence: 0.90, lowerCI: 16.7, upperCI: 21.8, failureTimeframe: 'Next 3 Weeks' },
    { deviceId: '19060', faultCode: 111, rulDays: 8.5, priority: 'Critical', lastFailure: '2024-06-23', expectedRulMinutes: 12254.30, occurrences: 23138, rollingAvgTBF: 24.71, confidence: 0.92, lowerCI: 7.2, upperCI: 10.1, failureTimeframe: 'Next 7 Days' },
    { deviceId: '8912', faultCode: 37, rulDays: 25.6, priority: 'Medium', lastFailure: '2024-06-20', expectedRulMinutes: 36874.56, occurrences: 2156, rollingAvgTBF: 342.18, confidence: 0.78, lowerCI: 22.1, upperCI: 29.3, failureTimeframe: 'Next Month' },
    { deviceId: '9345', faultCode: 40, rulDays: 42.3, priority: 'Low', lastFailure: '2024-06-18', expectedRulMinutes: 60912.45, occurrences: 1523, rollingAvgTBF: 425.67, confidence: 0.85, lowerCI: 38.7, upperCI: 46.8, failureTimeframe: 'Next 6 Weeks' }
  ],

  failureTimeline: [
    { timeframe: 'Next 7 Days', devices: 1, totalDevices: 1, percentage: 0.33 },
    { timeframe: 'This Week', devices: 1, totalDevices: 2, percentage: 0.66 },
    { timeframe: 'Next 2 Weeks', devices: 2, totalDevices: 4, percentage: 1.33 },
    { timeframe: 'Next 3 Weeks', devices: 1, totalDevices: 5, percentage: 1.66 },
    { timeframe: 'Next Month', devices: 1, totalDevices: 6, percentage: 2.0 },
    { timeframe: 'Next 6 Weeks', devices: 1, totalDevices: 7, percentage: 2.33 }
  ],

  mlModelResults: [
    { model: 'Logistic Regression', accuracy: 0.937, rocAuc: 0.9849, precision: 0.94, recall: 0.94, f1Score: 0.94 },
    { model: 'Random Forest', accuracy: 0.977, rocAuc: 0.9948, precision: 0.98, recall: 0.98, f1Score: 0.98 },
    { model: 'XGBoost', accuracy: 0.987, rocAuc: 0.9976, precision: 0.99, recall: 0.99, f1Score: 0.99 },
    { model: 'CatBoost', accuracy: 0.987, rocAuc: 0.9975, precision: 0.99, recall: 0.99, f1Score: 0.99 },
    { model: 'KNN', accuracy: 0.952, rocAuc: 0.9789, precision: 0.95, recall: 0.95, f1Score: 0.95 },
    { model: 'ANN', accuracy: 0.973, rocAuc: 0.9891, precision: 0.97, recall: 0.97, f1Score: 0.97 }
  ],

  reliabilityTrends: [
    { month: 'Jan', mtbf: 545.2, mttr: 42, availability: 94.8, totalFailures: 87, deviceHours: 47508 },
    { month: 'Feb', mtbf: 567.8, mttr: 39, availability: 95.2, totalFailures: 82, deviceHours: 46559 },
    { month: 'Mar', mtbf: 523.6, mttr: 45, availability: 94.1, totalFailures: 92, deviceHours: 48171 },
    { month: 'Apr', mtbf: 589.4, mttr: 36, availability: 95.8, totalFailures: 78, deviceHours: 46013 },
    { month: 'May', mtbf: 612.8, mttr: 34, availability: 96.2, totalFailures: 74, deviceHours: 45347 },
    { month: 'Jun', mtbf: 598.3, mttr: 38, availability: 95.9, totalFailures: 79, deviceHours: 47286 }
  ],

  xgboostFeatureImportance: [
    { feature: 'ResetsSinceEOD', importance: 0.338688, category: 'Operational', rank: 1 },
    { feature: 'ResetDuration', importance: 0.197823, category: 'Performance', rank: 2 },
    { feature: 'HostType_1', importance: 0.171703, category: 'Hardware', rank: 3 },
    { feature: 'ReasonForResetNULL', importance: 0.072278, category: 'Operational', rank: 4 },
    { feature: 'Max_TodayInServiceDuration', importance: 0.035754, category: 'Service', rank: 5 },
    { feature: 'OperatingMode_4', importance: 0.020753, category: 'Configuration', rank: 6 },
    { feature: 'Max_TodayOutOfServiceDuration', importance: 0.014863, category: 'Service', rank: 7 },
    { feature: 'EMVProcessedSinceLastOSR', importance: 0.014694, category: 'Payment', rank: 8 },
    { feature: 'MinutesCardAcceptingToday', importance: 0.008348, category: 'Service', rank: 9 },
    { feature: 'Temperature_2m_max', importance: 0.007951, category: 'Environmental', rank: 10 }
  ],

  catboostFeatureImportance: [
    { feature: 'ResetsSinceEOD', importance: 21.151630, category: 'Operational', rank: 1 },
    { feature: 'ResetDuration', importance: 13.341538, category: 'Performance', rank: 2 },
    { feature: 'ReasonForResetNULL', importance: 11.959860, category: 'Operational', rank: 3 },
    { feature: 'HostType_1', importance: 9.279066, category: 'Hardware', rank: 4 },
    { feature: 'Max_TodayInServiceDuration', importance: 6.471201, category: 'Service', rank: 5 },
    { feature: 'Temperature_2m_max', importance: 5.960753, category: 'Environmental', rank: 6 },
    { feature: 'Max_TodayInServiceNIVDuration', importance: 2.976163, category: 'Service', rank: 7 },
    { feature: 'EMVProcessedSinceLastOSR', importance: 2.608465, category: 'Payment', rank: 8 },
    { feature: 'Pressure_msl_max', importance: 2.485037, category: 'Environmental', rank: 9 },
    { feature: 'HostType_2', importance: 2.332514, category: 'Hardware', rank: 10 }
  ],

  faultPatterns: [
    { hour: 0, fc111: 5, fc37: 2, fc40: 1, fc118: 3, total: 11 },
    { hour: 4, fc111: 8, fc37: 3, fc40: 2, fc118: 4, total: 17 },
    { hour: 8, fc111: 15, fc37: 7, fc40: 5, fc118: 8, total: 35 },
    { hour: 12, fc111: 22, fc37: 12, fc40: 8, fc118: 15, total: 57 },
    { hour: 16, fc111: 18, fc37: 9, fc40: 6, fc118: 12, total: 45 },
    { hour: 20, fc111: 12, fc37: 5, fc40: 3, fc118: 7, total: 27 }
  ],

  clusterAnalysis: [
    { cluster: 'High-Volume', stations: 2, avgDevices: 29, avgPassengers: 45750, avgMTBF: 529, avgRisk: 0.635, characteristics: 'Heavy traffic, frequent faults, high maintenance' },
    { cluster: 'Critical', stations: 2, avgDevices: 31.5, avgPassengers: 53500, avgMTBF: 428, avgRisk: 0.75, characteristics: 'Highest risk, immediate attention needed' },
    { cluster: 'Stable', stations: 3, avgDevices: 26, avgPassengers: 33667, avgMTBF: 741, avgRisk: 0.426, characteristics: 'Consistent performance, low maintenance' },
    { cluster: 'Efficient', stations: 2, avgDevices: 24, avgPassengers: 23250, avgMTBF: 889, avgRisk: 0.30, characteristics: 'Optimal performance, minimal interventions' },
    { cluster: 'Moderate', stations: 2, avgDevices: 27.5, avgPassengers: 35250, avgMTBF: 623, avgRisk: 0.50, characteristics: 'Balanced load, moderate maintenance' }
  ],

  associationRules: [
    { antecedent: 'FC_111', consequent: 'FC_37', support: 0.45, confidence: 0.78, lift: 2.34, conviction: 3.12 },
    { antecedent: 'FC_118', consequent: 'FC_40', support: 0.32, confidence: 0.65, lift: 1.87, conviction: 2.45 },
    { antecedent: 'FC_37 + FC_40', consequent: 'FC_111', support: 0.28, confidence: 0.72, lift: 2.15, conviction: 2.89 },
    { antecedent: 'FC_19', consequent: 'FC_27', support: 0.23, confidence: 0.58, lift: 1.65, conviction: 1.98 },
    { antecedent: 'FC_15', consequent: 'FC_111', support: 0.19, confidence: 0.52, lift: 1.45, conviction: 1.76 }
  ],

  recommendations: [
    { id: 1, type: 'Critical', title: 'Immediate Maintenance Required', description: 'Device 19060 predicted to fail within 8.5 days (FC_111)', priority: 'High', eta: '2 hours', impact: 'Service disruption prevention' },
    { id: 2, type: 'Critical', title: 'High Risk Device Alert', description: 'Device 7758 showing 12.2 days RUL with 85% confidence', priority: 'High', eta: '1 day', impact: 'Preventive intervention' },
    { id: 3, type: 'Preventive', title: 'Scheduled Inspection Due', description: 'EUSTON station devices approaching maintenance window', priority: 'Medium', eta: '1 week', impact: 'MTBF improvement' },
    { id: 4, type: 'Optimization', title: 'Energy Efficiency Opportunity', description: 'GOSPEL OAK showing potential for 15% energy reduction', priority: 'Low', eta: '2 weeks', impact: 'Cost savings' }
  ],

  coxRegressionResults: [
    { faultCode: 'FC_111', coef: 3.51, expCoef: 33.56, seCoef: 0.01, coefLower: 3.49, coefUpper: 3.54, expCoefLower: 32.73, expCoefUpper: 34.40, zValue: 276.81, pValue: 0.001, significance: 'Critical' },
    { faultCode: 'FC_118', coef: 1.23, expCoef: 3.44, seCoef: 0.02, coefLower: 1.20, coefUpper: 1.26, expCoefLower: 3.33, expCoefUpper: 3.54, zValue: 78.42, pValue: 0.001, significance: 'High' },
    { faultCode: 'FC_38', coef: 2.17, expCoef: 8.74, seCoef: 0.09, coefLower: 1.99, coefUpper: 2.35, expCoefLower: 7.32, expCoefUpper: 10.44, zValue: 23.97, pValue: 0.001, significance: 'High' },
    { faultCode: 'FC_19', coef: 1.36, expCoef: 3.91, seCoef: 0.33, coefLower: 0.71, coefUpper: 2.02, expCoefLower: 2.03, expCoefUpper: 7.52, zValue: 4.09, pValue: 0.001, significance: 'Medium' },
    { faultCode: 'FC_40', coef: 0.65, expCoef: 1.91, seCoef: 0.01, coefLower: 0.62, coefUpper: 0.67, expCoefLower: 1.86, expCoefUpper: 1.96, zValue: 51.26, pValue: 0.001, significance: 'Medium' },
    { faultCode: 'FC_37', coef: 1.13, expCoef: 3.09, seCoef: 0.01, coefLower: 1.10, coefUpper: 1.15, expCoefLower: 3.02, expCoefUpper: 3.16, zValue: 91.65, pValue: 0.001, significance: 'High' },
    { faultCode: 'FC_27', coef: -0.92, expCoef: 0.40, seCoef: 0.03, coefLower: -0.97, coefUpper: -0.87, expCoefLower: 0.38, expCoefUpper: 0.42, zValue: -36.78, pValue: 0.001, significance: 'Protective' },
    { faultCode: 'FC_15', coef: -1.44, expCoef: 0.24, seCoef: 0.09, coefLower: -1.61, coefUpper: -1.27, expCoefLower: 0.20, expCoefUpper: 0.28, zValue: -16.62, pValue: 0.001, significance: 'Protective' }
  ],

  weibullAnalysis: [
    { faultCode: 111, shape: 0.64, scale: 47.80, medianLifetime: 26.88, failures: 272206, failureType: 'Infant Mortality', r2: 0.94 },
    { faultCode: 37, shape: 0.69, scale: 1574.73, medianLifetime: 926.55, failures: 86504, failureType: 'Infant Mortality', r2: 0.91 },
    { faultCode: 40, shape: 1.06, scale: 3572.95, medianLifetime: 2525.43, failures: 51600, failureType: 'Wear-out', r2: 0.89 },
    { faultCode: 10, shape: 0.68, scale: 8592.28, medianLifetime: 5027.90, failures: 13078, failureType: 'Infant Mortality', r2: 0.87 },
    { faultCode: 118, shape: 0.63, scale: 1386.47, medianLifetime: 772.45, failures: 9319, failureType: 'Early-life', r2: 0.93 },
    { faultCode: 3, shape: 0.63, scale: 8015.00, medianLifetime: 4494.17, failures: 7543, failureType: 'Infant Mortality', r2: 0.85 },
    { faultCode: 5, shape: 0.63, scale: 8054.72, medianLifetime: 4519.97, failures: 7535, failureType: 'Infant Mortality', r2: 0.86 },
    { faultCode: 8, shape: 0.69, scale: 11154.99, medianLifetime: 6570.94, failures: 5738, failureType: 'Infant Mortality', r2: 0.88 }
  ],

  survivalCurves: [
    { time: 0, fc111: 1.0, fc37: 1.0, fc40: 1.0, fc118: 1.0, fc10: 1.0, baseline: 1.0 },
    { time: 50, fc111: 0.65, fc37: 0.95, fc40: 0.98, fc118: 0.88, fc10: 0.92, baseline: 0.85 },
    { time: 100, fc111: 0.45, fc37: 0.88, fc40: 0.96, fc118: 0.75, fc10: 0.85, baseline: 0.72 },
    { time: 300, fc111: 0.25, fc37: 0.75, fc40: 0.92, fc118: 0.52, fc10: 0.75, baseline: 0.58 },
    { time: 600, fc111: 0.15, fc37: 0.65, fc40: 0.88, fc118: 0.35, fc10: 0.65, baseline: 0.45 },
    { time: 1200, fc111: 0.08, fc37: 0.45, fc40: 0.82, fc118: 0.25, fc10: 0.55, baseline: 0.32 },
    { time: 2400, fc111: 0.03, fc37: 0.25, fc40: 0.75, fc118: 0.15, fc10: 0.45, baseline: 0.22 },
    { time: 4800, fc111: 0.01, fc37: 0.12, fc40: 0.65, fc118: 0.08, fc10: 0.35, baseline: 0.15 }
  ],

  baselineHazard: [
    { time: 0, hazard: 0.001, smoothed: 0.001 },
    { time: 100, hazard: 0.012, smoothed: 0.010 },
    { time: 500, hazard: 0.008, smoothed: 0.009 },
    { time: 1000, hazard: 0.006, smoothed: 0.007 },
    { time: 2000, hazard: 0.004, smoothed: 0.005 },
    { time: 3000, hazard: 0.007, smoothed: 0.006 },
    { time: 4000, hazard: 0.012, smoothed: 0.010 },
    { time: 5000, hazard: 0.018, smoothed: 0.015 }
  ],

  causationInsights: [
    { category: 'Temporal vs Static', insight: 'Temporal metrics (ResetsSinceEOD, ResetDuration) show higher predictive power than static configuration features', impact: 'High' },
    { category: 'Error Types', insight: 'Activation errors are more predictive than invalid transactions, suggesting fundamental system issues', impact: 'High' },
    { category: 'Entry vs Exit', insight: 'Entry-related metrics rank higher than exit-related ones, indicating cascade effects', impact: 'Medium' },
    { category: 'Processing Time', insight: 'Worst-case processing times are more predictive than averages', impact: 'Medium' },
    { category: 'Environmental', insight: 'Temperature extremes stress systems, suggesting non-linear relationships', impact: 'Medium' },
    { category: 'EMV Sensitivity', insight: 'EMV processing metrics rank higher than Oyster/ITSO, indicating higher sensitivity', impact: 'Low' }
  ]
};