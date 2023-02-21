import * as React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MaterialRadioGroup,
} from '@mui/material';
import {useEffect} from 'react';
import {styles} from './RadioGroup.styles';

interface Props {
  onValueChange?: any;
  disabled?: boolean;
  label?: string;
  firstLabel?: string;
  error?: any;
  sx?: any;
  secondLabel?: string;
  selectedValue?: any;
}

export const RadioGroup: React.FC<Props> = ({
  onValueChange,
  selectedValue,
  label,
  firstLabel,
  secondLabel,
  sx,
  ...rest
}) => {
  const [value, setValue] = React.useState('no');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange((event.target as HTMLInputElement).value);
    setValue((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  return (
    <FormControl sx={[styles.container, sx]}>
      <FormLabel>{label}</FormLabel>
      <MaterialRadioGroup value={value} onChange={handleChange} {...rest}>
        <FormControlLabel value="yes" control={<Radio />} label={firstLabel} />
        <FormControlLabel value="no" control={<Radio />} label={secondLabel} />
      </MaterialRadioGroup>
    </FormControl>
  );
};
