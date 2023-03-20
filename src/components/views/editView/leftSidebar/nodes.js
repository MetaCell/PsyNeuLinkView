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

export const nodes = [
  {
    id: 'targetMechanism',
    type: 'targetMechanism',
    name: 'Target Mechanism',
    icon: <TargetIcon />,
  },
  {
    id: 'transferMechanism',
    type: 'transferMechanism',
    name: 'Transfer Mechanism',
    icon: <TransferIcon />,
  },
  {
    id: 'processingMechanism',
    type: 'processingMechanism',
    name: 'Processing Mechanism',
    icon: <ProcessingIcon />,
  },
  {
    id: 'integratorMechanism',
    type: 'integratorMechanism',
    name: 'Integrator Mechanism',
    icon: <IntegratorIcon />,
  },
  {
    id: 'modulatoryMechanism',
    type: 'modulatoryMechanism',
    name: 'Modulatory Mechanism',
    icon: <ModulatoryIcon />,
  },
  {
    id: 'learningMechanism',
    type: 'learningMechanism',
    name: 'Learning Mechanism',
    icon: <LearningIcon />,
  },
  {
    id: 'controlMechanism',
    type: 'controlMechanism',
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
    preCallback: (event, node) => {
      return true;
    },
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
  },
  {
    id: 'newComposition',
    type: 'customFunction',
    name: 'Create a composition',
    icon: <FolderIcon />,
  },
];
