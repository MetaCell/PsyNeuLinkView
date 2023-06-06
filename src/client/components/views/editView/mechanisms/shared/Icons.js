import * as React from "react"
export const RemoveCircleOutline = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path stroke="#000" strokeWidth={0.8} d="M4.8 8h6.4" />
    <rect
      width={15.2}
      height={15.2}
      x={0.4}
      y={0.4}
      stroke="#1A1A1A"
      strokeWidth={0.8}
      rx={7.6}
    />
  </svg>
)


export const AddCircleOutline = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#1A1A1A"
      fillRule="evenodd"
      d="M7.6 7.6V4.8h.8v2.8h2.8v.8H8.4v2.8h-.8V8.4H4.8v-.8h2.8Z"
      clipRule="evenodd"
    />
    <rect
      width={15.2}
      height={15.2}
      x={0.4}
      y={0.4}
      stroke="#1A1A1A"
      strokeWidth={0.8}
      rx={7.6}
    />
  </svg>
)

export const compositionIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      d="M14 9a1 1 0 0 0 .866-1.5M14 9a1 1 0 1 1 .866-1.5M14 9l-.5 4.041M5.5 14a1.5 1.5 0 1 1 1.415-1M5.5 14 5 17.5m.5-3.5a1.5 1.5 0 0 0 1.415-1M5 17.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM6.915 13l3.486 1.5m0 0a3 3 0 1 0 5.36 2.673m-5.36-2.673a2.999 2.999 0 0 1 3.099-1.459m0 0a3 3 0 0 1 2.262 4.132M14.866 7.5l2.906-1.638m0 0a1.5 1.5 0 1 0 2.456-1.724 1.5 1.5 0 0 0-2.456 1.724Zm-2.01 11.311 3.553 2.098m0 0a1 1 0 1 0 1.37 1.457 1 1 0 0 0-1.37-1.457Z"
    />
  </svg>
)

export const ParameterEstimationIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      d="M13.828 13.828 17 17m-2-6a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm6.5 1a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0Z"
    />
  </svg>
)

export const MechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 14.7a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.055 14.454a1.35 1.35 0 0 0 .27 1.49l.049.049a1.636 1.636 0 0 1-.531 2.67 1.637 1.637 0 0 1-1.785-.355l-.049-.049a1.35 1.35 0 0 0-1.489-.27 1.35 1.35 0 0 0-.818 1.235v.14a1.636 1.636 0 1 1-3.273 0v-.074a1.35 1.35 0 0 0-.884-1.235 1.35 1.35 0 0 0-1.489.27l-.049.049a1.635 1.635 0 0 1-2.315 0 1.635 1.635 0 0 1 0-2.316l.049-.049a1.35 1.35 0 0 0 .27-1.489 1.35 1.35 0 0 0-1.236-.818h-.139a1.636 1.636 0 1 1 0-3.273h.074a1.35 1.35 0 0 0 1.235-.884 1.35 1.35 0 0 0-.27-1.489l-.049-.049a1.636 1.636 0 1 1 2.316-2.315l.049.049a1.35 1.35 0 0 0 1.489.27h.065a1.35 1.35 0 0 0 .819-1.236v-.139a1.636 1.636 0 1 1 3.272 0v.074a1.35 1.35 0 0 0 .819 1.235 1.35 1.35 0 0 0 1.489-.27l.049-.049a1.637 1.637 0 1 1 2.315 2.316l-.049.049a1.35 1.35 0 0 0-.27 1.489v.065a1.35 1.35 0 0 0 1.235.819h.14a1.636 1.636 0 1 1 0 3.272h-.074a1.35 1.35 0 0 0-1.235.819Z"
    />
  </svg>
)


export const TransferMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      strokeLinecap="square"
      d="M20 19.994 12.028 20M4 20h8.028M4 18l1.602-1.602a5.266 5.266 0 0 1 5.573-1.207v0a5.266 5.266 0 0 0 6.739-2.975L20 7m-7.972 13V4"
    />
  </svg>
)


