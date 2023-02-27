import * as React from 'react';
import Box from '@mui/material/Box';
import {Stepper as MaterialStepper} from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {styles} from './Stepper.styles';
import {Button} from '../Button';
import handler from '../../../pages/api/hello';

interface Props {
  activeStepProps: number;
  setActiveStepProps: any;
}

const steps = ['Enter personal data', 'Select sympthoms'];

export const Stepper: React.FC<Props> = ({activeStepProps, setActiveStepProps}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  // const [skipped, setSkipped] = React.useState(new Set<number>());

  // const isStepOptional = (step: number) => {
  //   return step === 1;
  // };

  //jer je dugme next van ove komponente
  React.useEffect(() => {
    setActiveStep(activeStepProps);
    if (activeStep === steps.length - 1) {
      handleReset();
      return;
    }
  }, [activeStepProps]);

  // const isStepSkipped = (step: number) => {
  //   return skipped.has(step);
  // };

  // const handleNext = () => {
  //   // let newSkipped = skipped;
  //   // if (isStepSkipped(activeStep)) {
  //   //   newSkipped = new Set(newSkipped.values());
  //   //   newSkipped.delete(activeStep);
  //   // }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setActiveStepProps((prevActiveStep: number) => prevActiveStep + 1);
  //   // setSkipped(newSkipped);
  // };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setActiveStepProps((prevActiveStep: number) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setActiveStepProps((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
    setActiveStepProps(0);
  };

  return (
    <Box sx={{width: '80%'}}>
      <MaterialStepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: {completed?: boolean} = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
          // }
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </MaterialStepper>
      {activeStep < steps.length && (
        //   <React.Fragment>{handleReset()}</React.Fragment>
        // ) : (
        // <React.Fragment>
        //   <Typography sx={{mt: 2, mb: 1}}>All steps completed - you&apos;re finished</Typography>
        //   <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
        //     <Box sx={{flex: '1 1 auto'}} />
        //     <Button onClick={handleReset} text="Reset" variant="text" />
        //   </Box>
        // </React.Fragment>
        <React.Fragment>
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
            {/* {isStepOptional(activeStep) && (
              <Button
                variant="text"
                color="inherit"
                onClick={handleSkip}
                sx={{mr: 1}}
                text="Skip"
              />
            )} */}
            {/* <Button
              variant="text"
              onClick={handleNext}
              text={activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            /> */}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
