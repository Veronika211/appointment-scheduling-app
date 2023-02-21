import {Box, MenuItem, SelectChangeEvent, Typography} from '@mui/material';
import {styles} from './SymptomsForm.styles';
import {useState} from 'react';
import {Stepper} from '../ui/stepper/Stepper';
import {TextField} from '../ui/TextField';
import {RadioGroup} from '../ui/radioGroup/RadioGroup';
import {Button} from '../ui/Button';

interface IFormData {
  headache: boolean;
  abdominalPain: boolean;
  dizziness: boolean;
  musclePain: boolean;
  anxiety: boolean;
  alcohol: boolean;
  smoker: boolean;
}
const SympthomsForm = (): JSX.Element => {
  const [formData, setFormData] = useState<IFormData>({
    headache: false,
    abdominalPain: false,
    dizziness: false,
    musclePain: false,
    anxiety: false,
    alcohol: false,
    smoker: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData({...formData, [name]: event});
  };

  const handleFormSubmit = () => {
    console.log(formData);
  };

  return (
    <Box sx={styles.mainContainer}>
      <Typography variant="h5" sx={styles.title}>
        Select your symptoms:
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Box sx={styles.radioGroupContainer}>
          <Box sx={styles.radioGroupRow}>
            <RadioGroup
              label="Headache"
              firstLabel="Yes"
              secondLabel="No"
              selectedValue={formData.headache ? 'yes' : 'no'}
              onValueChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event, 'headache')
              }
              sx={styles.leftElement}
            ></RadioGroup>
            <RadioGroup
              label="Abdominal pain"
              firstLabel="Yes"
              secondLabel="No"
              selectedValue={formData.abdominalPain ? 'yes' : 'no'}
              onValueChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event, 'abdominalPain')
              }
            ></RadioGroup>
          </Box>
          <Box sx={styles.radioGroupRow}>
            <RadioGroup
              label="Dizziness"
              firstLabel="Yes"
              secondLabel="No"
              selectedValue={formData.dizziness ? 'yes' : 'no'}
              onValueChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event, 'dizziness')
              }
              sx={styles.leftElement}
            ></RadioGroup>
            <RadioGroup label="Abdominal pain" firstLabel="Yes" secondLabel="No"></RadioGroup>
          </Box>
          <Box sx={styles.radioGroupRow}>
            <RadioGroup
              label="Muscle pain"
              firstLabel="Yes"
              secondLabel="No"
              selectedValue={formData.musclePain ? 'yes' : 'no'}
              onValueChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event, 'musclePain')
              }
              sx={styles.leftElement}
            ></RadioGroup>
            <RadioGroup
              label="Anxiety"
              firstLabel="Yes"
              secondLabel="No"
              selectedValue={formData.anxiety ? 'yes' : 'no'}
              onValueChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event, 'anxiety')
              }
            ></RadioGroup>
          </Box>
          <Box sx={styles.radioGroupRow}>
            <RadioGroup
              label="Do you drink alcohol?"
              firstLabel="Yes"
              secondLabel="No"
              selectedValue={formData.alcohol ? 'yes' : 'no'}
              onValueChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event, 'alcohol')
              }
              sx={styles.leftElement}
            ></RadioGroup>

            <RadioGroup
              label="Are you a smoker?"
              firstLabel="Yes"
              secondLabel="No"
              selectedValue={formData.smoker ? 'yes' : 'no'}
              onValueChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event, 'smoker')
              }
            ></RadioGroup>
          </Box>
        </Box>
        <TextField
          multiline
          rows={4}
          label="If you have another symptom type it here: "
          defaultValue=""
        ></TextField>
        <Button variant="contained" text="Submit" type="submit" sxStyle={styles.submitButton} />
      </form>
    </Box>
  );
};

export default SympthomsForm;
