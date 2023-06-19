import React from "react";
import { Rnd } from "react-rnd";
import { ModalsLayout } from "./ModalsLayout";
import vars from "../../assets/styles/variables";
import { useDispatch, useSelector } from "react-redux";
import { messageTypes } from "../../../nodeConstants";
import { Button, Typography, Stack } from "@mui/material";
import { setSpinner, setCondaEnvSelection, setDependenciesFound } from "../../redux/actions/general";

const {
  breadcrumbTextColor,
  lightBlack,
  elementBorderColor,
  textBlack,
  listItemActiveBg,
} = vars;

export const DependenciesDialog = () => {
  const dispatch = useDispatch();
  const spinnerEnabled = useSelector((state) => state.general.spinnerEnabled);
  const condaEnvSelection = useSelector(
    (state) => state.general.condaEnvSelection
  );
  const dependenciesFound = useSelector(
    (state) => state.general.dependenciesFound
  );

  return dependenciesFound === false &&
    spinnerEnabled === false &&
    condaEnvSelection === false ? (
    <Rnd
      size={{ width: "100%", height: "100%" }}
      position={{ x: 0, y: 0 }}
      disableDragging={true}
      enableResizing={false}
      style={{ zIndex: 1305 }}
    >
      <ModalsLayout>
        <Stack spacing={2}>
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: 600,
              color: lightBlack,
              lineHeight: 1.2,
            }}
          >
            We couldn’t find Psyneulink.
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "0.875rem",
              color: breadcrumbTextColor,
            }}
          >
            Psyneulink has not been found on this conda environment. You can
            switch environment or install Psyneulink on this one.
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              height: "2.5rem",
              backgroundColor: elementBorderColor,
              boxShadow: "none",
              color: textBlack,
            }}
            onClick={() => {
              dispatch(setCondaEnvSelection(true));
            }}
          >
            Switch conda environment
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              width: "100%",
              height: "2.5rem",
              boxShadow: "none",
              backgroundColor: listItemActiveBg,
              border: "2px solid rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => {
              window.api.send("toMain", {
                type: messageTypes.INSTALL_PSYNEULINK,
                payload: null,
              });
              dispatch(setDependenciesFound(true));
              dispatch(setSpinner(true));
            }}
          >
            Install PsyNeuLink
          </Button>
        </Stack>
      </ModalsLayout>
    </Rnd>
  ) : (
    <></>
  );
};
