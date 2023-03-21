import * as React from "react";
import {DefaultLinkWidget} from '@projectstorm/react-diagrams';
import {projectionLink, projectionLinkArrow} from "../../../../assets/styles/variables";
import ModelSingleton from "../../../../model/ModelSingleton";
import {clipPathBorderSize} from "../../../../constants";
import {
    getClipPath, getNearestParentPointModel,
    getOutsideData,
    getParentNodeId,
    isAnyDirectionOutside
} from "../../../../services/clippingService";

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
    componentDidMount() {
        super.componentDidMount();
        this.forceUpdate(); // Used so that the clipPath is updated after the component is mounted
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


    render() {
        //ensure id is present for all points on the path
        let clipPath;

        let points = this.props.link.getPoints();
        const targetNode = this.props.link.getTargetPort().getParent()
        const sourceNode = this.props.link.getSourcePort().getParent()
        const sourceParentNode = ModelSingleton.getInstance().getMetaGraph().getParent(sourceNode)


        if (getParentNodeId(sourceNode) !== getParentNodeId(targetNode)) {
            const targetParentNode = ModelSingleton.getInstance().getMetaGraph().getParent(targetNode)

            const sourceOutside = getOutsideData(sourceParentNode, this.props.link);
            const targetOutside = getOutsideData(targetParentNode, this.props.link);

            if (sourceOutside && targetOutside) {
                if (isAnyDirectionOutside(sourceOutside)) {
                    if (sourceParentNode) {
                        points[0] = getNearestParentPointModel(sourceParentNode, this.props.link.getSourcePort(), this.props.link)
                    }
                }
                if (isAnyDirectionOutside(targetOutside)) {
                    if(targetParentNode){
                        points[1] = getNearestParentPointModel(targetParentNode, this.props.link.getTargetPort(), this.props.link)
                    }
                }
            }


        } else {
            clipPath = getClipPath(sourceParentNode, this.props.link, clipPathBorderSize,
                this.props.diagramEngine.model.getZoomLevel() / 100)
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

        if (this.props.link.getTargetPort() !== null) {
            paths.push(this.generateArrow(points[points.length - 1], points[points.length - 2]));
        } else {
            paths.push(this.generatePoint(points[points.length - 1]));
        }

        return <g id={this.props.link.getID()} clip-path={clipPath}
                  data-default-link-test={this.props.link.getOptions().testName}>{paths}</g>;
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