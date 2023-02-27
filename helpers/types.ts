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
