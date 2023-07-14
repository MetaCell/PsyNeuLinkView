// withClipPath.js
import React from 'react';
import ModelSingleton from "../../../model/ModelSingleton";
import {getClipPath} from "../../../services/clippingService";

/**
 * A Higher-Order Component (HOC) that adds clip-path functionality to the wrapped component.
 * @param {React.Component} WrappedComponent - The component to be enhanced with clip-path functionality.
 * @returns {React.Component} The enhanced component.
 */
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
            this.clipPath = getClipPath(this.props.model);

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
                />
            );
        }
    }
};

export default withClipPath;
