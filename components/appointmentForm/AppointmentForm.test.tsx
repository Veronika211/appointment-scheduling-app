import {act, fireEvent, render, screen, waitFor, within} from '@testing-library/react';
import useHttpMock from 'hooks/useHttp';
import {AppointmentForm} from 'components/appointmentForm/AppointmentForm';
import {withLocalizationProvider} from 'jest.setup';

jest.mock('hooks/useHttp', () =>
  jest.fn(() => ({
    data: null,
    error: null,
    isLoading: false,
    sendRequest: jest.fn(),
  })),
);

const examFieldsData = [
  {id: 1, value: 'Gynaecology'},
  {id: 2, value: 'Pulmology'},
];
const examTypesData = [
  {id: 1, value: 'CT Scan'},
  {id: 2, value: 'Ultrasound'},
];
const availableTimesData = [
  {id: 1, value: '9:00 AM'},
  {id: 2, value: '10:00 AM'},
  {id: 3, value: '11:00 AM'},
  {id: 4, value: '12:00 AM'},
  {id: 5, value: '13:00 AM'},
  {id: 6, value: '14:00 AM'},
];

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

  it('renders Symptoms Form when next button is clicked and step is changed to 1', async () => {
    (useHttpMock as jest.Mock)
      .mockReturnValueOnce({
        data: examFieldsData,
        error: null,
        isLoading: false,
        sendRequest: jest.fn(),
      })
      .mockReturnValueOnce({
        data: examTypesData,
        error: null,
        isLoading: false,
        sendRequest: jest.fn(),
      })
      .mockReturnValueOnce({
        data: availableTimesData,
        error: null,
        isLoading: false,
        sendRequest: jest.fn(),
      });
    render(withLocalizationProvider(<AppointmentForm />));

    const firstNameInput = screen.getByTestId('firstName');
    fireEvent.change(firstNameInput, {target: {value: 'John'}});

    const lastNameInput = screen.getByTestId('lastName');
    fireEvent.change(lastNameInput, {target: {value: 'Doe'}});

    const phoneNumberInput = screen.getByTestId('phoneNumber');
    fireEvent.change(phoneNumberInput, {target: {value: '123-456-7890'}});

    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, {target: {value: 'johndoe@example.com'}});

    const dateOfBirthInput = screen.getByTestId('dateOfBirth');
    fireEvent.change(dateOfBirthInput, {target: {value: '10/12/1998'}});

    const firstTimeVisitInput = screen.getByTestId('firstTimeVisit-Yes');
    fireEvent.click(firstTimeVisitInput);

    const appointmentDateInput = screen.getByTestId('dateOfAppointment');
    fireEvent.change(appointmentDateInput, {target: {value: '10/04/2023'}});

    const examFieldSelect = screen.getByTestId('form-control-examField');
    const examFieldSelectButton = within(examFieldSelect).getByRole('button', {hidden: true});
    fireEvent.mouseDown(examFieldSelectButton);
    expect(screen.getByRole('listbox', {hidden: false})).not.toEqual(null);

    act(() => {
      const options = screen.getAllByRole('option');
      fireEvent.mouseDown(options[1]);
      options[1].click();
    });

    const examFieldInput = screen.getByTestId('examField') as HTMLInputElement;
    await waitFor(() => {
      expect(examFieldInput.value).toEqual('Pulmology');
    });
    const examTypeSelect = screen.getByTestId('form-control-examType');
    const examTypeSelectButton = within(examTypeSelect).getByRole('button');
    act(() => {
      examTypeSelectButton.focus();
      fireEvent.mouseDown(examTypeSelectButton);
    });

    expect(screen.getByRole('listbox', {hidden: false})).not.toEqual(null);

    act(() => {
      const options = screen.getAllByRole('option');
      fireEvent.mouseDown(options[1]);
      options[1].click();
    });
    const examTypeInput = screen.getByTestId('examType') as HTMLInputElement;
    expect(examTypeInput.value).toEqual('Ultrasound');

    const time = screen.getByTestId('pickedTime-10:00 AM');
    act(() => {
      fireEvent.click(time);
    });

    const nextButton = screen.getByTestId('nextButton');
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByTestId('symptoms-form')).toBeInTheDocument();
    });
  });
});
