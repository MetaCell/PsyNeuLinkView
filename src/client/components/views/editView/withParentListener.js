import React from 'react';
import ModelSingleton from "../../../model/ModelSingleton";
import {CallbackTypes} from "@metacell/meta-diagram";

function withParentListener(WrappedComponent, getParentID) {
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
            const parentID = getParentID(this.props.model);
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
                const parentID = getParentID(model);
                this.listeners[parentID] = parentNode.registerListener({
                    [CallbackTypes.NODE_RESIZED]: (_) => {
                        this.forceUpdate();
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
            return <WrappedComponent {...this.props} />;
        }
    }
}

export default withParentListener;
