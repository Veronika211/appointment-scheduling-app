import * as React from 'react';
import {Button as MaterialButton} from '@mui/material';
import {Theme} from '@mui/material/styles';
import {SystemStyleObject} from '@mui/system';
import {styles} from '@ui/Button.styles';

type VariantName = 'text' | 'contained' | 'outlined';
type ButtonType = 'submit' | 'reset' | 'button';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  text: string;
  variant: VariantName;
  sxStyle: SystemStyleObject<Theme>;
  type?: ButtonType;
  testId?: string;
}

export const Button: React.FC<Props> = ({
  onClick,
  sxStyle,
  testId,
  variant,
  text,
  type,
  ...rest
}) => (
  <MaterialButton
    size="large"
    sx={[styles.btn, sxStyle, variant === 'contained' && styles.contained]}
    variant={variant}
    type={type}
    onClick={onClick}
    color="primary"
    data-testid={testId}
    {...rest}
  >
    {text}
  </MaterialButton>
);
