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
import { MetaLink, MetaNodeModel } from '@metacell/meta-diagram';
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
  sourcePort: PortModel | undefined;
  link: LinkModel | undefined;
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
              (element as MetaNodeModel | PortModel<any>).getOptions()[
                'shape'
              ] === PNLClasses.COMPOSITION)
          ) {
            return;
          }

          let portElement: DefaultPortModel | PortModel | null = null;

          // get port model if element is an instance of MetaNodeModel
          if (element instanceof MetaNodeModel) {
            const ports = element.getPorts();
            filteredPort = (Object.values(ports) as DefaultPortModel[]).filter(
              (port) =>
                isSourceInPort
                  ? !port.getOptions()['in']
                  : port.getOptions()['in']
            );

            portElement = filteredPort[0];
          } else if (element instanceof PortModel) {
            portElement = element;
          }

          const newElement: PortModel =
            element instanceof MetaNodeModel && portElement
              ? portElement
              : (element as DefaultPortModel);

          const {
            event: { clientX, clientY },
          } = actionEvent;
          const ox = this.engine.getModel().getOffsetX();
          const oy = this.engine.getModel().getOffsetY();

          if (
            (element instanceof PortModel && !this.sourcePort) ||
            (element instanceof MetaNodeModel && !this.sourcePort)
          ) {
            this.sourcePort = newElement;
            const link = this.sourcePort.createLinkModel()!;
            link.setSourcePort(this.sourcePort);

            isSourceInPort =
              (this.sourcePort as DefaultPortModel).getOptions()['in'] ?? false;

            // adjust line start position for metadata input ports
            if ((this.sourcePort as DefaultPortModel).getOptions()['in']) {
              link.getFirstPoint().setPosition(clientX - ox, clientY - oy - 50);
            } else if (element instanceof MetaNodeModel) {
            } else {
              link
                .getFirstPoint()
                .setPosition(clientX - (ox - 50), clientY - oy);
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
            if (this.sourcePort.canLinkToPort(newElement)) {
              // do nothing when mechanism is a composition
              if (!this.link) return;
              const linkId = this.link.getID();
              const sourceId = this.sourcePort.getParent().getID();
              const sourcePortId = this.sourcePort.getName();
              const targetId = newElement.getParent().getID();
              const targetPortId = newElement.getName();

              this.link.setTargetPort(newElement);

              this.createMetaLink({
                id: linkId,
                name: linkId,
                shape: PNLClasses.PROJECTION,
                sourceId,
                sourcePortId,
                targetId,
                targetPortId,
              });
              this.engine.repaintCanvas();

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

  createMetaLink({
    id,
    name,
    shape,
    sourceId,
    sourcePortId,
    targetId,
    targetPortId,
  }: ICreateMetaLink) {
    const modelHandler = ModelSingleton.getInstance();
    const metaGraph = modelHandler.getMetaGraph();
    const options = new Map();

    // const linkId = this.link.getID();

    options.set('id', id);
    options.set('name', name);
    options.set('varian', undefined);
    options.set('shape', shape);
    options.set('pnlClass', shape);
    const link = new MetaLink(
      id,
      id,
      shape,
      sourceId,
      sourcePortId,
      targetId,
      targetPortId,
      shape,
      new Map()
    );


    metaGraph.addLinks([link]);
    metaGraph.updateAllLocalPositions();
  }

  getEngine() {
    return this.engine;
  }

  clearState() {
    this.link = undefined;
    this.sourcePort = undefined;
  }
}
