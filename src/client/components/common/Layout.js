import React from 'react';
import Header from './Header';
import { Rnd } from "react-rnd";
import { Spinner } from './Spinner';
import { connect } from 'react-redux';
import { GUIViews } from '../../../constants';
import { Box, MenuItem } from "@mui/material";
import { PNLSummary } from '../../../constants';
import CheckIcon from '@mui/icons-material/Check';
import MainEdit from '../views/editView/MainEdit';
import { RunModalDialog } from "./RunModalDialog";
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

import vars from '../../assets/styles/variables';

const {
  listItemActiveBg,
  optionTextColor,
} = vars;

const messageTypes = require('../../../nodeConstants').messageTypes;

const selectModalOptions = {
  PNL_input: 'Insert the PNL model input' ,
  file_path: 'Use a file',
  python_object_name: 'Type the name of a Python object contained in the PNL model'
}

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      condaEnv: '',
      modalDialogValue: '',
      showRunModalDialog: false,
      modalDialogOptions: Object.values(selectModalOptions),
      PNL_input: "",
      file_path: "",
      python_object_name: ""
    };
  }

  async componentDidMount() {
    let envs = []

    if (window.api) {
      window.api.receive("fromMain", (data) => {
        messageHandler(data, {
          [messageTypes.OPEN_FILE]: this.openModel,
          [messageTypes.LOAD_MODEL]: this.props.loadModel,
          [messageTypes.UPDATE_MODEL]: this.props.updateModel,
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
    envs = await window.interfaces.PsyneulinkHandler.getCondaEnvs();
    this.setState({condaEnv: envs?.length > 0 ? envs[0] : '', condaEnvs: envs});
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

  openRunModalDialog = (data) => {
    this.setState({
      showRunModalDialog: true,
    });
  }

  onCloseRunModalDialog = () => {
    this.setState({
      showRunModalDialog: false,
    });
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

  // TODO migrate to redux state
  displayRunModalDialog = () => {
    return (
      this.state.showRunModalDialog && this.props.spinnerEnabled === false
        ? <Rnd
          size={{ width: '100%', height: '100%' }}
          position={{ x: 0, y: 0 }}
          disableDragging={true}
          enableResizing={false}
          style={{ zIndex: 1305 }}
        >
          <RunModalDialog
            state={this.state}
            setState={(val) => this.setState(val)}
            getMenuItems={this.getMenuItems}
            onCloseModal={this.onCloseRunModalDialog}
            selectModalOptions={selectModalOptions}
          />
        </Rnd>
        : <></>
    );
  }

  render() {
    const {viewState} = this.props;

    return (
      <>
        {this.displayRunModalDialog()}

        <Spinner />
        <DependenciesDialog />
        <CondaSelectionDialog getMenuItems={this.getMenuItems} />

        {viewState === GUIViews.EDIT ? (
          <Box>
            <Header openRunModalDialog={this.openRunModalDialog} />
            <MainEdit />
          </Box>
        ) : (
          <Box>
            <Header openRunModalDialog={this.openRunModalDialog} />
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
