import React from "react";
import { Rnd } from "react-rnd";
import { ModalsLayout } from "./ModalsLayout";
import vars from "../../assets/styles/variables";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Stack, Box } from "@mui/material";
import { setShowErrorDialog } from "../../redux/actions/general";

const {
  lightBlack,
  buttonBorder,
  listItemActiveBg,
  nodeRedTextColor,
  nodeRedBackgroundColor,
} = vars;

export const ErrorDialog = ({ title = 'title', description = 'description', isError = true, hasClosingIcon = true, hasClosingButton = true }) => {
  const dispatch = useDispatch();
  const errorTitle = useSelector((state) => state.general.errorTitle);
  const errorMessage = useSelector((state) => state.general.errorMessage);
  const spinnerEnabled = useSelector((state) => state.general.spinnerEnabled);
  const showErrorDialog = useSelector(
    (state) => state.general.showErrorDialog
  );

  const onCloseModal = () => {
    dispatch(setShowErrorDialog(false));
  };

  return showErrorDialog && spinnerEnabled === false ? (
    <Rnd
      size={{ width: "100%", height: "100%" }}
      position={{ x: 0, y: 0 }}
      disableDragging={true}
      enableResizing={false}
      style={{ zIndex: 1305 }}
    >
      <ModalsLayout hasClosingIcon={hasClosingIcon} onCloseModal={onCloseModal}>
        <Stack spacing={2} mb={3} overflow='hidden' minHeight={.85}>
          <Typography
            sx={{
              fontSize: '2.5rem',
              fontWeight: 600,
              color: lightBlack,
              lineHeight: 1.2
            }}
          >
            {errorTitle}
          </Typography>
          <Box height={1} overflow='scroll' sx={{
            border: `2px solid`,
            borderColor: isError ? nodeRedBackgroundColor : '#F4F4F4',
            padding: '8px',
            color: isError ? nodeRedTextColor : 'initial',
            borderRadius: '1px',
          }}>
            <Typography sx={{
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
            }}>
              {errorMessage}
            </Typography>

          </Box>
        </Stack>

        {
          hasClosingButton &&
          <Stack spacing={1}>
            <Button
              variant="contained"
              size="small"
              disableRipple
              sx={{
                width: '100%',
                height: '2.5rem',
                boxShadow: 'none',
                backgroundColor: listItemActiveBg,
                border: buttonBorder
              }}
              onClick={onCloseModal}
            >
              Close
            </Button>
          </Stack>
        }
      </ModalsLayout>
    </Rnd>
  ) : (
    <></>
  )
}
