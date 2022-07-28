import * as React from "react";
import {
    DefaultLinkWidget, LinkWidget
} from 'meta-diagram';

const CustomLinkArrowWidget = (props) => {
    const {point, previousPoint} = props;

    const angle =
        90 +
        (Math.atan2(
                point.getPosition().y - previousPoint.getPosition().y,
                point.getPosition().x - previousPoint.getPosition().x
            ) *
            180) /
        Math.PI;

    //translate(50, -10),
    return (
        <g className="arrow" transform={'translate(' + point.getPosition().x + ', ' + point.getPosition().y + ')'}>
            <g style={{transform: 'rotate(' + angle + 'deg)'}}>
                <g transform={'translate(0, -3)'}>
                    <polygon
                        points="0,10 8,30 -8,30"
                        fill={props.color}
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
        this.percent = 0;
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <g>
                <path
                    fill="none"
                    ref={(ref) => {
                        this.path = ref;
                    }}
                    strokeWidth="2"
                    stroke="rgba(255,255,0,1)"
                    d={this.props.path}
                />
            </g>
        );
    }
}



export class CustomLinkWidget extends DefaultLinkWidget {
    generateArrow(point, previousPoint) {
        return (
            <CustomLinkArrowWidget
                key={`link-arrow-${point.getID()}`}
                point={point}
                previousPoint={previousPoint}
                colorSelected={this.props.link.getOptions().selectedColor}
                color={this.props.link.getOptions().color}
            />
        );
    }

    render() {
        //ensure id is present for all points on the path
        var points = this.props.link.getPoints();
        var paths = [];
        this.refPaths = [];

        //draw the multiple anchors and complex line instead
        for (let j = 0; j < points.length - 1; j++) {
            paths.push(
                <CustomLink
                    key={`link-from-${points[j].getID()}-to-${points[j+1].getID()}`}
                    path={LinkWidget.generateLinePath(points[j], points[j + 1])}
                    {...this.props}
                />
            );
        }

        //render the circles
        for (let i = 1; i < points.length - 1; i++) {
            paths.push(this.generatePoint(points[i]));
        }

        if (this.props.link.getTargetPort() !== null) {
            paths.push(this.generateArrow(points[points.length - 1], points[points.length - 2]));
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
        const {link, diagramEngine} = this.props;
        return (
            <CustomLinkWidget link={link} diagramEngine={diagramEngine}/>
        );
    }
}

// @ts-ignore
export default CustomLinkAdapter;
