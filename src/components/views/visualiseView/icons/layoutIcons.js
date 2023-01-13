import * as React from 'react';

const style = {
  width: '1em',
  height: '1em',
  display: 'flex',
  alignItems: 'center',
};

export const PlusIcon = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    // style={style}
    {...props}
  >
    <path
      d="M8 3.833v8.333M12.167 8H3.833"
      // stroke="currentColor"
      stroke="#A1A1A1"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseIcon = (props) => (
  <svg
    width={8}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m.75.75 6.5 6.5m0-6.5-6.5 6.5"
      stroke="#000"
      fillOpacity={0.2}
      strokeWidth={1.5}
    />
  </svg>
);

export const MaximizeIcon = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.793 3H3.5a.5.5 0 0 0-.5.5v4.293a.5.5 0 0 0 .854.353l4.292-4.292A.5.5 0 0 0 7.793 3ZM8.207 13H12.5a.5.5 0 0 0 .5-.5V8.207a.5.5 0 0 0-.854-.353l-4.292 4.292a.5.5 0 0 0 .353.854Z"
      fill="#000"
      fillOpacity={0.3}
    />
  </svg>
);
