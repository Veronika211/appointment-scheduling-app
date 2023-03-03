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
  const renderAppropriateField = ({
    field,
  }: {
    field: ControllerRenderProps<IAppointmentFormInputs, TAppointmentFormFields>;
  }): ReactElement => {
    if (componentType === 'textField') {
      return (
        <TextField
          label={componentProps.label}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          inputRef={field.ref}
          style={componentProps.style}
          error={componentProps.error ? true : false}
          helperText={componentProps.helperText}
        />
      );
    }
    if (componentType === 'radioButton') {
      return (
        <RadioGroup
          label={componentProps.label}
          firstLabel={componentProps.firstLabel}
          secondLabel={componentProps.secondLabel}
          sx={componentProps.style}
          error={componentProps.error}
          helperText={componentProps.helperText}
          selectedValue={componentProps.selectedValue}
          {...field}
        />
      );
    }
    if (componentType === 'datePicker') {
      return (
        <DatePicker
          label={componentProps.label}
          sxStyle={componentProps.sxStyle}
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
