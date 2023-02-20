import * as React from 'react';
import {TextField as MaterialTextField} from '@mui/material';
import {styles} from './Button.styles';
import {ChangeEventHandler} from 'react';

interface Props {
  onChange?: any;
  disabled?: boolean;
  defaultValue?: string;
  name?: string;
  control?: any;
  label?: string;
  style?: any;
  value?: any;
  error?: any;
  rows?: number;
  multiline?: any;
  helperText?: string;
}

export const TextField: React.FC<Props> = ({
  onChange,
  name,
  value,
  control,
  label,
  style,
  error,
  helperText,
  multiline,
  defaultValue,
  rows,
  ...rest
}) => {
  return (
    <MaterialTextField
      sx={style}
      error={error}
      multiline={multiline}
      onChange={onChange}
      label={label}
      value={value}
      rows={rows}
      name={name}
      defaultValue={defaultValue}
      helperText={helperText}
      {...rest}
    />
  );
};
