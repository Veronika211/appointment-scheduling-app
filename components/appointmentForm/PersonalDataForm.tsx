import React, {useState} from 'react';
import {Box, MenuItem, Typography} from '@mui/material';
import {Select} from '@ui/select/Select';
import {Button} from '@ui/Button';
import {styles} from 'components/appointmentForm/PersonalDataForm.styles';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {TimeBox} from '@ui/timeBox/TimeBox';
import {IAppointmentFormInputs, IBackendData} from '@helpers/types';
import {ControllerWrapper} from 'components/controllerWrapper/ControllerWrapper';
import {useForm} from 'react-hook-form';
import {convertToISOString, getOnlyDate} from 'utility/dateUtilities';

interface IProps {
  setActiveStep: () => void;
  personalData: IAppointmentFormInputs;
  setPersonalData: React.Dispatch<React.SetStateAction<IAppointmentFormInputs>>;
  examFields: any;
  examTypes: any;
  availableTimes: any;
}

interface IDefaultValues {
  firstTimeVisit: string;
}

//when we pass parameters here we can use them in validation (like default values, validation messages etc)
const appointmentValidationSchema = (defaultValues: IDefaultValues) =>
  yup.object({
    firstName: yup.string().required('First name required'),
    lastName: yup.string().required('Last name is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    email: yup.string().required('Email is required').email('Email is invalid'),
    dateOfBirth: yup.string().required('Date of birth is required'),
    firstTimeVisit: yup
      .string()
      .required('First time visit is required')
      .default(defaultValues.firstTimeVisit),
    appointmentDate: yup.string().required('Appointment date is required'),
    examField: yup.string().required('Exam field is required'),
    examType: yup.string().required('Exam type is required'),
  });

export const PersonalDataForm: React.FC<IProps> = ({
  setActiveStep,
  personalData,
  setPersonalData,
  examFields,
  examTypes,
  availableTimes,
}) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<IAppointmentFormInputs>({
    resolver: yupResolver(
      appointmentValidationSchema({firstTimeVisit: personalData.firstTimeVisit}),
    ),
  });

  const {firstName, lastName, email, phoneNumber, examField, firstTimeVisit, examType} = errors;

  const [selectedTime, setSelectedTime] = useState(personalData.pickedTime);
  const [examFieldState, setExamFieldState] = useState(personalData.examField);
  const [selectedTimeError, setSelectedTimeError] = useState(false);

  // useEffect(() => {
  //   getExamFields();
  //   getExamTypes();
  //   getAvailableTimes();
  // }, []);

  // useEffect(() => {
  //   if (examFieldsError || examTypesError || availableTimesError) {
  //     alert('There was a problem with fetching exam data!');
  //   }
  // }, [examFieldsError, examTypesError, availableTimesError]);

  const onSubmit = (data: IAppointmentFormInputs) => {
    if (selectedTime === '') {
      setSelectedTimeError(true);
      return;
    }
    //creating new object with form data and picked time since picked time is a box element and not in form data
    const dataToSend = {
      ...data,
      dateOfBirth: convertToISOString(data.dateOfBirth),
      appointmentDate: getOnlyDate(convertToISOString(data.appointmentDate)),
      pickedTime: selectedTime,
    };

    setActiveStep();
    setPersonalData(dataToSend);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.row}>
          <ControllerWrapper
            componentType="textField"
            componentProps={{
              label: 'First name',
              error: !!firstName,
              helperText: firstName?.message,
              style: styles.leftElement,
              testId: 'firstName',
            }}
            name="firstName"
            control={control}
            defaultValue={personalData.firstName}
          />
          <ControllerWrapper
            componentType="textField"
            componentProps={{
              label: 'Last name',
              error: !!lastName,
              helperText: lastName?.message,
              testId: 'lastName',
            }}
            name="lastName"
            control={control}
            defaultValue={personalData.lastName}
          />
        </Box>
        <Box sx={styles.row}>
          <ControllerWrapper
            componentType="textField"
            componentProps={{
              label: 'Phone number',
              error: !!phoneNumber,
              testId: 'phoneNumber',
              helperText: phoneNumber?.message,
              style: styles.leftElement,
            }}
            name="phoneNumber"
            control={control}
            defaultValue={personalData.phoneNumber}
          />

          <ControllerWrapper
            componentType="datePicker"
            componentProps={{
              label: 'Date of birth',
              testId: 'dateOfBirth',
              style: [styles.datePicker, styles.leftElement],
            }}
            name="dateOfBirth"
            control={control}
            defaultValue={personalData.dateOfBirth}
          />

          <ControllerWrapper
            componentType="textField"
            componentProps={{
              label: 'Email',
              error: !!email,
              testId: 'email',
              helperText: email?.message,
            }}
            name="email"
            control={control}
            defaultValue={personalData.email}
          />
        </Box>
        <Box sx={styles.row}>
          <Select
            sxStyle={[styles.select, styles.leftElement]}
            label="Exam Field"
            name="examField"
            control={control}
            defaultValue={personalData.examField}
            error={!!examField}
            onChangeProps={(value: string) => {
              setExamFieldState(value);
            }}
            testId="examField"
          >
            {examFields?.map((field: IBackendData) => (
              <MenuItem value={field.value} key={field?.id}>
                {field.value}
              </MenuItem>
            ))}
          </Select>

          <Select
            sxStyle={[styles.select, styles.leftElement]}
            defaultValue={personalData.examType}
            label="Type of exam"
            name="examType"
            control={control}
            error={!!examType}
            testId="examType"
          >
            {examFieldState !== '' ? (
              examTypes?.map((oneType: IBackendData) => (
                <MenuItem value={oneType.value} key={oneType.id}>
                  {oneType.value}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">You must choose exam field first.</MenuItem>
            )}
          </Select>

          <ControllerWrapper
            componentType="datePicker"
            componentProps={{
              label: 'Date of appointment',
              style: [styles.datePicker, styles.leftElement],
              testId: 'dateOfAppointment',
            }}
            name="appointmentDate"
            control={control}
            defaultValue={personalData.appointmentDate}
          />
        </Box>
        <Box sx={styles.timeBox}>
          {availableTimes?.map((time: IBackendData) => (
            <TimeBox
              name="pickedTime"
              value={time.value}
              testId={`pickedTime-${time.value}`}
              selectedTime={selectedTime === time.value}
              key={time.id}
              onClick={() => setSelectedTime(time.value)}
            />
          ))}
        </Box>
        {selectedTimeError && (
          <Typography color="red">You must select time of appointment!</Typography>
        )}

        <ControllerWrapper
          componentType="radioButton"
          componentProps={{
            label: 'First time visitor *',
            firstLabel: 'Yes',
            secondLabel: 'No',
            error: firstTimeVisit,
            testId: 'firstTimeVisit',
            helperText: firstTimeVisit?.message,
            selectedValue: personalData.firstTimeVisit,
          }}
          name="firstTimeVisit"
          control={control}
        />

        <Box sx={styles.row}>
          <Button
            variant="contained"
            data-testid="nextButton"
            type="submit"
            text="Next"
            sxStyle={styles.button}
          />
        </Box>
      </form>
    </Box>
  );
};
