import React from "react";
import {Box, IconButton, Paper} from "@mui/material";
import {CloseModalIcon} from "../views/visualiseView/icons/layoutIcons";

export const ModalsLayout = ({children, hasClosingIcon = false}) => {

  return <Paper
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
    }}
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
        {children}
      </Box>
    </Paper>
  </Paper>
}
