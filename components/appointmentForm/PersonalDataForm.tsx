import {Box, MenuItem, SelectChangeEvent, Typography} from '@mui/material';
import {RadioGroup} from '../ui/radioGroup/RadioGroup';
import {DatePicker} from '../ui/datePicker/DatePicker';
import {Select} from '../ui/select/Select';
import {TextField} from '../ui/TextField';
import {Button} from '../ui/Button';
import {styles} from './PersonalDataForm.styles';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Dispatch, SetStateAction, useState} from 'react';
import TimeBox from '../ui/timeBox/TimeBox';
import {IAppointmentFormInputs} from '../../helpers/types';

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

  const [selectedTime, setSelectedTime] = useState(personalData.pickedTime);
  const [examField, setExamField] = useState(personalData.examField);
  const [selectedTimeError, setSelectedTimeError] = useState(false);

  const onSubmit = (data: any) => {
    if (selectedTime === '') {
      setSelectedTimeError(true);
      return;
    }
    //creating new object with form data and picked time since picked time is a box element and not in form data
    console.log(data);
    const dataToSend = {...data, pickedTime: selectedTime};
    setActiveStep();
    setPersonalData(dataToSend);
    console.log('data to send', dataToSend);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.row}>
          <Controller
            name="firstName"
            control={control}
            defaultValue={personalData.firstName}
            render={({field: {onChange, onBlur, value, name, ref}}) => (
              <TextField
                label="First Name"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
                name={name}
                style={styles.leftElement}
                error={errors.firstName ? true : false}
                helperText={errors.firstName?.message}
              />
            )}
          />

          <Controller
            name={'lastName'}
            control={control}
            defaultValue={personalData.lastName}
            render={({field: {onChange, onBlur, value, name, ref}}) => (
              <TextField
                label="Last Name"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
                error={errors.lastName ? true : false}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Box>
        <Box sx={styles.row}>
          <Controller
            name={'phoneNumber'}
            defaultValue={personalData.phoneNumber}
            control={control}
            render={({field: {onChange, onBlur, value, name, ref}}) => (
              <TextField
                label="Phone Number"
                style={styles.leftElement}
                error={errors.phoneNumber ? true : false}
                helperText={errors.phoneNumber?.message}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
              />
            )}
          />

          <Controller
            name={'dateOfBirth'}
            control={control}
            defaultValue={personalData.dateOfBirth}
            render={({field: {onChange, onBlur, value, name, ref}}) => (
              <DatePicker
                label="Date of birth"
                sxStyle={[styles.datePicker, styles.leftElement]}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
              />
            )}
          />

          <Controller
            name={'email'}
            control={control}
            defaultValue={personalData.email}
            render={({field: {onChange, onBlur, value, name, ref}}) => (
              <TextField
                label="Email"
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
              />
            )}
          />
        </Box>
        <Box sx={styles.row}>
          <Select
            sxStyle={[styles.select, styles.leftElement]}
            label="Exam Field"
            name="examField"
            control={control}
            defaultValue={personalData.examField}
            error={errors.examField ? true : false}
            onChangeProps={(value: string) => {
              setExamField(value);
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
            error={errors.examType ? true : false}
          >
            {examField != '' ? (
              examTypes.map((oneType: any) => (
                <MenuItem value={oneType} key={oneType + Math.random()}>
                  {oneType}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={''} key={Math.random()}>
                {'You must choose exam field first.'}
              </MenuItem>
            )}
          </Select>
          <Controller
            name="appointmentDate"
            control={control}
            defaultValue={personalData.appointmentDate}
            render={({field: {onChange, onBlur, value, name, ref}}) => (
              <DatePicker
                label="Date of appointment"
                sxStyle={[styles.datePicker, styles.leftElement]}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                inputRef={ref}
              />
            )}
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
          <Typography color={'red'}>You must select time of appointment!</Typography>
        )}
        <Controller
          name="firstTimeVisit"
          control={control}
          render={({field}) => (
            <RadioGroup
              label="First time visitor *"
              firstLabel="Yes"
              secondLabel="No"
              error={errors.firstTimeVisit}
              helperText={errors.firstTimeVisit?.message}
              selectedValue={personalData.firstTimeVisit}
              {...field}
            ></RadioGroup>
          )}
        />

        <Box sx={styles.row}>
          <Button variant="contained" type="submit" text="Next" sxStyle={styles.button} />
        </Box>
      </form>
    </Box>
  );
};

export default AppointmentForm;
