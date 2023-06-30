import * as React from 'react';
import NodeSelection from './NodeSelection';
import { Box, Typography } from '@mui/material';
import { PortWidget, PortTypes } from '@metacell/meta-diagram';
import { getIconFromType } from './helper';
import withParentListener from "../../withParentListener";
import {getMechanismParentID} from "../../utils";
import withClipPath from "../../withClipPath";

class MechSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
    this.setZIndex();
  }

  setZIndex() {
    const parentElement = this.props.elementRef.current.parentElement;
    parentElement.style.zIndex = '10';
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.isMounted !== this.state.isMounted && this.state.isMounted) {
      this.forceUpdate();
    }
  }


  render() {
    const {
      model,
      model: { options },
      engine,
      changeVisibility,
      hasClipPath
    } = this.props;
    const shape = model.getOption('shape');

    return (
      <Box
        ref={this.props.elementRef}
        className={`primary-node ${options?.variant}`}
        sx={{
          boxShadow: hasClipPath ? 'none !important' : undefined,
        }}
      >
        {options.selected && (
          <NodeSelection
            node={model}
            engine={engine}
            text={'Show properties'}
            changeVisibility={changeVisibility}
          />
        )}
        <Box className="primary-node_header">
          <Box className="icon-wrapper">{getIconFromType(shape)}</Box>{' '}
          <Typography component="p">{options.name}</Typography>
          {options.ports.map((port) => {
            switch (port.getType()) {
              case PortTypes.INPUT_PORT:
                return (
                  <PortWidget
                    key={model.getID() + '_' + port.getId()}
                    engine={engine}
                    port={model.getPort(port.getId())}
                    className="simple-input-port"
                  >
                    <div className="simple-input-port" />
                  </PortWidget>
                );
              case PortTypes.OUTPUT_PORT:
                return (
                  <PortWidget
                    key={model.getID() + '_' + port.getId()}
                    engine={engine}
                    port={model.getPort(port.getId())}
                    className="simple-output-port"
                  >
                    <div className="simple-output-port" />
                  </PortWidget>
                );
              default:
                // TODO: what to do with other ports?
                return <></>;
            }
          })}
        </Box>
      </Box>
    );
  }
}

export default withParentListener(withClipPath(MechSimple), getMechanismParentID);
