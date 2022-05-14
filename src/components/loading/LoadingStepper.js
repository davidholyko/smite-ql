import Container from '@mui/material/Container';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import classNames from 'classnames';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';
import './LoadingStepper.css';

const steps = [
  'Looking for cached data',
  'Retrieving new data (This could take up to 30 seconds for first load)',
  'Loading complete',
];

export const LoadingStepper = ({ activeStep }) => {
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', minHeight: '500px' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%' }}>
        {map(steps, (label, index) => {
          // when loading is complete, all will pulse
          const className = classNames({ 'pulsing-step': activeStep === index || activeStep === 3 });

          return (
            <Step className={className} key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Container>
  );
};

LoadingStepper.propTypes = {
  activeStep: PropTypes.number,
};
