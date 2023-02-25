import React from 'react';
import Header from './Header';
import { Box } from '@mui/material';
import { connect } from 'react-redux';
import { GUIViews } from '../../../constants';
import MainEdit from '../views/editView/MainEdit';
import messageHandler from '../../grpc/messagesHandler';
import Visualize from '../views/visualiseView/Visualize';
import { openFile, loadModel, updateModel } from '../../redux/actions/general';

const messageTypes = require('../../../messageTypes').messageTypes;

class Layout extends React.Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (window.api) {
      console.log(window.api);
    }
  }

  componentDidMount() {
    if (window.api) {
      window.api.receive("fromMain", (data) => {
        messageHandler(data, {
          [messageTypes.OPEN_FILE]: this.props.openFile,
          [messageTypes.LOAD_MODEL]: this.props.loadModel,
          [messageTypes.UPDATE_MODEL]: this.props.updateModel,
        })
      });
    }
    // example of sending data to main process
    // window.api.send("toMain", "some data");
  }

  render() {
    const {viewState} = this.props;
    return (
      <>
        {viewState === GUIViews.EDIT ? (
          <Box>
            <Header />
            <MainEdit />
          </Box>
        ) : (
          <Box>
            <Header />
            <Visualize />
          </Box>
        )}
      </>
    );
  }
};

function mapStateToProps (state) {
  return {
    viewState: state.general.guiView,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openFile: (file) => dispatch(openFile(file)),
    loadModel: (model) => dispatch(loadModel(model)),
    updateModel: () => dispatch(updateModel()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef : true } )(Layout);
