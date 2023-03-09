import {ContactForm} from 'components/ContactForm/ContactForm';

const Contact = (): JSX.Element => <ContactForm />;

/* eslint-disable  import/no-default-export */
//we have to disable this rule here because in next.js all pages must have default export
export default Contact;
