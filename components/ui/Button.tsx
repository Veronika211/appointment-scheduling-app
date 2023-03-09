import * as React from 'react';
import {Button as MaterialButton} from '@mui/material';
import {styles} from './Button.styles';

type VariantName = 'text' | 'contained' | 'outlined';
type ButtonType = 'submit' | 'reset' | 'button';

interface Props {
  onClick?: any;
  disabled?: boolean;
  text: string;
  variant: VariantName;
  sxStyle?: any;
  type?: ButtonType;
}

export const Button: React.FC<Props> = ({onClick, sxStyle, variant, text, type, ...rest}) => (
  <MaterialButton
    size="large"
    sx={[styles.btn, sxStyle, variant === 'contained' && styles.contained]}
    variant={variant}
    type={type}
    onClick={onClick}
    color="primary"
    {...rest}
  >
    {text}
  </MaterialButton>
);
