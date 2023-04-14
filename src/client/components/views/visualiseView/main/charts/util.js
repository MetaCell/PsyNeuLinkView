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
        chartItem = {
          x: current.x,
          y: current.y,
          text: current.text,
          name: current.name,
          type: chartInfo?.type ?? 'scatter',
          mode: chartInfo?.mode ?? 'lines',
          line: {
            color,
          },
          marker: {
            color,
            size: 12,
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

/**
 * Default: return a array of number base on length
 *
 * @param {Integer} length Desired length
 * @param {Integer} max Desired maximum number
 * @return {Array}
 */
export const randomArray = (length, max) =>
  Array(length)
    .fill()
    .map(() => Math.round(Math.random() * max));

/**
 * Pseudo-random string generator
 * http://stackoverflow.com/a/27872144/383904
 * Default: return a random alpha-numeric string
 *
 * @param {Integer} length Desired length
 * @return {String}
 */
export function randomString(length) {
  var str = ''; // String result
  for (var i = 0; i < length; i++) {
    // Loop `length` times
    var rand = Math.floor(Math.random() * 62); // random: 0..61
    var charCode = (rand += rand > 9 ? (rand < 36 ? 55 : 61) : 48); // Get correct charCode
    str += String.fromCharCode(charCode); // add Character to str
  }
  return str; // After all loops are done, return the concatenated string
}
