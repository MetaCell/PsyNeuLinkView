import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { candleStickLayout } from './chartLayout';

const mockData = [
  {
    type: 'candlestick',
    name: 'Mechanism',
    x: [
      '2020-01-01',
      '2020-01-02',
      '2020-01-03',
      '2020-01-04',
      '2020-01-05',
      '2020-01-06',
      '2020-01-07',
      '2020-01-08',
      '2020-01-09',
      '2020-01-10',
    ],
    close: [116, 103, 111, 96, 92, 116, 103, 153, 96, 92],
    decreasing: { line: { color: 'red' } },
    high: [120, 112, 116, 101, 95, 120, 112, 116, 101, 95],
    increasing: { line: { color: 'green' } },
    low: [114, 102, 106, 88, 88, 114, 102, 106, 88, 88],
    open: [119, 106, 110, 95, 90, 114, 102, 106, 88, 88],
  },
];

const CandleStickChart = ({ initialData = mockData }) => {
  return (
    <Plot
      data={initialData}
      layout={candleStickLayout}
      style={{ width: '100%', height: '100%', overflowY: 'hidden' }}
      config={{ displaylogo: false, responsive: true }}
    />
  );
};

export default CandleStickChart;
