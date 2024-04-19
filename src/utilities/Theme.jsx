import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1D2D3C',
    },
    secondary: {
      main: '#FCBB43',
    },
    red: {
      main: '#FF1105',
    },
  },
});

export default theme
