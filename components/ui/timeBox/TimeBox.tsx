import {Box, Typography} from '@mui/material';
import {styles} from './TimeBox.styles';

interface Props {
  value: string;
  name?: string;
  onClick: () => void;
  selectedTime: boolean;
}

const TimeBox: React.FC<Props> = ({value, onClick, selectedTime}) => {
  return (
    <Box sx={[styles.container, selectedTime && styles.selectedBox]} onClick={onClick}>
      <Typography>{value}</Typography>
    </Box>
  );
};

export default TimeBox;
