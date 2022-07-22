import * as React from "react";
import { withStyles } from "@mui/styles";
import { Box, Button } from "@mui/material";
import { PortWidget } from "@projectstorm/react-diagrams";

class NodeSelection extends React.Component {
  render() {
    const { classes, node, node: { options }, engine, text, changeVisibility } = this.props;

    return (
      <>
        <Button className="node-button">
          <Box
            className="icon"
            style={{
              background: options.variant.backgroundColor,
              borderColor: options.variant.borderColor,
              boxShadow: options.variant.boxShadow,
            }}
          />
          {text}
        </Button>

        <Box className="nodes">
          <PortWidget
            engine={engine}
            port={node.getPort("in")}
          >
            <Box style={{ left: '-0.375rem', top: '-0.375rem' }} className="pointer" />
          </PortWidget>
          <PortWidget
            engine={engine}
            port={node.getPort("out")}
          >
            <Box style={{ right: '-0.375rem', top: '-0.375rem' }} className="pointer" />
          </PortWidget>

          <PortWidget
            engine={engine}
            port={node.getPort("in")}
          >
            <Box style={{ left: '-0.375rem', bottom: '-0.375rem' }} className="pointer" />
          </PortWidget>
          <PortWidget
            engine={engine}
            port={node.getPort("out")}
          >
            <Box style={{ bottom: '-0.375rem', right: '-0.375rem' }} className="pointer" />
          </PortWidget>
        </Box>
      </>
    );
  }
}

export default NodeSelection;
