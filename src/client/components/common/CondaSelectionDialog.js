import React from "react";
import {Box, Button, FormControl, InputLabel, NativeSelect, Paper, Typography} from "@mui/material";
import {messageTypes} from "../../../messageTypes";
import vars from "../../assets/styles/variables";
const {
  breadcrumbTextColor,
  lightBlack,
  listItemActiveBg
} = vars;

export const CondaSelectionDialog = ({state, setState, getMenuItems}) => {
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
        background: "#fff",
        borderRadius: '0.75rem',
        m: 0,
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
          alignItems: 'inherit',
          justifyContent: 'space-between',
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
          <FormControl
            fullWidth
            sx={{
              background: '#F4F4F4',
              borderRadius: '8px',
              "& .MuiInputLabel-root": {
                transition: 'none',
                position: 'absolute',
                top: '50%',
                left: '16px',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                zIndex: 1,
                fontSize: '14px',
                color: '#1A1A1A',
                fontWeight:400,
              },

              "& .MuiInputLabel-shrink":  {
                  transform: 'translateY(-100%)',
                  fontSize: '10px',
                  color: '#8F8F8F'
               },

               "& .MuiSvgIcon-root": {
                 top: 'calc(50% - 0.8em)'
               }
            }}>
            <InputLabel id="demo-simple-select-label">Conda environment</InputLabel>
            <NativeSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.condaEnv}
              label="Conda environment"
              onChange={(event) => {setState({condaEnv: event.target.value})}}
              sx={{
                color: breadcrumbTextColor,
                "&:before, &:after": {
                  border: "none"
                },
                "&:hover:not(.Mui-disabled, .Mui-error)": {
                  "&:before": {
                    border: "none"
                  },
                },
                "&.Mui-focused": {
                  "& .MuiInputLabel-root": {
                    color: '#8F8F8F'
                  }
                }

              }}
            >
              {getMenuItems()}
            </NativeSelect>
          </FormControl>
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
