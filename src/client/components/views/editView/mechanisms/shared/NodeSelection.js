import * as React from "react";
import { Box, Button } from "@mui/material";

export const onNodeExpand  = (context) => () => {
	context.props.model.isExpanded = !context.state.expanded;
	context.setState({ expanded: !context.state.expanded });
}

class NodeSelection extends React.Component {
  render() {
    const { text, changeVisibility } = this.props;
    return (
      <>
        <Button className="node-button" onClick={changeVisibility}>
          <Box
            className="icon"
          />
          {text}
        </Button>
        <Box className="nodes">
        </Box>
      </>
    );
  }
}

export default NodeSelection;
