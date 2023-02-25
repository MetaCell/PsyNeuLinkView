import * as React from 'react';

const LineChartIcon = (props) => (
  <svg
    width={18}
    height={13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.656.92 12.93 6.999a2.25 2.25 0 0 1-2.055.85l-4.363-.545a.75.75 0 0 0-.658.25L1.13 12.955 0 11.967l4.725-5.401a2.25 2.25 0 0 1 1.973-.75l4.363.544a.75.75 0 0 0 .685-.283L16.472 0l1.184.92Z"
      fill="#1A1A1A"
    />
  </svg>
);

const CandleStickIcon = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.5 2.4a.6.6 0 0 0-.6.6v4a.6.6 0 0 0 .6.6h2a.6.6 0 0 0 .6-.6V3a.6.6 0 0 0-.6-.6h-2Zm5.5 7a.6.6 0 0 0-.6.6v3a.6.6 0 0 0 .6.6h2a.6.6 0 0 0 .6-.6v-3a.6.6 0 0 0-.6-.6H7Zm5.5-5a.6.6 0 0 0-.6.6v4a.6.6 0 0 0 .6.6h2a.6.6 0 0 0 .6-.6V5a.6.6 0 0 0-.6-.6h-2Z"
      stroke="#1A1A1A"
      strokeWidth={1.2}
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);

const ScatterIcon = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm6.349-.512-14 10-.698-.976 14-10 .698.976ZM7 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm11 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-4 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      fill="#1A1A1A"
    />
  </svg>
);

export const filters = [
  {
    icon: LineChartIcon,
    value: 'line',
    label: 'Line',
  },
  {
    icon: CandleStickIcon,
    value: 'candle-stick',
    label: 'Candle stick',
  },
  {
    icon: ScatterIcon,
    value: 'scatter',
    label: 'Scatter',
  },
];

export const renderChartIcon = (value) => {
  switch (value) {
    case 'line':
      return <LineChartIcon />;
    case 'candle-stick':
      return <CandleStickIcon />;
    case 'scatter':
      return <LineChartIcon />;
    default:
      return null;
  }
};
