import {Box, MenuItem, SelectChangeEvent, Typography} from '@mui/material';
import {Select} from '@/ui/select/Select';
import {Button} from '@/ui/Button';
import {styles} from './PersonalDataForm.styles';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Dispatch, SetStateAction, useState} from 'react';
import TimeBox from '@/ui/timeBox/TimeBox';
import {IAppointmentFormInputs} from '@/helpers/types';
import ControllerWrapper from 'components/controllerWrapper/ControllerWrapper';
import {useForm} from 'react-hook-form';

interface Props {
  setActiveStep: any;
  personalData: IAppointmentFormInputs;
  setPersonalData: Dispatch<SetStateAction<IAppointmentFormInputs>>;
}

//when we pass parameters here we can use them in validation (like default values, validation messages etc)
const appointmentValidationSchema = (defaultValues: any) =>
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

const AppointmentForm: React.FC<Props> = ({setActiveStep, personalData, setPersonalData}) => {
  const examFields = ['Ginecology', 'Radiology', 'Pulmology', 'Orthopedics'];
  const examTypes = ['Ultrasound', 'General exam', 'CT scan'];
  const availableTimes = ['09:00', '10:30', '11:00', '12:15'];

  const {
    handleSubmit,
    control,
    reset,
    register,
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

  const onSubmit = (data: any) => {
    if (selectedTime === '') {
      setSelectedTimeError(true);
      return;
    }
    //creating new object with form data and picked time since picked time is a box element and not in form data
    console.log(data);
    const dataToSend = {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
      appointmentDate: new Date(data.appointmentDate).toISOString().slice(0, 10),
      pickedTime: selectedTime,
    };
    setActiveStep();
    setPersonalData(dataToSend);
    console.log('data to send', dataToSend);
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
          >
            {examFields.map((field: any) => (
              <MenuItem value={field} key={field + Math.random()}>
                {field}
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
          >
            {examFieldState != '' ? (
              examTypes.map((oneType: any) => (
                <MenuItem value={oneType} key={oneType + Math.random()}>
                  {oneType}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={''}>{'You must choose exam field first.'}</MenuItem>
            )}
          </Select>

          <ControllerWrapper
            componentType="datePicker"
            componentProps={{
              label: 'Date of appointment',
              style: [styles.datePicker, styles.leftElement],
            }}
            name="appointmentDate"
            control={control}
            defaultValue={personalData.appointmentDate}
          />
        </Box>
        <Box sx={styles.timeBox}>
          {availableTimes.map((time: string) => (
            <TimeBox
              name="pickedTime"
              value={time}
              selectedTime={selectedTime === time}
              key={time + Math.random()}
              onClick={() => setSelectedTime(time)}
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
            helperText: firstTimeVisit?.message,
            selectedValue: personalData.firstTimeVisit,
          }}
          name="firstTimeVisit"
          control={control}
        />

        <Box sx={styles.row}>
          <Button variant="contained" type="submit" text="Next" sxStyle={styles.button} />
        </Box>
      </form>
    </Box>
  );
};

export default AppointmentForm;