export const ComparatorMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      d="M3 16.444v-.133c0-.281 0-.422.022-.56.02-.12.051-.24.096-.355.05-.13.12-.252.261-.496L6.6 9.333M3 16.444C3 18.408 4.612 20 6.6 20s3.6-1.592 3.6-3.556m-7.2 0v-.177c0-.25 0-.374.049-.469a.447.447 0 0 1 .197-.194c.096-.048.222-.048.474-.048h5.76c.252 0 .378 0 .474.048.085.043.154.11.197.194.049.095.049.22.049.469v.177m-3.6-7.11L9.82 14.9c.142.244.213.366.262.496.045.115.077.234.096.356.022.137.022.278.022.559v.133m-3.6-7.11 10.8-1.778m-3.6 7.11v-.133c0-.281 0-.422.022-.559.02-.122.051-.24.096-.356.05-.13.12-.252.262-.496l3.22-5.566m-3.6 7.11c0 1.964 1.612 3.556 3.6 3.556S21 16.63 21 14.667m-7.2 0v-.178c0-.249 0-.373.049-.469a.448.448 0 0 1 .197-.194c.096-.048.222-.048.474-.048h5.76c.252 0 .378 0 .474.048.085.043.154.11.197.194.049.096.049.22.049.469v.178m-3.6-7.111 3.22 5.566c.142.244.212.366.262.496.045.115.077.234.096.356.022.137.022.278.022.56v.133M12 4v4.444"
    />
  </svg>
)

export const ControlMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      strokeLinecap="square"
      d="M5.5 4v7m0 0a2 2 0 1 1 0 4m0-4a2 2 0 1 0 0 4m7-11v2m0 0a2 2 0 1 1 0 4m0-4a2 2 0 1 0 0 4m6-6v10m0 0a2 2 0 1 1 0 4m0-4a2 2 0 1 0 0 4m0 0v2m-13 0v-5m7 5V10"
    />
  </svg>
)


export const ObjMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      d="M21 12.889a8.804 8.804 0 0 0-2.573-6.222M21 12.889h-2.7m2.7 0a8.808 8.808 0 0 1-2.7 6.347M3 12.888C3 7.98 7.03 4 12 4m-9 8.889h2.7m-2.7 0a8.808 8.808 0 0 0 2.7 6.347M12 4v2.667M12 4a9.028 9.028 0 0 1 6.427 2.667m-12.727 0 1.8 1.777m10.927-1.777L13.8 10.9m-8.1 8.335c.282.274.583.529.9.764h2.7l.592-.585a3 3 0 0 1 4.216 0L14.7 20h2.7c.317-.235.617-.49.9-.764m-12.6 0 1.8-1.903m10.8 1.903-1.8-1.903m-1.8-4.444c0 1.473-1.209 2.667-2.7 2.667s-2.7-1.194-2.7-2.667c0-1.473 1.209-2.667 2.7-2.667s2.7 1.194 2.7 2.667Z"
    />
  </svg>
)

export const RecurrentTransferMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      d="M20 10.444s-1.583-2.124-2.869-3.392A7.137 7.137 0 0 0 12.105 5C8.181 5 5 8.134 5 12s3.181 7 7.105 7A7.127 7.127 0 0 0 18 15.91m2-5.466V5.778m0 4.666h-4.737"
    />
  </svg>
)

export const IntegratorMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      d="m7.525 15.564-.043.043a1.455 1.455 0 0 0-.314 1.586 1.456 1.456 0 0 0 .783.788 1.437 1.437 0 0 0 1.575-.316l.044-.043a1.19 1.19 0 0 1 1.315-.24 1.205 1.205 0 0 1 .78 1.098v.066c0 .385.152.755.423 1.028a1.44 1.44 0 0 0 2.044 0 1.46 1.46 0 0 0 .423-1.029v-.123a1.205 1.205 0 0 1 1.417-1.181c.234.043.45.155.62.323l.044.043a1.444 1.444 0 0 0 1.576.316 1.445 1.445 0 0 0 .782-.788 1.463 1.463 0 0 0-.313-1.586l-.044-.043a1.202 1.202 0 0 1-.238-1.324 1.199 1.199 0 0 1 1.09-.728h.066c.383 0 .75-.153 1.022-.426a1.46 1.46 0 0 0 0-2.056 1.44 1.44 0 0 0-1.022-.426h-.123a1.187 1.187 0 0 1-1.09-.728V9.76a1.208 1.208 0 0 1 .238-1.324l.043-.043a1.456 1.456 0 0 0 .314-1.586 1.456 1.456 0 0 0-.783-.788 1.437 1.437 0 0 0-1.576.316l-.043.043a1.19 1.19 0 0 1-1.315.24 1.194 1.194 0 0 1-.723-1.098v-.065a1.46 1.46 0 0 0-.423-1.029 1.44 1.44 0 0 0-2.043 0 1.46 1.46 0 0 0-.424 1.029v.123a1.205 1.205 0 0 1-.722 1.098h-.058a1.185 1.185 0 0 1-1.315-.24l-.043-.043a1.445 1.445 0 0 0-1.576-.316 1.445 1.445 0 0 0-.783.788 1.463 1.463 0 0 0 .314 1.586l.043.044M11.25 9.5 14 12.25m0 0L11.25 15M14 12.25H3"
    />
  </svg>
)


