import * as React from 'react';
import NodeSelection from './NodeSelection';
import { Box, Typography } from '@mui/material';
import { PortWidget, PortTypes, CallbackTypes } from '@metacell/meta-diagram';
import { getClipPath } from '../../../../../services/clippingService';
import ModelSingleton from '../../../../../model/ModelSingleton';
import { getIconFromType } from './helper';
import withParentListener from "../../withParentListener";
import {getMechanismParentID} from "../../utils";

class MechSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
    };
    this.clipPath = undefined;
    this.elementRef = React.createRef();
    this.updateParentStyle = this.updateParentStyle.bind(this);
  }

  componentDidMount() {
    this.setState({ isMounted: true });
    this.setZIndex();
  }

  setZIndex() {
    const parentElement = this.elementRef.current.parentElement;
    parentElement.style.zIndex = '10';
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.isMounted !== this.state.isMounted && this.state.isMounted) {
      this.forceUpdate();
    }
    this.updateParentStyle();
  }

  getMechClipPath(parentNode) {
    const { model } = this.props;
    return parentNode ? getClipPath(parentNode, model) : null;
  }

  // The parent element refers to the html element that wraps the mechanism
  // For all effects it is still the part of the mechanism
  updateParentStyle() {
    const parentElement = this.elementRef.current.parentElement;
    if (this.clipPath) {
      parentElement.style.clipPath = this.clipPath;
    } else {
      parentElement.style.clipPath = '';
    }
  }

  render() {
    const {
      model,
      model: { options },
      engine,
      changeVisibility,
    } = this.props;
    const parentNode = ModelSingleton.getInstance()
      .getMetaGraph()
      .getParent(model);
    this.clipPath = this.getMechClipPath(parentNode);
    const shape = model.getOption('shape');

    return (
      <Box
        ref={this.elementRef}
        className={`primary-node ${options?.variant}`}
        sx={{
          boxShadow: this.clipPath ? 'none !important' : undefined,
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

export default withParentListener(MechSimple, getMechanismParentID);
