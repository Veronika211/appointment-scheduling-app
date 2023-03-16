import * as React from 'react';
import {FormControl, FormHelperText, InputLabel, Select as MaterialSelect} from '@mui/material';
import {Controller} from 'react-hook-form';

interface Props {
  onChangeProps?: any;
  disabled?: boolean;
  label?: string;
  sxStyle?: any;
  children: any;
  defaultValue: any;
  name: string;
  inputRef?: any;
  control?: any;
  error?: any;
}

export const Select: React.FC<Props> = ({
  onChangeProps,
  control,
  sxStyle,
  name,
  defaultValue,
  label,
  children,
  ...rest
}) => (
  <FormControl {...rest}>
    <InputLabel>{label}</InputLabel>
    <Controller
      render={({field: {onChange, onBlur, value}}) => (
        <MaterialSelect
          onChange={(event) => {
            if (onChangeProps) {
              onChangeProps(event.target.value);
            }
            onChange(event.target.value);
          }}
          onBlur={onBlur} // notify when input is touched
          value={value}
          label={label}
          sx={sxStyle}
        >
          {children}
        </MaterialSelect>
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
    {rest.error && <FormHelperText error={rest.error}>This field is required!</FormHelperText>}
  </FormControl>
);
