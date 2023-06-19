import React from "react";
import { Button, Typography, Stack, Box, Paper, IconButton} from "@mui/material";
import vars from "../../assets/styles/variables";
import { CloseModalIcon } from "../views/visualiseView/icons/layoutIcons";

const {
  lightBlack,
  listItemActiveBg,
  nodeRedTextColor,
  nodeRedBackgroundColor,
  buttonBorder
} = vars;

export const ErrorDialog = ({title, onCloseModal, error, hasClosingIcon, hasClosingButton}) => {
  return (
    <Paper
      id='pnl-wall'
      open={true}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 'calc(100VW)',
        maxWidth: 'calc(100VW)',
        height: 'calc(100Vh)',
        border: '0px transparent',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } }
  >
    <Paper
      elevation={4}
      id='pnl-wall'
      open={true}
      hideBackdrop
      sx={{
        position: 'fixed',
        background: "#fff",
        borderRadius: '0.75rem',
        zIndex: 1305,
        width: '640px',
        height: '640px',
        top: 60,
      }}
    >
      {
        hasClosingIcon &&  <IconButton
          sx={{
            padding: 0,
            margin: '1rem',
            position: 'absolute',
            top: '0',
          }}
          onClick={onCloseModal}
        >
          <CloseModalIcon />
        </IconButton>
      }

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
    </Paper>
  </Paper>
  )
}
