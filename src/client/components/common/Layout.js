import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { GUIViews } from '../../../constants';
import MainEdit from '../views/editView/MainEdit';
import messageHandler from '../../grpc/messagesHandler';
import Visualize from '../views/visualiseView/Visualize';
import { openFile, loadModel, updateModel } from '../../redux/actions/general';

import { Rnd } from "react-rnd";
import { Box, LinearProgress, Paper } from "@mui/material";

import {CondaSelectionDialog} from "./CondaSelectionDialog";
import {DependenciesDialog} from "./DependenciesDialog";

const appStates = require('../../../messageTypes').appStates;
const messageTypes = require('../../../messageTypes').messageTypes;
const stateTransitions = require('../../../messageTypes').stateTransitions;

const isFrontendDev = process.env.REACT_APP_FRONTEND_DEV === 'true';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      electronState: appStates.FRONTEND_STARTED,
      condaEnv: '',
      condaEnvs: undefined,
      dependenciesFound: false,
      condaEnvSelection: false,
      spinnerEnabled: !isFrontendDev,
    };

    this.pnlFound = this.pnlFound.bind(this);
    this.pnlNotFound = this.pnlNotFound.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
    this.displaySpinner = this.displaySpinner.bind(this);
    this.openCondaDialog = this.openCondaDialog.bind(this);
    this.setServerStarted = this.setServerStarted.bind(this);
    this.displayDependenciesDialog = this.displayDependenciesDialog.bind(this);
    this.displayCondaSelectionDialog = this.displayCondaSelectionDialog.bind(this);
  }

  async componentDidMount() {
    const envs = await window.api.getInterfaces().PsyneulinkHandler.getCondaEnvs();

    if (window.api) {
      window.api.receive("fromMain", (data) => {
        messageHandler(data, {
          [messageTypes.OPEN_FILE]: this.props.openFile,
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
    this.setState({condaEnv: envs > 0 ? envs[0] : '', condaEnvs: envs});
  }

  setServerStarted(data) {
    this.setState({spinnerEnabled: false});
  }

  pnlFound(data) {
    this.setState({
      dependenciesFound: true,
      condaEnvSelection: false,
    });
  }

  pnlNotFound(data) {
    this.setState({
      dependenciesFound: false,
      condaEnvSelection: false,
    });
  }

  openCondaDialog(data) {
    this.setState({
      dependenciesFound: false,
      condaEnvSelection: true,
    });
  }

  getMenuItems() {
    return this.state.condaEnvs?.map((env) => {
      return <option id={`${env}-id`} value={env}>{env}</option>
    });
  }

  displayDependenciesDialog() {
    return (
      this.state.dependenciesFound === false && this.state.spinnerEnabled === false
        ? <Rnd
            size={{ width: '100%', height: '100%' }}
            position={{ x: 0, y: 0 }}
            disableDragging={true}
            enableResizing={false}
            style={{ zIndex: 1305 }}
          >
           <DependenciesDialog state={this.state} setState={this.setState} />
        </Rnd>
        : <></>
    );
  }

  displayCondaSelectionDialog() {
    return (
      this.state.condaEnvSelection && this.state.spinnerEnabled === false
        ? <Rnd
            size={{ width: '100%', height: '100%' }}
            position={{ x: 0, y: 0 }}
            disableDragging={true}
            enableResizing={false}
            style={{ zIndex: 1305 }}
          >
          <CondaSelectionDialog state={this.state} setState={this.setState} getMenuItems={this.getMenuItems} />
        </Rnd>
        : <></>
    );
  }


  displaySpinner() {
    return (
      this.state.spinnerEnabled
        ? <Rnd
            size={{ width: '100%', height: '100%' }}
            position={{ x: 0, y: 0 }}
            disableDragging={true}
            enableResizing={false}
            style={{ zIndex: 1305 }}
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
                  zIndex: 1304,
                }}
            >
              <Box sx={{ position: 'absolute', top: '50%', left: '25%', width: '50%' }}>
                <LinearProgress />
                <div style={{ position: 'absolute', left: '40%' }}> Starting the server... </div>
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

        {viewState === GUIViews.EDIT ? (
          <Box>
            <Header />
            <MainEdit />
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
