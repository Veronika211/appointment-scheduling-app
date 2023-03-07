import {Box} from '@mui/material';
import React, {ReactElement} from 'react';
import {Control, Controller, ControllerRenderProps} from 'react-hook-form';
import {IAppointmentFormInputs, TAppointmentFormFields} from '../../helpers/types';
import {DatePicker} from '../ui/datePicker/DatePicker';
import {RadioGroup} from '../ui/radioGroup/RadioGroup';
import {TextField} from '../ui/TextField';

type ComponentType = 'textField' | 'datePicker' | 'radioButton';

interface Props {
  componentType: ComponentType;
  componentProps: any;
  defaultValue?: string;
  name: TAppointmentFormFields;
  control: Control<IAppointmentFormInputs, any>;
}

const ControllerWrapper: React.FC<Props> = ({
  componentType,
  control,
  name,
  defaultValue,
  componentProps,
}): JSX.Element => {
  const {label, style, error, helperText, firstLabel, secondLabel, selectedValue} = componentProps;
  const renderAppropriateField = ({
    field,
  }: {
    field: ControllerRenderProps<IAppointmentFormInputs, TAppointmentFormFields>;
  }): ReactElement => {
    if (componentType === 'textField') {
      return (
        <TextField
          label={label}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          inputRef={field.ref}
          style={style}
          error={error ? true : false}
          helperText={helperText}
        />
      );
    }
    if (componentType === 'radioButton') {
      return (
        <RadioGroup
          label={label}
          firstLabel={firstLabel}
          secondLabel={secondLabel}
          sx={style}
          error={error}
          helperText={helperText}
          selectedValue={selectedValue}
          {...field}
        />
      );
    }
    if (componentType === 'datePicker') {
      return (
        <DatePicker
          label={label}
          sxStyle={style}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          inputRef={field.ref}
        />
      );
    }
    return <React.Fragment />;
  };
  return (
    <Box>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={renderAppropriateField}
      />
    </Box>
  );
};

export default ControllerWrapper;
