import {
  ControlIcon,
  IntegratorIcon,
  LearningIcon,
  ModulatoryIcon,
  ProcessingIcon,
  TargetIcon,
  TransferIcon,
} from './icons';

export const sideBarNodes = [
  {
    id: 'targetMechanism',
    name: 'Target Mechanism',
    icon: <TargetIcon />,
  },
  {
    id: 'transferMechanism',
    name: 'Transfer Mechanism',
    icon: <TransferIcon />,
  },
  {
    id: 'processingMechanism',
    name: 'Processing Mechanism',
    icon: <ProcessingIcon />,
  },
  {
    id: 'integratorMechanism',

    name: 'Integrator Mechanism',
    icon: <IntegratorIcon />,
  },
  {
    id: 'modulatoryMechanism',
    name: 'Modulatory Mechanism',
    icon: <ModulatoryIcon />,
  },
  {
    id: 'learningMechanism',
    name: 'Learning Mechanism',
    icon: <LearningIcon />,
  },
  {
    id: 'controlMechanism',
    name: 'Control Mechanism',
    icon: <ControlIcon />,
  },
];
