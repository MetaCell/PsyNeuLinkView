import React from 'react';
import Header from './Header';
import { Spinner } from './Spinner';
import { connect } from 'react-redux';
import { ErrorDialog } from './ErrorDialog';
import { GUIViews, InputTypes } from '../../../constants';
import { Box, MenuItem } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import MainEdit from '../views/editView/MainEdit';
import { RunModalDialog } from "./RunModalDialog";
import ModelSingleton from '../../model/ModelSingleton';
import messageHandler from '../../grpc/messagesHandler';
import Visualize from '../views/visualiseView/Visualize';
import { DependenciesDialog } from "./DependenciesDialog";
import { CondaSelectionDialog } from "./CondaSelectionDialog";
import { MetaGraphEventTypes } from '../../model/graph/eventsHandler';
import { PNLSummary, PNLLoggables, PNLDefaults } from '../../../constants';
import {
  openFile,
  loadModel,
  changeView,
  setResults,
  setSpinner,
  updateModel,
  setInputData,
  setShowErrorDialog,
  setDependenciesFound,
  setCondaEnvSelection,
  setShowRunModalDialog,
  initLoggablesAndDefaults,
} from '../../redux/actions/general';

import vars from '../../assets/styles/variables';

const {
  listItemActiveBg,
  optionTextColor,
} = vars;

const rpcMessages = require('../../../nodeConstants').rpcMessages;
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
      // messages between renderer and node backend
      window.api.receive("fromMain", (data) => {
        messageHandler(data, {
          [messageTypes.OPEN_FILE]: this.openModel,
          [messageTypes.FILE_UPDATED]: this.openModel,
          [messageTypes.PNL_FOUND]: this.pnlFound,
          [messageTypes.PNL_NOT_FOUND]: this.pnlNotFound,
          [messageTypes.SELECT_CONDA_ENV]: this.openCondaDialog,
          [messageTypes.SERVER_STARTED]: this.setServerStarted,
          [messageTypes.INPUT_FILE_SELECTED]: this.setInputFile,
        })
      });

      // messages exclusively for the grpc server that pass through the node backend to avoid to have to synchronize the two
      window.api.receive("fromRPC", (data) => {
        messageHandler(data, {
          [rpcMessages.MODEL_LOADED]: this.loadModel,
          [rpcMessages.PYTHON_MODEL_UPDATED]: () => { this.props.setSpinner(false) },
          [rpcMessages.SEND_RUN_RESULTS]: (data) => {
            const results = JSON.parse(data);
            this.props.setResults(results);
            this.props.changeView(GUIViews.VIEW);
            this.props.setSpinner(false)
          },
          [rpcMessages.BACKEND_ERROR]: (data) => {
            this.props.setSpinner(false);
            this.props.setShowErrorDialog(true, data.message, data.stack);
          }
        })
      });

      // notify the backend that the frontend is ready
      window.api.send("toMain", {type: messageTypes.FRONTEND_READY, payload: null});
    }
    this.modelHandler.getMetaGraph().addListener(this.handleMetaGraphChange)
  }

  componentWillUnmount() {
    this.modelHandler.getMetaGraph().removeListener(this.handleMetaGraphChange);
  }

  openModel = (data) => {
    this.props.setSpinner(true);
    window.api.send("toRPC", {type: rpcMessages.LOAD_MODEL, payload: data});
  }

  setInputFile = (data) => {
    this.props.setInputData({ type: InputTypes.FILE, data: data });
  }

  loadModel = (data) => {
    const parsedModel = JSON.parse(data);
    const summary = parsedModel[PNLSummary];
    const loggables = parsedModel[PNLLoggables];
    delete parsedModel[PNLSummary];
    delete parsedModel[PNLLoggables];
    for (let key in parsedModel) {
      parsedModel[key].forEach((node, index, arr) => {
        arr[index] = JSON.parse(node)
      })
    }
    for (let node in summary) {
      summary[node] = JSON.parse(summary[node]);
    }
    ModelSingleton.flushModel(parsedModel, summary, loggables);
    this.modelHandler.getMetaGraph().addListener(this.handleMetaGraphChange)
    this.props.setSpinner(false);
    this.props.loadModel(summary);
  }

  setServerStarted = (data) => {
    setTimeout(() => this.props.initLoggablesAndDefaults(data[PNLLoggables], data[PNLDefaults]));
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
    changeView: (view) => dispatch(changeView(view)),
    loadModel: (model) => dispatch(loadModel(model)),
    setResults: (results) => dispatch(setResults(results)),
    setInputData: (inputData) => dispatch(setInputData(inputData)),
    setSpinner: (spinnerEnabled) => dispatch(setSpinner(spinnerEnabled)),
    setDependenciesFound: (dependenciesFound) => dispatch(setDependenciesFound(dependenciesFound)),
    setCondaEnvSelection: (condaEnvSelection) => dispatch(setCondaEnvSelection(condaEnvSelection)),
    setShowRunModalDialog: (showRunModalDialog) => dispatch(setShowRunModalDialog(showRunModalDialog)),
    initLoggablesAndDefaults: (loggables, defaults) => dispatch(initLoggablesAndDefaults(loggables, defaults)),
    setShowErrorDialog: (showErrorDialog, title, message) => dispatch(setShowErrorDialog(showErrorDialog, title, message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef : true } )(Layout);
