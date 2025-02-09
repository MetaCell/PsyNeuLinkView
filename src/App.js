import './App.css';
import React from 'react';
import theme from './theme';
import store from './client/redux/store';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Layout from './client/components/common/Layout';

const messageTypes = require('./nodeConstants').messageTypes;

class App extends React.Component {
  componentDidMount() {
    window.addEventListener('beforeunload', (e) => {
      window.api.send("toMain", {
        type: messageTypes.RELOAD_APPLICATION,
        payload: null
      });
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Layout />
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
