import * as React from "react";
import {DiagramEngine, PortWidget} from "@projectstorm/react-diagrams";
import {MetaNodeModel} from "meta-diagram";
import {Typography} from "@mui/material";

export class CustomNodeWidget extends React.Component {
    render() {
        // @ts-ignore
        const customNodeStyle = {
            zIndex: 999999999,
            border: "solid 2px gray",
            borderRadius: "5px",
            width: "250px",
            height: "200px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            position: "relative",
            background: this.props.node.getOptions()['color'] || "darkgray",
            top: this.props.node.getOptions()['position']?.y || 0,
            left: this.props.node.getOptions()['position']?.x || 0
        }

        const circlePortStyle = {
            width: "12px",
            height: "12px",
            margin: "2px",
            borderRadius: "4px",
            background: "darkgray",
            cursor: "pointer",
        }

        return (
            <>
                <div style={customNodeStyle}>
                    <PortWidget
                        style={{position: 'absolute', top: '0px', left: '0px'}}
                        engine={this.props.engine}
                        port={this.props.node.getPort("in")}
                    >
                        <div style={circlePortStyle}/>
                    </PortWidget>
                    <PortWidget
                        style={{position: 'absolute', top: '0px', right: '0px'}}
                        engine={this.props.engine}
                        port={this.props.node.getPort("out")}
                    >
                        <div style={circlePortStyle}/>
                    </PortWidget>
                    <Typography>{this.props.node.getOptions()['name']}</Typography>
                </div>
            </>
        );
    }
}

// @ts-ignore
export default CustomNodeWidget;
