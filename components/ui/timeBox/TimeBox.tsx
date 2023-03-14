import * as React from 'react';
import {Box, Typography} from '@mui/material';
import {styles} from '@ui/timeBox/TimeBox.styles';

interface Props {
  value: string;
  name?: string;
  onClick: () => void;
  selectedTime: boolean;
}

export const TimeBox: React.FC<Props> = ({value, onClick, selectedTime}) => (
  <Box sx={[styles.container, selectedTime && styles.selectedBox]} onClick={onClick}>
    <Typography>{value}</Typography>
  </Box>
);
