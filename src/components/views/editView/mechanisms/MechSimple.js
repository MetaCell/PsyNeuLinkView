import * as React from "react";
import NodeSelection from "./NodeSelection";
import {Box, Typography} from "@mui/material";
import {PortWidget, PortTypes, CallbackTypes} from "@metacell/meta-diagram";
import {clipPathBorderSize} from "../../../../constants";
import {getClipPath} from "../../../../services/clippingService";
import ModelSingleton from "../../../../model/ModelSingleton";

class MechSimple extends React.Component {

    constructor(props) {
        super(props);
        this.registers = {}
        this.registerParentListener = this.registerParentListener.bind(this)
        this.state = {
            clipPath: null
        }
    }

    componentDidMount() {
        this.registerParentListener()
        this.setState({clipPath: getClipPath})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.props.engine.repaintCanvas()

        if (prevProps.model.getGraphPath().toString() !== this.props.model.getGraphPath().toString()) {
            this.registers[prevProps.model.getGraphPath().toString()].deregister()
            this.registerParentListener()
        }
    }

    componentWillUnmount() {
        Object.keys(this.registers).forEach((key) => {
            this.registers[key].deregister()
        })
    }

    registerParentListener() {
        const {model} = this.props;
        const parentNode = ModelSingleton.getInstance().getMetaGraph().getParent(model)
        if (parentNode) {
            this.registers[model.getGraphPath().toString()] = parentNode.registerListener({
                [CallbackTypes.NODE_RESIZED]: (entity) => {
                },
            });
        }
    }


    render() {
        const {model, model: {options}, engine, changeVisibility} = this.props;

        const graphPath = model.getGraphPath();
        const parentId = graphPath.length > 1 ? graphPath[graphPath.length - 2] : null;

        const parentElement = document.querySelector(`[data-nodeid=${parentId}]`);
        const nodeElement = document.querySelector(`[data-nodeid=${model.getID()}]`);
        let clipPath

        if(parentElement && nodeElement){
            clipPath = getClipPath(parentElement, nodeElement, clipPathBorderSize, engine.model.getZoomLevel() / 100)
        }
        const styles = clipPath !== undefined ? {clipPath: clipPath} : {}

        return (
            <Box className={`primary-node ${options?.variant}`} sx={{...styles}}>
                {options.selected && (
                    <NodeSelection node={model} engine={engine} text={"Show properties"}
                                   changeVisibility={changeVisibility}/>
                )}
                <Box
                    className="primary-node_header"
                >
                    <Box className="icon"/>
                    <Typography component="p">
                        {options.name}
                    </Typography>
                    {options.ports.map(port => {
                        switch (port.getType()) {
                            case PortTypes.INPUT_PORT:
                                return (
                                    <PortWidget key={model.getID() + '_' + port.getId()} engine={engine}
                                                port={model.getPort(port.getId())} className="simple-input-port">
                                        <div className="simple-input-port"/>
                                    </PortWidget>
                                );
                            case PortTypes.OUTPUT_PORT:
                                return (
                                    <PortWidget key={model.getID() + '_' + port.getId()} engine={engine}
                                                port={model.getPort(port.getId())} className="simple-output-port">
                                        <div className="simple-output-port"/>
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
