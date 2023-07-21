import React from "react";
import { Rnd } from "react-rnd";
import { Stack } from "@mui/system";
import { CustomSelect } from "./CustomSelect";
import { ModalsLayout } from "./ModalsLayout";
import vars from "../../assets/styles/variables";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography, TextField } from "@mui/material";
import {
  setShowRunModalDialog,
  setInputData,
} from "../../redux/actions/general";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { InputTypes } from "../../../constants";

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
  const inputData = useSelector((state) => state.general.inputData);
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

  const onCloseRunModalDialog = () => {
    dispatch(setShowRunModalDialog(false));
  };

  const onSelectChange = (event) => {
    const key = getKeyByValue(inputStrings, event.target.value);
    dispatch(setInputData({ type: key, data: undefined }));
  };

  const onOpenFile = () => {
    console.log("you clicked open file");
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
            placeholder="Select an option"
            value={inputStrings[inputData.type] || ""}
            showShrunkLabel={false}
            options={Object.values(inputStrings)}
            onSelectChange={(val) => onSelectChange(val)}
          />
          {inputData.type === InputTypes.RAW && (
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
          {inputData.type === InputTypes.FILE && (
            <Button
              key={InputTypes.FILE}
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
              Open File
            </Button>
          )}
          {inputData.type === InputTypes.OBJECT && (
            <TextField
              id={InputTypes.OBJECT}
              key={InputTypes.OBJECT}
              value={inputData.data}
              placeholder="Name of a Python object"
              onChange={(e) => onInputChange(e, InputTypes.OBJECT)}
            />
          )}
        </Stack>

        <Button
          size="small"
          variant="contained"
          width={1}
          disabled={
            inputData.type === undefined
          }
          sx={{
            height: "2.5rem",
            boxShadow: "none",
            backgroundColor: listItemActiveBg,
            border: "2px solid rgba(0, 0, 0, 0.1)",
          }}
          startIcon={<PlayArrowRoundedIcon />}
          onClick={() => {
            // TODO: send the input data to the backend
            onCloseRunModalDialog();
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
