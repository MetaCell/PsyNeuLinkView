import React from 'react';
import Header from './Header';
import { Spinner } from './Spinner';
import { connect } from 'react-redux';
import { GUIViews } from '../../../constants';
import { Box, MenuItem } from "@mui/material";
import { PNLSummary } from '../../../constants';
import CheckIcon from '@mui/icons-material/Check';
import MainEdit from '../views/editView/MainEdit';
import { RunModalDialog } from "./RunModalDialog";
import { ErrorDialog } from './ErrorDialog';
import ModelSingleton from '../../model/ModelSingleton';
import messageHandler from '../../grpc/messagesHandler';
import Visualize from '../views/visualiseView/Visualize';
import { DependenciesDialog } from "./DependenciesDialog";
import { CondaSelectionDialog } from "./CondaSelectionDialog";
import {
  openFile,
  loadModel,
  updateModel,
  setDependenciesFound,
  setCondaEnvSelection,
  setShowRunModalDialog,
  setSpinner,
} from '../../redux/actions/general';
import { MetaGraphEventTypes } from '../../model/graph/eventsHandler';

import vars from '../../assets/styles/variables';

const {
  listItemActiveBg,
  optionTextColor,
} = vars;

const messageTypes = require('../../../nodeConstants').messageTypes;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelKey: 0
    }

    this.modelHandler = ModelSingleton.getInstance();
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
    this.modelHandler.updateTreeModel()
    this.props.updateModel()
  };

  async componentDidMount() {
    if (window.api) {
      window.api.receive("fromMain", (data) => {
        messageHandler(data, {
          [messageTypes.OPEN_FILE]: this.openModel,
          [messageTypes.FILE_UPDATED]: this.openModel,
          [messageTypes.PNL_FOUND]: this.pnlFound,
          [messageTypes.PNL_NOT_FOUND]: this.pnlNotFound,
          [messageTypes.SELECT_CONDA_ENV]: this.openCondaDialog,
          [messageTypes.SERVER_STARTED]: this.setServerStarted,
        })
      });

      window.api.send("toMain", {
        type: messageTypes.FRONTEND_READY,
        payload: null
      });
    }
    this.modelHandler.getMetaGraph().addListener(this.handleMetaGraphChange)
  }

  componentWillUnmount() {
    this.modelHandler.getMetaGraph().removeListener(this.handleMetaGraphChange);
  }

  openModel = (data) => {
    this.props.setSpinner(true);
    // TODO: cleanup below
    //this.setState({spinnerEnabled: true});
    const grpcClient = window.interfaces.GRPCClient;
    this.props.openFile(data);
    grpcClient.loadModel(data, (response) => {
      let newModel = response.getModeljson();
      const parsedModel = JSON.parse(newModel);
      const summary = parsedModel[PNLSummary];
      delete parsedModel[PNLSummary];
      for (let key in parsedModel) {
        parsedModel[key].forEach((node, index, arr) => {
          arr[index] = JSON.parse(node)
        })
      }
      for (let node in summary) {
        summary[node] = JSON.parse(summary[node]);
      }
      // TODO to uncomment when backend is ready
      ModelSingleton.flushModel(parsedModel, summary);
      this.modelHandler.getMetaGraph().addListener(this.handleMetaGraphChange)
      this.props.setSpinner(false);
      this.props.loadModel(parsedModel);
    }, (error) => {
      console.log(error);
      this.props.setSpinner(false);
      // TODO: report error to the user with a dialog and the error stack
    });
  }

  setServerStarted = (data) => {
    this.props.setSpinner(false);
  }

  pnlFound = (data) => {
    this.props.setDependenciesFound(true);
    this.props.setCondaEnvSelection(false);
    this.props.setSpinner(false);
  }

  pnlNotFound = (data) => {
    this.props.setDependenciesFound(false);
    this.props.setCondaEnvSelection(false);
    this.props.setSpinner(false);
  }

  openCondaDialog = (data) => {
    this.props.setCondaEnvSelection(true);
  }

  // TODO: maybe to move inside the component that uses this
  getMenuItems = (options, selectedOption) => {
    return options?.map((option) => {
      return (
        <MenuItem id={`${option}-id`} value={option}>
        <Box width={1} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: optionTextColor
        }}>
          {option}
          {option === selectedOption && <CheckIcon style={{ fontSize: '1rem', color: listItemActiveBg }} />}
        </Box>
      </MenuItem>
      )
    });
  }

  render() {
    const {viewState} = this.props;

    return (
      <>
        <Spinner />
        <DependenciesDialog />
        <RunModalDialog getMenuItems={this.getMenuItems} />
        <CondaSelectionDialog getMenuItems={this.getMenuItems} />
        <ErrorDialog />

        {viewState === GUIViews.EDIT ? (
          <Box>
            <Header />
            <MainEdit key={this.state.modelKey} />
          </Box>
        ) : (
          <Box>
            <Header />
            <Visualize />
          </Box>
        )}
      </>
    );
  }
};

function mapStateToProps (state) {
  return {
    viewState: state.general.guiView,
    spinnerEnabled: state.general.spinnerEnabled,
    dependenciesFound: state.general.dependenciesFound,
    condaEnvSelection: state.general.condaEnvSelection,
    showRunModalDialog: state.general.showRunModalDialog,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateModel: () => dispatch(updateModel()),
    openFile: (file) => dispatch(openFile(file)),
    loadModel: (model) => dispatch(loadModel(model)),
    setSpinner: (spinnerEnabled) => dispatch(setSpinner(spinnerEnabled)),
    setDependenciesFound: (dependenciesFound) => dispatch(setDependenciesFound(dependenciesFound)),
    setCondaEnvSelection: (condaEnvSelection) => dispatch(setCondaEnvSelection(condaEnvSelection)),
    setShowRunModalDialog: (showRunModalDialog) => dispatch(setShowRunModalDialog(showRunModalDialog)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef : true } )(Layout);
