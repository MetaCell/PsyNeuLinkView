/* eslint-disable quote-props */
import { LogViewer } from '../components/common/LogViewer';
import { DroppableChart } from '../components/views/visualiseView/main/DroppableChart';

/**
 * Key of the component is the `component` attribute of the widgetConfiguration.
 * This map is used inside the LayoutManager to know which component to display for a given widget.
 */

const componentMap = {
  LogViewer: LogViewer,
  DroppableChart: DroppableChart,
};

export default componentMap;
