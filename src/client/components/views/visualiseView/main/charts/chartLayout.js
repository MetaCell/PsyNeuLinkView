import vars from '../../../../../assets/styles/variables';

const { gridColor, breadcrumbLinkColor, elementBorderColor } = vars;

// const titleLayoutProps = {
//   text: 'Columns',
//   x: 0,
//   xanchor: 'left',
//   font: {
//     size: 14,
//     color: '#9E9E9E',
//   },
//   text: 'Graphic',
// };

export const marginLayoutProps = {
  t: 50,
  l: 16,
  r: 8,
  b: 42,
};

export const xaxisLayoutProps = {
  tickfont: {
    size: 12,
    color: breadcrumbLinkColor,
  },
  linecolor: gridColor,
  ticklen: 8,
  tickcolor: elementBorderColor,
  automargin: true,
  showgrid: true,
  gridcolor: gridColor,
  zeroline: true,
  zerolinecolor: gridColor,
};

export const yaxisLayoutProps = {
  tickfont: {
    size: 12,
    color: breadcrumbLinkColor,
  },
  tickcolor: 'white',
  automargin: true,
  zeroline: true,
  zerolinecolor: gridColor,
  ticklen: 0,
  // side: 'right',
  gridcolor: gridColor,
};

const hoverLayoutProps = {
  bordercolor: 'rgba(0, 0, 0, 0.16)',
  font: {
    size: 12,
    color: 'white',
  },
};

export const paperColor = {
  paper_bgcolor: 'transparent',
  plot_bgcolor: 'transparent',
};

export const modebar = {
  modebar: {
    orientation: 'v',
  },
};

export const horizontalLayout = {
  // title: titleLayoutProps,
  margin: marginLayoutProps,
  barmode: 'stack',
  xaxis: xaxisLayoutProps,
  yaxis: yaxisLayoutProps,
  hoverlabel: hoverLayoutProps,
  showlegend: false,
  ...paperColor,
  ...modebar,
};

export const candleStickLayout = {
  xaxis: {
    rangeslider: {
      visible: false,
    },
    ...xaxisLayoutProps,
  },
  yaxis: {
    ...yaxisLayoutProps,
  },
  dragmode: 'select',
  showlegend: false,
  margin: marginLayoutProps,
  ...paperColor,
  ...modebar,
};
