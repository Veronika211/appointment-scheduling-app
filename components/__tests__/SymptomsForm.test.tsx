import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {SymptomsForm} from 'components/appointmentForm/SymptomsForm';

it('should submit the form and reset form data when the submit button is clicked', async () => {
  const setActiveStep = jest.fn();
  const resetPersonalData = jest.fn();

  const personalData = {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '123-456-7899',
    email: 'johndoe@example.com',
    dateOfBirth: '01/01/1998',
    firstTimeVisit: 'Yes',
    appointmentDate: '01/01/2023',
    examType: 'Ultrasound',
    examField: 'Cardiology',
    pickedTime: '9:00',
  };

  const {getByTestId} = render(
    <SymptomsForm
      setActiveStep={setActiveStep}
      resetPersonalData={resetPersonalData}
      personalData={personalData}
    />,
  );

  const symptomsForm = getByTestId('symptoms-form');
  expect(symptomsForm).toBeInTheDocument();

  const headache = getByTestId('headache-Yes');
  fireEvent.click(headache);
  const headacheInput = headache.querySelector('input');
  expect(headacheInput?.checked).toBe(true);

  const abdominalPain = getByTestId('abdominalPain-Yes');
  fireEvent.click(abdominalPain);
  const abdominalPainInput = abdominalPain.querySelector('input');
  expect(abdominalPainInput?.checked).toBe(true);

  const dizziness = getByTestId('dizziness-Yes');
  fireEvent.click(dizziness);
  const dizzinessInput = dizziness.querySelector('input');
  expect(dizzinessInput?.checked).toBe(true);

  const tingling = getByTestId('tingling-Yes');
  fireEvent.click(tingling);
  const tinglingInput = tingling.querySelector('input');
  expect(tinglingInput?.checked).toBe(true);

  const musclePain = getByTestId('musclePain-Yes');
  fireEvent.click(musclePain);
  const musclePainInput = musclePain.querySelector('input');
  expect(musclePainInput?.checked).toBe(true);

  const anxiety = getByTestId('anxiety-Yes');
  fireEvent.click(anxiety);
  const anxietyInput = anxiety.querySelector('input');
  expect(anxietyInput?.checked).toBe(true);

  const alcohol = getByTestId('alcohol-Yes');
  fireEvent.click(alcohol);
  const alcoholInput = alcohol.querySelector('input');
  expect(alcoholInput?.checked).toBe(true);

  const smoker = getByTestId('smoker-Yes');
  fireEvent.click(smoker);
  const smokerInput = smoker.querySelector('input');
  expect(smokerInput?.checked).toBe(true);

  const submitButton = screen.getByTestId('submitButton');
  expect(submitButton).toBeInTheDocument();

  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(setActiveStep).toHaveBeenCalled();
    expect(resetPersonalData).toHaveBeenCalledWith({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      dateOfBirth: new Date().toString(),
      firstTimeVisit: 'yes',
      appointmentDate: new Date().toString(),
      examType: '',
      examField: '',
      pickedTime: '',
    });
  });
});
