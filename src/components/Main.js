import React from 'react';
import MetaDiagram, {
  CallbackTypes,
  ComponentsMap,
  EventTypes,
} from '@metacell/meta-diagram';
import { withStyles } from '@mui/styles';
import { PNLClasses } from '../constants';
import BG from '../assets/svg/bg-dotted.svg';
import { generateMetaGraph } from '../model/utils';
import ModelInterpreter from '../model/Interpreter';
import { Sidebar } from './views/rightSidebar/Sidebar';
import Composition from './views/compositions/Composition';
import { leftSideBarNodes } from './views/leftSidebar/nodes';
import GenericMechanism from './views/mechanisms/GenericMechanism';
import CustomLinkWidget from './views/projections/CustomLinkWidget';

import { connect } from "react-redux";
import { select } from '../redux/actions/general';
import { handlePostUpdates, handlePreUpdates } from './graph/eventsHandler';



const mockModel = require('../resources/model').mockModel;

const styles = () => ({
  root: {
    height: 'calc(100vh - 3.5rem)',
    width: '100%',
  },
  canvasBG: {
    backgroundImage: `url(${BG})`,
  },
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    // interpreter and model stored in the state will be moved to redux later
    this.state = {};

    this.mousePos = { x: 0, y: 0 };
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
    this.mouseMoveCallback = this.mouseMoveCallback.bind(this);

    this.metaGraph = generateMetaGraph([
      ...this.metaModel[PNLClasses.COMPOSITION],
      ...this.metaModel[PNLClasses.MECHANISM],
    ]);
    this.metaGraph.addLinks(this.metaModel[PNLClasses.PROJECTION]);
  }

  metaCallback(event) {
    switch (event.metaEvent) {
      case EventTypes.PRE_UPDATE: {
        return handlePostUpdates(event, this);
      }
      case EventTypes.POST_UPDATE: {
        return handlePostUpdates(event, this);
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

  updateSelectedBar(id) {
    this.setState({
      selectedBarNode: id,
    });
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
          sidebarProps={{
            sidebarNodes: leftSideBarNodes,
            selectedBarNode: 'targetMechanism',
          }}
          metaTheme={{
            customThemeVariables: {
              padding: 0,
              margin: 0,
            },
            canvasClassName: classes.canvasBG,
          }}
        />
        <Sidebar />
      </div>
    );
  }
}


function mapDispatchToProps (dispatch) {
  return {
    selectInstance: (node) => dispatch(select(node)),
  }
}

export default connect(null, mapDispatchToProps, null)(withStyles(styles)(Main));
