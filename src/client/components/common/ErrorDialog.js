import React from "react";
import { Button, Typography, Stack, Box} from "@mui/material";
import vars from "../../assets/styles/variables";
import {ModalsLayout} from "./ModalsLayout";

const {
  lightBlack,
  listItemActiveBg,
  nodeRedTextColor,
  nodeRedBackgroundColor,
  buttonBorder
} = vars;

export const ErrorDialog = ({onCloseModal, error}) => {
  return (
    <ModalsLayout hasClosingIcon={true} onCloseModal={onCloseModal}>
      <Stack spacing={2} mb={3} overflow='hidden' minHeight={.85}>
        <Typography
          sx={{
            fontSize: '2.5rem',
            fontWeight: 600,
            color: lightBlack,
            lineHeight: 1.2
          }}
        >
          An error has occurred
        </Typography>
        <Box height={1} overflow='scroll' sx={{
          border: `2px solid ${nodeRedBackgroundColor}`,
          padding: '8px',
          color: nodeRedTextColor,
          borderRadius: '1px',
        }}>
          <Typography sx={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '21px',
          }}>
            {error}
          </Typography>

        </Box>
      </Stack>

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
    </ModalsLayout>
  )
}
