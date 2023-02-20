import {Box, MenuItem, SelectChangeEvent, Typography} from '@mui/material';
import {styles} from './SympthomsForm.styles';
import {useState} from 'react';
import {Stepper} from '../ui/stepper/Stepper';
import PersonalDataForm from './PersonalDataForm';
import {TextField} from '../ui/TextField';
import {RadioGroup} from '../ui/radioGroup/RadioGroup';
import {Button} from '../ui/Button';

const SympthomsForm = (): JSX.Element => {
  return (
    <Box sx={styles.mainContainer}>
      <Typography variant="h5">Select your symptoms:</Typography>
      <Box sx={styles.radioGroupContainer}>
        <Box sx={styles.radioGroupRow}>
          <RadioGroup
            label="Headache"
            firstLabel="Yes"
            secondLabel="No"
            sx={styles.leftElement}
            // error={errors.firstTimeVisit}
            // {...field}
          ></RadioGroup>
          <RadioGroup
            label="Abdominal pain"
            firstLabel="Yes"
            secondLabel="No"
            // error={errors.firstTimeVisit}
            // {...field}
          ></RadioGroup>
        </Box>
        <Box sx={styles.radioGroupRow}>
          <RadioGroup
            label="Dizziness"
            firstLabel="Yes"
            secondLabel="No"
            sx={styles.leftElement}
            // error={errors.firstTimeVisit}
            // {...field}
          ></RadioGroup>
          <RadioGroup
            label="Abdominal pain"
            firstLabel="Yes"
            secondLabel="No"
            // error={errors.firstTimeVisit}
            // {...field}
          ></RadioGroup>
        </Box>
        <Box sx={styles.radioGroupRow}>
          <RadioGroup
            label="Pain in muscles"
            firstLabel="Yes"
            secondLabel="No"
            sx={styles.leftElement}
            // error={errors.firstTimeVisit}
            // {...field}
          ></RadioGroup>
        </Box>
        <Box sx={styles.radioGroupRow}>
          <RadioGroup
            label="Do you drink alcohol?"
            firstLabel="Yes"
            secondLabel="No"
            sx={styles.leftElement}
            // error={errors.firstTimeVisit}
            // {...field}
          ></RadioGroup>

          <RadioGroup
            label="Are you a smoker?"
            firstLabel="Yes"
            secondLabel="No"
            // error={errors.firstTimeVisit}
            // {...field}
          ></RadioGroup>
        </Box>
      </Box>
      <TextField multiline rows={4} label="Have another symtpom: " defaultValue=""></TextField>
      <Button variant="contained" text="Submit" sxStyle={styles.submitButton} />
    </Box>
  );
};

export default SympthomsForm;
