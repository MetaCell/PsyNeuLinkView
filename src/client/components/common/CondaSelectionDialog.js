import React from "react";
import {Box, Button, IconButton, Paper, Typography} from "@mui/material";
import {messageTypes} from "../../../messageTypes";
import vars from "../../assets/styles/variables";
import {CloseModalIcon} from "../views/visualiseView/icons/layoutIcons";
import {CustomSelect} from "./CustomSelect";

const {
  lightBlack,
  listItemActiveBg
} = vars;

export const CondaSelectionDialog = ({state, setState, getMenuItems}) => {
  const onSelectChange = (event) => {
    setState({condaEnv: event.target.value})
  }

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
        width: '640px',
        height: '640px',
      }}
    >
      <IconButton
        sx={{
          padding: 0,
          margin: '1rem'
        }}
      >
        <CloseModalIcon />
      </IconButton>
      <Box
        height={.895}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'inherit',
          justifyContent: 'space-between',
          padding: '80px',
          paddingTop: '25px'
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '2.5rem',
              fontWeight: 600,
              color: lightBlack,
              marginBottom: '1.714rem',
              lineHeight: 1.2
            }}
          >
            {'Select conda environment:'}
          </Typography>
          <CustomSelect
            setState={(val) => setState(val)}
            getMenuItems={getMenuItems}
            placeholder="Conda environment"
            value={state.condaEnv}
            options={state.condaEnvs}
            onSelectChange={(val) => onSelectChange(val)}
          />
        </Box>

        <Button
          size="small"
          variant="contained"
          sx={{
            width: '100%',
            height: '2.5rem',
            boxShadow: 'none',
            backgroundColor: listItemActiveBg,
            border: '2px solid rgba(0, 0, 0, 0.1)'
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
          Save conda environment
        </Button>
      </Box>
    </Paper>
  </Paper>
}
