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

  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'p',
        },
      },
    },
  },
});
