import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';

import appJson from '../../../package.json';
import { theme } from '../../constants';
import { ExternalLinkIcon } from '../icons';

export const Footer = () => {
  return (
    <Container
      sx={{
        backgroundColor: theme.palette.primary.dark,
        padding: '10px 10px 25px 10px',
        color: 'white',
        textAlign: 'center',
      }}
      maxWidth={false}
    >
      <Typography variant="h5">Source Code</Typography>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          left: 0,
          padding: [0],
          position: 'absolute',
        }}
        maxWidth={false}
      >
        <Typography>
          <a
            href="https://github.com/davidholyko/smite-ql"
            rel="noreferrer"
            target="_blank"
            style={{
              textDecoration: 'none',
              color: 'white',
              alignSelf: 'center',
            }}
          >
            Github <ExternalLinkIcon />
          </a>
        </Typography>
      </Container>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          left: 0,
          padding: [0],
          position: 'absolute',
        }}
        maxWidth={false}
      >
        <Typography variant="body2" sx={{ paddingX: '5px' }}>
          v{appJson.version}
        </Typography>
      </Container>
    </Container>
  );
};
