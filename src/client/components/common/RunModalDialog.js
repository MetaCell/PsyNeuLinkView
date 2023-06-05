import React  from "react";
import { Box, Button, IconButton, Paper, Typography, TextField } from "@mui/material";
import {messageTypes} from "../../../messageTypes";
import vars from "../../assets/styles/variables";
import {CloseModalIcon} from "../views/visualiseView/icons/layoutIcons";
import {CustomSelect} from "./CustomSelect";
import {Stack} from "@mui/system";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
const {
  lightBlack,
  listItemActiveBg,
  elementBorderColor,
  textBlack,
  textWhite
} = vars;

export const RunModalDialog = ({state, setState, getMenuItems, selectModalOptions}) => {

  const onSelectChange = (event) => {
    setState({ modalDialogValue: event.target.value })
  }

  const onOpenFile = () => {
    console.log('you clicked open file')
  }

  const onInputChange = (event, field) => {
    setState({ [field]: event.target.value })
  }

  return <Paper
    id='pnl-wall'
    open={true}
    sx={{
      position: 'absolute',
      top: 50,
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
          paddingTop: '25px',

          "& .MuiInputBase-root": {
            "&:hover": {
              border: 0,

              "& .MuiOutlinedInput-notchedOutline": {
                border: '2px solid #18A0FB',

              }
            }
          }
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
              {'Run your model'}
            </Typography>
            <CustomSelect
              setState={(val) => setState(val)}
              getMenuItems={getMenuItems}
              placeholder="Select an option"
              value={state.modalDialogValue}
              showShrunkLabel={false}
              options={state.modalDialogOptions}
              onSelectChange={(val) => onSelectChange(val)}
            />
            {
              state.modalDialogValue === selectModalOptions.PNL_input &&
              <TextField
                id="PNL_input"
                placeholder="Insert the PNL"
                multiline
                rows={10}
                onChange={(e) => onInputChange(e, 'PNL_input')}
              />
            }
            {
              state.modalDialogValue === selectModalOptions.file_path &&
              <Button
                variant="contained"
                width={1}
                onClick={onOpenFile}
                sx={{
                  height: '2.5rem',
                  boxShadow: 'none',
                  backgroundColor: elementBorderColor,
                  border: 0,
                  color: textBlack,

                  "&:hover": {
                    color: textWhite,
                    boxShadow: 'none',
                  }
                }}
              >
                Open File
              </Button>
            }
            {
              state.modalDialogValue === selectModalOptions.python_object_name &&
              <TextField
                id="python_object_name"
                placeholder="Name of a Python object"
                onChange={(e) => onInputChange(e, 'python_object_name')}
              />
            }
          </Stack>

        <Button
          size="small"
          variant="contained"
          width={1}
          disabled={!state.PNL_input && !state.file_path && !state.python_object_name}
          sx={{
            height: '2.5rem',
            boxShadow: 'none',
            backgroundColor: listItemActiveBg,
            border: '2px solid rgba(0, 0, 0, 0.1)'
          }}
          startIcon={<PlayArrowRoundedIcon />}
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
          Run your model
        </Button>
      </Box>
    </Paper>
  </Paper>
}
