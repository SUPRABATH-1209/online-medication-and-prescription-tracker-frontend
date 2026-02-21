import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#0062ff' },
    background: { default: '#ffffff' }
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 }
  }
});
export default theme;