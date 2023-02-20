// import DragAndDropContainer from "./drag-and-drop-component/DragAndDropContainer";
import {Box} from '@mui/material';
import {styles} from './Home.styles';
import AppointmentForm from './appointmentForm/AppointmentForm';

const Home = (): JSX.Element => {
  return (
    <Box sx={styles.container}>
      <AppointmentForm />
    </Box>
  );
};

export default Home;
