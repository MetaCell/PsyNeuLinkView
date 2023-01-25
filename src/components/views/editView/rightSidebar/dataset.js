import { v4 as uuidv4 } from 'uuid';

export const COMPOSITION_DTO =   {
  id: uuidv4(),
  label: 'Composition 2',
  type: 'CombinationFunction',
  detail: 'CombinationFunction Detailing',
  info: {
    title: 'function',
    pnl: '   =pnl.',
    sub: 'Logistic',
    calc: '(gain=1.0, bias=-4)'
  },
  stats: [
    {label:'Pertinencity', value: '12' },
    {label:'Prosistensy', value: '8.90' }
  ]
};

const COMPOSITION_EXAMPLE =   {
  id: uuidv4(),
  label: 'Composition 2',
  tooltip: 'Composition 2',
  type: 'composition',
  items: [
    {
      id: uuidv4(),
      label: 'A2',
      tooltip: 'Stimulus',
      type: 'mechanism',
    },
    {
      id: uuidv4(),
      label: 'Projection A2 -->  B2 Projection A2 -->  B2',
      tooltip: 'Projection A2 --> B2',
      type: 'projection',
    },
    {
      id: uuidv4(),
      label: 'B2',
      tooltip: 'Stimulus',
      type: 'mechanism',
    },
  ],
};

export const datasets = [
  {
    id: uuidv4(),
    label: 'Stimulus',
    tooltip: 'Stimulus',
    type: 'mechanism',
  },
  {
    id: uuidv4(),
    label: 'Projection Stimulus --> Composition',
    tooltip: 'Projection Stimulus --> Composition',
    type: 'projection',
  },
  {
    id: uuidv4(),
    label: 'Composition 1 Composition 1Composition 1',
    tooltip: 'Composition 1',
    type: 'composition',
    items: [
      {
        id: uuidv4(),
        label: 'A1',
        tooltip: 'Stimulus',
        type: 'mechanism',
      },
      {
        id: uuidv4(),
        label: 'Projection A1 -->  B1',
        tooltip: 'Projection A1 --> B1',
        type: 'projection',
      },
      {
        id: uuidv4(),
        label: 'B1',
        tooltip: 'Stimulus',
        type: 'mechanism',
        items: [
          {
            id: uuidv4(),
            label: 'A1',
            tooltip: 'Stimulus',
            type: 'mechanism',
          },
          {
            id: uuidv4(),
            label: 'Projection A1 -->  B1',
            tooltip: 'Projection A1 --> B1',
            type: 'projection',
          },
          {
            id: uuidv4(),
            label: 'B1',
            tooltip: 'Stimulus',
            type: 'mechanism',
          },
        ],
      },
    ],
  },
  COMPOSITION_EXAMPLE
];