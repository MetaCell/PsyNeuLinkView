import * as React from "react";
import {
    DefaultLinkWidget, LinkWidget
} from 'meta-diagram';

const CustomLinkArrowWidget = (props) => {
    const {point, arrowHeadXPosition} = props;
		const pointlength = 7;
    return (
			// TODO: Replace with variant for style options, when latest meta is merged
        <g className="arrow" transform={'translate(' + (point.getPosition().x - arrowHeadXPosition) + ', ' + (point.getPosition().y - pointlength) + ')'}>
						<g>
								<polyline
										points={`0,0 ${pointlength},${pointlength} 0,${pointlength*2}`}
										stroke="#3C3C43"
										strokeWidth="2"
										strokeOpacity="0.6"
										fill="none"
										data-id={point.getID()}
										data-linkid={point.getLink().getID()}
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
			// TODO: Replace with variant for style options, when latest meta is merged
        return (
            <g>
                <path
                    ref={this.path}
                    stroke="#3C3C43"
										strokeOpacity="0.6"
										strokeWidth="2"
                    d={this.props.path}
								/>
            </g>
        );
    }
}



export class CustomLinkWidget extends DefaultLinkWidget {
    generateArrow(point, previousPoint, arrowHeadXPosition) {
        return (
            <CustomLinkArrowWidget
                key={`link-arrow-${point.getID()}`}
                point={point}
								arrowHeadXPosition={arrowHeadXPosition}
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
						const arrowHeadXPosition = (points[points.length - 1].getPosition().x - points[0].getPosition().x)/6;
						paths.push(this.generateArrow(points[points.length - 1], points[points.length - 2], arrowHeadXPosition));
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
