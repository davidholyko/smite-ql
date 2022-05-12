import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';

import appJson from '../../../package.json';
import { theme } from '../../theme';
import { ExternalLinkIcon } from '../icons';

export const Footer = () => {
  return (
    <Container
      sx={{
        backgroundColor: theme.palette.primary.dark,
        padding: '10px',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5">Source Code</Typography>
      <Typography>
        <a
          href="https://github.com/davidholyko/smite-ql"
          rel="noreferrer"
          target="_blank"
          style={{ textDecoration: 'none', color: 'white' }}
        >
          Github <ExternalLinkIcon />
        </a>
      </Typography>
      <Typography variant="body2" sx={{ textAlign: 'end' }}>
        v{appJson.version}
      </Typography>
    </Container>
  );
};
