import {Box, Typography} from '@mui/material';
import {styles} from 'components/appointmentForm/AppointmentForm.styles';
import {useState} from 'react';
import {Stepper} from '@ui/stepper/Stepper';
import {PersonalDataForm} from 'components/appointmentForm/PersonalDataForm';
import {SymptomsForm} from 'components/appointmentForm/SymptomsForm';
import {IAppointmentFormInputs} from '@helpers/types';
import {createStringDate} from 'utility/dateUtilities';

export const AppointmentForm = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const [personalData, setPersonalData] = useState<IAppointmentFormInputs>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: createStringDate(),
    firstTimeVisit: 'yes',
    appointmentDate: createStringDate(),
    examType: '',
    examField: '',
    pickedTime: '',
  });

  const renderAppropriateForm = () => {
    if (activeStep === 0) {
      return (
        <PersonalDataForm
          setActiveStep={() => setActiveStep(activeStep + 1)}
          personalData={personalData}
          setPersonalData={setPersonalData}
        />
      );
    }
    return (
      <SymptomsForm
        setActiveStep={() => setActiveStep(activeStep + 1)}
        resetPersonalData={(value: IAppointmentFormInputs) => setPersonalData(value)}
      />
    );
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
