import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import { Point } from '@projectstorm/geometry';
import { FONTSIZE } from '../../../../constants';
import UndoIcon from '@mui/icons-material/Undo';
import { Sidebar } from './rightSidebar/Sidebar';
import BG from '../../../assets/svg/bg-dotted.svg';
import vars from '../../../assets/styles/variables';
import { isDetachedMode } from '../../../model/utils';
import { leftSideBarNodes } from './leftSidebar/nodes';
import ModelSingleton from '../../../model/ModelSingleton';
import { Box, Button, Dialog, Typography } from '@mui/material';
import MetaDiagram, {
  EventTypes,
  DefaultSidebarNodeTypes,
} from '@metacell/meta-diagram';
import { updateCompositionDimensions } from '../../../model/graph/utils';
import {
  handlePostUpdates,
  handlePreUpdates,
  MetaGraphEventTypes,
} from '../../../model/graph/eventsHandler';
import {
  select,
  openFile,
  loadModel,
  updateModel,
  setModelTree,
  closeComposition,
  updateSidebarItemSelection,
} from '../../../redux/actions/general';

import {
  mockModel,
  mockSummary,
  mockLoggables,
} from '../../../resources/model';
import { CreateLinkState } from '../../../model/state/CreateLinkState';
import { CustomLinkFactory } from './projections/CustomLinkFactory';
// * use custom port factory when need arises
// import { CustomPortFactory } from './projections/CustomPortFactory';

const {
  breadcrumbTextColor,
  dialogBorderColor,
  headerBorderColor,
  listSelectedTextColor,
} = vars;

const dialogStyles = {
  widthOffset: 24.25,
  heightOffset: 11,
};

const styles = () => ({
  root: {
    height: 'calc(100vh - 3.5rem)',
    width: '100%',
  },
  canvasBG: {
    backgroundImage: `url(${BG})`,
  },
});
// module selected sidebar node : fyi: work around redux action issues with meta-diagram
let sidebarGlobalState = DefaultSidebarNodeTypes.PANNING;
const isFrontendDev = process.env.REACT_APP_FRONTEND_DEV === 'true';

class MainEdit extends React.Component {
  constructor(props) {
    super(props);
    this.engine = undefined;
    this.mousePos = { x: 0, y: 0 };
    // this.metaDiagramRef = React.createRef();
    this.modelHandler = ModelSingleton.getInstance();

    // functions bond to this scope
    this.onMount = this.onMount.bind(this);
    this.metaCallback = this.metaCallback.bind(this);
    this.mouseMoveCallback = this.mouseMoveCallback.bind(this);
    this.updateSelectedSidebarItem = this.updateSelectedSidebarItem.bind(this);
  }

  metaCallback(event) {
    switch (event.metaEvent) {
      case EventTypes.PRE_UPDATE: {
        return handlePreUpdates(event, this);
      }
      case EventTypes.POST_UPDATE: {
        const updated = handlePostUpdates(event, this);
        this.props.updateModel();
        return updated;
      }
      default: {
        throw Error('Unknown event type received from meta-diagram.');
      }
    }
  }

  componentDidMount() {
    if (isFrontendDev) {
      ModelSingleton.flushModel(mockModel, mockSummary, mockLoggables);
      this.props.loadModel();
    }
    this.modelHandler.getMetaGraph().addListener(this.handleMetaGraphChange);
  }

  componentWillUnmount() {
    this.modelHandler.getMetaGraph().removeListener(this.handleMetaGraphChange);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Updates dimensions of detached composition when it opens
    if (!this.compositionOpened && this.props.compositionOpened) {
      let dialogWidth = window.innerWidth - dialogStyles.widthOffset * FONTSIZE;
      let dialogHeight =
        window.innerHeight - dialogStyles.heightOffset * FONTSIZE;
      updateCompositionDimensions(
        this.props.compositionOpened,
        { width: dialogWidth, height: dialogHeight },
        new Point(0, 0)
      );
    }
  }

  handleMetaGraphChange = (event) => {
    switch (event.type) {
      case MetaGraphEventTypes.NODE_ADDED:
        this.modelHandler.getMetaRef().current.addNode(event.payload);
        break;
      default: {
        console.log('Unknown event type received from meta-graph.');
      }
    }
    this.modelHandler.updateTreeModel();
    this.props.updateModel();
  };

  mouseMoveCallback(event) {
    if (this.engine) {
      this.mousePos = this.engine.getRelativeMousePoint(event);
    }
  }

  onMount(engine) {
    this.engine = engine;
  }

  updateSelectedSidebarItem(id) {
    sidebarGlobalState = id;
  }

