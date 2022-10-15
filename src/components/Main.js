import React from 'react';
// import MechanismNode from '../model/nodes/mechanism/MechanismNode';
import { withStyles } from '@mui/styles';
import { PNLClasses } from '../constants';
import { buildModel } from '../model/utils';
import BG from "../assets/svg/bg-dotted.svg";
import ModelInterpreter from '../model/Interpreter';
import Composition from './views/compositions/Composition';
import GenericMechanism from './views/mechanisms/GenericMechanism';
import MetaDiagram, { ComponentsMap } from "@metacell/meta-diagram";
import CustomLinkWidget from './views/projections/CustomLinkWidget';
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
    this.state = {};
    this.interpreter = new ModelInterpreter(mockModel);
    this.model = this.interpreter.getModel();
    this.metaModel = this.interpreter.getMetaModel();
    this.componentsMap = new ComponentsMap(new Map(), new Map());

    this.componentsMap.nodes.set(PNLClasses.COMPOSITION, Composition);
    this.componentsMap.nodes.set(PNLClasses.MECHANISM, GenericMechanism);
    this.componentsMap.links.set(PNLClasses.PROJECTION, CustomLinkWidget);

    this.metaCallback = this.metaCallback.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  metaCallback(event) {
    console.log('metacallback');
    console.log(event);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MetaDiagram
          metaCallback={this.metaCallback}
          componentsMap={this.componentsMap}
          metaLinks={this.metaModel[PNLClasses.PROJECTION]}
          metaNodes={[...this.metaModel[PNLClasses.COMPOSITION], ...this.metaModel[PNLClasses.MECHANISM]]}
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
