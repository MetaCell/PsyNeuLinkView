import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useDispatch, useSelector } from "react-redux";
import { ModalsLayout } from "./ModalsLayout";
import { CustomSelect } from "./CustomSelect";
import vars from "../../assets/styles/variables";
import { messageTypes } from "../../../nodeConstants";
import { Button, Typography, Stack } from "@mui/material";
import { setCondaEnvSelection, setSpinner } from "../../redux/actions/general";

const { lightBlack, listItemActiveBg } = vars;

export const CondaSelectionDialog = ({ getMenuItems }) => {
  let currentEnv = '';
  if (window.interfaces) {
    currentEnv = window.interfaces.PsyneulinkHandler.getCondaEnv();
  }
  const [allEnvs, setAllEnvs] = useState([]);
  const [condaEnv, setCondaEnv] = useState(currentEnv);
  const dispatch = useDispatch();
  const spinnerEnabled = useSelector((state) => state.general.spinnerEnabled);
  const condaEnvSelection = useSelector(
    (state) => state.general.condaEnvSelection
  );

  useEffect(() => {
    const getEnvs = async () => {
      let envs = []
      if (window.interfaces) {
        envs = await window.interfaces.PsyneulinkHandler.getCondaEnvs();
      }
      setAllEnvs(envs);
    };
    getEnvs();
  }, []);

  const onCloseCondaSelectionDialog = () => {
    dispatch(setCondaEnvSelection(false));
  };

  return condaEnvSelection && spinnerEnabled === false ? (
    <Rnd
      size={{ width: "100%", height: "100%" }}
      position={{ x: 0, y: 0 }}
      disableDragging={true}
      enableResizing={false}
      style={{ zIndex: 1305 }}
    >
      <ModalsLayout
        hasClosingIcon={true}
        onCloseModal={onCloseCondaSelectionDialog}
      >
        <Stack spacing={4}>
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: 600,
              color: lightBlack,
              lineHeight: 1.2,
            }}
          >
            {"Select conda environment:"}
          </Typography>
          <CustomSelect
            getMenuItems={getMenuItems}
            placeholder="Conda environment"
            value={condaEnv}
            options={allEnvs}
            onSelectChange={(val) => setCondaEnv(val.target.value)}
          />
        </Stack>

        <Button
          size="small"
          variant="contained"
          disabled={
            condaEnv === window.interfaces.PsyneulinkHandler.getCondaEnv()
          }
          sx={{
            width: "100%",
            height: "2.5rem",
            boxShadow: "none",
            backgroundColor: listItemActiveBg,
            border: "2px solid rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => {
            window.interfaces.PsyneulinkHandler.setCondaEnv(condaEnv);
            window.api.send("toMain", {
              type: messageTypes.CONDA_ENV_SELECTED,
              payload: condaEnv,
            });
            dispatch(setCondaEnvSelection(false));
            dispatch(setSpinner(true));
          }}
        >
          Save conda environment
        </Button>
      </ModalsLayout>
    </Rnd>
  ) : (
    <></>
  );
};
