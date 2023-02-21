import * as React from 'react';
import {TextField as MaterialTextField} from '@mui/material';
import {styles} from './TextField.styles';
import {ChangeEventHandler} from 'react';

interface Props {
  onChange?: any;
  onBlur?: any;
  inputRef?: any;
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
  onBlur,
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
  inputRef,
  ...rest
}) => {
  // const forwardedInput = React.forwardRef(TextField);
  return (
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
};
