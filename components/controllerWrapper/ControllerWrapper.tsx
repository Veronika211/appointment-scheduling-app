import {Box, MenuItem, SelectChangeEvent, Typography} from '@mui/material';
import {Controller} from 'react-hook-form';
import {DatePicker} from '../ui/datePicker/DatePicker';
import {RadioGroup} from '../ui/radioGroup/RadioGroup';
import {TextField} from '../ui/TextField';

interface Props {
  componentType: string;
  componentProps: any;
  defaultValue?: any;
  name: string;
  control: any;
}

const ControllerWrapper: React.FC<Props> = ({
  componentType,
  control,
  name,
  defaultValue,
  componentProps,
}): JSX.Element => {
  const renderAppropriateField = ({field}) => {
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
          style={componentProps.style}
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
