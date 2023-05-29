import * as React from "react";
import Box from "@mui/material/Box";
import {withStyles} from "@mui/styles";
import NodeSelection from "../shared/NodeSelection";
import InputOutputNode from "../shared/InputOutputNode";
import Typography from "@mui/material/Typography";
import {PortTypes} from "@metacell/meta-diagram";
import vars from "../../../../../assets/styles/variables";

const styles = {
    textColor: {
        color: vars.functionTextColor
    },
    codeColor: {
        color: vars.functionCodeColor
    },
};

class MechMetadata extends React.Component {

    constructor() {
        super();
        this.elementRef = React.createRef();
    }

    componentDidMount() {
        this.forceUpdate() // so that we get the ref to the element
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const parentElement = this.elementRef.current.parentElement;
        parentElement.style.clipPath = '';
        parentElement.style.zIndex = 10000;
    }

    render() {
        const {classes, model, model: {options}, engine, changeVisibility} = this.props;
        const functionValues = (label, value) => (
            <Box className="block">
                <Typography component="label">{label}</Typography>
                <Typography>{value}</Typography>
            </Box>
        )

        return (
            <Box ref={this.elementRef} className={`primary-node rounded ${options.variant}`}>
                {options.selected && (
                    <NodeSelection node={model} engine={engine} text={"Hide properties"}
                                   changeVisibility={changeVisibility}/>
                )}
                <Box className="primary-node_header">
                    <Box className="icon"/>
                    <Typography component="p">
                        {options.name}
                    </Typography>
                </Box>

                <Box>
                    {options.ports.map(port => {
                        switch (port.getType()) {
                            case PortTypes.INPUT_PORT:
                                return (
                                    <InputOutputNode key={model.getID() + '_' + port.getId()} engine={engine}
                                                     port={model.getPort(port.getId())} text={port.getId()}/>
                                );
                            default:
                                return <></>
                        }
                    })}
                </Box>

                <Box className="seprator"/>

                <Box className="block-wrapper">
                    {
                        functionValues('Context', '12')
                    }
                    {
                        functionValues('Size', '8.90')
                    }
                    {
                        functionValues('Prefs', '44')
                    }
                    <Box className="block">
                        <Typography component="label">Function</Typography>
                        <Typography className="function">
                            <Typography component="strong" className={classes?.textColor}>
                                function
                            </Typography>=pnl.<Typography className={classes?.codeColor}
                                                          component="strong">Logistic</Typography>(gain=1.0,
                            bias=-4)</Typography>
                    </Box>
                </Box>

                <Box className="separator"/>

                <Box>
                    {options.ports.map(port => {
                        switch (port.getType()) {
                            case PortTypes.OUTPUT_PORT:
                                return (
                                    <InputOutputNode key={model.getID() + '_' + port.getId()} engine={engine}
                                                     port={model.getPort(port.getId())} text={port.getId()}
                                                     direction="right"/>
                                )
                                    ;
                            default:
                                return <></>
                        }
                    })}
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(MechMetadata);
