import * as React from "react";
import NodeSelection from "./NodeSelection";
import { Box, Typography } from "@mui/material";
import { PortWidget, PortTypes } from "@metacell/meta-diagram";
import ModelSingleton from "../../../../model/ModelSingleton";

class MechSimple extends React.Component {
  render() {
    const { model, model: { options }, engine, changeVisibility } = this.props;

    // fixme: we should be getting this from styles
    // container border size in (rem * pixels per rem) * 2 to work around the corner border radius
    const borderSize = (0.125 * 16) * 2

    const clipPath = ModelSingleton.getInstance().getMetaGraph()
        .getClipPath(model, engine.model.getZoomLevel() / 100, borderSize)

    const styles = clipPath !== null ? { clipPath: clipPath } : {};

    return (
      <Box className={`primary-node ${options?.variant}`} sx={{...styles}}>
        {options.selected && (
          <NodeSelection node={model} engine={engine} text={"Show properties"} changeVisibility={changeVisibility} />
        )}
        <Box
          className="primary-node_header"
        >
          <Box className="icon" />
          <Typography component="p">
            {options.name}
          </Typography>
          { options.ports.map(port => {
            switch (port.getType()) {
              case PortTypes.INPUT_PORT:
                return (
                  <PortWidget key={model.getID() + '_' + port.getId()} engine={engine} port={model.getPort(port.getId())} className="simple-input-port">
                    <div className="simple-input-port" />
                  </PortWidget>
                );
              case PortTypes.OUTPUT_PORT:
                return (
                  <PortWidget key={model.getID() + '_' + port.getId()} engine={engine} port={model.getPort(port.getId())} className="simple-output-port">
                    <div className="simple-output-port" />
                  </PortWidget>
                );
              default:
                // TODO: what to do with other ports?
                return (<></>);
            }
          })}
        </Box>
      </Box>
    );
  }
}

export default MechSimple;
