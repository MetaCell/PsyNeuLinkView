import {
  Action,
  ActionEvent,
  InputType,
  State,
} from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { DefaultPortModel } from '@projectstorm/react-diagrams';

import { MouseEvent } from 'react';
import {
  MetaLinkModel,
  MetaNodeModel,
  MetaPortModel,
} from '@metacell/meta-diagram';
import { PNLClasses } from '../../../constants';
import ModelSingleton from '../ModelSingleton';

const DEFAULT_EXCLUDE = 20;

export interface CreateLinkStateOptions {
  /**
   * If enabled, the canvas is available to drag
   */
  allowCreate?: boolean;
  allowDrag?: boolean;
}

export interface ICreateMetaLink {
  id: string;
  name: string;
  sourceId: string;
  sourcePortId: string;
  targetId: string;
  targetPortId: string;
  shape: string;
}

/**
 * This state is controlling the creation of a link.
 */
export class CreateLinkState extends State<DiagramEngine> {
  sourcePort: MetaPortModel | undefined;
  link: MetaLinkModel | undefined;
  config: CreateLinkStateOptions;

  constructor() {
    super({ name: 'create-new-link' });
    this.config = {
      allowCreate: false,
      allowDrag: true,
    };
    let filteredPort = [];
    let isSourceInPort = false;

    // @ts-ignore
    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        fire: (actionEvent: ActionEvent<MouseEvent | any>) => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(actionEvent);

          if (
            !this.config.allowCreate ||
            (element instanceof MetaNodeModel &&
              element.getOption('shape') === PNLClasses.COMPOSITION)
          ) {
            return;
          }

          let portElement: MetaPortModel | null = null;

          // get port model if element is an instance of MetaNodeModel
          if (element instanceof MetaNodeModel) {
            const ports = element.getPorts();
            filteredPort = (Object.values(ports) as MetaPortModel[]).filter(
              (port) =>
                isSourceInPort
                  ? port.getOptions()['in']
                  : !port.getOptions()['in']
            );

            portElement = filteredPort[0];
          } else if (element instanceof MetaPortModel) {
            portElement = element;
          }

          const newElement: MetaPortModel =
            element instanceof MetaNodeModel && portElement
              ? (portElement as MetaPortModel)
              : (element as MetaPortModel);

          const {
            event: { clientX, clientY },
          } = actionEvent;
          const ox = this.engine.getModel().getOffsetX();
          const oy = this.engine.getModel().getOffsetY();

          if (
            (element instanceof MetaPortModel && !this.sourcePort) ||
            (element instanceof MetaNodeModel && !this.sourcePort)
          ) {
            this.sourcePort = newElement;
            if (!(this.sourcePort instanceof DefaultPortModel)) {
              this.clearState();
              this.eject();
              return;
            }

            const link = this.sourcePort?.createLinkModel()! as MetaLinkModel;
            const id = link.getID().replaceAll('-', '_');
            link.setOption('id', 'projection_' + id.substring(id.length - 12));
            link?.setSourcePort(this.sourcePort);

            isSourceInPort =
              !(this.sourcePort as DefaultPortModel).getOptions()['in'] ?? true;

            // adjust line start position for metadata input ports
            if ((this.sourcePort as DefaultPortModel).getOptions()['in']) {
              link.getFirstPoint().setPosition(clientX - ox, clientY - oy - 50);
            } else if (element instanceof MetaNodeModel) {
              // link.getFirstPoint().setPosition(clientX - ox, clientY - oy);
            } else {
              link.getFirstPoint().setPosition(clientX - ox - 50, clientY - oy);
            }

            link
              .getLastPoint()
              .setPosition(
                clientX - (ox + DEFAULT_EXCLUDE),
                clientY - (oy + DEFAULT_EXCLUDE)
              );
            
            this.link = this.engine.getModel().addLink(link) as MetaLinkModel;
          } else if (
            (element instanceof MetaPortModel &&
              this.sourcePort &&
              element !== this.sourcePort) ||
            (element instanceof MetaNodeModel && this.sourcePort)
          ) {
            // target meta node model clicked has no input port
            if (!(newElement instanceof DefaultPortModel)) {
              return;
            }
            if (this.sourcePort.canLinkToPort(newElement)) {
              // do nothing when mechanism is a composition
              if (!this.link) return;

              this.link.setTargetPort(newElement);

              this.createMetaLink(this.link);

              this.clearState();
              this.eject();
              this.engine.repaintCanvas();
            }
          } else if (this.link && element === this.link.getLastPoint()) {
            this.link.point(clientX - ox, clientY - oy, -1);
          } else if (this.sourcePort) {
            // the second click was not in a MetaPortModel, so we cancel the link creation
            if (this.link) {
              this.link.remove();
            }
            this.clearState();
            this.eject();
            this.engine.repaintCanvas();
          }

          this.engine.repaintCanvas();
        },
      })
    );

    this.registerAction(
      new Action({
        type: InputType.MOUSE_MOVE,
        fire: (actionEvent: ActionEvent<MouseEvent | any>) => {
          if (!this.link) return;
          const { event } = actionEvent;
          this.link.getLastPoint().setPosition(event.clientX, event.clientY);
          this.engine.repaintCanvas();
        },
      })
    );

    this.registerAction(
      new Action({
        type: InputType.MOUSE_MOVE,
        fire: (actionEvent: ActionEvent<MouseEvent | any>) => {
          if (!this.link) return;
          const { event } = actionEvent;
          this.link.getLastPoint().setPosition(event.clientX, event.clientY);
          this.engine.repaintCanvas();
        },
      })
    );

    this.registerAction(
      new Action({
        type: InputType.KEY_UP,
        fire: (actionEvent: ActionEvent<KeyboardEvent | any>) => {
          // on esc press remove any started link and pop back to default state
          if (this.link && actionEvent.event.keyCode === 27) {
            this.link.remove();
            this.clearState();
            this.eject();
            this.engine.repaintCanvas();
          }
        },
      })
    );
  }

  createMetaLink(link: MetaLinkModel) {
    const modelHandler = ModelSingleton.getInstance();
    const metaGraph = modelHandler.getMetaGraph();
    metaGraph?.addLink(link);
  }

  getEngine() {
    return this.engine;
  }

  clearState() {
    this.link = undefined;
    this.sourcePort = undefined;
  }
}
