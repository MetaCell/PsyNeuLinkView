import * as React from 'react';

export const PlusIcon = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 3.833v8.333M12.167 8H3.833"
      stroke="currentColor"
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
    stroke="currentColor"
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
      fill="currentColor"
    />
  </svg>
);


export const CloseModalIcon = (props) => (
  <svg
    width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18 17.293L22.6465 12.6465L23.3536 13.3536L18.7071 18.0001L23.3536 22.6465L22.6465 23.3536L18 18.7072L13.3536 23.3536L12.6465 22.6465L17.2929 18.0001L12.6465 13.3537L13.3536 12.6466L18 17.293Z" fill="#6E6E73"/>
  </svg>
);
