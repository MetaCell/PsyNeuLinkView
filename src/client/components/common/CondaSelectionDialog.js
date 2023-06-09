import React from "react";
import { Button, Typography, Stack} from "@mui/material";
import {messageTypes} from "../../../messageTypes";
import vars from "../../assets/styles/variables";
import {CustomSelect} from "./CustomSelect";
import {ModalsLayout} from "./ModalsLayout";

const {
  lightBlack,
  listItemActiveBg
} = vars;

export const CondaSelectionDialog = ({state, setState, getMenuItems}) => {
  const onSelectChange = (event) => {
    setState({condaEnv: event.target.value})
  }
  return (
  <ModalsLayout hasClosingIcon={true}>
    <Stack spacing={4}>
      <Typography
        sx={{
          fontSize: '2.5rem',
          fontWeight: 600,
          color: lightBlack,
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
    </Stack>

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
  </ModalsLayout>)
}
