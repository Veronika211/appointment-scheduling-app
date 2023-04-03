import * as React from 'react';
import {Box, Typography} from '@mui/material';
import {styles} from '@ui/timeBox/TimeBox.styles';

interface Props {
  value: string;
  name?: string;
  onClick: () => void;
  selectedTime: boolean;
  testId?: string;
}

export const TimeBox: React.FC<Props> = ({value, testId, onClick, selectedTime}) => (
  <Box
    sx={[styles.container, selectedTime && styles.selectedBox]}
    onClick={onClick}
    data-testid={testId}
  >
    <Typography>{value}</Typography>
  </Box>
);