export const DDMIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      strokeLinecap="square"
      d="M19.945 19.989 5.505 20c-.526 0-.79 0-.991-.103a.942.942 0 0 1-.411-.412C4 19.283 4 19.019 4 18.49V4m2.5 5.5 1 5.5 1-8 1 2.5 1-2 1-1 1 1 1 5.5 1-4 1 6 1.188-3 .812-4 1 1"
    />
  </svg>
)

export const LCAMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      fill="currentColor"
      d="M5.78 4.015H5.26v1.042h.521V4.015Zm3.754.52h.521a.521.521 0 0 0-.52-.52v.52ZM9.013 8.29v.521h1.042V8.29H9.013ZM4.34 11.75H3.82h.52Zm4.886-6.176.412-.318-.636-.825-.413.318.637.825Zm1.43 14.273.513.09.178-1.028-.514-.089-.178 1.027Zm7.449.146h.521V18.95h-.521v1.043Zm-3.754-.521h-.521c0 .287.233.52.52.52v-.52Zm.521-3.755v-.52h-1.042v.52h1.042Zm4.672-3.46h-.521.521Zm-4.886 6.176-.412.319.636.825.413-.318-.637-.826ZM13.344 4.181l-.512-.096-.192 1.024.512.096.192-1.024Zm-7.564.876h3.754V4.015H5.78v1.042Zm3.233-.521V8.29h1.042V4.536H9.013Zm-4.15 7.214c0-1.539.692-2.784 1.6-3.805.915-1.03 2.002-1.783 2.764-2.37l-.637-.826c-.71.547-1.907 1.379-2.907 2.504C4.674 8.388 3.82 9.87 3.82 11.75h1.042Zm5.971 7.07c-3.156-.546-5.972-3.19-5.972-7.07H3.82c0 4.453 3.247 7.476 6.836 8.097l.178-1.027Zm7.272.13h-3.754v1.043h3.754V18.95Zm-3.233.521v-3.754h-1.042v3.754h1.042Zm4.15-7.213c0 1.539-.692 2.784-1.6 3.804-.915 1.031-2.002 1.784-2.764 2.371l.637.826c.71-.548 1.907-1.38 2.907-2.504 1.009-1.136 1.863-2.617 1.863-4.497h-1.042Zm-5.871-7.052c3.115.584 5.872 3.212 5.872 7.052h1.042c0-4.405-3.179-7.412-6.722-8.077l-.192 1.024Z"
    />
  </svg>
)

export const KohonenMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      strokeLinecap="square"
      d="M13.5 2.5h-3L9 5l1.5 2.5h3L15 5l-1.5-2.5ZM19.5 6h-3L15 8.5l1.5 2.5h3L21 8.5 19.5 6ZM19.5 13h-3L15 15.5l1.5 2.5h3l1.5-2.5-1.5-2.5ZM7.5 13h-3L3 15.5 4.5 18h3L9 15.5 7.5 13ZM7.5 6h-3L3 8.5 4.5 11h3L9 8.5 7.5 6ZM13.5 9.5h-3L9 12l1.5 2.5h3L15 12l-1.5-2.5ZM13.5 16.5h-3L9 19l1.5 2.5h3L15 19l-1.5-2.5Z"
    />
  </svg>
)

