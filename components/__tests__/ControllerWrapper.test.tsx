import {render, renderHook, screen} from '@testing-library/react';
import {ControllerWrapper} from 'components/controllerWrapper/ControllerWrapper';
import {IAppointmentFormInputs, IFormFieldProps} from '@helpers/types';
import {useForm} from 'react-hook-form';
import {withLocalizationProvider} from 'jest.setup';

describe('ControllerWrapper component', () => {
  const {result} = renderHook(() => useForm<IAppointmentFormInputs>());

  const mockProps: IFormFieldProps = {
    label: 'Label',
    style: {},
    error: false,
    testId: 'testId',
    helperText: 'Helper text',
    firstLabel: 'First label',
    secondLabel: 'Second label',
    selectedValue: 'SelectedValue',
  };

  it('renders a TextField component when componentType is "textField"', () => {
    render(
      <ControllerWrapper
        componentType="textField"
        control={result.current.control}
        //@ts-ignore
        name="exampleField"
        defaultValue="exampleValue"
        componentProps={mockProps}
      />,
    );

    expect(screen.getByTestId('testId')).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('exampleValue');
  });

  it('renders a RadioGroup component when componentType is "radioButton"', () => {
    render(
      <ControllerWrapper
        componentType="radioButton"
        control={result.current.control}
        //@ts-ignore
        name="exampleField"
        defaultValue="exampleValue"
        componentProps={mockProps}
      />,
    );

    expect(screen.getByText('First label')).toBeInTheDocument();
    expect(screen.getByTestId('testId')).toBeInTheDocument();
    expect(screen.getByText('Second label')).toBeInTheDocument();
  });

  it('renders a DatePicker component when componentType is "datePicker"', () => {
    render(
      withLocalizationProvider(
        <ControllerWrapper
          componentType="datePicker"
          control={result.current.control}
          //@ts-ignore
          name="exampleField"
          defaultValue="exampleValue"
          componentProps={mockProps}
        />,
      ),
    );

    expect(screen.getByLabelText('Label')).toBeInTheDocument();
    expect(screen.getByTestId('testId')).toBeInTheDocument();
  });
});
