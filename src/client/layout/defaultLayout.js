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
        weight: 100,
        id: 'mainPanel',
        children: [
          {
            type: 'tabset',
            weight: 70,
            id: 'topPanel',
            enableDeleteWhenEmpty: false,
            children: [],
          },
          {
            type: 'tabset',
            weight: 30,
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
