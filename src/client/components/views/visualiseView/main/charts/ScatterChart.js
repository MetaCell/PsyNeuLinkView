import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { horizontalLayout } from './chartLayout';
import CustomLegend from './CustomLegend';
import { getInitialLegendData } from './util';

const ScatterChart = ({ data }) => {
  const [legend, setLegend] = useState(() => getInitialLegendData(data));

  const updateVisibility = (dataIndex) => {
    const newLegendData = [...legend];
    newLegendData[dataIndex].visible = !newLegendData[dataIndex].visible;
    setLegend(newLegendData);

    const newData = [...data];
    newData[dataIndex].marker.color =
      newLegendData[dataIndex].visible === true
        ? legend[dataIndex].color
        : 'rgba(0,0,0,0)';
  };

  useEffect(() => {
    setLegend(() => getInitialLegendData(data));
  }, [data]);

  return (
    <>
      <Plot
        data={data}
        layout={{
          ...horizontalLayout,
        }}
        style={{ height: '100%', width: '100%', overflowY: 'hidden' }}
        config={{ displaylogo: false, responsive: true }}
      />
      <CustomLegend
        legend={legend}
        onClick={(index) => updateVisibility(index)}
      />
    </>
  );
};

export default ScatterChart;
