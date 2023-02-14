import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { alpha, Box } from '@mui/system';
import RANDOM_COLORS from '../../../../../assets/styles/random-colors';
import { horizontalLayout, modebar } from './chartLayout';
import { Paper, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import vars from '../../../../../assets/styles/variables';
import { mock } from './mock';

const { breadcrumbLinkColor } = vars;

const OPACITY = 0.4;

const getRandomColors = (data) => {
  if (data) {
    return data.length > 0
      ? data.map((item, index) => RANDOM_COLORS[index % 200])
      : [];
  }
};

function getInitialChartData(data) {
  let chartData;

  const randomColors = getRandomColors(data);
  if (data !== undefined) {
    chartData = data.reduce((prev, current, currentIndex) => {
      let chartItem;
      const color = randomColors[currentIndex];

      if (current !== undefined) {
        const x = current.info?.map((d) => d.x);
        const text = current.info?.map((d) => d.text);
        const y = current.info?.map((d) => d.y);
        chartItem = {
          x,
          y,
          text,
          name: current.name,
          type: 'scatter',
          mode: 'lines',
          fill: 'tozeroy',
          line: {
            color,
          },
          fillcolor: alpha(color, OPACITY),
        };

        prev.push(chartItem);
      }
      return prev;
    }, []);

    return chartData;
  }
}

function getInitialLegendData(data) {
  let legendData;

  const randomColors = getRandomColors(data);
  if (data !== undefined) {
    legendData = data.reduce((prev, current, currentIndex) => {
      let legendItem;
      const color = randomColors[currentIndex];
      if (current !== undefined) {
        legendItem = {
          name: current.name,
          color,
          visible: true,
        };
        console.log(currentIndex, current.name, legendItem, 'curIndex');

        prev.push(legendItem);
      }
      return prev;
    }, []);

    return legendData;
  }
}

const useStyles = makeStyles(() => ({
  topRight: {
    position: 'absolute',
    top: 18,
    left: 16,
    overflowX: 'hidden',
    width: '60%',
    maxWidth: '60%',
  },
  legend: {
    overflowX: 'scroll',
    scrollbarWidth: 'none' /* Firefox */,

    '&::-webkit-scrollbar': {
      display: 'none',
    },

    '& .item': {
      cursor: 'pointer',
      flexShrink: 0,
      '& .MuiTypography-root': {
        fontSize: '0.625rem',
        fontWeight: 500,
        color: breadcrumbLinkColor,
        lineHeight: '1rem',
        // wordWrap: 'normal',
      },
    },
  },
}));

const LineChart = ({ initialData = mock }) => {
  const classes = useStyles();
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

    newData[dataIndex].fillcolor =
      newLegendData[dataIndex].visible === true
        ? alpha(legend[dataIndex].color, OPACITY)
        : 'rgba(0,0,0,0)';
    setData(newData);
  };

  console.log(data, 'data');

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
        <Box className={classes.topRight}>
          <Stack direction="row" spacing={1} className={classes.legend}>
            {legend.map((item, index) => {
              console.log(item, 'item');
              return (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  onClick={() => updateVisibility(index)}
                  spacing={0.5}
                  className="item"
                >
                  <div
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: item.color,
                      borderRadius: '2px',
                    }}
                  />
                  <Typography>{item?.name}</Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      </>
    </div>
  );
};

export default LineChart;
