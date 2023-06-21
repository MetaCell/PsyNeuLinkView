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
  name: 'Chart',
  component: 'droppableChart',
  enableClose: true,
  status: WidgetStatus.Active,
  props: {
    model: [],
  },
};

export const ErrorDialogWidget = {
  name: 'ErrorDialog',
  component: 'errorDialog',
  props: {
    hasClosingIcon: true,
    hasClosingButton: true,
    description: 'You have to pass error here',
    title: "An error has occurred",
    isError: true
  },
 
}
