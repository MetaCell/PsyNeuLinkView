import './App.css';
import theme from './theme';
import { Provider } from 'react-redux';
import Layout from './components/common/Layout';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import store from './redux/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// import Loader from './components/common/Loader';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Layout />
        </Provider>
        {/* <Loader /> */}
      </ThemeProvider>
    </DndProvider>
  );
}

export default App;
