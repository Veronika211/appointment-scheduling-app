// import DragAndDropContainer from "./drag-and-drop-component/DragAndDropContainer";
import {Box} from '@mui/material';
import {styles} from 'components/Home.styles';
import {AppointmentForm} from 'components/appointmentForm/AppointmentForm';

export const Home = (): JSX.Element => (
  <Box sx={styles.container}>
    <AppointmentForm />
  </Box>
);
