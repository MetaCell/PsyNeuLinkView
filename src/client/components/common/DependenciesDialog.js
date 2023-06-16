import React from "react";
import { Button, Typography, Stack} from "@mui/material";
import { messageTypes } from "../../../nodeConstants";
import vars from "../../assets/styles/variables";
import {ModalsLayout} from "./ModalsLayout";

const {
  breadcrumbTextColor,
  lightBlack,
  elementBorderColor,
  textBlack,
  listItemActiveBg
} = vars;

export const DependenciesDialog = ({state, setState}) => {
  return (
    <ModalsLayout>
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
    </ModalsLayout>
  )
}
