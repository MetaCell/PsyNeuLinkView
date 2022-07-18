import React from 'react';
// import MechanismNode from '../model/nodes/mechanism/MechanismNode';
import { withStyles } from '@mui/styles';
import BG from "../assets/svg/bg-dotted.svg";
import ModelInterpreter from '../model/Interpreter';
import MetaDiagram, { ComponentsMap } from "meta-diagram";
import CustomLinkWidget from './views/projections/CustomLinkWidget';
import GenericMechanism from './views/mechanisms/GenericMechanism';
import { buildModel } from '../model/utils';

const mockModel = require('../resources/model').mockModel;

const styles = () => ({
  root: {
    position: 'absolute',
    top: '3.5rem',
    left: 0,
    height: 'calc(100% - 3.5rem)',
    width: '100%',
    backgroundRepeat: 'repeat',
    backgroundColor: '#fff',
    backgroundImage: `url(${BG})`
  },

  diagramContainer: {
    width: '100%',
    height: '100%',
  },
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

  const componentsMap = new ComponentsMap(
      new Map(Object.entries({'mechanism': GenericMechanism})),
      new Map(Object.entries({'projection': CustomLinkWidget}))
  )

    return (
      <div className={classes.root}>
        <MetaDiagram metaNodes={metaModel.mechanisms} metaLinks={metaModel.projections} componentsMap={componentsMap} />
      </div>
    );
  }
}


export default withStyles(styles)(Main);