import * as React from "react";
import { Box, Typography } from "@mui/material";
import {PortWidget} from "@projectstorm/react-diagrams";

class InputOutputNode extends React.Component {
    render() {
        const { text, direction, engine, port } = this.props;
        const nodeClass = direction === 'right' ? 'block reverse' : 'block';

        return (
            <Box className={nodeClass}>
                <PortWidget engine={engine} port={port} className="disc">
                    <Box/>
                </PortWidget>
                <Typography>{text}</Typography>
            </Box>
        );
    }
}

export default InputOutputNode;
