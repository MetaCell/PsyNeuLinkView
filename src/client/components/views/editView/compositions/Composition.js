import * as React from "react";
import { Rnd } from "react-rnd";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import { Box, Chip } from "@mui/material";
import vars from "../../../../assets/styles/variables";
import MORE_OPTION from "../../../../assets/svg/option.svg"
import { openComposition } from "../../../../redux/actions/general";

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
    }
    this.changeVisibility = this.changeVisibility.bind(this);
  }

  changeVisibility() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const { expanded } = this.state;
    const { classes } = this.props;

    return (
        <Box
          style={{width: this.state.width, height: this.state.height}}
          className={`${classes.root} ${expanded ? classes.selected : ''}`}
        >
          <Rnd
            size={{ width: this.state.width, height: this.state.height }}
            position={{ x: this.state.x, y: this.state.y }}
            onResize={(e, direction, ref, delta, position) => {
              switch (direction) {
                case 'top':
                  this.setState({
                    y: e.clientY,
                    yUpdated: true,
                    height: ref.style.height,
                  });
                  break;
                case 'right':
                  this.setState({
                    width: ref.style.width,
                  });
                  break;
                case 'bottom':
                  this.setState({
                    height: ref.style.height,
                  });
                  break;
                case 'left':
                  this.setState({
                    x: e.clientX,
                    xUpdated: true,
                    width: ref.style.width,
                  });
                  break;
                case 'topLeft':
                  this.setState({
                    x: e.clientX,
                    y: e.clientY,
                    xUpdated: true,
                    yUpdated: true,
                    width: ref.style.width,
                    height: ref.style.height,
                  });
                  break;
                case 'topRight':
                  this.setState({
                    y: e.clientY,
                    yUpdated: true,
                    width: ref.style.width,
                    height: ref.style.height,
                  });
                  break;
                case 'bottomRight':
                  this.setState({
                    width: ref.style.width,
                    height: ref.style.height,
                  });
                  break;
                case 'bottomLeft':
                  this.setState({
                    x: e.clientX,
                    xUpdated: true,
                    width: ref.style.width,
                    height: ref.style.height,
                  });
                  break;
                default:
                  break;
              }
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              if (this.state.xUpdated && this.state.yUpdated === false) {
                this.props.model.setPosition(parseFloat(this.state.x), this.props.model.getOption('position').y);
              } else if (this.state.yUpdated && this.state.xUpdated === false) {
                this.props.model.setPosition(this.props.model.getOption('position').x, parseFloat(this.state.y));
              } else if (this.state.xUpdated && this.state.yUpdated) {
                this.props.model.setPosition(parseFloat(this.state.x), parseFloat(this.state.y));
              }
              this.props.model.updateSize(this.state.width, this.state.height);
              this.setState({x: 0, y: 0, xUpdated: false, yUpdated: false});
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

export default connect(null, mapDispatchToProps, null, { forwardRef : true } )(withStyles(styles)(Composition));
