import * as React from "react";
import {
    DefaultLinkWidget, LinkWidget, PointModel
} from '@projectstorm/react-diagrams';
import { projectionLinkArrow, projectionLink } from "../../../assets/styles/variables";
const CustomLinkArrowWidget = (props) => {
    const {point, angle, pointId, linkId, pointlength} = props;

    return (
        <g className="arrow" transform={'translate(' + (point.x) + ', ' + (point.y) + ')'}>
            <g style={{transform: 'rotate(' + angle + 'deg)'}}>
                <polyline
                    points={`0,0 ${pointlength},${pointlength} 0,${pointlength*2}`}
                    {
                        ...projectionLinkArrow
                    }
                    data-id={pointId}
                    data-linkid={linkId}
                />
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
    generateArrow(point, angle, pointId, linkId, pointlength) {
        return (
            <CustomLinkArrowWidget
                key={`link-arrow-${pointId}`}
                point={point}
                angle={angle}
                linkId={linkId}
                pointId={pointId}
                pointlength={pointlength}
                colorSelected={this.props.link.getOptions().selectedColor}
                color={this.props.link.getOptions().color}
            />
        );
    }

    generateLinePath(firstPoint, lastPoint) {
        if (firstPoint.x <= lastPoint.x) {
            return `M${firstPoint.x + 15},${firstPoint.y} L ${lastPoint.x},${lastPoint.y}`;
        } else {
            return `M${firstPoint.x - 15},${firstPoint.y} L ${lastPoint.x},${lastPoint.y}`;
        }
    }

    render() {
        //ensure id is present for all points on the path
        var points = this.props.link.getPoints();
        var paths = [];
        this.refPaths = [];

        const arrowHeadXPosition = (points[points.length - 2].getX() <= points[points.length - 1].getX()) ? points[points.length - 1].getX() - 18 : points[points.length - 1].getX() + 18;
        const pointlength = 7;

        const atanAngle = Math.atan2(
            points[points.length - 1].getPosition().y - points[0].getPosition().y,
            points[points.length - 1].getPosition().x - points[0].getPosition().x
        );

        const angle = (atanAngle * 180) / Math.PI;

        let arrowX = arrowHeadXPosition;
        let arrowY = points[points.length - 1].getPosition().y - pointlength;
        let segmentX = arrowX;
        let segmentY = arrowY;

        // Calculate arrow and end point of the segment position in relation to the rotation
        if (angle > 80 && angle <= 90) {
            arrowX += (angle / 6);
            arrowY -= (angle / 5);
            segmentX = arrowX - (atanAngle * 4);
            segmentY = segmentY - (pointlength * (atanAngle + 0.5));
        } else if (angle > 70 && angle <= 80) {
            arrowX += (angle / 7);
            arrowY -= (angle / 6);
            segmentX = arrowX - (atanAngle * 5);
            segmentY = segmentY - (pointlength * (atanAngle));
        } else if (angle > 60 && angle <= 70) {
            arrowX += (angle / 8);
            arrowY -= (angle / 7);
            segmentX = arrowX - (atanAngle * 5);
            segmentY = segmentY - (pointlength * (atanAngle - 0.4));
        } else if (angle > 50 && angle <= 60) {
            arrowX += (angle / 8);
            arrowY -= (angle / 7);
            segmentX = arrowX - (atanAngle * 5);
            segmentY = segmentY - (pointlength * (atanAngle - 0.5));
        } else if (angle > 40 && angle <= 50) {
            arrowX += (angle / 9);
            arrowY -= (angle / 7);
            segmentX = arrowX - (atanAngle * 7);
            segmentY = segmentY - (pointlength * (atanAngle - 0.6));
        } else if (angle > 30 && angle <= 40) {
            arrowX += (angle / 9);
            arrowY -= (angle / 8);
            segmentX = arrowX - (atanAngle * 7);
            segmentY = segmentY - (pointlength * (atanAngle - 0.8));
        } else if (angle > 20 && angle <= 30) {
            arrowX += (angle / 9);
            arrowY -= (angle / 8);
            segmentX = arrowX - (atanAngle * 6.8);
            segmentY = segmentY - (pointlength * (atanAngle - 1.0));
        } else if (angle > 10 && angle <= 20) {
            arrowX += (angle / 10);
            arrowY -= (angle / 9);
            segmentX = arrowX - (atanAngle * 7);
            segmentY = segmentY - (pointlength * (atanAngle - 1.0));
        } else if (angle >= 0 && angle <= 10) {
            arrowX += (angle / 10);
            arrowY -= (angle / 9);
            segmentX = arrowX - (atanAngle * 7);
            segmentY = segmentY - (pointlength * (atanAngle - 1.0));
        } else if (angle < 0 && angle >= -10) {
            arrowX += (angle / 7);
            arrowY -= (angle / 3);
            segmentX = arrowX - (atanAngle * 7);
            segmentY = segmentY - (pointlength * (atanAngle - 1.1));
        } else if (angle < -10 && angle >= -20) {
            arrowX += (angle / 8);
            arrowY -= (angle / 3);
            segmentX = arrowX - (atanAngle * 7);
            segmentY = segmentY - (pointlength * (atanAngle - 1.4));
        } else if (angle < -20 && angle >= -30) {
            arrowX += (angle / 10);
            arrowY -= (angle / 3);
            segmentX = arrowX - (atanAngle * 7);
            segmentY = segmentY - (pointlength * (atanAngle - 1.6));
        } else if (angle < -30 && angle >= -40) {
            arrowX += (angle / 15);
            arrowY -= (angle / 3);
            segmentX = arrowX - (atanAngle * 6.8);
            segmentY = segmentY - (pointlength * (atanAngle - 1.9));
        } else if (angle < -40 && angle >= -50) {
            arrowX += (angle / 18);
            arrowY -= (angle / 3);
            segmentX = arrowX - (atanAngle * 6.5);
            segmentY = segmentY - (pointlength * (atanAngle - 2.0));
        } else if (angle < -50 && angle >= -60) {
            arrowX += (angle / 21);
            arrowY -= (angle / 3);
            segmentX = arrowX - (atanAngle * 6.2   );
            segmentY = segmentY - (pointlength * (atanAngle - 2.2));
        } else if (angle < -60 && angle >= -70) {
            arrowX += (angle / 24);
            arrowY -= (angle / 3);
            segmentX = arrowX - (atanAngle * 5.6);
            segmentY = segmentY - (pointlength * (atanAngle - 2.3));
        } else if (angle < -70 && angle >= -80) {
            arrowX += (angle / 28);
            arrowY -= (angle / 3);
            segmentX = arrowX - (atanAngle * 5.3);
            segmentY = segmentY - (pointlength * (atanAngle - 2.5));
        } else if (angle < -80 && angle >= -90) {
            arrowX += (angle / 30);
            arrowY -= (angle / 3);
            segmentX = arrowX - (atanAngle * 5);
            segmentY = segmentY - (pointlength * (atanAngle - 2.5));
        }

        //draw the multiple anchors and complex line instead
        for (let j = 0; j < points.length - 1; j++) {
            if (j === points.length - 2) {
                paths.push(
                    <CustomLink
                        key={`link-from-${points[j].getID()}-to-${points[j+1].getID()}`}
                        path={this.generateLinePath(
                            {x: points[j].getX(), y: points[j].getY()},
                            {x: segmentX, y: segmentY}
                        )}
                        {...this.props}
                    />
                );
            } else {
                paths.push(
                    <CustomLink
                        key={`link-from-${points[j].getID()}-to-${points[j+1].getID()}`}
                        path={this.generateLinePath(
                            {x: points[j].getX(), y: points[j].getY()},
                            {x: points[j + 1].getX(), y: points[j + 1].getY()}
                        )}
                        {...this.props}
                    />
                );
            }
        }

        //render the circles
        for (let i = 1; i < points.length - 1; i++) {
            paths.push(this.generatePoint(points[i]));
        }

        if (this.props.link.getTargetPort() !== null) {
            // const arrowHeadXPosition = (points[points.length - 1].getPosition().x - points[0].getPosition().x)/6;
            paths.push(this.generateArrow(
                {x: arrowX, y: arrowY},
                angle,
                points[points.length - 1].getID(),
                points[points.length - 1].getLink().getID(),
                pointlength));
        } else {
            paths.push(this.generatePoint(points[points.length - 1]));
        }

        return (
            <>
                {/* <CustomLink {...this.props} /> */}
                <g data-default-link-test={this.props.link.getOptions().id}>{paths}</g>
            </>
            );
        // return <></>
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
