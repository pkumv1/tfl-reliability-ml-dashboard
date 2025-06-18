# TfL Advanced Reliability Analytics Dashboard

## AI-Powered Predictive Maintenance & Reliability Engineering

A comprehensive React-based dashboard for monitoring and analyzing Transport for London (TfL) device reliability, featuring predictive maintenance capabilities powered by machine learning.

### Features

- **Real-time Monitoring**: Live tracking of 302 devices across 11 stations
- **ML Analytics**: XGBoost and CatBoost models with 98.7% accuracy
- **Survival Analysis**: Weibull analysis and Cox regression hazard models
- **RUL Prediction**: Remaining Useful Life predictions for critical devices
- **Fault Pattern Analysis**: Temporal and association rule mining
- **Station Clustering**: Performance-based grouping and analysis
- **Reliability Metrics**: MTBF, MTTR, and availability tracking
- **Actionable Recommendations**: Prioritized maintenance suggestions

### Tech Stack

- **Frontend**: React 18.2
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/pkumv1/tfl-reliability-ml-dashboard.git
cd tfl-reliability-ml-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Deployment

This project is configured for easy deployment on Vercel:

1. Import this repository in Vercel
2. Vercel will automatically detect the React framework
3. Click "Deploy" - no additional configuration needed!

### Dashboard Sections

1. **System Overview**: High-level metrics and station health status
2. **Real-time Monitor**: Live device monitoring with critical alerts
3. **ML Analytics**: Model performance and feature importance analysis
4. **Survival Analysis**: Failure probability curves and Weibull analysis
5. **Hazard Models**: Cox regression results and risk factors
6. **RUL Prediction**: Device-specific failure predictions
7. **Fault Patterns**: Temporal and co-occurrence analysis
8. **Device Clustering**: Station grouping by performance characteristics
9. **Association Rules**: Fault code relationships and patterns
10. **Reliability Metrics**: MTBF, MTTR, and availability trends
11. **Recommendations**: Prioritized maintenance actions

### Key Metrics

- **Total Devices**: 302
- **Stations**: 11
- **ML Accuracy**: 98.7% (XGBoost)
- **Average Availability**: 95.4%
- **Training Data**: 118K records

### License

MIT License

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.