import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {RadioGroup} from 'components/ui/radioGroup/RadioGroup';

describe('RadioGroup', () => {
  it('should check the "yes" option when clicked', () => {
    const {getByTestId} = render(
      <RadioGroup
        label="Are you a smoker?"
        firstLabel="Yes"
        secondLabel="No"
        testId="radio-group"
        selectedValue="no"
      />,
    );
    const yesOption = getByTestId('radio-group-Yes');
    fireEvent.click(yesOption);
    const yesInput = yesOption.querySelector('input');
    expect(yesInput?.checked).toBe(true);
  });
});
