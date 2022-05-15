import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

export const Page = styled(Container)(({ theme }) => {
  return {
    [theme.breakpoints.up('sm')]: {
      padding: 0,
      maxWidth: '100vw',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
  };
});
