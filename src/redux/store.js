export const GENERAL_DEFAULT_STATE = {
  error: undefined,
  idsMap: {},
  idsList: [],
  idsLoaded: 0,
  idsToLoad: 0,
  stepsToLoad: 1,
  stepsLoaded: 0,
  loading: false,
  instanceOnFocus : {},
  ui : {
    canvas : {
      instanceSelection : {},
      instanceDeleted : {},
      instanceVisibilityChanged : false
    },
    graph : {
      graphQueryIndex : -1,
      visible : true,
      sync : false
    },
    termInfo : { termInfoVisible : false },
    layers : { listViewerInfoVisible : true },
    circuitBrowser : {
      circuitQuerySelected : [{ id : "", label : "" } , { id : "", label : "" }],
      visible : true
    },
    layout: {
      "ThreeDViewer": true,
      "StackViewer": true,
      "TermInfo": true
    }
  } 
}