export const KWTAMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      d="M4.5 10a1 1 0 0 0-.5-.866m.5.866a1 1 0 0 1-.5.866M4.5 10 8 9m1 1a1 1 0 0 0 .625-1.78M9 10a1 1 0 0 1-1-1m1 1-.5 2.5M8 9a1 1 0 0 1 .5-.866M13 4a1 1 0 1 0-2 0m2 0 4.134 2M13 4a1 1 0 0 1-.5.866M11 4l-3.803.783M11 4a1 1 0 0 0 .5.866m9 8.634a1 1 0 1 0-.261-1.966M20.5 13.5a1 1 0 0 1-1-1m1 1-3.5 6m2.5-7a1 1 0 0 1 .739-.966m-.739.966L17.814 14M17 15.58a1 1 0 0 0 .814-1.58M17 15.58a1 1 0 0 1-1-1m1 1-1 2.92m0-3.92L9.5 13.5m6.5 1.08a1 1 0 0 1 .5-.866m-7-.214a1 1 0 0 1-.5.866m.5-.866a.996.996 0 0 0-.134-.5m-1.866.5a1 1 0 0 0 1.5.866M7.5 13.5a1 1 0 0 1 1-1m-1 1L4 10.866M8.5 12.5a1 1 0 0 1 .866.5M17 19.5a1 1 0 1 1-1.758-.652M17 19.5a1 1 0 0 0-1-1m0 0a.998.998 0 0 0-.758.348M14 9a1 1 0 0 0-.866 1.5M14 9l-1.5-4.134M14 9c.26 0 .498.1.676.263M4 9.133a1 1 0 1 0 0 1.732m0-1.731L5.85 6.26m0 0a.996.996 0 0 0 1.3 0m-1.3 0a1 1 0 1 1 1.348-1.476m0 0A.997.997 0 0 1 7.15 6.26M17.134 6a.995.995 0 0 0 .125 1.171M17.134 6a1 1 0 1 1 1.607 1.171m0 0a.998.998 0 0 1-1.482 0m1.482 0 1.498 4.363m-4.997 7.314L9 14.366m-.5-6.232a.995.995 0 0 1 1.125.085M8.5 8.134 7.15 6.26m2.475 1.96L11.5 4.865m0 0a.996.996 0 0 0 1 0m2.176 4.397a.997.997 0 0 1 .19 1.237m-.19-1.237 2.583-2.092M14.866 10.5a1 1 0 0 1-1.732 0m1.732 0 1.634 3.214m0 0a.999.999 0 0 1 1.314.286m-4.68-3.5L9.366 13"
    />
  </svg>
)

export const EpisodicMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      d="M21 12H9m12-5H9m12 10H9m-4-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
    />
  </svg>
)

export const GatingMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      d="M17 2v4l-6 4m0 0v2m0-2V8m0 6 6 4v4m-6-8v-2m0 2v2m0-4H3m18 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
    />
  </svg>
)

export const OptimalMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/currentColor/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="currentColor"
      strokeLinecap="square"
      d="M12 7v4.5m0 0v0a1.5 1.5 0 0 0-1.5 1.5v0a1.5 1.5 0 0 0 1.5 1.5v0m0-3v0a1.5 1.5 0 0 1 1.5 1.5v0a1.5 1.5 0 0 1-1.5 1.5v0m0 0V17m5.5-8.5v0A1.5 1.5 0 0 1 19 10v0a1.5 1.5 0 0 1-1.5 1.5v0m0-3v0A1.5 1.5 0 0 0 16 10v0a1.5 1.5 0 0 0 1.5 1.5v0m0-3V7m0 4.5V17M6 17h1a1 1 0 0 0 1-1v0a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v0a1 1 0 0 0 1 1Zm0-4h1a1 1 0 0 0 1-1v0a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v0a1 1 0 0 0 1 1Zm0-4h1a1 1 0 0 0 1-1v0a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v0a1 1 0 0 0 1 1Zm-.8 11h13.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 18.48 22 17.92 22 16.8V7.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 4 19.92 4 18.8 4H5.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C2 5.52 2 6.08 2 7.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C3.52 20 4.08 20 5.2 20Z"
    />
  </svg>
)

export const AGTMechIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      stroke="#000"
      d="M2 15h8m0 0-3-3m3 3-3 3m15-3h-8m0 0 3 3m-3-3 3-3m-5-7v4M7 7l2.5 3m5 0L17 7"
    />
  </svg>
)