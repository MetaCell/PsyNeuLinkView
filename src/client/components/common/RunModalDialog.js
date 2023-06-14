import React  from "react";
import { Button, Typography, TextField } from "@mui/material";
import { messageTypes } from "../../../nodeConstants";
import vars from "../../assets/styles/variables";
import {CustomSelect} from "./CustomSelect";
import {Stack} from "@mui/system";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import {ModalsLayout} from "./ModalsLayout";
const {
  lightBlack,
  listItemActiveBg,
  elementBorderColor,
  textBlack,
  textWhite
} = vars;

export const RunModalDialog = ({state, setState, getMenuItems, selectModalOptions, onCloseModal}) => {

  const onSelectChange = (event) => {
    setState({ modalDialogValue: event.target.value })
  }

  const onOpenFile = () => {
    console.log('you clicked open file')
  }

  const onInputChange = (event, field) => {
    setState({ [field]: event.target.value })
  }

  return (
    <ModalsLayout hasClosingIcon onCloseModal={onCloseModal}>
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
  </ModalsLayout>)
}
