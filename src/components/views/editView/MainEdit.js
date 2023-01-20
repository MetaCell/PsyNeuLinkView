import React from 'react';
import { connect } from "react-redux";
import { withStyles } from '@mui/styles';
import BG from '../../../assets/svg/bg-dotted.svg';
import { Sidebar } from './rightSidebar/Sidebar';
import { handlePostUpdates } from '../../graph/eventsHandler';
import { select, loadModel, updateModel } from '../../../redux/actions/general';
import { leftSideBarNodes } from './leftSidebar/nodes';
import MetaDiagram, { EventTypes } from '@metacell/meta-diagram';
import { mockModel } from '../../../resources/model';
import ModelSingleton from '../../../model/ModelSingleton';
import { modelState } from '../../../constants';

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

    // functions bond to this scope
    this.metaCallback = this.metaCallback.bind(this);
    this.mouseMoveCallback = this.mouseMoveCallback.bind(this);
  }

  metaCallback(event) {
    switch (event.metaEvent) {
      case EventTypes.PRE_UPDATE: {
        return handlePostUpdates(event, this);
      }
      case EventTypes.POST_UPDATE: {
        const updated =  handlePostUpdates(event, this);
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
  }

  mouseMoveCallback(event) {
    this.mousePos.x = event.clientX;
    this.mousePos.y = event.clientY;
  }

  updateSelectedBar(id) {
    this.setState({
      selectedBarNode: id,
    });
  }

  render() {
    const { classes } = this.props;

    if (this.props.modelState === modelState.MODEL_LOADED) {
      this.modelHandler = ModelSingleton.getInstance();
    }

    return (
      <div className={classes.root} onMouseMove={this.mouseMoveCallback}>
        {this.props.modelState === modelState.MODEL_LOADED
          ? <>
            <MetaDiagram
              metaCallback={this.metaCallback}
              componentsMap={this.modelHandler.getComponentsMap()}
              metaLinks={this.modelHandler.getMetaGraph().getLinks()}
              metaNodes={this.modelHandler.getMetaGraph().getNodes()}
              sidebarProps={{
                sidebarNodes: leftSideBarNodes,
                selectedBarNode: 'targetMechanism',
              }}
              metaTheme={{
                customThemeVariables: {
                  padding: 0,
                  margin: 0,
                },
                canvasClassName: classes.canvasBG,
              }}
            />
            <Sidebar />
          </>
        : <>
            <Sidebar />
          </>
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    modelState: state.general.modelState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectInstance: (node) => dispatch(select(node)),
    loadModel: (model) => dispatch(loadModel(model)),
    updateModel: () => dispatch(updateModel())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef : true } )(withStyles(styles)(MainEdit));
