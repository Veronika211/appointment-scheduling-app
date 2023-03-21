import * as React from 'react';
import {DesktopDatePicker as MaterialDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {Box, TextField} from '@mui/material';
import {SxProps, Theme} from '@mui/material/styles';

interface Props {
  onChange: () => void;
  disabled?: boolean;
  value?: string;
  label?: string;
  sxStyle?: SxProps<Theme>;
  name?: string;
  onBlur?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const DatePicker: React.FC<Props> = ({onChange, inputRef, sxStyle, value, ...rest}) => (
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
