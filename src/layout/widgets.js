import { WidgetStatus } from '@metacell/geppetto-meta-client/common/layout/model';
import { v4 as uuidv4 } from 'uuid';

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
  // id: uuidv4(),
  name: 'Chart',
  component: 'droppableChart',
  enableClose: true,
  status: WidgetStatus.Active,
  // panelName: 'leftPanel'
  props: {
    model: [
      // {
      //   id: '1',
      //   name: 'Test modal',
      // },
    ],
  },
};
