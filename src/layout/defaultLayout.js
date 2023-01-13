const defaultLayout = {
  global: {
    sideBorders: 8,
    tabSetHeaderHeight: 26,
    tabSetTabStripHeight: 26,
    enableEdgeDock: true,
    borderBarSize: 0,
  },
  borders: [
    {
      type: 'border',
      location: 'bottom',
      children: [],
    },
  ],
  layout: {
    type: 'tabset',
    weight: 100,
    id: 'root',
    children: [
      {
        type: 'row',
        weight: 31,
        children: [
          {
            type: 'tabset',
            weight: 100,
            id: 'leftPanel',
            enableDeleteWhenEmpty: false,
            children: [
              // {
              //   id: 'rightPanel1',
              //   type: 'tab',
              //   name: 'Layers',
              //   component: 'test',
              // },
            ],
          },
        ],
      },
      {
        type: 'row',
        weight: 69,
        children: [
          {
            type: 'tabset',
            weight: 100,
            id: 'rightPanel',
            enableDeleteWhenEmpty: false,
            children: [],
          },
        ],
      },
    ],
  },
};

export default defaultLayout;
