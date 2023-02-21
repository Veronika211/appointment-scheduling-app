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
import {useState} from 'react';
import TimeBox from '../ui/timeBox/TimeBox';

interface IFormInputs {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  firstTimeVisit: string;
  appointmentDate: string;
  appointmentTime: string;
  examType: string;
  examField: string;
  pickedTime: string;
}
interface Props {
  setActiveStep: any;
}

const appointmentValidationSchema = yup.object({
  firstName: yup.string().required('First name required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  // firstTimeVisit: yup.string().required('First time visit is required'),
  appointmentDate: yup.string().required('Appointment date is required'),
  // appointmentTime: yup.string().required('Appointment time is required'),
  // examType: yup.string().required('Exam type is required'),
  examField: yup.string().required('Exam field is required'),
  examType: yup.string().required('Exam type is required'),
  // examType: yup.string().ensure().when('examField', {
  //   is: '',
  //   then: yup.string().required(),
  // }),
});

const AppointmentForm: React.FC<Props> = ({setActiveStep}) => {
  const examFields = ['Ginecology', 'Radiology', 'Pulmology', 'Orthopedics'];
  const examTypes = ['Ultrasound', 'General exam', 'CT scan'];
  const availableTimes = ['09:00', '10:30', '11:00', '12:15'];

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: {errors},
  } = useForm<IFormInputs>({
    resolver: yupResolver(appointmentValidationSchema),
  });

  const [selectedTime, setSelectedTime] = useState('');
  const [examField, setExamField] = useState('');
  const [selectedTimeError, setSelectedTimeError] = useState(false);

  const onSubmit = (data: any) => {
    // console.log('clicked');
    if (selectedTime === '') {
      setSelectedTimeError(true);
      // console.log('You must select time of appointment!');
      return;
    }
    console.log(data);
    setActiveStep();
    reset();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.row}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({field}) => (
              <TextField
                label="First Name"
                {...field}
                style={styles.leftElement}
                error={errors.firstName ? true : false}
                helperText={errors.firstName?.message}
              />
            )}
          />

          <Controller
            name={'lastName'}
            control={control}
            defaultValue=""
            render={({field}) => (
              <TextField
                label="Last Name"
                {...field}
                error={errors.lastName ? true : false}
                helperText={errors.lastName?.message}
                value={field.value || ''}
              />
            )}
          />
        </Box>
        <Box sx={styles.row}>
          <Controller
            name={'phoneNumber'}
            control={control}
            render={({field}) => (
              <TextField
                label="Phone Number"
                style={styles.leftElement}
                error={errors.phoneNumber ? true : false}
                helperText={errors.phoneNumber?.message}
                {...field}
              />
            )}
          />

          <Controller
            name={'dateOfBirth'}
            control={control}
            defaultValue={new Date().toString()}
            render={({field}) => (
              <DatePicker
                label="Date of birth"
                sxStyle={[styles.datePicker, styles.leftElement]}
                {...field}
              />
            )}
          />

          <Controller
            name={'email'}
            control={control}
            render={({field}) => (
              <TextField
                label="Email"
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                {...field}
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
            defaultValue={examField}
            error={errors.examField ? true : false}
            onChangeProps={(value: string) => {
              //console.log('form value', value);
              setExamField(value);
              //console.log(value);
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
            defaultValue={''}
            label="Type of exam"
            name="examType"
            control={control}
            error={errors.examType ? true : false}
          >
            {examField != '' &&
              examTypes.map((oneType: any) => (
                <MenuItem value={oneType} key={oneType + Math.random()}>
                  {oneType}
                </MenuItem>
              ))}
          </Select>
          <Controller
            name="appointmentDate"
            control={control}
            defaultValue={new Date().toString()}
            render={({field}) => (
              <DatePicker
                label="Date of appointment"
                sxStyle={[styles.datePicker, styles.leftElement]}
                {...field}
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
          defaultValue={'yes'}
          render={({field}) => (
            <RadioGroup
              label="First time visitor *"
              firstLabel="Yes"
              secondLabel="No"
              error={errors.firstTimeVisit}
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
