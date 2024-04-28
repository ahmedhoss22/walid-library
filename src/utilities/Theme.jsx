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
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&.Mui-checked': {
            color: '#fff',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#fff !important',
        },
        select: {
          '&:focus': {
            backgroundColor: 'transparent',
            borderColor: "#fff"
          },
          '&:hover': {
            backgroundColor: 'transparent',
            borderColor: "#fff"
          },
          color: "#fff"
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: "#fff",
          '&.css-1d3z3hw-MuiOutlinedInput-root $notchedOutline': {
            borderColor: '#fff !important',
          },
          '&.css-1d3z3hw-MuiOutlinedInput-root $notchedOutline:hover': {
            borderColor: '#fff !important',
          },
          '& $notchedOutline': {
            borderColor: '#fff !important', // Default outlined border color
          },
          '&:hover:css-1d3z3hw-MuiOutlinedInput-root $notchedOutline:hover': {
            borderColor: '#fff', // Border color on hover
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#fff !important',
        },
      },
    },
  }
});

export default theme
