// withClipPath.js
import React from 'react';
import ModelSingleton from "../../../model/ModelSingleton";
import {getClipPath} from "../../../services/clippingService";

const withClipPath = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.clipPath = null;
            this.elementRef = React.createRef();
            this.applyClipping = this.applyClipping.bind(this);
        }

        componentDidMount() {
            this.applyClipping();
        }

        componentDidUpdate() {
            this.applyClipping();
        }

        applyClipping() {
            const parentNode = ModelSingleton.getInstance()
                .getMetaGraph()
                .getParent(this.props.model);

            this.clipPath = null
            if (parentNode) {
                this.clipPath = getClipPath(parentNode, this.props.model);
            }

            const containerElement = this.elementRef.current.parentElement;
            if (this.clipPath) {
                containerElement.style.clipPath = this.clipPath;
            } else {
                containerElement.style.clipPath = '';
            }
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    elementRef={this.elementRef}
                    hasClipPath={this.clipPath !== null}
                    forceHOCUpdate={() => this.forceUpdate()}
                />
            );
        }
    }
};

export default withClipPath;
