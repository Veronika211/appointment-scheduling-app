import * as React from 'react';
import Radio from '@mui/material/Radio';
import {FormHelperText, RadioGroup as MaterialRadioGroup, Theme} from '@mui/material/';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {styles} from '@ui/radioGroup/RadioGroup.styles';
import {SystemStyleObject} from '@mui/system';
import {FieldError} from 'react-hook-form';

interface Props {
  label?: string;
  firstLabel?: string;
  secondLabel?: string;
  error?: boolean | FieldError;
  helperText?: string;
  selectedValue?: string;
  value?: string;
  onChange?: () => void;
  sx?: SystemStyleObject<Theme>;
  testId?: string;
}

export const RadioGroup: React.FC<Props> = React.forwardRef(
  (
    {label, sx, helperText, firstLabel, testId, error, secondLabel, selectedValue, onChange},
    ref,
  ) => (
    <FormControl error={!!error} sx={[styles.container, sx]} data-testid={testId}>
      <FormLabel id={`${testId}-label`}>{label}</FormLabel>
      <MaterialRadioGroup
        aria-labelledby={`${testId}-label`}
        defaultValue={selectedValue}
        ref={ref}
        onChange={onChange}
      >
        <FormControlLabel
          value="yes"
          control={<Radio />}
          label={firstLabel}
          data-testid={`${testId}-${firstLabel}`}
        />
        <FormControlLabel
          value="no"
          control={<Radio />}
          data-testid={`${testId}-${secondLabel}`}
          label={secondLabel}
        />
      </MaterialRadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  ),
);

RadioGroup.displayName = 'RadioGroup';
