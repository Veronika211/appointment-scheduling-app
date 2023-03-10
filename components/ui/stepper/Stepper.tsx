import * as React from 'react';
import Box from '@mui/material/Box';
import {Stepper as MaterialStepper} from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {styles} from './Stepper.styles';
import {Button} from '../Button';

interface Props {
  activeStepProps: number;
  setActiveStepProps: any;
}

const steps = ['Enter personal data', 'Select sympthoms'];

export const Stepper: React.FC<Props> = ({activeStepProps, setActiveStepProps}) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleReset = () => {
    setActiveStep(0);
    setActiveStepProps(0);
  };

  React.useEffect(() => {
    setActiveStep(activeStepProps);
    if (activeStep === steps.length - 1) {
      handleReset();
    }
    // eslint-disable-next-line
  }, [activeStepProps]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setActiveStepProps((prevActiveStep: number) => prevActiveStep - 1);
  };

  return (
    <Box sx={{width: '80%'}}>
      <MaterialStepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps: {completed?: boolean} = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </MaterialStepper>
      {activeStep < steps.length && (
        <>
          <Typography sx={{mt: 2, mb: 1}}>Step {activeStep + 1}</Typography>
          <Box sx={styles.backButtonContainer}>
            <Button
              // color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sxStyle={styles.backButton}
              text="Back"
              variant="text"
            />

            <Box sx={{flex: '1 1 auto'}} />
          </Box>
        </>
      )}
    </Box>
  );
};
