import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/common/Layout';
// import Loader from './components/common/Loader';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
      {/* <Loader /> */}
    </ThemeProvider>
  );
}

export default App;
