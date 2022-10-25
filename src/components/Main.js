import React from 'react';
import { withStyles } from '@mui/styles';
import { PNLClasses } from '../constants';
import BG from "../assets/svg/bg-dotted.svg";
import ModelInterpreter from '../model/Interpreter';
import Composition from './views/compositions/Composition';
import GenericMechanism from './views/mechanisms/GenericMechanism';
import MetaDiagram, { CallbackTypes, ComponentsMap, EventTypes, Position } from "@metacell/meta-diagram";
import CustomLinkWidget from './views/projections/CustomLinkWidget';
import { generateMetaGraph } from '../model/utils';
const mockModel = require('../resources/model').mockModel;


const styles = () => ({
  root: {
    height: 'calc(100vh - 3.5rem)',
    width: '100%',
  },
  canvasBG: {
    backgroundImage: `url(${BG})`
  }
});

class Main extends React.Component {
  constructor (props) {
    super(props);
    // interpreter and model stored in the state will be moved to redux later
    this.state = {};

    this.mousePos = {x: 0, y: 0};
    this.interpreter = new ModelInterpreter(mockModel);
    this.model = this.interpreter.getModel();
    this.metaModel = this.interpreter.getMetaModel();
    this.modelMap = this.interpreter.getModelElementsMap();
    this.componentsMap = new ComponentsMap(new Map(), new Map());
    this.componentsMap.nodes.set(PNLClasses.COMPOSITION, Composition);
    this.componentsMap.nodes.set(PNLClasses.MECHANISM, GenericMechanism);
    this.componentsMap.links.set(PNLClasses.PROJECTION, CustomLinkWidget);

    // functions bond to this scope
    this.metaCallback = this.metaCallback.bind(this);
    this.handlePreUpdates = this.handlePreUpdates.bind(this);
    this.handlePostUpdates = this.handlePostUpdates.bind(this);
    this.mouseMoveCallback = this.mouseMoveCallback.bind(this);

    this.metaGraph = generateMetaGraph([...this.metaModel[PNLClasses.COMPOSITION], ...this.metaModel[PNLClasses.MECHANISM]]);
    this.metaGraph.addLinks(this.metaModel[PNLClasses.PROJECTION]);
  }

  handlePostUpdates(event) {
    switch(event.function) {
      case CallbackTypes.POSITION_CHANGED: {
        const node = event.entity;
        this.metaGraph.handleNodePositionChanged(node, this.mousePos.x, this.mousePos.y);
        this.interpreter.updateModel(node);
        return true;
      }
      default: {
        console.log('Function callback type not yet implemented ' + event.function);
        return false;
      }
    }
  }

  handlePreUpdates(event) {
    console.log('preUpdates not yet implemented.');
  }

  metaCallback(event) {
    switch (event.metaEvent) {
      case EventTypes.PRE_UPDATE: {
        this.handlePreUpdates(event);
        break;
      }
      case EventTypes.POST_UPDATE: {
        this.handlePostUpdates(event);
        break;
      }
      default: {
        throw Error('Unknown event type received from meta-diagram.');
      }
    }
  }

  mouseMoveCallback(event) {
    this.mousePos.x = event.clientX;
    this.mousePos.y = event.clientY;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} onMouseMove={this.mouseMoveCallback}>
        <MetaDiagram
          metaCallback={this.metaCallback}
          componentsMap={this.componentsMap}
          metaLinks={this.metaGraph.getLinks()}
          metaNodes={this.metaGraph.getNodes()}
          metaTheme={{
            customThemeVariables: {},
            canvasClassName: classes.canvasBG,
          }}
        />
      </div>
    );
  }
}


export default withStyles(styles)(Main);
