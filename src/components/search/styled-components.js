import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const SearchWrapper = styled(Box)(({ theme }) => {
  return {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  };
});

export const SearchIconWrapper = styled(Box)(({ theme }) => {
  return {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});

export const SearchInput = styled(TextField)(({ theme }) => {
  return {
    color: 'inherit',
    transition: theme.transitions.create('width'),
    '#search-player-auto-complete': {
      color: 'white',
      paddingLeft: '2em',
      marginLeft: '0.75em',
      transition: 'width 0.25s ease-in-out',
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
    '#search-player-auto-complete-label': {
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white',
      // offset playerholder text when unfocused
      paddingLeft: '2.5em',
    },
    '#search-player-auto-complete-label.Mui-focused': {
      color: 'white',
      // undo offset when focused
      paddingLeft: '0em',
    },
    '.MuiAutocomplete-inputRoot': {
      // prevents width from changing text goes from blank to any string
      paddingRight: '39px',
    },
  };
});
