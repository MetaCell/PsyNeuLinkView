import {
  CircleIcon,
  ControlIcon,
  FolderIcon,
  HandIcon,
  IntegratorIcon,
  LearningIcon,
  ModulatoryIcon,
  MoveToolIcon,
  ProcessingIcon,
  ProjectionIcon,
  TargetIcon,
  TransferIcon,
} from './icons';
import { onNodeDrop } from './dropCallback';

export const NodeType = {
  TARGET_MECHANISM: 'targetMechanism',
  TRANSFER_MECHANISM: 'transferMechanism',
  PROCESSING_MECHANISM: 'processingMechanism',
  INTEGRATOR_MECHANISM: 'integratorMechanism',
  MODULATORY_MECHANISM: 'modulatoryMechanism',
  LEARNING_MECHANISM: 'learningMechanism',
  CONTROL_MECHANISM: 'controlMechanism',
};


export const nodes = [
  {
    id: 'targetMechanism',
    type: NodeType.TARGET_MECHANISM,
    name: 'Target Mechanism',
    icon: <TargetIcon />,
    draggable: true,
    onNodeDrop,
  },
  {
    id: 'transferMechanism',
    type: NodeType.TRANSFER_MECHANISM,
    name: 'Transfer Mechanism',
    icon: <TransferIcon />,
    draggable: true,
    onNodeDrop,
  },
  {
    id: 'processingMechanism',
    type: NodeType.PROCESSING_MECHANISM,
    name: 'Processing Mechanism',
    icon: <ProcessingIcon />,
    draggable: true,
    onNodeDrop,
  },
  {
    id: 'integratorMechanism',
    type: NodeType.INTEGRATOR_MECHANISM,
    name: 'Integrator Mechanism',
    icon: <IntegratorIcon />,
  },
  {
    id: 'modulatoryMechanism',
    type: NodeType.MODULATORY_MECHANISM,
    name: 'Modulatory Mechanism',
    icon: <ModulatoryIcon />,
  },
  {
    id: 'learningMechanism',
    type: NodeType.LEARNING_MECHANISM,
    name: 'Learning Mechanism',
    icon: <LearningIcon />,
    draggable: true,
  },
  {
    id: 'controlMechanism',
    type: NodeType.CONTROL_MECHANISM,
    name: 'Control Mechanism',
    icon: <ControlIcon />,
  },
];

export const leftSideBarNodes = [
  {
    id: 'selectFunction',
    type: 'selectFunction',
    name: 'Select functionality',
    icon: <MoveToolIcon />,
    draggable: true,
    preCallback: (event, node) => {
      return true;
    },
    onNodeDrop,
  },

  {
    id: 'panningFunction',
    type: 'panningFunction',
    name: 'Panning functionality',
    icon: <HandIcon />,
    preCallback: (event, node) => {
      return true; // return false to prevent the default behaviour.
    },
    postCallback: (event, node) => {
      return true; // return false to prevent the default behaviour.
    },
    draggable: true,
    onNodeDrop,
  },
  {
    id: 'childrenNodes',
    type: 'childrenNodes',
    name: 'Nodes',
    icon: <CircleIcon />,
    children: nodes,
    divider: true,
    draggable: false,
    css: {
      height: 128,
      borderRadius: '0 0.5rem 0.5rem 0',
      width: '2.75rem',
      margin: '0.25rem 0.25rem 0.25rem -0.5rem !important',
    },
    preCallback: (event, node) => {
      return true; // return false to prevent the default behaviour.
    },
    postCallback: (event, node) => {
      return true; // return false to prevent the default behaviour.
    },
  },
  {
    id: 'newProjection',
    type: 'customFunction',
    name: 'Create a projection',
    icon: <ProjectionIcon />,
    draggable: true,
    onNodeDrop,
  },
  {
    id: 'newComposition',
    type: 'customFunction',
    name: 'Create a composition',
    icon: <FolderIcon />,
    draggable: true,
    onNodeDrop,
  },
];