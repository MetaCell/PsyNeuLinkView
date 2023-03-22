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
        this.state = {
            clipPath: {},
            isMounted: false
        }
        this.registerParentListener = this.registerParentListener.bind(this)
    }

    componentDidMount() {
        this.registerParentListener()
        this.setState({isMounted: true})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.model.getGraphPath().toString() !== this.props.model.getGraphPath().toString()) {
            this.registers[prevProps.model.getGraphPath().toString()].deregister()
            this.registerParentListener()
        }
        if (prevState.isMounted !== this.state.isMounted && this.state.isMounted) {
            this.setState({clipPath: this.getMechClipPath()})
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
                [CallbackTypes.NODE_RESIZED]: (_) => {
                    this.setState({clipPath: this.getMechClipPath()})
                },
            });
        }
    }

    getMechClipPath() {
        const {model, engine} = this.props;

        const parentNode = ModelSingleton.getInstance().getMetaGraph().getParent(model)
        let clipPath = {}
        if (parentNode) {
            clipPath = getClipPath(parentNode, model, clipPathBorderSize, engine.model.getZoomLevel() / 100)
        }
        return clipPath
    }

    render() {
        const {model, model: {options}, engine, changeVisibility} = this.props;
        const {clipPath} = this.state;

        return (
            <Box className={`primary-node ${options?.variant}`} sx={{clipPath: clipPath}}>
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
