import * as React from "react";
import NodeSelection from "../shared/NodeSelection";
import {Box, Typography} from "@mui/material";
import {PortWidget, PortTypes, CallbackTypes} from "@metacell/meta-diagram";
import {clipPathBorderSize} from "../../../../../../constants";
import {getClipPath} from "../../../../../services/clippingService";
import ModelSingleton from "../../../../../model/ModelSingleton";
import {v4 as uuidv4} from 'uuid';

class MechSimple extends React.Component {

    constructor(props) {
        super(props);
        this.listeners = {}
        this.prevParentID = null
        this.state = {
            isMounted: false
        }
        this.elementRef = React.createRef();
        this.clipPath = undefined;
        this.registerParentListener = this.registerParentListener.bind(this)
        this.unregisterListener = this.unregisterListener.bind(this)
        this.updateParentStyle = this.updateParentStyle.bind(this)

    }

    componentDidMount() {
        this.registerParentListener()
        this.setState({isMounted: true})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.isMounted !== this.state.isMounted && this.state.isMounted) {
            this.forceUpdate()
        }
        if (this.prevParentID !== this.getListenerID(this.props.model)) {
            this.unregisterListener(this.prevParentID)
            this.registerParentListener()
        }
        this.updateParentStyle()
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

    getMechClipPath(parentNode) {
        const {model} = this.props;
        return parentNode ? getClipPath(parentNode, model) : null
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

    updateParentStyle() {

        const parentElement = this.elementRef.current.parentElement;
        if (this.clipPath) {
            parentElement.style.clipPath = this.clipPath;
        } else {
            parentElement.style.clipPath = '';
        }


    }

    render() {
        const {model, model: {options}, engine, changeVisibility} = this.props;
        const parentNode = ModelSingleton.getInstance().getMetaGraph().getParent(model)
        this.clipPath = this.getMechClipPath(parentNode)

        return (
            <Box ref={this.elementRef} className={`primary-node ${options?.variant}`}
                 sx={{
                     boxShadow: this.clipPath ? 'none !important' : undefined
                 }}>
                {options.selected && (
                    <NodeSelection key={uuidv4()} node={model} engine={engine} text={"Show properties"}
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
