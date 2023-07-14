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

    handleResize = (e, direction, ref) => {
        const map = {
            top: { currentY: parseFloat(e.clientY), yUpdated: true },
            right: {},
            bottom: {},
            left: { currentX: parseFloat(e.clientX), xUpdated: true },
            topLeft: { currentX: parseFloat(e.clientX), currentY: parseFloat(e.clientY), xUpdated: true, yUpdated: true },
            topRight: { currentY: parseFloat(e.clientY), yUpdated: true },
            bottomRight: {},
            bottomLeft: { currentX: parseFloat(e.clientX), xUpdated: true },
        };
        const changes = {
            ...map[direction],
            width: parseFloat(ref.style.width),
            height: parseFloat(ref.style.height)
        };
        this.setState(changes);
    };

    handleResizeStop(e, direction, ref, delta, position) {
        const {forceHOCUpdate} = this.props
        const chipHeight = this.getChipHeight(ref);
        this.updateModel(chipHeight)
        this.setState({currentX: 0, currentY: 0, xUpdated: false, yUpdated: false, isResizing: false});
        forceHOCUpdate();
    }

    getChipHeight = (ref) => {
        return Array.from(ref.childNodes).find((child) =>
                child.className.includes('MuiChip-root')).clientHeight *
            (this.props.engine.getModel().getZoomLevel() / 100) * 2;
    };

    updateModel(chipHeight){
        const { xUpdated, yUpdated, currentX, currentY } = this.state;
        const { model } = this.props;
        const oldPosition = model.getPosition();
        let newPosition = { x: oldPosition.x, y: oldPosition.y };

        if (xUpdated) {
            newPosition.x = parseFloat(currentX);
        }
        if (yUpdated) {
            newPosition.y = parseFloat(currentY) - chipHeight;
        }

        if (xUpdated || yUpdated) {
            model.setOption(RESIZE_CHANGED_POS_OPTION, true, false);
            model.setPosition(newPosition.x, newPosition.y);
        }
        model.updateSize(this.state.width, this.state.height);
    }

    handleResizeStart(e, direction, ref, delta, position) {
        this.setState({isResizing: true});
    }


    render() {
        const {expanded} = this.state;
        const {classes, elementRef, model, openComposition} = this.props;

        return (
            <Box
                ref={elementRef}
                style={{width: this.state.width, height: this.state.height}}
                className={`${classes.root} ${expanded ? classes.selected : ''}`}
            >
                <Rnd
                    size={{width: this.state.width, height: this.state.height}}
                    position={{x: this.state.currentX, y: this.state.currentY}}
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
