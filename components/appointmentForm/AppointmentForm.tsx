import {Box, Typography} from '@mui/material';
import {styles} from 'components/appointmentForm/AppointmentForm.styles';
import {useEffect, useState} from 'react';
import {Stepper} from '@ui/stepper/Stepper';
import {PersonalDataForm} from 'components/appointmentForm/PersonalDataForm';
import {SymptomsForm} from 'components/appointmentForm/SymptomsForm';
import {IAppointmentFormInputs} from '@helpers/types';
import {createStringDate} from 'utility/dateUtilities';
import useHttp from 'hooks/useHttp';
import * as requests from 'api/http-requests';

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
  const {
    data: examFields,
    error: examFieldsError,
    sendRequest: getExamFields,
  } = useHttp(requests.getExamFields());
  const {
    data: examTypes,
    error: examTypesError,
    sendRequest: getExamTypes,
  } = useHttp(requests.getExamTypes());
  const {
    data: availableTimes,
    error: availableTimesError,
    sendRequest: getAvailableTimes,
  } = useHttp(requests.getAvailableTimes());

  useEffect(() => {
    if (examFieldsError || examTypesError || availableTimesError) {
      alert('There was a problem with fetching exam data!');
    }
  }, [examFieldsError, examTypesError, availableTimesError]);

  useEffect(() => {
    getExamFields();
    getExamTypes();
    getAvailableTimes();
  }, []);

  const renderAppropriateForm = () => {
    if (activeStep === 0) {
      return (
        <PersonalDataForm
          setActiveStep={() => setActiveStep(activeStep + 1)}
          personalData={personalData}
          setPersonalData={setPersonalData}
          examFields={examFields}
          examTypes={examTypes}
          availableTimes={availableTimes}
        />
      );
    }
    return (
      <SymptomsForm
        setActiveStep={() => setActiveStep(activeStep + 1)}
        resetPersonalData={(value: IAppointmentFormInputs) => setPersonalData(value)}
        personalData={personalData}
      />
    );
  };

  return (
    <Box sx={styles.formContainer}>
      <Box sx={styles.title} data-testid="appointmentTitle">
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
