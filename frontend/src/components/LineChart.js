import React from "react";
import "./LineChart.css";

const LineChart = ({ data = [] }) => {

  if (!data || data.length === 0) {
    return <div className="chart-container">No data available</div>;
  }

  return (
    <div className="chart-container">
      <h3>Conversations Overview</h3>

      <div className="chart">
        {data.map((item, index) => (
          <div key={index} className="chart-bar">
            <span className="label">
              {item.date || item.day || item.month}
            </span>

            <div
              className="bar"
              style={{ height: `${item.count || item.sales || 0}px` }}
            />

            <span className="value">
              {item.count || item.sales || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
