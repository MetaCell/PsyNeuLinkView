import {
  Action,
  ActionEvent,
  InputType,
  State,
} from '@projectstorm/react-canvas-core';
import {
  PortModel,
  LinkModel,
  DiagramEngine,
} from '@projectstorm/react-diagrams-core';
import { DefaultPortModel } from '@projectstorm/react-diagrams';

import { MouseEvent } from 'react';
import { MetaNodeModel } from '@metacell/meta-diagram';
import { PNLClasses } from '../../../constants';

const DEFAULT_EXCLUDE = 20;

export interface CreateLinkStateOptions {
  /**
   * If enabled, the canvas is available to drag
   */
  allowCreate?: boolean;
}

/**
 * This state is controlling the creation of a link.
 */
export class CreateLinkState extends State<DiagramEngine> {
  sourcePort: PortModel | undefined;
  link: LinkModel | undefined;
  config: CreateLinkStateOptions;

  constructor() {
    super({ name: 'create-new-link' });
    this.config = {
      allowCreate: true,
    };
    let filteredPort = [];
    let isSourceInPort = false;

    // @ts-ignore
    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        fire: (actionEvent: ActionEvent<MouseEvent | any>) => {
          if (!this.config.allowCreate) {
            return;
          }

          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(actionEvent);

          const {
            event: { clientX, clientY },
          } = actionEvent;
          const ox = this.engine.getModel().getOffsetX();
          const oy = this.engine.getModel().getOffsetY();

          if (
            (element instanceof PortModel && !this.sourcePort) ||
            (element instanceof MetaNodeModel && !this.sourcePort)
          ) {
            let portElement: DefaultPortModel | null = null;

            if (element instanceof MetaNodeModel) {
              const ports = element.getPorts();
              filteredPort = (
                Object.values(ports) as DefaultPortModel[]
              ).filter((port) =>
                isSourceInPort
                  ? !port.getOptions()['in']
                  : port.getOptions()['in']
              );

              portElement = filteredPort[0];
            }

            const newElement: DefaultPortModel =
              element instanceof MetaNodeModel && portElement
                ? portElement
                : (element as DefaultPortModel);

            this.sourcePort = newElement;
            const link = this.sourcePort.createLinkModel()!;
            link.setSourcePort(this.sourcePort);

            isSourceInPort =
              (this.sourcePort as DefaultPortModel).getOptions()['in'] ?? false;

            // const parentNode = element.getParent() as MetaNodeModel;
            // const ports = parentNode.getPorts();
            // filteredPort = (Object.values(ports) as DefaultPortModel[]).filter(
            //   (port) =>
            //     isSourceInPort
            //       ? port.getOptions()['in']
            //       : !port.getOptions()['in']
            // );

            // const name = this.sourcePort.getID();
            // const strToNum = name?.split('-')?.slice(-1);
            // const index = !isNaN(Number(strToNum)) ? Number(strToNum) : 0;

            // adjust line start position for metadata input ports
            if ((this.sourcePort as DefaultPortModel).getOptions()['in']) {
              link.getFirstPoint().setPosition(clientX - ox, clientY - oy - 50);
            } else {
              link.getFirstPoint().setPosition(clientX - ox, clientY - oy);
              // link
              //   .getLastPoint()
              //   .setPosition(
              //     clientX -
              //       (ox +
              //         (Array.isArray(filteredPort)
              //           ? index - filteredPort.length * DEFAULT_EXCLUDE
              //           : DEFAULT_EXCLUDE)),
              //     clientY - (oy + DEFAULT_EXCLUDE)
              //   );
            }

            link
              .getLastPoint()
              .setPosition(
                clientX - (ox + DEFAULT_EXCLUDE),
                clientY - (oy + DEFAULT_EXCLUDE)
              );

            this.link = this.engine.getModel().addLink(link);
          } else if (
            (element instanceof PortModel &&
              this.sourcePort &&
              element != this.sourcePort) ||
            (element instanceof MetaNodeModel && this.sourcePort)
          ) {
            let portElement: DefaultPortModel | null = null;

            if (element instanceof MetaNodeModel) {
              const ports = element.getPorts();
              filteredPort = (
                Object.values(ports) as DefaultPortModel[]
              ).filter((port) =>
                isSourceInPort
                  ? !port.getOptions()['in']
                  : port.getOptions()['in']
              );

              portElement = filteredPort[0];
            }

            const newElement: DefaultPortModel =
              element instanceof MetaNodeModel && portElement
                ? portElement
                : (element as DefaultPortModel);
            console.log(element, portElement, newElement, 'element');

            if (this.sourcePort.canLinkToPort(newElement)) {
              // do nothing when mechanism is a composition
              if (
                !this.link ||
                element.getOptions()['shape'] === PNLClasses.COMPOSITION
              )
                return;

              this.link.setTargetPort(newElement);
              newElement.reportPosition();
              this.clearState();
              this.eject();
            }
          } else if (this.link && element === this.link.getLastPoint()) {
            this.link.point(clientX - ox, clientY - oy, -1);
          } else if (this.sourcePort) {
            // the second click was not in a PortModel, so we cancel the link creation
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
  }

  clearState() {
    this.link = undefined;
    this.sourcePort = undefined;
  }
}
