import {
  CircleIcon,
  FolderIcon,
  HandIcon,
  MoveToolIcon,
  ProjectionIcon,
} from './icons';
import { onNodeDrop } from './dropCallback';
import { DefaultSidebarNodeTypes } from '@metacell/meta-diagram';
import { PNLMechanisms, PNLClasses } from '../../../../../constants';
import { getIconFromType } from '../mechanisms/shared/helper';
import { insertSpaces } from '../utils';

const nodes = Object.entries(PNLMechanisms)
  .filter(([_, value]) => value !== PNLMechanisms.MECHANISM)
  .map(([key, value]) => ({
    id: value,
    type: PNLMechanisms[key],
    name: insertSpaces(value),
    icon: getIconFromType(PNLMechanisms[key]),
    draggable: true,
    onNodeDrop,
  }));

export const leftSideBarNodes = [
  {
    id: DefaultSidebarNodeTypes.SELECT,
    type: 'selectFunction',
    name: 'Select functionality',
    icon: <MoveToolIcon />,
    draggable: false,
    preCallback: (event, node) => {
      console.log(event, node, 'selectFunction');
      // return true;
    },
    // onNodeDrop,
  },

  {
    id: DefaultSidebarNodeTypes.PANNING,
    type: 'panningFunction',
    name: 'Panning functionality',
    icon: <HandIcon />,
    preCallback: (event, node) => {
      console.log(event, node, 'panningFunction');

      // return true; // return false to prevent the default behaviour.
    },
    postCallback: (event, node) => {
      // return true; // return false to prevent the default behaviour.
    },
    draggable: false,
    // onNodeDrop,
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
    type: PNLClasses.PROJECTION,
    name: 'Create a projection',
    icon: <ProjectionIcon />,
    draggable: true,
    onNodeDrop,
  },
  {
    id: 'newComposition',
    type: PNLClasses.COMPOSITION,
    name: 'Create a composition',
    icon: <FolderIcon />,
    draggable: true,
    onNodeDrop,
  },
];
