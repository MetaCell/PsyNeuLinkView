import React from "react";
import { Button, Typography, Stack, Box} from "@mui/material";
import vars from "../../assets/styles/variables";
import { ModalsLayout } from "./ModalsLayout";

const {
  lightBlack,
  listItemActiveBg,
  nodeRedTextColor,
  nodeRedBackgroundColor,
  buttonBorder
} = vars;

export const ErrorDialog = ({title,description, onCloseModal, isError, hasClosingIcon, hasClosingButton}) => {
  return (
    <ModalsLayout hasClosingIcon={hasClosingIcon} onCloseModal={onCloseModal}>
      <Box
        height={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'left',
          padding: '80px',

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
       <Stack spacing={2} mb={3} overflow='hidden' minHeight={.85}>
        <Typography
          sx={{
            fontSize: '2.5rem',
            fontWeight: 600,
            color: lightBlack,
            lineHeight: 1.2
          }}
        >
          {title}
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
            {description}
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

      
      </Box>
    </ModalsLayout>
  )
}
