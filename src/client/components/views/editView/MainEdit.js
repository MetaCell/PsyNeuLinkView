import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@mui/styles';
import { modelState } from '../../../../constants';
import UndoIcon from '@mui/icons-material/Undo';
import { Sidebar } from './rightSidebar/Sidebar';
import BG from '../../../assets/svg/bg-dotted.svg';
import vars from '../../../assets/styles/variables';
import { mockModel } from '../../../resources/model';
import { leftSideBarNodes } from './leftSidebar/nodes';
import ModelSingleton from '../../../model/ModelSingleton';
import { Box, Button, Dialog, Typography } from '@mui/material';
import MetaDiagram, { EventTypes } from '@metacell/meta-diagram';
import {
  handlePostUpdates,
  handlePreUpdates, MetaGraphEventTypes,
} from '../../../model/graph/eventsHandler';
import {
  select,
  loadModel,
  updateModel,
  closeComposition,
} from '../../../redux/actions/general';
import {isDetachedMode} from "../../../model/utils";

const {
  breadcrumbTextColor,
  dialogBorderColor,
  headerBorderColor,
  listSelectedTextColor,
} = vars;

const styles = () => ({
  root: {
    height: 'calc(100vh - 3.5rem)',
    width: '100%',
  },
  canvasBG: {
    backgroundImage: `url(${BG})`,
  },
});

class MainEdit extends React.Component {
  constructor(props) {
    super(props);
    this.mousePos = { x: 0, y: 0 };
    this.modelHandler = undefined;
    this.engine = undefined;
    this.metaDiagramRef = React.createRef();


    // functions bond to this scope
    this.metaCallback = this.metaCallback.bind(this);
    this.onMount = this.onMount.bind(this);
    this.mouseMoveCallback = this.mouseMoveCallback.bind(this);
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
    this.props.loadModel(mockModel);
    this.modelHandler = ModelSingleton.getInstance();
    this.modelHandler.getMetaGraph().addListener(this.handleMetaGraphChange)
  }

  componentWillUnmount() {
    this.modelHandler.getMetaGraph().removeListener(this.handleMetaGraphChange);
  }

  handleMetaGraphChange = (event) => {
    switch (event.type) {
      case MetaGraphEventTypes.NODE_ADDED: {
          this.metaDiagramRef.current.addNode(event.payload);
      }
    }
    this.modelHandler.updateTreeModel()
    this.props.updateModel()
  };

  mouseMoveCallback(event) {
    if (this.engine) {
      this.mousePos = this.engine.getRelativeMousePoint(event);
    }
  }

  onMount(engine){
    this.engine = engine
  }

  render() {
    let nodes = undefined;
    let links = undefined;
    const { classes } = this.props;

    if (this.props.modelState === modelState.MODEL_LOADED) {
      this.modelHandler = ModelSingleton.getInstance();
      if (isDetachedMode(this)) {
          const compositionPath = this.props.compositionOpened.getGraphPath()
        nodes = this.modelHandler.getMetaGraph().getNodeGraph(compositionPath).getDescendancy();
        links = this.modelHandler.getMetaGraph().getNodeGraph(compositionPath)
            .getDescendancyLinks(nodes, this.modelHandler.getMetaGraph().getLinks());
      } else {
        nodes = this.modelHandler.getMetaGraph().getNodes();
        links = this.modelHandler.getMetaGraph().getLinks();
      }
    }


    return (
      <div className={classes.root} onMouseMove={this.mouseMoveCallback}>
        {this.props.modelState === modelState.MODEL_LOADED &&
        this.props.compositionOpened === undefined ? (
          <MetaDiagram
            ref={this.metaDiagramRef}
            metaCallback={this.metaCallback}
            componentsMap={this.modelHandler.getComponentsMap()}
            metaLinks={links}
            metaNodes={nodes}
            sidebarProps={{
              sidebarNodes: leftSideBarNodes,
            }}
            metaTheme={{
              customThemeVariables: {
                padding: 0,
                margin: 0,
              },
              canvasClassName: classes.canvasBG,
            }}
            onMount={this.onMount}
          />
        ) : (
          <></>
        )}

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
                  width: 'calc(100VW - 24.25rem)',
                  maxWidth: 'calc(100VW - 24.25rem)',
                  height: 'calc(100Vh - 11rem)',
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
                ref={this.metaDiagramRef}
                metaCallback={this.metaCallback}
                componentsMap={this.modelHandler.getComponentsMap()}
                metaLinks={links}
                metaNodes={nodes}
                sidebarProps={{
                  sidebarNodes: leftSideBarNodes,
                }}
                metaTheme={{
                  customThemeVariables: {
                    padding: 0,
                    margin: 0,
                  },
                  canvasClassName: classes.canvasBG,
                }}
                onMount={this.onMount}
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
          <></>
        )}
        <Sidebar />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    modelState: state.general.modelState,
    compositionOpened: state.general.compositionOpened,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectInstance: (node) => dispatch(select(node)),
    loadModel: (model) => dispatch(loadModel(model)),
    updateModel: () => dispatch(updateModel()),
    closeComposition: (node) => dispatch(closeComposition(node)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(withStyles(styles)(MainEdit));
