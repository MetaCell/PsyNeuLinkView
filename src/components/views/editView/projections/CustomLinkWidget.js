import * as React from "react";
import {DefaultLinkWidget} from '@projectstorm/react-diagrams';
import {projectionLink, projectionLinkArrow} from "../../../../assets/styles/variables";
import ModelSingleton from "../../../../model/ModelSingleton";
import {
    getNearestParentPointModel,
    getOutsideData,
    isAnyDirectionOutside
} from "../../../../services/clippingService";
import {CallbackTypes} from "@metacell/meta-diagram";

const pointlength = 6;

const CustomLinkArrowWidget = (props) => {
    const {point, previousPoint} = props;

    const angle =
        90 +
        (Math.atan2(
                point.getY() - previousPoint.getY(),
                (point.getX() - 10) - (previousPoint.getX() + 10)
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

    generateLinePath(firstPoint, lastPoint) {
        let x = firstPoint.x - lastPoint.x;
        let y = firstPoint.y - lastPoint.y;
        let distance = Math.sqrt(x * x + y * y);
        let newDistance = distance - (pointlength * 3);
        const angle = (Math.atan2(lastPoint.y - firstPoint.y, (lastPoint.x) - (firstPoint.x)) * 180) / Math.PI;
        let newX = Math.round(Math.cos(angle * Math.PI / 180) * newDistance + firstPoint.x);
        let newY = Math.round(Math.sin(angle * Math.PI / 180) * newDistance + firstPoint.y);
        return `M${firstPoint.x - 10},${firstPoint.y} L ${newX},${newY}`;
    }

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

    getListenerID(node) {
        return node.getGraphPath().toString()
    }

    getNodeParent(node) {
        return ModelSingleton.getInstance().getMetaGraph().getParent(node)
    }

    updatePrevProps(sourcePath, targetPath) {
        this.prevSourcePath = sourcePath
        this.prevTargetPath = targetPath
    }

    unregisterListener(id) {
        if (Object.keys(this.listeners).includes(id)) {
            this.listeners[id].deregister()
            delete this.listeners[id]
        }
    }

    portsHaveSameParent() {
        const sourceNodePath = this.props.link.getSourcePort().getParent().getGraphPath()
        sourceNodePath.pop()

        const targetNodePath  = this.props.link.getTargetPort().getParent().getGraphPath()
        targetNodePath.pop()

        return sourceNodePath.toString() === targetNodePath.toString()

    }

    isTargetPortHidden(targetOutside){
        // assumes that the targetPort is on the left most side of the circle
        const radius = this.props.link.getTargetPort().getParent().getBoundingBox().getWidth() / 2;
        return (targetOutside.left > 0 || targetOutside.bottom > radius || targetOutside.top > radius)
    }

    render() {
        const {link} = this.props

        let points = [...link.getPoints()]
        const targetNode = link.getTargetPort().getParent()
        const sourceNode = link.getSourcePort().getParent()
        const sourceParentNode = ModelSingleton.getInstance().getMetaGraph().getParent(sourceNode)


        const targetParentNode = ModelSingleton.getInstance().getMetaGraph().getParent(targetNode)

        const sourceOutside = getOutsideData(sourceParentNode, link);
        const targetOutside = getOutsideData(targetParentNode, link);

        if (sourceOutside || targetOutside) {
            if (isAnyDirectionOutside(sourceOutside)) {
                if (sourceParentNode) {
                    points[0] = getNearestParentPointModel(sourceParentNode, link.getSourcePort(), link)
                }
            }
            if (isAnyDirectionOutside(targetOutside)) {
                if (targetParentNode) {
                    points[1] = getNearestParentPointModel(targetParentNode, link.getTargetPort(), link)
                }
            }
        }


        const paths = [];
        this.refPaths = [];

        //draw the multiple anchors and complex line instead
        for (let j = 0; j < points.length - 1; j++) {
            paths.push(
                <CustomLink
                    key={`link-from-${points[j].getID()}-to-${points[j + 1].getID()}`}
                    path={this.generateLinePath(
                        {x: points[j].getX(), y: points[j].getY()},
                        {x: points[j + 1].getX(), y: points[j + 1].getY()}
                    )}
                    {...this.props}
                />
            );
        }

        if (link.getTargetPort() !== null) {
            if (!(this.portsHaveSameParent() && this.isTargetPortHidden(targetOutside))) {
                paths.push(this.generateArrow(points[points.length - 1], points[points.length - 2]));
            }
        } else {
            paths.push(this.generatePoint(points[points.length - 1]));
        }

        return <g id={link.getID()}
                  data-default-link-test={link.getOptions().testName}>{paths}</g>;
    }
}


class CustomLinkAdapter extends React.Component {
    render() {
        const {model, engine} = this.props;
        return (
            <CustomLinkWidget link={model} diagramEngine={engine}/>
        );
    }
}

// @ts-ignore
export default CustomLinkAdapter;