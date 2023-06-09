import {FieldError} from 'react-hook-form';
import {SxProps, Theme} from '@mui/material/styles';

export interface IRoutes {
  path: string;
  text: string;
}

export interface IAppointmentFormInputs {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  firstTimeVisit: string;
  appointmentDate: string;
  examType: string;
  examField: string;
  pickedTime: string;
}

export interface ISymptomsFormInputs {
  headache: string;
  abdominalPain: string;
  tingling: string;
  dizziness: string;
  musclePain: string;
  anxiety: string;
  alcohol: string;
  smoker: string;
}

export type TAppointmentFormFields =
  | 'dateOfBirth'
  | 'appointmentDate'
  | 'firstName'
  | 'lastName'
  | 'phoneNumber'
  | 'email'
  | 'firstTimeVisit'
  | 'examField'
  | 'examType'
  | 'pickedTime';

export interface IBackendData {
  id: number;
  value: string;
}

export interface IFormFieldProps {
  label: string;
  error?: boolean | FieldError;
  helperText?: string;
  style?: SxProps<Theme>;
  firstLabel?: string;
  secondLabel?: string;
  selectedValue?: string;
  testId?: string;
}

export interface IRequest {
  url: string;
  method: string;
}

export interface IRequestArgs {
  body?: object;
  params?: string[];
  query?: string[];
}
