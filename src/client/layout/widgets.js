import { WidgetStatus } from '@metacell/geppetto-meta-client/common/layout/model';

/**
 *  Widget interface
 * Widget {
  id: string;
  status: WidgetStatus;
  panelName: string;
  defaultPanel?: any;
  defaultPosition?: any;
  defaultWeight?: any;
  hideOnClose?: boolean;
  name: string;
  enableClose?: boolean;
  component: string;
  enableDrag?: boolean;
  enableRename?: boolean;
  pos?: number;
  session: any;
  config: any;
  props: any;
}
 */

/*
 * widget id  needs to be unique
 * panelName should be added on add/update widget
 */
export const DroppableChartWidget = {
  id: 'DroppableChart',
  name: 'Plot Viewer',
  component: 'DroppableChart',
  status: WidgetStatus.Active,
  defaultWeight: 70,
  defaultPanel: 'topPanel',
  enableDrag: true,
  enableClose: true,
  hideOnClose: true,
  enableRename: true,
  props: {
    model: [],
  },
};

export const LogViewerWidget = {
  id: 'LogViewer',
  name: 'LogViewer',
  component: 'LogViewer',
  status: WidgetStatus.Active,
  defaultWeight: 30,
  defaultPanel: 'bottomPanel',
  enableDrag: false,
  enableClose: false,
  hideOnClose: false,
  enableRename: false,
  props: {
    model: [],
  },
}
