import './App.css';
import theme from './theme';
import { Provider } from 'react-redux';
import Layout from './client/components/common/Layout';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import store from './client/redux/store';

// import Loader from './components/common/Loader';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Layout />
      </Provider>
      {/* <Loader /> */}
    </ThemeProvider>
  );
}

export default App;
