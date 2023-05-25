import React from "react";
import {Box, Button, Paper, Typography, Stack} from "@mui/material";
import {messageTypes} from "../../../messageTypes";
import vars from "../../assets/styles/variables";

const {
  breadcrumbTextColor,
  lightBlack,
  elementBorderColor,
  textBlack,
  listItemActiveBg
} = vars;

export const DependenciesDialog = ({state, setState}) => {
  return <Paper
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Paper
      elevation={4}
      id='pnl-wall'
      open={true}
      hideBackdrop
      sx={{
        position: 'fixed',
        background: "#fff",
        borderRadius: '0.75rem',
        zIndex: 1305,
        padding: '80px',
        width: '640px',
        height: '640px',
      }}
    >
      <Box
        height={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'left',
        }}
      >
        <Stack spacing={2}>
          <Typography
            sx={{
              fontSize: '2.5rem',
              fontWeight: 600,
              color: lightBlack,
              lineHeight: 1.2
            }}
          >
            We couldn’t find Psyneulink.
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '0.875rem',
              color: breadcrumbTextColor,
            }}
          >
            Psyneulink has not been found on this conda environment. You can switch environment or install Psyneulink on this one.
          </Typography>
        </Stack>

        <Stack spacing={1}>
        <Button
          variant="contained"
          sx={{
            width: '100%',
            height: '2.5rem',
            backgroundColor: elementBorderColor,
            boxShadow: 'none',
            color: textBlack
          }}
          onClick={() => {
            window.api.send("toMain", {
              type: messageTypes.CONDA_ENV_SELECTED,
              payload: state.condaEnv
            });
            setState({
              openCondaDialog: false,
              dependenciesFound: true,
              spinnerEnabled: true,
            });
          }}
        >
          Switch conda environment
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            width: '100%',
            height: '2.5rem',
            boxShadow: 'none',
            backgroundColor: listItemActiveBg,
            border: '2px solid rgba(0, 0, 0, 0.1)'
          }}
          onClick={() => {
            window.api.send("toMain", {
              type: messageTypes.INSTALL_PSYNEULINK,
              payload: null
            });
            setState({
              openCondaDialog: false,
              dependenciesFound: true,
              spinnerEnabled: true,
            });
          }}
        >
          Install PsyNeuLink
        </Button>
        </Stack>
      </Box>
    </Paper>
  </Paper>
}
