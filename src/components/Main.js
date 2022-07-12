import React from 'react';
// import MechanismNode from '../model/nodes/mechanism/MechanismNode';
import ModelInterpreter from '../model/Interpreter';

import { CanvasWidget } from '@projectstorm/react-canvas-core';
// import createEngine, { DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';
import { JSCustomNodeModel } from './custom-node/JSCustomNodeModel';
import { JSCustomNodeFactory } from './custom-node/JSCustomNodeFactory';
import { withStyles } from '@mui/styles';
import BG from "../assets/svg/bg-dotted.svg";
import mechanismGreen from '../assets/svg/mechanism-green.svg';
import mechanismYellow from '../assets/svg/mechanism-yellow.svg';
import { colorOrange, colorGreen } from '../assets/styles/constant';
import MetaDiagram, {MetaNode, Position, ComponentsMap, MetaLink} from "meta-diagram";
import CustomNodeWidget from './custom-node/CustomNodeWidget';
import CustomLinkWidget from './custom-node/CustomLinkWidget';
// import '../App.css';

// import mockModel from '../resources/model.dot';
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

    //1) setup the diagram engine
	// var engine = createEngine();
  //   engine.getNodeFactories().registerFactory(new JSCustomNodeFactory());


	// //2) setup the diagram model
	// var model = new DiagramModel();

	//3-A) create a default node
	// var node1 = new JSCustomNodeModel({
	// 	name: 'Node 1',
	// 	color: 'rgb(0,192,255)',
    //     pnlClass: 'ProcessingMechanism',
	// 	shape: 'default'
	// });

	// var node4 = new JSCustomNodeModel({
	// 	name: 'Mechanism Name',
  //   variant: colorGreen,
  //   icon: mechanismGreen,
  //   pnlClass: 'ProcessingMechanism',
  //   shape: 'circle',
  //   selected: true
	// });
	// var node5 = new JSCustomNodeModel({
	// 	name: 'Mechanism Name',
  //   variant: colorOrange,
  //   icon: mechanismYellow,
  //   pnlClass: 'ProcessingMechanism',
  //   shape: 'default',
  //   selected: false
	// });
	// node4.setPosition(700,200);
	// node5.setPosition(900,200);
	// const link1 = new DefaultLinkModel();
	// link1.setSourcePort(node4.getPort("out"));
	// link1.setTargetPort(node5.getPort("in"));


	// let port1 = node4.getPort("out");
	// let port2 = node5.getPort("in");

	// link the ports
	// port1.link(port2);

	// model.addAll(node4, node5);

	//5) load model into engine
	// engine.setModel(model);

  const node1 = new MetaNode('1', 'node1', 'default', new Position(250, 100),
        new Map(Object.entries({color: 'rgb(0,192,255)'})))

  const node2 = new MetaNode('2', 'node2', 'default', new Position(500, 100),
      new Map(Object.entries({color: 'rgb(255,192,0)'})))

  const link3 = new MetaLink('3', 'link3', 'default', '1', 'out', '2', 'in',
      new Map(Object.entries({color: 'rgb(255,192,0)'})))

  const componentsMap = new ComponentsMap(
      new Map(Object.entries({'default': CustomNodeWidget})),
      new Map(Object.entries({'default': CustomLinkWidget}))
  )

    return (
      <div className={classes.root}>
        {/* <CanvasWidget className={classes.diagramContainer} engine={engine} /> */}
        <MetaDiagram metaNodes={[node1, node2]} metaLinks={[link3]} componentsMap={componentsMap} />
      </div>
    );
  }
}


export default withStyles(styles)(Main);