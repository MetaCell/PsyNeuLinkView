import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { paperColor } from './chartLayout';

const ScatterChart = () => {
  const [data, setData] = useState([
    {
      x: [1, 2, 3, 4, 5],
      y: [2, 1, 3, 5, 4],
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: [10, 20, 30, 40, 50],
        color: 'red',
      },
    },
  ]);

  return (
    <Plot
      data={data}
      layout={{
        title: 'React Plotly Scatter Chart',
        xaxis: {
          title: 'X-axis',
        },
        yaxis: {
          title: 'Y-axis',
        },
        ...paperColor,
      }}
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default ScatterChart;
