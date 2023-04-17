import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { GUIViews } from '../../../constants';
import MainEdit from '../views/editView/MainEdit';
import messageHandler from '../../grpc/messagesHandler';
import Visualize from '../views/visualiseView/Visualize';
import { openFile, loadModel, updateModel, changeAppState } from '../../redux/actions/general';

import { Rnd } from "react-rnd";
import { Box, Button, CircularProgress, Dialog, FormControl, LinearProgress, InputLabel, MenuItem, Paper, NativeSelect, Typography } from "@mui/material";

import UndoIcon from '@mui/icons-material/Undo';
import vars from '../../assets/styles/variables';

const {
  breadcrumbTextColor,
  dialogBorderColor,
  headerBorderColor,
  listSelectedTextColor,
} = vars;

const appStates = require('../../../nodeConstants').appStates;
const messageTypes = require('../../../nodeConstants').messageTypes;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      electronState: appStates.FRONTEND_STARTED,
      condaEnv: '',
      condaEnvs: undefined,
      dependenciesFound: true,
      condaEnvSelection: false,
      spinnerEnabled: true,
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
              <Paper
                elevation={4}
                id='pnl-wall'
                open={true}
                hideBackdrop
                sx={{
                    position: 'fixed',
                    top: '1rem',
                    left: '1.125rem',
                    width: 'calc(100VW - 2.25rem)',
                    maxWidth: 'calc(100VW - 2.25rem)',
                    height: 'calc(100Vh - 2rem)',
                    border: `2px solid ${dialogBorderColor}`,
                    background: headerBorderColor,
                    borderRadius: '0.75rem',
                    m: 0,
                    zIndex: 1305,
                  }}
              >
                <Box
                  sx={{
                    //center text vertically and horizontally
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: breadcrumbTextColor,
                    }}
                  >
                    {'PsyNeuLink not found. Please install it.'}
                  </Typography>
                  <Button
                    startIcon={<UndoIcon fontSize="small" />}
                    size="small"
                    variant="contained"
                    sx={{
                      height: '2.5rem',
                      backgroundColor: breadcrumbTextColor,
                      '&:hover': {
                        backgroundColor: listSelectedTextColor,
                      },
                    }}
                    onClick={() => {
                      window.api.send("toMain", {
                        type: messageTypes.INSTALL_PSYNEULINK, 
                        payload: null
                      });
                      this.setState({
                        openCondaDialog: false,
                        dependenciesFound: true,
                        spinnerEnabled: true,
                      });
                    }}
                  >
                    Install PsyNeuLink
                  </Button>
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: breadcrumbTextColor,
                    }}
                  >
                    {'Select conda environment:'}
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Conda environment</InputLabel>
                    <NativeSelect
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.condaEnv}
                      label="Conda environment"
                      onChange={(event) => {this.setState({condaEnv: event.target.value})}}
                      sx={{
                        color: breadcrumbTextColor,
                        '& .MuiSelect-select': {
                          color: breadcrumbTextColor,
                        },
                        '& .MuiSelect-icon': {
                          color: breadcrumbTextColor,
                        },
                        '& .MuiInput-underline:before': {
                          borderBottomColor: breadcrumbTextColor,
                        },
                        zIndex: 1308,
                      }}
                    >
                      {this.getMenuItems()}
                    </NativeSelect>
                  </FormControl>
                  <Button
                    startIcon={<UndoIcon fontSize="small" />}
                    size="small"
                    variant="contained"
                    sx={{
                      height: '2.5rem',
                      backgroundColor: breadcrumbTextColor,
                      '&:hover': {
                        backgroundColor: listSelectedTextColor,
                      },
                    }}
                    onClick={() => {
                      window.api.send("toMain", {
                        type: messageTypes.CONDA_ENV_SELECTED, 
                        payload: this.state.condaEnv
                      });
                      this.setState({
                        openCondaDialog: false,
                        dependenciesFound: true,
                        spinnerEnabled: true,
                      });
                    }}
                  >
                    Change conda environment
                  </Button>
                </Box>
              </Paper>
            </Paper>
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
              <Paper
                elevation={4}
                id='pnl-wall'
                open={true}
                hideBackdrop
                sx={{
                    position: 'fixed',
                    top: '1rem',
                    left: '1.125rem',
                    width: 'calc(100VW - 2.25rem)',
                    maxWidth: 'calc(100VW - 2.25rem)',
                    height: 'calc(100Vh - 2rem)',
                    border: `2px solid ${dialogBorderColor}`,
                    background: headerBorderColor,
                    borderRadius: '0.75rem',
                    m: 0,
                    zIndex: 1305,
                  }}
              >
                <Box
                  sx={{
                    //center text vertically and horizontally
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: breadcrumbTextColor,
                    }}
                  >
                    {'Select conda environment:'}
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Conda environment</InputLabel>
                    <NativeSelect
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.condaEnv}
                      label="Conda environment"
                      onChange={(event) => {this.setState({condaEnv: event.target.value})}}
                      sx={{
                        color: breadcrumbTextColor,
                        '& .MuiSelect-select': {
                          color: breadcrumbTextColor,
                        },
                        '& .MuiSelect-icon': {
                          color: breadcrumbTextColor,
                        },
                        '& .MuiInput-underline:before': {
                          borderBottomColor: breadcrumbTextColor,
                        },
                        zIndex: 1308,
                      }}
                    >
                      {this.getMenuItems()}
                    </NativeSelect>
                  </FormControl>
                  <Button
                    startIcon={<UndoIcon fontSize="small" />}
                    size="small"
                    variant="contained"
                    sx={{
                      height: '2.5rem',
                      backgroundColor: breadcrumbTextColor,
                      '&:hover': {
                        backgroundColor: listSelectedTextColor,
                      },
                    }}
                    onClick={() => {
                      window.api.send("toMain", {
                        type: messageTypes.CONDA_ENV_SELECTED, 
                        payload: this.state.condaEnv
                      });
                      this.setState({
                        openCondaDialog: false,
                        dependenciesFound: true,
                        spinnerEnabled: true,
                      });
                    }}
                  >
                    Change conda environment
                  </Button>
                </Box>
              </Paper>
            </Paper>
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
    changeAppState: (state) => dispatch(changeAppState(state)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef : true } )(Layout);
