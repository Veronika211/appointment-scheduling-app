// import DragAndDropContainer from "./drag-and-drop-component/DragAndDropContainer";
import {Box, MenuItem, SelectChangeEvent, Typography} from '@mui/material';
import {styles} from './AppointmentForm.styles';
import {useState} from 'react';
import {Stepper} from '../ui/stepper/Stepper';
import PersonalDataForm from './PersonalDataForm';
import SymptomsForm from './SymptomsForm';

const AppointmentForm = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);

  const renderAppropriateForm = () => {
    if (activeStep === 0) {
      return <PersonalDataForm setActiveStep={() => setActiveStep(activeStep + 1)} />;
    }
    return <SymptomsForm />;
  };

  return (
    <Box sx={styles.formContainer}>
      <Box sx={styles.title}>
        <Typography variant="h4">Request an Appointment</Typography>
      </Box>
      <Stepper
        activeStepProps={activeStep}
        setActiveStepProps={(value: number) => setActiveStep(value)}
      />
      {renderAppropriateForm()}
    </Box>
  );
};

export default AppointmentForm;
