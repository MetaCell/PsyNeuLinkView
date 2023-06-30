import * as React from "react";
import { Rnd } from "react-rnd";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import { Box, Chip } from "@mui/material";
import vars from "../../../../assets/styles/variables";
import MORE_OPTION from "../../../../assets/svg/option.svg"
import { openComposition } from "../../../../redux/actions/general";
import {resizeChangedPositionOption} from "../../../../../constants";
import withParentListener from "../withParentListener";
import {getCompositionParentID} from "../utils";
import withClipPath from "../withClipPath";

const {
  chipBorderColor,
  chipTextColor,
  draggableBg,
  listItemActiveBg,
  textWhite,
} = vars;

const commonStyles = {
  background: `${textWhite} !important`,
  border: `0.0975rem solid ${listItemActiveBg} !important`,
  borderRadius: '0.125rem !important'
};

const styles = () => ({
  root: {
    '& .react-draggable': {
      background: draggableBg,
      border: `0.125rem solid ${chipBorderColor}`,
      borderRadius: '0.75rem',
      display: "flex !important",
      alignItems: "center",
      justifyContent: "center",

      '&:hover': {
        borderColor: listItemActiveBg
      },
    },

    '& .MuiChip-root': {
      background: chipBorderColor,
      borderRadius: '0.75rem',
      padding: '0 0.5rem',
      display: "flex",
      left: 0,
      position: 'absolute',
      color: chipTextColor,
      top: '-1.75rem',
      alignItems: "center",
      height: '1.5rem',
      letterSpacing: '-0.005rem',
      fontWeight: 510,
      fontSize: '0.8125rem',
      lineHeight: '1.25rem',
      flexDirection: 'row-reverse',

      '& .MuiChip-label': {
        padding: 0,
      },

      '& .MuiChip-icon': {
        margin: '0 0 0 0.25rem',
      },
    },
  },

  selected: {
    '&:before': {
      left: 0,
      ...commonStyles
    },

    '&:after': {
      right: 0,
      ...commonStyles
    },

    '& .MuiChip-root': {
      background: listItemActiveBg
    },

    '& .react-draggable': {
      borderColor: listItemActiveBg,
    }
  },
});

class Composition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      subGraphOpen: false,
      width: props.model.options.width,
      height: props.model.options.height,
      x: 0,
      y: 0,
      xUpdated: false,
      yUpdated: false,
      isResizing: false
    }
    this.changeVisibility = this.changeVisibility.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isResizing } = this.state;

    // If we've started resizing, remove clipPath from parentElement
    if (prevState.isResizing !== isResizing && isResizing) {
      const parentElement = this.props.elementRef.current.parentElement;
      parentElement.style.clipPath = '';
    }
  }

  changeVisibility() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const { expanded } = this.state;
    const { classes } = this.props;

    return (
        <Box
          ref={this.props.elementRef}
          style={{width: this.state.width, height: this.state.height}}
          className={`${classes.root} ${expanded ? classes.selected : ''}`}
        >
          <Rnd
            size={{ width: this.state.width, height: this.state.height }}
            position={{ x: this.state.x, y: this.state.y }}
            onResizeStart={(e, direction, ref, delta, position) => {
              this.setState({ isResizing: true });
            }}
            onResize={(e, direction, ref, delta, position) => {
              switch (direction) {
                case 'top':
                  this.setState({
                    y: parseFloat(e.clientY),
                    yUpdated: true,
                    height: parseFloat(ref.style.height),
                  });
                  break;
                case 'right':
                  this.setState({
                    width: parseFloat(ref.style.width),
                  });
                  break;
                case 'bottom':
                  this.setState({
                    height: parseFloat(ref.style.height),
                  });
                  break;
                case 'left':
                  this.setState({
                    x: parseFloat(e.clientX),
                    xUpdated: true,
                    width: parseFloat(ref.style.width),
                  });
                  break;
                case 'topLeft':
                  this.setState({
                    x: parseFloat(e.clientX),
                    y: parseFloat(e.clientY),
                    xUpdated: true,
                    yUpdated: true,
                    width: parseFloat(ref.style.width),
                    height: parseFloat(ref.style.height),
                  });
                  break;
                case 'topRight':
                  this.setState({
                    y: parseFloat(e.clientY),
                    yUpdated: true,
                    width: parseFloat(ref.style.width),
                    height: parseFloat(ref.style.height),
                  });
                  break;
                case 'bottomRight':
                  this.setState({
                    width: parseFloat(ref.style.width),
                    height: parseFloat(ref.style.height),
                  });
                  break;
                case 'bottomLeft':
                  this.setState({
                    x: parseFloat(e.clientX),
                    xUpdated: true,
                    width: parseFloat(ref.style.width),
                    height: parseFloat(ref.style.height),
                  });
                  break;
                default:
                  break;
              }
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              const chipHeight = Array.from(ref.childNodes).find((child) =>
                  child.className.includes('MuiChip-root')).clientHeight * (this.props.engine.getModel().getZoomLevel() / 100) * 2;
              if (this.state.xUpdated && this.state.yUpdated === false) {
                this.props.model.setOption(resizeChangedPositionOption, true, false);
                this.props.model.setPosition(parseFloat(this.state.x), this.props.model.getPosition().y)
              } else if (this.state.yUpdated && this.state.xUpdated === false) {
                this.props.model.setOption(resizeChangedPositionOption, true, false);
                this.props.model.setPosition(this.props.model.getPosition().x, parseFloat(this.state.y) - chipHeight);
              } else if (this.state.xUpdated && this.state.yUpdated) {
                this.props.model.setOption(resizeChangedPositionOption, true, false);
                this.props.model.setPosition(parseFloat(this.state.x), parseFloat(this.state.y) - chipHeight);
              }
              this.props.model.updateSize(this.state.width, this.state.height);
              this.setState({x: 0, y: 0, xUpdated: false, yUpdated: false, isResizing: false});
              this.props.forceHOCUpdate();
            }}
          >
            <Chip
              icon={<img style={{cursor: 'pointer'}}
              src={MORE_OPTION} alt="" onClick={() => {this.props.openComposition(this.props.model)}} />}
              label={this.props.model.getOption('name')}
              color="secondary"
            />
          </Rnd>
        </Box>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openComposition: (node) => dispatch(openComposition(node)),
  }
}

export default connect(
    null,
    mapDispatchToProps,
    null,
    { forwardRef: true },
)(withParentListener(withStyles(styles)(withClipPath(Composition)), getCompositionParentID));
