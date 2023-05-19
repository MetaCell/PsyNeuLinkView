import * as React from "react";
import {DefaultLinkWidget} from '@projectstorm/react-diagrams';
import {projectionLink, projectionLinkArrow} from "../../../../assets/styles/variables";
import ModelSingleton from "../../../../model/ModelSingleton";
import {
    updateLinkPoints
} from "../../../../services/clippingService";
import {CallbackTypes} from "@metacell/meta-diagram";
import {PointModel} from "@projectstorm/react-diagrams-core";
import {Point} from "@projectstorm/geometry";

const pointlength = 6;

/**
 * CustomLinkArrowWidget is a functional React component that renders a custom arrow for the link.
 *
 * @param {object} props - The properties for the CustomLinkArrowWidget component.
 * @param {object} props.point - The current point of the arrow.
 * @param {object} props.previousPoint - The previous point of the arrow.
 * @returns {JSX.Element} The CustomLinkArrowWidget component.
 */
const CustomLinkArrowWidget = (props) => {
    const {point, previousPoint} = props;

    const angle =
        90 +
        (Math.atan2(
                point.getY() - previousPoint.getY(),
                (point.getX()) - (previousPoint.getX())
            ) *
            180) /
        Math.PI;

    return (
        <g className="arrow" transform={'translate(' + point.getX() + ', ' + point.getY() + ')'}>
            <g style={{transform: 'rotate(' + angle + 'deg)'}}>
                <g transform={'translate(0, -3)'}>
                    <polyline
                        points={`${pointlength * -2},${pointlength * 4} 0,${pointlength + 2} ${pointlength * 2},${pointlength * 4}`}
                        {
                            ...projectionLinkArrow
                        }
                        data-id={point.getID()}
                        data-linkid={point.getLink().getID()}
                    />
                </g>
            </g>
        </g>
    );
};

/**
 * CustomLink is a React component that renders a custom link path.
 */

class CustomLink extends React.Component {
    constructor(props) {
        super(props);

        this.path = React.createRef();
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        return (
            <g>
                <path
                    ref={this.path}
                    {
                        ...projectionLink
                    }
                    d={this.props.path}
                />
            </g>
        );
    }
}


/**
 * CustomLinkWidget is a React component that extends DefaultLinkWidget.
 * It renders a custom link with arrows
 */
export class CustomLinkWidget extends DefaultLinkWidget {
    constructor(props) {
        super(props);
        this.listeners = {}
        this.prevSourcePath = null
        this.prevTargetPath = null
        this.registerParentsListener = this.registerParentsListener.bind(this)
        this.registerListenerAux = this.registerListenerAux.bind(this)
        this.unregisterListener = this.unregisterListener.bind(this)
    }

    componentDidMount() {
        super.componentDidMount();
        this.registerParentsListener()
        this.forceUpdate(); // Used so that the clipPath is updated after the component is mounted
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate()
        const sourcePath = this.getListenerID(this.props.link.getSourcePort().getParent())
        const targetPath = this.getListenerID(this.props.link.getTargetPort().getParent())
        this.updateListener(sourcePath, this.prevSourcePath, this.props.link.getSourcePort().getParent());
        this.updateListener(targetPath, this.prevTargetPath, this.props.link.getTargetPort().getParent());
        this.updatePrevProps(sourcePath, targetPath)
    }

    updateListener(path, prevPath, node) {
        if (prevPath !== path && prevPath !== null) {
            const parentNode = this.getNodeParent(node)
            this.unregisterListener(prevPath)
            if (parentNode) {
                this.registerListenerAux(path, parentNode)
            }
        }
    }

    componentWillUnmount() {
        Object.keys(this.listeners).forEach((key) => {
            this.listeners[key].deregister()
        })
    }

    getEdgePoint(center, source, radius, link) {
        // Calculate the direction of the link
        let dx = source.x - center.x;
        let dy = source.y - center.y;

        // Normalize the direction to have a length of 1
        let length = Math.sqrt(dx * dx + dy * dy);
        dx /= length;
        dy /= length;

        // Scale the direction by the radius of the node to get the edge point
        let edgeX = center.x + dx * radius;
        let edgeY = center.y + dy * radius;

        return new PointModel({
            link: link,
            position: new Point(edgeX, edgeY)
        });
    }

    /**
     * Generates a custom arrow for the link.
     *
     * @param {object} point - The current point of the arrow.
     * @param {object} previousPoint - The previous point of the arrow.
     * @returns {JSX.Element} The CustomLinkArrowWidget component.
     */
    generateArrow(point, previousPoint) {
        return (
            <CustomLinkArrowWidget
                key={point.getID()}
                point={point}
                previousPoint={previousPoint}
                colorSelected={this.props.link.getOptions().selectedColor}
                color={this.props.link.getOptions().color}
            />
        );
    }

    /**
     * Generates the path for the link line.
     *
     * @param {object} firstPoint - The first point of the path.
     * @param {object} lastPoint - The last point of the path.
     * @returns {string} The path for the link line.
     */

    generateLinePath(firstPoint, lastPoint) {
        let x = firstPoint.x - lastPoint.x;
        let y = firstPoint.y - lastPoint.y;
        let distance = Math.sqrt(x * x + y * y);
        let newDistance = distance - (pointlength * 3);
        const angle = (Math.atan2(lastPoint.y - firstPoint.y, (lastPoint.x) - (firstPoint.x)) * 180) / Math.PI;
        let newX = Math.round(Math.cos(angle * Math.PI / 180) * newDistance + firstPoint.x);
        let newY = Math.round(Math.sin(angle * Math.PI / 180) * newDistance + firstPoint.y);
        return `M${firstPoint.x},${firstPoint.y} L ${newX},${newY}`;
    }

