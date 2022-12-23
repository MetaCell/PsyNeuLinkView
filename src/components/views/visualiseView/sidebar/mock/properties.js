import { v4 as uuidv4 } from 'uuid';

export const properties = [
  {
    id: uuidv4(),
    label: 'Composition 2',
    type: 'composition',
    children: [
      {
        id: uuidv4(),
        label: 'A2',
        type: 'mechanism',
      },
      {
        id: uuidv4(),
        label: 'Projection A2 -->  B2 Projection A2 -->  B2',
        type: 'projection',
      },
      {
        id: uuidv4(),
        label: 'B2',
        type: 'mechanism',
      },
    ],
  },
  {
    id: uuidv4(),
    label: 'B1',
    type: 'mechanism',
    children: [
      {
        id: uuidv4(),
        label: 'A1',
        type: 'mechanism',
      },
      {
        id: uuidv4(),
        label: 'Projection A1 -->  B1',
        type: 'projection',
      },
      {
        id: uuidv4(),
        label: 'B1',
        type: 'mechanism',
      },
      {
        id: uuidv4(),
        label: 'B2',
        type: 'mechanism',
      },
      {
        id: uuidv4(),
        label: 'B3',
        type: 'mechanism',
      },
    ],
  },
];
