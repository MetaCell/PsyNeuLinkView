import * as React from 'react';

export const FileIcon = (props) => (
  <svg
    width={14}
    height={13}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.396 1.986h5.312v1.069H1.396v-1.07Zm-1-1h7.312V3.085h5.688V12.022h-13V.985Zm1 3.099h11v6.937h-11V4.085Z"
      fill={props.color ?? '#8F8F8F'}
    />
  </svg>
);

export const ShapeArrowToolIcon = (props) => (
  <svg
    width={11}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 0 5.423 1.494l4.083 4.083L11 0ZM1.354 10.354l6.818-6.818-.708-.708L.646 9.646l.708.708Z"
      fill={props.color ?? '#8F8F8F'}
    />
  </svg>
);

export function CircleIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="12"
      fill="none"
      viewBox="0 0 14 12"
    >
      <g filter="url(#filter0_d_488_8120)" shapeRendering="crispEdges">
        <rect
          width="10"
          height="10"
          x="2"
          y="1"
          fill={props.color ?? '#8F8F8F'}
          fillOpacity="0.2"
          rx="5"
        ></rect>
        <rect
          width="9"
          height="9"
          x="2.5"
          y="1.5"
          stroke="#8F8F8F"
          rx="4.5"
        ></rect>
      </g>
      <defs>
        <filter
          id="filter0_d_488_8120"
          width="14"
          height="14"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="1"></feOffset>
          <feGaussianBlur stdDeviation="1"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_488_8120"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_488_8120"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}
export const CloseIcon = (props) => (
  <svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 5.293 10.646.646l.708.708L6.707 6l4.647 4.646-.707.708L6 6.707l-4.646 4.647-.708-.707L5.293 6 .646 1.354l.708-.707L6 5.293Z"
      fill="#000"
      fillOpacity={0.8}
    />
  </svg>
);

export const TargetIcon = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 6V3.025A5.002 5.002 0 0 0 3.025 7.5H6v1H3.025A5.002 5.002 0 0 0 7.5 12.975V10h1v2.975A5.002 5.002 0 0 0 12.975 8.5H10v-1h2.975A5.002 5.002 0 0 0 8.5 3.025V6h-1Zm6.48 1.5A6.001 6.001 0 0 0 8.5 2.02V0h-1v2.02A6.001 6.001 0 0 0 2.02 7.5H0v1h2.02a6.001 6.001 0 0 0 5.48 5.48V16h1v-2.02a6.001 6.001 0 0 0 5.48-5.48H16v-1h-2.02Z"
      fill="#1A1A1A"
    />
  </svg>
);

export const HiddenIcon = (props) => (
  <svg
    width={16}
    height={7}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.508 1.801A8.031 8.031 0 0 0 14.93 0h-1.185A6.992 6.992 0 0 1 8 3a6.992 6.992 0 0 1-5.746-3H1.07a8.032 8.032 0 0 0 1.421 1.801L.896 3.396l.708.707L3.26 2.446c.71.523 1.511.932 2.374 1.199l-.617 2.22.964.269.626-2.255a8.05 8.05 0 0 0 2.784 0l.626 2.255.964-.268-.617-2.221a7.974 7.974 0 0 0 2.374-1.2l1.657 1.658.708-.707-1.595-1.595Z"
      fill="#1A1A1A"
      fillOpacity={0.3}
    />
  </svg>
);

export const ArrowDropDownIcon = (props) => (
  <svg
    width={8}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M.147 2.853 3.183 5.89a.5.5 0 0 0 .707 0l3.035-3.036A.5.5 0 0 0 6.572 2H.5a.5.5 0 0 0-.354.853Z"
      fill="#000"
      fillOpacity={0.3}
    />
  </svg>
);

export const ArrowRightIcon = (props) => (
  <svg
    width={8}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m2.372 7.389 3.036-3.036a.5.5 0 0 0 0-.707L2.372.611a.5.5 0 0 0-.853.353v6.071a.5.5 0 0 0 .853.354Z"
      fill="#000"
      fillOpacity={0.3}
    />
  </svg>
);
