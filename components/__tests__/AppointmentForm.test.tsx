import {render, screen} from '@testing-library/react';

import {AppointmentForm} from 'components/appointmentForm/AppointmentForm';
import {withLocalizationProvider} from 'jest.setup';

describe('AppointmentForm', () => {
  it('renders the form title', () => {
    render(withLocalizationProvider(<AppointmentForm />));
    const title = screen.getByTestId('appointmentTitle');
    expect(title).toBeInTheDocument();
  });

  it('renders the first form step and Personal Data Form by default', () => {
    render(withLocalizationProvider(<AppointmentForm />));
    const firstNameInput = screen.getByTestId('firstName');
    const lastNameInput = screen.getByTestId('lastName');
    const phoneNumberInput = screen.getByTestId('phoneNumber');
    const emailInput = screen.getByTestId('email');
    const nextButton = screen.getByTestId('nextButton');
    const examTypeInput = screen.getByTestId('examType');
    const examFieldInput = screen.getByTestId('examField');

    expect(nextButton).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(phoneNumberInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(examTypeInput).toBeInTheDocument();
    expect(examFieldInput).toBeInTheDocument();
  });

  // it('renders Symptoms Form when next button is clicked and step is changed to 1', async () => {
  //   // act(() => {
  //   render(withLocalizationProvider(<AppointmentForm />));
  //   // });
  //   expect(screen.getByTestId('nextButton')).toBeInTheDocument();

  //   const firstNameInput = screen.getByTestId('firstName');
  //   fireEvent.change(firstNameInput, {target: {value: 'John'}});

  //   const lastNameInput = screen.getByTestId('lastName');
  //   fireEvent.change(lastNameInput, {target: {value: 'Doe'}});

  //   const phoneNumberInput = screen.getByTestId('phoneNumber');
  //   fireEvent.change(phoneNumberInput, {target: {value: '123-456-7890'}});

  //   const emailInput = screen.getByTestId('email');
  //   fireEvent.change(emailInput, {target: {value: 'johndoe@example.com'}});

  //   const dateOfBirthInput = screen.getByTestId('dateOfBirth');
  //   fireEvent.change(dateOfBirthInput, {target: {value: '1990-01-01'}});

  //   const firstTimeVisitInput = screen.getByTestId('firstTimeVisit-Yes');
  //   fireEvent.click(firstTimeVisitInput);

  //   const appointmentDateInput = screen.getByTestId('dateOfAppointment');
  //   fireEvent.change(appointmentDateInput, {target: {value: '2023-04-10'}});

  //   const user = userEvent.setup();
  //   const selectButton = screen.getByTestId('examField');
  //   user.click(selectButton);
  //   const listbox = document.body.querySelector('ul[role=listbox]');
  //   const listItem = within(listbox).getByText(optionText);
  //   user.click(listItem);
  //   // const selectButton = screen.getByTestId('examField');
  //   // const examFieldInput = screen.getByTestId('examField');
  //   // const selectButton = within(examFieldInput).getByRole('button');
  //   // fireEvent.mouseDown(selectButton);
  //   // const options = screen.getAllByRole('option');
  //   // // screen.debug(getAllByRole("option"));
  //   // fireEvent.mouseDown(options[1]);
  //   // options[1].click();
  //   // examFieldInput.value = 'Radiology';
  //   // fireEvent.change(examFieldInput);
  //   // expect(examFieldInput).toHaveValue('Radiology');
  //   // const examFieldInput = screen.getByTestId('examField');
  //   // fireEvent.change(examFieldInput, {target: {value: 'Radiology'}});

  //   // const examTypeInput = screen.getByTestId('examType');
  //   // // fireEvent.change(examTypeInput, {target: {value: 'CT Scan'}});
  //   // examTypeInput.value = 'CT Scan';
  //   // fireEvent.change(examTypeInput);
  //   // expect(examTypeInput).toHaveValue('CT Scan');

  //   fireEvent.click(screen.getByTestId('nextButton'));
  //   expect(screen.getByTestId('nextButton')).toBeInTheDocument();
  //   screen.debug(null, 20000);
  //   await waitFor(() => {
  //     expect(screen.getByTestId('symptoms-form-title')).toBeInTheDocument();
  //   });
  //   // expect(screen.getByTestId('firstName')).toBeInTheDocument();
  // });
  //to-do: add test for the symptoms form rendering when the step changes to 1
});
