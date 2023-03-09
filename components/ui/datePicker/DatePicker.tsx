import * as React from 'react';
import {DesktopDatePicker as MaterialDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {Box, TextField} from '@mui/material';

interface Props {
  onChange: any;
  disabled?: boolean;
  value?: string;
  label?: string;
  sxStyle?: any;
  name?: string;
  onBlur?: any;
  inputRef?: any;
}

export const DatePicker: React.FC<Props> = ({
  onChange, inputRef, sxStyle, value, ...rest
}) => (
  <Box sx={sxStyle}>
    <MaterialDatePicker
      inputRef={inputRef}
      onChange={onChange}
      value={value}
      {...rest}
      renderInput={(params) => <TextField {...params} />}
    />
  </Box>
);
