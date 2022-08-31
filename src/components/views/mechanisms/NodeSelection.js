import * as React from "react";
import { Box, Button } from "@mui/material";
import PortWigetComp from "./PortWidgetComp";

class NodeSelection extends React.Component {
  render() {
    const { classes, node, node: { options }, engine, text, changeVisibility } = this.props;
    const selectionPoint = '-0.375rem';
    const IN = 'in';
    const OUT = 'out';
    return (
      <>
        <Button className="node-button" onClick={changeVisibility}>
          <Box
            className="icon"
          />
          {text}
        </Button>

        <Box className="nodes">
          {/* <PortWigetComp engine={engine} port={node} direction={IN} startPoints={{ left: selectionPoint, top: selectionPoint }} />
          <PortWigetComp engine={engine} port={node} direction={OUT} startPoints={{ right: selectionPoint, top: selectionPoint }} />
          <PortWigetComp engine={engine} port={node} direction={IN} startPoints={{ left: selectionPoint, bottom: selectionPoint }} />
          <PortWigetComp engine={engine} port={node} direction={OUT} startPoints={{ right: selectionPoint, bottom: selectionPoint }} /> */}
        </Box>
      </>
    );
  }
}

export default NodeSelection;