    /**
     * Registers listener for parent nodes.
     */
    registerParentsListener() {
        const sourceNode = this.props.link.getSourcePort().getParent()
        const sourceParentNode = this.getNodeParent(sourceNode)

        const targetNode = this.props.link.getTargetPort().getParent()
        const targetParentNode = this.getNodeParent(targetNode)

        if (sourceParentNode && targetParentNode) {
            this.registerListenerAux(this.getListenerID(sourceNode), sourceParentNode)
            this.registerListenerAux(this.getListenerID(targetNode), targetParentNode)
        }

    }

    /**
     * Registers a listener with the provided id and parent node.
     *
     * @param {string} id - The ID for the listener.
     * @param {object} parent - The parent node for the listener.
     */
    registerListenerAux(id, parent) {
        if (!parent) {
            // 'free' node can't be resized so we don't need to register it
            return
        }
        this.listeners[id] = parent.registerListener({
            [CallbackTypes.NODE_RESIZED]: (_) => {
                this.forceUpdate()
            },
        });
    }

    /**
     * Gets the listener ID for the provided node.
     *
     * @param {object} node - The node for which to get the listener ID.
     * @returns {string} The listener ID.
     */
    getListenerID(node) {
        return node.getGraphPath().toString()
    }

    /**
     * Gets the parent node for the provided node.
     *
     * @param {object} node - The node for which to get the parent node.
     * @returns {object} The parent node.
     */
    getNodeParent(node) {
        return ModelSingleton.getInstance().getMetaGraph().getParent(node)
    }

    /**
     * Updates the previous properties for the source and target paths.
     *
     * @param {string} sourcePath - The source path.
     * @param {string} targetPath - The target path.
     */
    updatePrevProps(sourcePath, targetPath) {
        this.prevSourcePath = sourcePath
        this.prevTargetPath = targetPath
    }

    /**
     * Unregisters the listener for the provided ID.
     *
     * @param {string} id - The ID of the listener to unregister.
     */
    unregisterListener(id) {
        if (Object.keys(this.listeners).includes(id)) {
            this.listeners[id].deregister()
            delete this.listeners[id]
        }
    }

    /**
     * Checks if the source and target ports have the same parent.
     *
     * @returns {boolean} True if the ports have the same parent, otherwise false.
     */
    portsHaveSameParent() {
        const sourceNodePath = this.props.link.getSourcePort().getParent().getGraphPath()
        sourceNodePath.pop()

        const targetNodePath = this.props.link.getTargetPort().getParent().getGraphPath()
        targetNodePath.pop()

        return sourceNodePath.toString() === targetNodePath.toString()

    }

    /**
     * Checks if the target port is hidden.
     * @returns {boolean} True if the target port is hidden, otherwise false.
     * */
    isTargetPortHidden() {
        const targetPort = this.props.link.getTargetPort()
        const node = targetPort.getParent()
        const parentNode = ModelSingleton.getInstance().getMetaGraph().getParent(node);
        const parentNodeBoundingBox = parentNode.getBoundingBox();
        const targetPortPosition = targetPort.getPosition();

        const leftDistance = targetPortPosition.x - parentNodeBoundingBox.getTopLeft().x;
        const rightDistance = parentNodeBoundingBox.getBottomRight().x - targetPortPosition.x;
        const topDistance = targetPortPosition.y - parentNodeBoundingBox.getTopLeft().y;
        const bottomDistance = parentNodeBoundingBox.getBottomRight().y - targetPortPosition.y;

        return leftDistance < 0 || rightDistance < 0 || topDistance < 0 || bottomDistance < 0
    }


    /**

     Renders the CustomLinkWidget component.
     @returns {JSX.Element} The rendered CustomLinkWidget component.
     */

    render() {
        const {link} = this.props

        let points = [...link.getPoints()]
        const sourcePort = link.getSourcePort();
        const targetPort = link.getTargetPort();

        updateLinkPoints(sourcePort, link, points, 0);
        updateLinkPoints(targetPort, link, points, 1);


        const paths = [];
        this.refPaths = [];

        const edgePoint = this.getEdgePoint(targetPort.getCenter(), sourcePort.getCenter(),
            targetPort.getParent().getBoundingBox().getWidth() / 2, link)

        //draw the multiple anchors and complex line instead
        for (let j = 0; j < points.length - 1; j++) {
            paths.push(
                <CustomLink
                    key={`link-from-${points[j].getID()}-to-${points[j + 1].getID()}`}
                    path={this.generateLinePath(
                        {x: points[j].getX(), y: points[j].getY()},
                        {x: edgePoint.getX(), y: edgePoint.getY()}
                    )}
                    {...this.props}
                />
            );
        }

        // we draw an arrow in all situations except when both source and target ports have the same parent and the
        // target port is fully hidden
        if (!(this.portsHaveSameParent() && this.isTargetPortHidden())) {

            paths.push(
                this.generateArrow(edgePoint, points[points.length - 2]))
        }

        return <g id={link.getID()}
                  data-default-link-test={link.getOptions().testName}>{paths}</g>;
    }
}

/**
 * CustomLinkAdapter is a React component that serves as an adapter for the CustomLinkWidget component.
 */
class CustomLinkAdapter extends React.Component {
    render() {
        const {model, engine} = this.props;
        /**
         * Renders the CustomLinkWidget component with the provided model and engine.
         *
         * @returns {JSX.Element} The CustomLinkWidget component.
         */
        return (
            <CustomLinkWidget link={model} diagramEngine={engine}/>
        );
    }
}

// @ts-ignore
export default CustomLinkAdapter;