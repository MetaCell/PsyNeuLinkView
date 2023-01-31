const defaultLayout = {
  global: {
    sideBorders: 8,
    tabSetHeaderHeight: 26,
    tabSetTabStripHeight: 26,
    enableEdgeDock: true,
    borderBarSize: 0,
  },
  // adds borders of extra height to layout
  borders: [],
  layout: {
    type: 'tabset',
    weight: 100,
    id: 'root',
    children: [
      {
        type: 'row',
        weight: 45,
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
        weight: 55,
        id: 'rightPanel',
        children: [
          {
            type: 'tabset',
            weight: 100,
            id: 'topPanel',
            enableDeleteWhenEmpty: false,
            children: [],
          },
          {
            type: 'tabset',
            weight: 100,
            id: 'bottomPanel',
            enableDeleteWhenEmpty: false,
            children: [],
          },
        ],
      },
    ],
  },
};

export default defaultLayout;
