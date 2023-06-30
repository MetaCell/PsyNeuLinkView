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
            this.updateParentStyle = this.updateParentStyle.bind(this);
        }

        componentDidMount() {
            this.updateParentStyle();
        }

        componentDidUpdate() {
            this.updateParentStyle();
        }

        updateParentStyle() {
            const parentNode = ModelSingleton.getInstance()
                .getMetaGraph()
                .getParent(this.props.model);

            this.clipPath = null
            if (parentNode) {
                this.clipPath = getClipPath(parentNode, this.props.model);
            }

            const parentElement = this.elementRef.current.parentElement;
            if (this.clipPath) {
                parentElement.style.clipPath = this.clipPath;
            } else {
                parentElement.style.clipPath = '';
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
