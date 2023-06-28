/* eslint-disable quote-props */
import { ErrorDialog } from '../components/common/ErrorDialog';
import { DroppableChart } from '../components/views/visualiseView/main/DroppableChart';
import Test from './Test';

/**
 * Key of the component is the `component` attribute of the widgetConfiguration.
 * This map is used inside the LayoutManager to know which component to display for a given widget.
 */

const componentMap = {
  test: Test,
  droppableChart: DroppableChart,
  errorDialog: ErrorDialog
};

export default componentMap;
