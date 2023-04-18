import {act, fireEvent, getByTestId, render, screen, waitFor, within} from '@testing-library/react';
import {PersonalDataForm} from 'components/appointmentForm/PersonalDataForm';
import {withLocalizationProvider} from 'jest.setup';
import React from 'react';
import {createStringDate} from 'utility/dateUtilities';
import useHttpMock from 'hooks/useHttp';
import userEvent from '@testing-library/user-event';

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
  const setActiveStep = jest.fn();
  const setPersonalData = jest.fn();

  const personalData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: createStringDate(),
    firstTimeVisit: 'yes',
    appointmentDate: createStringDate(),
    examType: '',
    examField: '',
    pickedTime: '',
  };

  // beforeEach(() => {
  //   (useHttpMock as jest.Mock).mockImplementationOnce(() => ({
  //     data: examFieldsData,
  //     error: null,
  //     isLoading: false,
  //     sendRequest: jest.fn(),
  //   }));
  //   (useHttpMock as jest.Mock).mockImplementationOnce(() => ({
  //     data: examTypesData,
  //     error: null,
  //     isLoading: false,
  //     sendRequest: jest.fn(),
  //   }));
  //   (useHttpMock as jest.Mock).mockImplementationOnce(() => ({
  //     data: availableTimesData,
  //     error: null,
  //     isLoading: false,
  //     sendRequest: jest.fn(),
  //   }));
  // });

  it('displays validation errors when fields are not filled out', async () => {
    render(
      withLocalizationProvider(
        <PersonalDataForm
          setActiveStep={setActiveStep}
          personalData={personalData}
          setPersonalData={setPersonalData}
        />,
      ),
    );
    fireEvent.click(screen.getByTestId('nextButton'));
    expect(await screen.findByText('First name required')).toBeInTheDocument();
    expect(await screen.findByText('Last name is required')).toBeInTheDocument();
    expect(await screen.findByText('Phone number is required')).toBeInTheDocument();
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    const selectErrors = screen.findAllByText('This field is required!');
    expect((await selectErrors).length).toBeGreaterThan(1);
  });

  it('renders form with backend data without errors', async () => {
    (useHttpMock as jest.Mock).mockReturnValueOnce({
      data: examFieldsData,
      error: null,
      isLoading: false,
      sendRequest: jest.fn(),
    });

    (useHttpMock as jest.Mock).mockReturnValueOnce({
      data: examTypesData,
      error: null,
      isLoading: false,
      sendRequest: jest.fn(),
    });

    (useHttpMock as jest.Mock).mockReturnValueOnce({
      data: availableTimesData,
      error: null,
      isLoading: false,
      sendRequest: jest.fn(),
    });
    render(
      withLocalizationProvider(
        <PersonalDataForm
          setActiveStep={setActiveStep}
          personalData={personalData}
          setPersonalData={setPersonalData}
          examFields={examFieldsData}
          examTypes={examTypesData}
          availableTimes={availableTimesData}
        />,
      ),
    );

    const examFieldSelect = screen.getByTestId('form-control-examField');
    const examFieldSelectButton = within(examFieldSelect).getByRole('button');
    act(() => {
      examFieldSelectButton.focus();
    });
    fireEvent.mouseDown(examFieldSelectButton);
    expect(screen.getByRole('listbox', {hidden: false})).not.toEqual(null);

    const examTypeSelect = screen.getByTestId('form-control-examType');
    const examTypeSelectButton = within(examTypeSelect).getByRole('button', {hidden: true});
    act(() => {
      examTypeSelectButton.focus();
    });
    fireEvent.mouseDown(examTypeSelectButton);
    expect(screen.getByRole('listbox', {hidden: false})).not.toEqual(null);

    await waitFor(() => {
      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    });
  });

  it('calls setActiveStep and setPersonalData when valid data is provided', async () => {
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

    // (useHttpMock as jest.Mock).mockReturnValueOnce({
    //   data: examTypesData,
    //   error: null,
    //   isLoading: false,
    //   sendRequest: jest.fn(),
    // });

    // (useHttpMock as jest.Mock).mockReturnValueOnce({
    //   data: availableTimesData,
    //   error: null,
    //   isLoading: false,
    //   sendRequest: jest.fn(),
    // });

    render(
      withLocalizationProvider(
        <PersonalDataForm
          setActiveStep={setActiveStep}
          personalData={personalData}
          setPersonalData={setPersonalData}
          examFields={examFieldsData}
          examTypes={examTypesData}
          availableTimes={availableTimesData}
        />,
      ),
    );

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

    const examFieldInput = screen.getByTestId('examField');
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
    // });
    screen.debug(null, 20000);
    act(() => {
      const options = screen.getAllByRole('option');
      fireEvent.mouseDown(options[1]);
      options[1].click();
    });
    const examTypeInput = screen.getByTestId('examType');
    expect(examTypeInput.value).toEqual('Ultrasound');

    const time = screen.getByTestId('pickedTime-10:00 AM');
    act(() => {
      fireEvent.click(time);
    });

    // screen.debug(null, 20000);

    const nextButton = screen.getByTestId('nextButton');
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);
    // });
    await waitFor(() => {
      expect(setActiveStep).toHaveBeenCalled();
    });
  });
});
