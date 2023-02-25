import RANDOM_COLORS from '../../../../../assets/styles/random-colors';

const getRandomColors = (data) => {
  if (data) {
    return data.length > 0
      ? data.map((item, index) => RANDOM_COLORS[index % 200])
      : [];
  }
};

/**
 *
 *
 * @export
 * @param {*} data
 * @param {*} {type= 'scatter', mode = 'lines'}
 * @return {*}
 */
export function getInitialChartData(data, chartInfo) {
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
          type: chartInfo?.type ?? 'scatter',
          mode: chartInfo?.mode ?? 'lines',
          line: {
            color,
          },
        };

        prev.push(chartItem);
      }
      return prev;
    }, []);

    return chartData;
  }
}

/**
 *
 *
 * @export
 * @param {*array} data
 * @return {*array}  lengend array
 */
export function getInitialLegendData(data) {
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

        prev.push(legendItem);
      }
      return prev;
    }, []);

    return legendData;
  }
}
