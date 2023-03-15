import * as React from 'react';
import {TextField as MaterialTextField} from '@mui/material';

interface Props {
  onChange?: any;
  onBlur?: any;
  inputRef?: any;
  disabled?: boolean;
  defaultValue?: string;
  name?: string;
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
  onBlur,
  name,
  value,
  label,
  style,
  error,
  helperText,
  multiline,
  defaultValue,
  rows,
  inputRef,
  ...rest
}) => (
  <MaterialTextField
    sx={style}
    error={error}
    inputRef={inputRef}
    multiline={multiline}
    onChange={onChange}
    label={label}
    onBlur={onBlur}
    value={value}
    rows={rows}
    name={name}
    defaultValue={defaultValue}
    helperText={helperText}
    {...rest}
  />
);
