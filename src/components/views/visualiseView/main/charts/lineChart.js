import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import RANDOM_COLORS from '../../../../../assets/styles/random-colors';
import { horizontalLayout } from './chartLayout';
import { Paper, Typography } from '@mui/material';
import { mock } from './mock';
import CustomLegend from './CustomLegend';
import { getInitialChartData, getInitialLegendData } from './util';

const LineChart = ({ initialData = mock }) => {
  const [data, setData] = useState(() => getInitialChartData(mock));

  const [hover, setHover] = useState({
    visible: false,
    x: null,
    y: null,
  });

  const [legend, setLegend] = useState(() => getInitialLegendData(mock));

  const onHover = (hoveredPoint) => {
    if (hoveredPoint.points.length > 0) {
      setHover({
        visible: true,
        x: hoveredPoint.points[0].x,
        y: hoveredPoint.points[0].y,
        left: hoveredPoint?.event.clientX,
        top: hoveredPoint?.event.clientY,
      });
    }
  };

  const onUnhover = (data) => {
    setHover({
      visible: false,
      x: null,
      y: null,
    });
  };

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
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <>
        <Plot
          data={data}
          layout={horizontalLayout}
          config={{ displaylogo: false, responsive: true }}
          // onHover={onHover}
          // onUnhover={onUnhover}
          style={{ height: '100%', width: '100%' }}
        />
        {hover.visible && (
          <Paper
            style={{
              position: 'fixed',
              left: `${hover.left}px`,
              top: `${hover.top}px`,
              backgroundColor: 'white',
              padding: '10px',
              zIndex: 10000,
            }}
          >
            <Typography>x: {hover.x}</Typography>
            <Typography>y: {hover.y}</Typography>
          </Paper>
        )}
        <CustomLegend
          legend={legend}
          onClick={(index) => updateVisibility(index)}
        />
      </>
    </div>
  );
};

export default LineChart;
