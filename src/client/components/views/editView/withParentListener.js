import React from 'react';
import ModelSingleton from "../../../model/ModelSingleton";
import {CallbackTypes} from "@metacell/meta-diagram";
import {getNodeParentID} from "./utils";

/**
 * A Higher-Order Component (HOC) that adds a listener for parent node NODE_RESIZED events to the wrapped component.
 * @param {React.Component} WrappedComponent - The component to be enhanced with parent listener functionality.
 * @returns {React.Component} The enhanced component.
 */
function withParentListener(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.listeners = {};
            this.prevParentID = null;
            this.unregisterListener = this.unregisterListener.bind(this);
            this.registerParentListener = this.registerParentListener.bind(this);
        }

        componentDidMount() {
            this.registerParentListener();
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            const parentID = getNodeParentID(this.props.model);
            if (this.prevParentID !== parentID) {
                this.unregisterListener(this.prevParentID);
                this.registerParentListener();
                this.prevParentID = parentID;
            }
        }

        componentWillUnmount() {
            Object.keys(this.listeners).forEach((key) => {
                this.unregisterListener(key);
            });
        }

        registerParentListener() {
            const {model} = this.props;
            const parentNode = ModelSingleton.getInstance()
                .getMetaGraph()
                .getParent(model);
            if (parentNode) {
                const parentID = getNodeParentID(model);
                this.listeners[parentID] = parentNode.registerListener({
                    [CallbackTypes.NODE_RESIZED]: (_) => {
                        this.forceUpdate();
                        model.flagUpdate(CallbackTypes.NODE_RESIZED)
                    },
                });
                this.prevParentID = parentID;
            }
        }

        unregisterListener(id) {
            if (Object.keys(this.listeners).includes(id)) {
                this.listeners[id].deregister();
                delete this.listeners[id];
            }
        }

        render() {
            return <WrappedComponent {...this.props}
                                     forceHOCUpdate={() => this.forceUpdate()}
            />;
        }
    }
}

export default withParentListener;
