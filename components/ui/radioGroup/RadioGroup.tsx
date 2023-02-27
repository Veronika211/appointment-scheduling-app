import * as React from 'react';
import Radio from '@mui/material/Radio';
import {FormHelperText, RadioGroup as MaterialRadioGroup} from '@mui/material/';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface Props {
  label?: string;
  firstLabel?: string;
  secondLabel?: string;
  error?: any;
  ref?: any;
  helperText?: any;
  selectedValue?: string;
  value?: any;
  onChange?: any;
}

export const RadioGroup: React.FC<Props> = React.forwardRef(
  (
    {label, helperText, firstLabel, error, secondLabel, selectedValue, onChange, value, ...rest},
    ref,
  ) => {
    return (
      <FormControl error={error ? true : false}>
        <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
        <MaterialRadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={selectedValue}
          ref={ref}
          onChange={onChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label={firstLabel} />
          <FormControlLabel value="no" control={<Radio />} label={secondLabel} />
        </MaterialRadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  },
);