  render() {
    let nodes = undefined;
    let links = undefined;
    const { classes } = this.props;

    this.modelHandler = ModelSingleton.getInstance();
    if (isDetachedMode(this)) {
      const compositionPath = this.props.compositionOpened.getGraphPath();
      nodes = this.modelHandler
        .getMetaGraph()
        .getNodeGraph(compositionPath)
        .getDescendancy();
      links = this.modelHandler
        .getMetaGraph()
        .getNodeGraph(compositionPath)
        .getDescendancyLinks(
          nodes,
          this.modelHandler.getMetaGraph().getLinks()
        );
    } else {
      nodes = this.modelHandler.getMetaGraph().getNodes();
      links = this.modelHandler.getMetaGraph().getLinks();
    }

    return (
      <div className={classes.root} onMouseMove={this.mouseMoveCallback}>
        {this.props.compositionOpened !== undefined ? (
          <>
            <Dialog
              id={this.props.compositionOpened.getOption('name')}
              open={true}
              hideBackdrop
              PaperProps={{
                sx: {
                  position: 'fixed',
                  top: 96,
                  left: 60,
                  width: `calc(100VW - ${dialogStyles.widthOffset}rem)`,
                  maxWidth: `calc(100VW - ${dialogStyles.widthOffset}rem)`,
                  height: `calc(100VH - ${dialogStyles.heightOffset}rem)`,
                  border: `2px solid ${dialogBorderColor}`,
                  background: headerBorderColor,
                  borderRadius: '0.75rem',
                  m: 0,
                },
              }}
              aria-labelledby="composition-popper"
            >
              <Typography>
                {this.props.compositionOpened.getOption('name')}
              </Typography>
              <MetaDiagram
                ref={this.modelHandler.getMetaRef()}
                metaCallback={this.metaCallback}
                componentsMap={this.modelHandler.getComponentsMap()}
                metaLinks={links}
                metaNodes={nodes}
                sidebarNodes={leftSideBarNodes}
                updateSidebarSelection={this.updateSelectedSidebarItem}
                selectedSidebarNodeId={sidebarGlobalState}
                metaTheme={{
                  customThemeVariables: {
                    padding: 0,
                    margin: 0,
                  },
                  canvasClassName: classes.canvasBG,
                }}
                onMount={this.onMount}
                globalProps={{
                  disableZoom: true,
                  disableMoveCanvas: true,
                  disableMoveNodes: true,
                  disableDeleteDefaultKey: true,
                  createLink: new CreateLinkState(),
                  CustomLinkFactory: CustomLinkFactory,
                }}
              />
            </Dialog>
            <Box
              sx={{
                position: 'absolute',
                bottom: '1rem',
                left: 'calc(40% - 153px/2 + 0.5px)',
                zIndex: 1301,
              }}
            >
              <Button
                startIcon={<UndoIcon fontSize="small" />}
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: breadcrumbTextColor,
                  '&:hover': {
                    backgroundColor: listSelectedTextColor,
                  },
                }}
                onClick={() => {
                  this.props.closeComposition(this.props.compositionOpened);
                }}
              >
                Return to parent
              </Button>
            </Box>
          </>
        ) : (
          <MetaDiagram
            key={this.props.modelKey}
            ref={this.modelHandler.getMetaRef()}
            metaCallback={this.metaCallback}
            componentsMap={this.modelHandler.getComponentsMap()}
            metaLinks={links}
            metaNodes={nodes}
            sidebarNodes={leftSideBarNodes}
            selectedSidebarNodeId={sidebarGlobalState}
            updateSidebarSelection={this.updateSelectedSidebarItem}
            metaTheme={{
              customThemeVariables: {
                padding: 0,
                margin: 0,
              },
              canvasClassName: classes.canvasBG,
            }}
            onMount={this.onMount}
            globalProps={{
              disableZoom: true,
              disableMoveCanvas: true,
              disableMoveNodes: true,
              disableDeleteDefaultKey: true,
              createLink: new CreateLinkState(),
              CustomLinkFactory: CustomLinkFactory,
            }}
          />
        )}
        <Sidebar />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    modelKey: state.general.modelKey,
    modelState: state.general.modelState,
    compositionOpened: state.general.compositionOpened,
    sidebarState: state.general.sidebarState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateModel: () => dispatch(updateModel()),
    openFile: (file) => dispatch(openFile(file)),
    selectInstance: (node) => dispatch(select(node)),
    loadModel: (summary) => dispatch(loadModel(summary)),
    closeComposition: (node) => dispatch(closeComposition(node)),
    setModelTree: (modelTree) => dispatch(setModelTree(modelTree)),
    updateSelection: (id) => dispatch(updateSidebarItemSelection(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(withStyles(styles)(MainEdit));
