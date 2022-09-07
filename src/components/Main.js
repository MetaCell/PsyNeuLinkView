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
  }

  render() {
    const { classes } = this.props;
	  const interpreter = new ModelInterpreter(mockModel);
    const model = interpreter.getModel();
    const metaModel = buildModel(model);
    console.log(interpreter.getModelElementsMap())

    const componentsMap = new ComponentsMap(new Map(), new Map());

    componentsMap.nodes.set(PNLClasses.COMPOSITION, Composition);
    componentsMap.nodes.set(PNLClasses.MECHANISM, GenericMechanism);
    componentsMap.links.set(PNLClasses.PROJECTION, CustomLinkWidget);

    return (
      <div className={classes.root}>
        <MetaDiagram metaNodes={[...metaModel[PNLClasses.COMPOSITION], ...metaModel[PNLClasses.MECHANISM],]} metaLinks={metaModel[PNLClasses.PROJECTION]} componentsMap={componentsMap}
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