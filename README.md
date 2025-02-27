# Job Tracker

## Real-time Background Process Monitoring Dashboard

![image](https://github.com/user-attachments/assets/2b72a120-b7ed-48fa-9a53-4a4144722c65)
![image](https://github.com/user-attachments/assets/33d59081-5d4c-4e71-98b0-f148365ff85d)
![githubreadmetableofcontents-Googlemeklanaand16morepages-Profile1-MicrosoftEdge2025-02-2713-44-30-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/a0421466-9a6f-459f-b77f-1c7401d5b516)



A lightweight, easy-to-integrate dashboard for real-time monitoring of background processes in your application.

## 🚀 Why Job Tracker?

After evaluating existing solutions like Hangfire and Quartz for monitoring background processes, I found they lacked the simplicity and ease of integration I was looking for. Job Tracker was built to fill this gap - providing a straightforward, real-time visualization of your background jobs without unnecessary complexity.

## ✨ Features

- **Real-time Monitoring**: Track background jobs as they happen
- **Minimal Backend Integration**: Single API endpoint required
- **Three-level Visualization**:
  - **Summary View**: Aggregate overview of all jobs (HTTP, TASK, etc.)
  - **Type-Based View**: Jobs grouped by background job type
  - **Modular View**: Granular tracking by job name/function
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

The dashboard requires only a single API endpoint that returns job data conforming to this interface:

```typescript
export interface JobInfoBase {
    id: string;
    name: string;
    startTimestamp: number;
    backgroundJobType: string;
    isFinished: boolean;
}
```

### Frontend Architecture

The application automatically maps the received data into three visualization sections:
1. **Main Dashboard**: Summary of all jobs
2. **Type-Specific Views**: Jobs grouped by type (HTTP, TASK, etc.)
3. **Modular View**: Granular job visualization by function name

## 💻 Technology Stack

- **ReactJS**: Component-based UI
- **TypeScript**: Type-safe code
- **MantineUI**: Modern component library
- **TradingView Lightweight Charts**: High-performance charting
- **Vite/Babel**: Fast development and optimized builds

## 🔄 Getting Started

1. Clone the repository
2. Configure your API endpoint
3. Start monitoring your background jobs in real-time

## 🎨 Customization

The dashboard offers customization options:
- Dark/Light theme
- Polling interval configuration
- Chart data retention settings
- Maximum points per chart visualization

## 🧪 Testing Mode

A built-in mock data generator allows you to visualize and test the dashboard without connecting to your backend.
