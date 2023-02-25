import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { horizontalLayout } from './chartLayout';
import CustomLegend from './CustomLegend';
import { mock } from './mock';
import { getInitialChartData, getInitialLegendData } from './util';

const chartInfo = { mode: 'markers', type: 'scatter' };
const ScatterChart = () => {
  const [data, setData] = useState(() => getInitialChartData(mock, chartInfo));
  const [legend, setLegend] = useState(() => getInitialLegendData(mock));

  const updateVisibility = (dataIndex) => {
    const newLegendData = [...legend];
    newLegendData[dataIndex].visible = !newLegendData[dataIndex].visible;
    setLegend(newLegendData);

    const newData = [...data];
    newData[dataIndex].line.color =
      newLegendData[dataIndex].visible === true
        ? legend[dataIndex].color
        : 'rgba(0,0,0,0)';
  };

  return (
    <>
      <Plot
        data={data}
        layout={{
          ...horizontalLayout,
        }}
        style={{ height: '100%', width: '100%', overflowY: 'hidden' }}
      />
      <CustomLegend
        legend={legend}
        onClick={(index) => updateVisibility(index)}
      />
    </>
  );
};

export default ScatterChart;
