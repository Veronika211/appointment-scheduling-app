import * as React from 'react';
import {SxProps, TextField as MaterialTextField, Theme} from '@mui/material';

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
  defaultValue?: string;
  name?: string;
  label?: string;
  style?: SxProps<Theme>;
  value?: string;
  error?: boolean;
  rows?: number;
  multiline?: boolean;
  helperText?: string;
  testId?: string;
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
  testId,
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
    inputProps={{'data-testid': testId}}
    {...rest}
  />
);
