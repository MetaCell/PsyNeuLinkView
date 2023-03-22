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
        this.listeners = {}
        this.prevParentID = null
        this.state = {
            isMounted: false
        }
        this.registerParentListener = this.registerParentListener.bind(this)
        this.unregisterListener = this.unregisterListener.bind(this)
    }

    componentDidMount() {
        this.registerParentListener()
        this.setState({isMounted: true})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.isMounted !== this.state.isMounted && this.state.isMounted) {
            this.forceUpdate()
        }
        if (this.prevParentID !== this.getListenerID(this.props.model)){
            this.unregisterListener(this.prevParentID)
            this.registerParentListener()
        }
    }

    componentWillUnmount() {
        Object.keys(this.listeners).forEach((key) => {
            this.unregisterListener(key)
        })
    }

    registerParentListener() {
        const {model} = this.props;
        const parentNode = ModelSingleton.getInstance().getMetaGraph().getParent(model)
        if (parentNode) {
            this.listeners[this.getListenerID(model)] = parentNode.registerListener({
                [CallbackTypes.NODE_RESIZED]: (_) => {
                    this.forceUpdate()
                },
            });
        }
    }

    getMechClipPath() {
        const {model, engine} = this.props;

        const parentNode = ModelSingleton.getInstance().getMetaGraph().getParent(model)
        let clipPath = {}
        if (parentNode) {
            clipPath = getClipPath(parentNode, model, clipPathBorderSize)
        }
        return clipPath
    }

    getListenerID(node) {
        return node.getGraphPath().toString()
    }

    unregisterListener(id) {
        if (Object.keys(this.listeners).includes(id)) {
            this.listeners[id].deregister()
            delete this.listeners[id]
        }
    }

    render() {
        const {model, model: {options}, engine, changeVisibility} = this.props;
        const clipPath = this.getMechClipPath()

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
