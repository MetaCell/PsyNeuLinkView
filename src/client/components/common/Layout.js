import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { GUIViews } from '../../../constants';
import MainEdit from '../views/editView/MainEdit';
import ModelSingleton from '../../model/ModelSingleton';
import messageHandler from '../../grpc/messagesHandler';
import Visualize from '../views/visualiseView/Visualize';
import { openFile, loadModel, updateModel } from '../../redux/actions/general';
import CheckIcon from '@mui/icons-material/Check';
import { Rnd } from "react-rnd";
import { Box, LinearProgress, Paper, MenuItem } from "@mui/material";
import vars from '../../assets/styles/variables';
import { GVKeys } from '../../../constants';


import {CondaSelectionDialog} from "./CondaSelectionDialog";
import {DependenciesDialog} from "./DependenciesDialog";
import {RunModalDialog} from "./RunModalDialog";
const {
  listItemActiveBg,
  optionTextColor,
} = vars;

const appStates = require('../../../nodeConstants').appStates;
const messageTypes = require('../../../nodeConstants').messageTypes;

const isFrontendDev = process.env.REACT_APP_FRONTEND_DEV === 'true';

const selectModalOptions = {
  PNL_input: 'Insert the PNL model input' ,
  file_path: 'Use a file',
  python_object_name: 'Type the name of a Python object contained in the PNL model'
}

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      electronState: appStates.FRONTEND_STARTED,
      condaEnv: '',
      modalDialogValue: '',
      condaEnvs: undefined,
      dependenciesFound: true,
      condaEnvSelection: false,
      showRunModalDialog: false,
      spinnerEnabled: !isFrontendDev,
      modalDialogOptions: Object.values(selectModalOptions),
      PNL_input: "",
      file_path: "",
      python_object_name: ""
    };
  }

  async componentDidMount() {
    let envs = []

    if (window.api) {
        envs = await window.api.getInterfaces().PsyneulinkHandler.getCondaEnvs();
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
    this.setState({condaEnv: envs?.length > 0 ? envs[0] : '', condaEnvs: envs});
  }

  setServerStarted = (data) => {
    this.setState({spinnerEnabled: false});
  }

  pnlFound = (data) => {
    this.setState({
      dependenciesFound: true,
      condaEnvSelection: false,
    });
  }

  pnlNotFound = (data) => {
    this.setState({
      dependenciesFound: false,
      condaEnvSelection: false,
    });
  }

  openCondaDialog = (data) => {
    this.setState({
      dependenciesFound: false,
      condaEnvSelection: true,
    });
  }

  openRunModalDialog = (data) => {
    this.setState({
      showRunModalDialog: true,
    });
  }

  onCloseCondaSelectionDialog = () => {
    this.setState({
      condaEnvSelection: false,
    });
  }

  onCloseRunModalDialog = () => {
    this.setState({
      showRunModalDialog: false,
    });
  }

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

  displayDependenciesDialog = () => {
    return (
      this.state.dependenciesFound === false && this.state.spinnerEnabled === false
        ? <Rnd
            size={{ width: '100%', height: '100%' }}
            position={{ x: 0, y: 0 }}
            disableDragging={true}
            enableResizing={false}
            style={{ zIndex: 1305 }}
          >
           <DependenciesDialog state={this.state} setState={(val) => this.setState(val)} />
        </Rnd>
        : <></>
    );
  }

  displayCondaSelectionDialog = () => {
    return (
      this.state.condaEnvSelection && this.state.spinnerEnabled === false
        ? <Rnd
            size={{ width: '100%', height: '100%' }}
            position={{ x: 0, y: 0 }}
            disableDragging={true}
            enableResizing={false}
            style={{ zIndex: 1305 }}
          >
          <CondaSelectionDialog
            state={this.state}
            setState={(val) => this.setState(val)}
            getMenuItems={this.getMenuItems}
            onCloseModal={this.onCloseCondaSelectionDialog}
          />
        </Rnd>
        : <></>
    );
  }


  displayRunModalDialog = () => {
    return (
      this.state.showRunModalDialog && this.state.spinnerEnabled === false
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


  displaySpinner = () => {
    return (
      this.state.spinnerEnabled
        ? <Rnd
            size={{ width: '100%', height: '100%' }}
            position={{ x: 0, y: 0 }}
            disableDragging={true}
            enableResizing={false}
            style={{ zIndex: 99999 }}
          >
            <Paper
              id='pnl-wall'
              open={true}
              sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 'calc(100VW)',
                  maxWidth: 'calc(100VW)',
                  height: 'calc(100Vh)',
                  border: '0px transparent',
                  background: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1000000,
                }}
            >
              <Box sx={{ position: 'absolute', top: '50%', left: '25%', width: '50%' }}>
                <LinearProgress />
                <div style={{ position: 'absolute', left: '40%' }}> Loading... </div>
              </Box>
            </Paper>
        </Rnd>
        : <></>
    );
  }

  render() {
    const {viewState} = this.props;

    return (
      <>
        {this.displaySpinner()}
        {this.displayDependenciesDialog()}
        {this.displayCondaSelectionDialog()}
        {this.displayRunModalDialog()}

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
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openFile: (file) => dispatch(openFile(file)),
    loadModel: (model) => dispatch(loadModel(model)),
    updateModel: () => dispatch(updateModel()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef : true } )(Layout);
