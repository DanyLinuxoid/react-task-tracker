# Simple Job Tracker

## Real-time Background Process Monitoring Dashboard

![charts](https://github.com/user-attachments/assets/241e9013-f5e0-4736-8bd2-3d2640e2c661)

A lightweight, easy-to-integrate dashboard for real-time monitoring of background processes in your application.

## 🚀 Why Job Tracker?

After evaluating existing solutions like Hangfire and Quartz for monitoring background processes, I found they lacked the simplicity and ease of integration I was looking for. Job Tracker was built to fill this gap - providing a straightforward, real-time visualization of your background jobs without unnecessary complexity.

## ✨ Features

- **Real-time Monitoring**: Track background jobs as they happen
- **Minimal Backend Integration**: Single API endpoint required
- **Three-level Visualization**
- **Fully Configurable**:
  - Data polling frequency
  - Update intervals
  - Theme customization
  - Maximum data points per chart
  - Test mode with mock data generation

## 📊 Advanced Charting

The dashboard leverages **TradingView Lightweight Charts** library - the industry-leading solution for performant, interactive time-series visualization. This powerful charting tool provides:

- High-performance rendering even with large datasets
- Professional-grade financial charting capabilities
- Smooth real-time updates
- Extensive customization options

While primarily designed for job monitoring, this dashboard can also be repurposed to track market quotes and financial data, thanks to the flexibility of the TradingView charts implementation.

## 🔧 Technical Implementation

### Backend Integration

The dashboard requires only a single API endpoint that returns job data array conforming to this interface:

```typescript
export interface JobInfoBase {
    id: string;
    name: string;
    startTimestamp: number;
    backgroundJobType: string;
    isFinished: boolean;
}
```
NOTE: field ```startTimestamp``` is timestamp in seconds!
### Frontend Architecture

The application automatically maps the received data into three visualization sections:
1. **Main Dashboard**: Summary of all jobs
2. **Type-Specific Views**: Jobs grouped by ```backgroundJobType: string;``` property (HTTP, TASK, etc groups)
3. **Modular View**: Granular job visualization grouped by ```name: string;``` property (function/method names)

## 💻 Technology Stack

- **ReactJS**: Component-based UI
- **TypeScript/Javascript**: Type-safe code
- **HTML+CSS**: For good looking UI
- **MantineUI**: Modern UI component library 
- **TradingView Lightweight Charts**: High-performance charting
- **Vite/Babel**: Fast development and optimized builds

## 🔄 Getting Started

1. Clone the repository
2. Configure your API endpoint
3. Start monitoring your background jobs in real-time

## 🧪 Testing Mode

A built-in mock data generator allows you to visualize and test the dashboard without connecting to your backend.
