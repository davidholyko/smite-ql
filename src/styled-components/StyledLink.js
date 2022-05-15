import { styled } from '@mui/material/styles';
import { Link as UnstyledLink } from 'react-router-dom';

export const Link = styled(UnstyledLink)(() => {
  return {
    textDecoration: 'none',
  };
});
