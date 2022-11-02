import React from 'react';
// import MechanismNode from '../model/nodes/mechanism/MechanismNode';
import { withStyles } from '@mui/styles';
import BG from '../assets/svg/bg-dotted.svg';
import ModelInterpreter from '../model/Interpreter';
import MetaDiagram, { ComponentsMap } from '@metacell/meta-diagram';
import CustomLinkWidget from './views/projections/CustomLinkWidget';
import GenericMechanism from './views/mechanisms/GenericMechanism';
import { buildModel } from '../model/utils';
import { PNLClasses } from '../constants';
import CompositionDrawer from './views/CompositionDrawer';
import { sideBarNodes } from './views/sidebar/nodes';

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
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    const interpreter = new ModelInterpreter(mockModel);
    const model = interpreter.getModel();
    const metaModel = buildModel(model);

    const componentsMap = new ComponentsMap(
      new Map(Object.entries({ mechanism: GenericMechanism })),
      new Map(Object.entries({ projection: CustomLinkWidget }))
    );

    return (
      <div className={classes.root}>
        <MetaDiagram
          metaNodes={metaModel[PNLClasses.MECHANISM]}
          metaLinks={metaModel[PNLClasses.PROJECTION]}
          sidebarNodes={sideBarNodes}
          componentsMap={componentsMap}
          metaTheme={{
            customThemeVariables: {},
            canvasClassName: classes.canvasBG,
          }}
        />
        <CompositionDrawer />
      </div>
    );
  }
}

export default withStyles(styles)(Main);
