import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#4dabf5',
      main: '#1976d2',
      dark: '#1769aa',
      contrastText: '#fff',
    },
    secondary: {
      light: '#33bfff',
      main: '#00b0ff',
      dark: '#007bb2',
      contrastText: '#000',
    },
  },
});

console.log('!!! theme', theme);
