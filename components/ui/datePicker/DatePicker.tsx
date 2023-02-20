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
}

export const DatePicker: React.FC<Props> = ({onChange, sxStyle, value, ...rest}) => {
  return (
    <Box sx={sxStyle}>
      <MaterialDatePicker
        onChange={onChange}
        value={value}
        {...rest}
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
};
