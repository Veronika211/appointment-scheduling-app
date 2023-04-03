import {render, screen} from '@testing-library/react';
import {AppointmentForm} from 'components/appointmentForm/AppointmentForm';
import {withLocalizationProvider} from 'jest.setup';

describe('AppointmentForm', () => {
  test('renders the form title', () => {
    render(withLocalizationProvider(<AppointmentForm />));
    const title = screen.getByTestId('appointmentTitle');
    expect(title).toBeInTheDocument();
  });

  test('renders the first form step and Personal Data Form by default', () => {
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

  //to-do: add test for the symptoms form rendering when the step changes to 1
});
