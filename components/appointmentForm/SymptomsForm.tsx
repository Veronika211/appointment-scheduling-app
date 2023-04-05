import React, {useState} from 'react';
import {Box, Typography} from '@mui/material';
import {styles} from 'components/appointmentForm/SymptomsForm.styles';
import {TextField} from '@ui/TextField';
import {RadioGroup} from '@ui/radioGroup/RadioGroup';
import {Button} from '@ui/Button';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {IAppointmentFormInputs, ISymptomsFormInputs} from '@helpers/types';
import {createStringDate} from 'utility/dateUtilities';
import useHttp from 'hooks/useHttp';
import * as requests from 'api/http-requests';

interface Props {
  setActiveStep: () => void;
  resetPersonalData: (value: IAppointmentFormInputs) => void;
  personalData: IAppointmentFormInputs;
}

const sympthomsValidationSchema = yup.object({
  headache: yup.string().required('Required'),
  abdominalPain: yup.string().required('Required'),
  dizziness: yup.string().required('Required'),
  musclePain: yup.string().required('Required'),
  anxiety: yup.string().required('Required'),
  alcohol: yup.string().required('Required'),
  smoker: yup.string().required('Required'),
  tingling: yup.string().required('Required'),
});
export const SymptomsForm: React.FC<Props> = ({
  setActiveStep,
  resetPersonalData,
  personalData,
}): JSX.Element => {
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<ISymptomsFormInputs>({
    resolver: yupResolver(sympthomsValidationSchema),
  });

  const resetFormData = () => {
    reset({
      headache: '',
      abdominalPain: '',
      tingling: '',
      dizziness: '',
      musclePain: '',
      anxiety: '',
      alcohol: '',
      smoker: '',
    });
    resetPersonalData({
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
  };
  const [additionalField, setAdditionalField] = useState('');
  const {sendRequest} = useHttp(requests.addAppointment());

  const onSubmit = (data: ISymptomsFormInputs) => {
    const dataToSend = {...personalData, ...data, additionalSympthoms: additionalField};
    sendRequest({body: dataToSend});
    setActiveStep();
    resetFormData();
  };

  return (
    <Box sx={styles.mainContainer} data-testid="symptoms-form-title">
      <Typography variant="h5" sx={styles.title}>
        Select your symptoms:
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="symptoms-form">
        <Box sx={styles.radioGroupContainer}>
          <Box sx={styles.radioGroupRow}>
            <Controller
              name="headache"
              control={control}
              render={({field}) => (
                <RadioGroup
                  label="Headache?"
                  firstLabel="Yes"
                  secondLabel="No"
                  sx={styles.leftElement}
                  error={errors.headache}
                  testId="headache"
                  helperText={errors.headache?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="abdominalPain"
              control={control}
              render={({field}) => (
                <RadioGroup
                  label="Do you feel abdominal pain?"
                  firstLabel="Yes"
                  secondLabel="No"
                  sx={styles.leftElement}
                  testId="abdominalPain"
                  error={errors.abdominalPain}
                  helperText={errors.abdominalPain?.message}
                  {...field}
                />
              )}
            />
          </Box>
          <Box sx={styles.radioGroupRow}>
            <Controller
              name="dizziness"
              control={control}
              render={({field}) => (
                <RadioGroup
                  label="Do you feel dizziness?"
                  firstLabel="Yes"
                  secondLabel="No"
                  sx={styles.leftElement}
                  error={errors.dizziness}
                  testId="dizziness"
                  helperText={errors.dizziness?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="tingling"
              control={control}
              render={({field}) => (
                <RadioGroup
                  label="Do you feel tingling?"
                  firstLabel="Yes"
                  secondLabel="No"
                  sx={styles.leftElement}
                  error={errors.tingling}
                  testId="tingling"
                  helperText={errors.tingling?.message}
                  {...field}
                />
              )}
            />
          </Box>
          <Box sx={styles.radioGroupRow}>
            <Controller
              name="musclePain"
              control={control}
              render={({field}) => (
                <RadioGroup
                  label="Muscle pain?"
                  firstLabel="Yes"
                  secondLabel="No"
                  sx={styles.leftElement}
                  error={errors.musclePain}
                  testId="musclePain"
                  helperText={errors.musclePain?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="anxiety"
              control={control}
              render={({field}) => (
                <RadioGroup
                  label="Do you have anxiety?"
                  firstLabel="Yes"
                  secondLabel="No"
                  sx={styles.leftElement}
                  error={errors.anxiety}
                  testId="anxiety"
                  helperText={errors.anxiety?.message}
                  {...field}
                />
              )}
            />
          </Box>
          <Box sx={styles.radioGroupRow}>
            <Controller
              name="alcohol"
              control={control}
              render={({field}) => (
                <RadioGroup
                  label="Do you drink alcohol?"
                  firstLabel="Yes"
                  secondLabel="No"
                  sx={styles.leftElement}
                  error={errors.alcohol}
                  testId="alcohol"
                  helperText={errors.alcohol?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="smoker"
              control={control}
              render={({field}) => (
                <RadioGroup
                  label="Are you a smoker?"
                  firstLabel="Yes"
                  secondLabel="No"
                  error={errors.smoker}
                  testId="smoker"
                  helperText={errors.smoker?.message}
                  {...field}
                />
              )}
            />
          </Box>
        </Box>
        <Box sx={styles.additionalFieldContainer}>
          <TextField
            multiline
            rows={4}
            label="If you have another symptom type it here: "
            value={additionalField}
            data-testid="anotherSymptomMultiline"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAdditionalField(event.target.value)
            }
          />
          <Button
            variant="contained"
            data-testid="submitButton"
            text="Submit"
            type="submit"
            sxStyle={styles.submitButton}
          />
        </Box>
      </form>
    </Box>
  );
};
