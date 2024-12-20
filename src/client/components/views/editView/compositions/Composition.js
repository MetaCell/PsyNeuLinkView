import * as React from "react";
import {Rnd} from "react-rnd";
import {connect} from "react-redux";
import {withStyles} from "@mui/styles";
import {Box, Chip} from "@mui/material";
import vars from "../../../../assets/styles/variables";
import MORE_OPTION from "../../../../assets/svg/option.svg"
import {openComposition} from "../../../../redux/actions/general";
import {RESIZE_CHANGED_POS_OPTION} from "../../../../../constants";
import withParentListener from "../withParentListener";
import withClipPath from "../withClipPath";
import {CallbackTypes} from "@metacell/meta-diagram";
import {getScaleTransform} from "../utils";

const {
  chipBorderColor,
  draggableBg,
  listItemActiveBg,
  textWhite,
  compositChipFontColor,
  compositChipBgColor
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
      backgroundColor: compositChipBgColor,
      padding: '0.25rem',
      borderRadius: '1.125rem',
      display: "flex",
      fontWeight: 600,
      left: 0,
      position: 'absolute',
      color: compositChipFontColor,
      top: '-1.75rem',
      alignItems: "center",
      height: '1.5rem',
      letterSpacing: '-0.005rem',
      fontSize: '0.8125rem',
      lineHeight: '1.25rem',
      flexDirection: 'row-reverse',
      minWidth: '9rem',
      minHeight: '2.25rem',

            '& .MuiChip-label': {
                padding: 0,
            },

      '& .MuiChip-icon': {
        margin: '0 0 0 0.5rem',
        width: '1.4rem',
        height: '1.4rem'
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
            width: props.model.width,
            height: props.model.height,
            currentX: 0,
            currentY: 0,
            xUpdated: false,
            yUpdated: false,
            isResizing: false
        }
        this.handleResizeStart = this.handleResizeStart.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleResizeStop = this.handleResizeStop.bind(this);
    }

    componentDidMount() {
        const {model, forceHOCUpdate} = this.props;
        model.registerListener({
            [CallbackTypes.POSITION_CHANGED]: (_) => {
                forceHOCUpdate();
            },
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const {isResizing} = this.state;

        if (this.hasResizeStarted(prevState, isResizing)) {
            this.setClipPath('')
        }

        if (!isResizing && this.areModelDimensionsSynchronized()) {
            this.setState({
                width: this.props.model.width,
                height: this.props.model.height
            });
        }

        this.updateZIndex()
    }

    /**
     * Checks whether model dimensions and state dimensions are unsynchronized.
     * @returns {boolean} True if model dimensions are unsynchronized, false otherwise.
     */
    areModelDimensionsSynchronized() {
        return this.state.width !== this.props.model.width ||
            this.state.height !== this.props.model.height;
    }

    /**
     * Determines if resizing has started.
     * @param {Object} prevState - Previous state.
     * @param {boolean} isResizing - The current isResizing state.
     * @returns {boolean} True if resizing has started, false otherwise.
     */
    hasResizeStarted(prevState, isResizing) {
        return prevState.isResizing !== isResizing && isResizing;
    }

    /**
     * Set the clip-path CSS property of the container element.
     * @param {string} clipPath - The new clip-path CSS property value.
     */
    setClipPath(clipPath) {
        const containerElement = this.getContainerElement();
        containerElement.style.clipPath = clipPath;
    }

    /**
     * Update the zIndex CSS property of the container element to match the model's graph depth.
     */
    updateZIndex() {
        const containerElement = this.props.elementRef.current.parentElement;
        containerElement.style.zIndex = this.props.model.getGraphPath().length;
    }

    /**
     * Get the container element.
     * @returns {HTMLElement} The container element.
     */
    getContainerElement() {
        return this.props.elementRef.current?.parentElement;
    }

    /**
     * Handle the start of the resize and update the state accordingly.
     *
     */
    handleResizeStart() {
        this.setState({isResizing: true});
    }

    /**
     * Handle the resize of the component and update the state accordingly.
     *
     * @param {Object} e - The native DOM event.
     * @param {string} direction - The direction in which the resize is happening.
     * @param {HTMLElement} ref - The component's reference to the DOM node.
     */
    handleResize = (e, direction, ref) => {
        const {engine} = this.props;
        const position = engine.getRelativeMousePoint(e);

        const map = {
            top: {currentY: position.y, yUpdated: true},
            right: {},
            bottom: {},
            left: {currentX: position.x, xUpdated: true},
            topLeft: {currentX: position.x, currentY: position.y, xUpdated: true, yUpdated: true},
            topRight: {currentY: position.y, yUpdated: true},
            bottomRight: {},
            bottomLeft: {currentX: position.x, xUpdated: true},
        };

        const changes = {
            ...map[direction],
            width: parseFloat(ref.style.width),
            height: parseFloat(ref.style.height)
        };

        this.setState(changes);
    };

    /**
     * Update the state and model dimensions after the resize has stopped.
     *
     * @param {Object} e - The native DOM event.
     * @param {string} direction - The direction in which the resize was happening.
     * @param {HTMLElement} ref - The component's reference to the DOM node.
     */
    handleResizeStop(e, direction, ref) {
        this.updateModel()
        this.setState({currentX: 0, currentY: 0, xUpdated: false, yUpdated: false, isResizing: false});
        this.props.forceHOCUpdate();
    }

    /**
     * Update the model dimensions and position with the current state.
     */
    updateModel() {
        const {xUpdated, yUpdated, currentX, currentY} = this.state;
        const {model} = this.props;
        const oldPosition = model.getPosition();
        let newPosition = {x: oldPosition.x, y: oldPosition.y};

        if (xUpdated) {
            newPosition.x = parseFloat(currentX);
        }
        if (yUpdated) {
            newPosition.y = parseFloat(currentY);
        }

        if (xUpdated || yUpdated) {
            model.setOption(RESIZE_CHANGED_POS_OPTION, true, false);
            model.setPosition(newPosition.x, newPosition.y);
        }
        model.updateSize(this.state.width, this.state.height);
    }

    render() {
        const {expanded} = this.state;
        const {classes, elementRef, model, openComposition, engine} = this.props;

        return (
            <Box
                ref={elementRef}
                style={{width: this.state.width, height: this.state.height}}
                className={`${classes.root} ${expanded ? classes.selected : ''}`}
            >
                <Rnd
                    size={{width: this.state.width, height: this.state.height}}
                    position={{x: this.state.currentX, y: this.state.currentY}}
                    scale={getScaleTransform(engine)}
                    onResizeStart={this.handleResizeStart}
                    onResize={this.handleResize}
                    onResizeStop={this.handleResizeStop}
                >
                    <Chip
                        icon={<img style={{cursor: 'pointer'}}
                        src={MORE_OPTION} alt="" onClick={() => {
                            openComposition(model)
                        }}/>}
                        label={model.getOption('name')}
                        color="secondary"
                    />
                </Rnd>
            </Box>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        openComposition: (node) => dispatch(openComposition(node)),
    }
}

export default connect(
    null,
    mapDispatchToProps,
    null,
    {forwardRef: true},
)(withParentListener(withStyles(styles)(withClipPath(Composition))));
