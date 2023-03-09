import {themeOptions} from '../../styles/theme/themeOptions';

export const styles = {
  btn: {
    height: '50px',
    width: '200px',
    color: themeOptions.palette?.colours.darkBlue,
    '&:hover': {
      backgroundColor: '#F8F8F8',
    },
  },
  contained: {
    backgroundColor: 'white',
  },
};
