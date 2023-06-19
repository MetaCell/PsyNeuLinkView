import React from "react";
import { Rnd } from "react-rnd";
import { useSelector } from "react-redux";
import { Box, LinearProgress, Paper } from "@mui/material";

export const Spinner = ({ getMenuItems }) => {
  const spinnerEnabled = useSelector((state) => state.general.spinnerEnabled);

  return spinnerEnabled ? (
    <Rnd
      size={{ width: "100%", height: "100%" }}
      position={{ x: 0, y: 0 }}
      disableDragging={true}
      enableResizing={false}
      style={{ zIndex: 99999 }}
    >
      <Paper
        id="pnl-wall"
        open={true}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "calc(100VW)",
          maxWidth: "calc(100VW)",
          height: "calc(100Vh)",
          border: "0px transparent",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000000,
        }}
      >
        <Box
          sx={{ position: "absolute", top: "50%", left: "25%", width: "50%" }}
        >
          <LinearProgress />
          <div style={{ position: "absolute", left: "40%" }}> Loading... </div>
        </Box>
      </Paper>
    </Rnd>
  ) : (
    <></>
  );
};
