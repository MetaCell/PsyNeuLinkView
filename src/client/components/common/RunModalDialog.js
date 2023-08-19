import React from "react";
import { Rnd } from "react-rnd";
import { Stack } from "@mui/system";
import { CustomSelect } from "./CustomSelect";
import { ModalsLayout } from "./ModalsLayout";
import { InputTypes } from "../../../constants";
import vars from "../../assets/styles/variables";
import { messageTypes, rpcMessages } from "../../../nodeConstants";
import { useSelector, useDispatch } from "react-redux";
import ModelSingleton from "../../model/ModelSingleton";
import { Button, Typography, TextField } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { setInputData, setShowRunModalDialog, setSpinner } from "../../redux/actions/general";

const {
  lightBlack,
  listItemActiveBg,
  elementBorderColor,
  textBlack,
  textWhite,
} = vars;

export const RunModalDialog = ({
  getMenuItems,
}) => {
  const dispatch = useDispatch();
  const [nodeSelected, setNodeSelected] = React.useState(undefined);
  const inputData = useSelector((state) => state.general.inputData);
  const executables = useSelector((state) => state.general.executables);
  const spinnerEnabled = useSelector((state) => state.general.spinnerEnabled);
  const showRunModalDialog = useSelector((state) => state.general.showRunModalDialog);

  const inputStrings = {
    [InputTypes.RAW]: "Insert the PNL model input",
    [InputTypes.FILE]: "Use a file",
    [InputTypes.OBJECT]: "Type the name of a Python object contained in the PNL model",
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }

  const sendRunModelRequest = () => {
    const serialised_model = ModelSingleton.getInstance().serializeModel();
    const run_model_request = {
      model: serialised_model,
      input_type: inputData.type,
      input_data: inputData.data,
      executable: nodeSelected,
    };

    window.api.send("toRPC", {type: rpcMessages.RUN_MODEL, payload: run_model_request});
  }

  const onCloseRunModalDialog = () => {
    dispatch(setShowRunModalDialog(false));
  };

  const onSelectChange = (event) => {
    const key = getKeyByValue(inputStrings, event.target.value);
    dispatch(setInputData({ type: key, data: undefined }));
  };

  const onOpenFile = () => {
    window.api.send("toMain", {type: messageTypes.OPEN_INPUT_FILE});
  };

  const onInputChange = (event, field) => {
    dispatch(setInputData({ type: inputData.type, data: event.target.value }));
  };

  return showRunModalDialog && spinnerEnabled === false ? (
    <Rnd
      size={{ width: "100%", height: "100%" }}
      position={{ x: 0, y: 0 }}
      disableDragging={true}
      enableResizing={false}
      style={{ zIndex: 1305 }}
    >
      <ModalsLayout hasClosingIcon onCloseModal={onCloseRunModalDialog}>
        <Stack spacing={2}>
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: 600,
              color: lightBlack,
              lineHeight: 1.2,
            }}
          >
            {"Run your model"}
          </Typography>
          <CustomSelect
            getMenuItems={getMenuItems}
            placeholder="Select a Composition or a Mechanism to run"
            value={nodeSelected || ""}
            showShrunkLabel={false}
            options={Object.values(executables)}
            onSelectChange={(val) => setNodeSelected(val.target.value)}
          />
          <CustomSelect
            getMenuItems={getMenuItems}
            placeholder="Select an option"
            value={inputStrings[inputData.type] || ""}
            showShrunkLabel={false}
            options={Object.values(inputStrings)}
            onSelectChange={(val) => onSelectChange(val)}
          />
          {nodeSelected && inputData.type === InputTypes.RAW && (
            <TextField
              id={InputTypes.RAW}
              key={InputTypes.RAW}
              placeholder="Insert the PNL"
              multiline
              rows={10}
              value={inputData.data}
              onChange={(e) => onInputChange(e, InputTypes.RAW)}
            />
          )}
          {nodeSelected && inputData.type === InputTypes.FILE && (
            <>
              <Button
                key={InputTypes.FILE}
                disabled={true}
                variant="contained"
                width={1}
                onClick={onOpenFile}
                disableRipple
                sx={{
                  height: "2.5rem",
                  boxShadow: "none",
                  backgroundColor: elementBorderColor,
                  border: 0,
                  color: textBlack,
                  "&:hover": {
                    color: textWhite,
                    boxShadow: "none",
                  },
                }}
              >
                {inputData.data === undefined ? "Not yet supported" : "Change File"}
              </Button>
              {inputData.data === undefined
                ? <></>
                : <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: lightBlack,
                    lineHeight: 1.2,
                    textAlign: "center",
                  }}
                >
                  {"File selected: " + inputData.data}
                </Typography>
              }
            </>
          )}
          {/* {nodeSelected && inputData.type === InputTypes.FILE && inputData.data (
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: lightBlack,
                lineHeight: 1.2,
              }}
            >
              {"File selected: " + inputData.data || ""}
            </Typography>
          )} */}
          {nodeSelected && inputData.type === InputTypes.OBJECT && (
            <TextField
              id={InputTypes.OBJECT}
              key={InputTypes.OBJECT}
              value={inputData.data}
              disabled={true}
              placeholder="Not yet supported."
              onChange={(e) => onInputChange(e, InputTypes.OBJECT)}
            />
          )}
        </Stack>

        <Button
          size="small"
          variant="contained"
          width={1}
          disabled={!(inputData.type === InputTypes.RAW && nodeSelected !== undefined)}
          sx={{
            marginTop: "0.5rem",
            height: "2.5rem",
            boxShadow: "none",
            backgroundColor: listItemActiveBg,
            border: "2px solid rgba(0, 0, 0, 0.1)",
          }}
          startIcon={<PlayArrowRoundedIcon />}
          onClick={() => {
            sendRunModelRequest();
            onCloseRunModalDialog();
            dispatch(setSpinner(true));
          }}
        >
          Run your model
        </Button>
      </ModalsLayout>
    </Rnd>
  ) : (
    <></>
  );
};
