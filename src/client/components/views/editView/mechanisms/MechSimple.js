import * as React from "react";
import NodeSelection from "./NodeSelection";
import { Box, Typography } from "@mui/material";
import { PortWidget, PortTypes } from "@metacell/meta-diagram";
// import { PortWidget } from "../ports/PortWidget";
import { CallbackTypes } from "@metacell/meta-diagram";

class MechSimple extends React.Component {
  
  componentDidMount() {
      const { model, model: { options }, engine, changeVisibility } = this.props;
      model.getParentCanvasModel().registerListener({
        eventDidFire: (entity, entity2) => {
          console.log(entity, entity2)
        },
        [CallbackTypes.NODE_RESIZED]: (entity, entity2) => {
          console.log('dario ne saaaaaaaaaaaaaaaaaaaaa')
          console.log(entity, entity2)
        },
      });
    }

  render() {
    const { model, model: { options }, engine, changeVisibility } = this.props;

    return (
      <Box className={`primary-node ${options?.variant}`}>
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
