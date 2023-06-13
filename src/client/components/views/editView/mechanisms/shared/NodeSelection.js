import * as React from "react";
import { Box, Button } from "@mui/material";

class NodeSelection extends React.Component {
  render() {
    const { text, changeVisibility } = this.props;
    return (
      <>
        <Button className="node-button" onClick={changeVisibility}>
          <Box
            className="icon"
          />
          {text}
        </Button>
        <Box className="nodes">
        </Box>
      </>
    );
  }
}

export default NodeSelection;
