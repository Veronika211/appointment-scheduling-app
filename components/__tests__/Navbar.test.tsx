/* eslint-disable no-restricted-globals */
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {Navbar} from 'components/navbar/Navbar';
import {useRouter} from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Navbar', () => {
  it('renders a logo, two tabs in navbar and a log out button', () => {
    const {getByAltText, getByText} = render(<Navbar />);
    const tab1 = getByText('Home').closest('button');
    const tab2 = getByText('Contact').closest('button');
    expect(getByAltText('navbar-logo')).toBeInTheDocument();
    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(getByText('LOG OUT')).toBeInTheDocument();
  });

  it('redirects to home page when Home tab is clicked', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
    const {getByRole} = render(<Navbar />);
    fireEvent.click(getByRole('tab', {name: 'Home'}));
    expect(push).toHaveBeenCalledWith('/');
  });

  it('redirects to contact page when Contact tab is clicked', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
    const {getByRole} = render(<Navbar />);
    fireEvent.click(getByRole('tab', {name: 'Contact'}));
    expect(push).toHaveBeenCalledWith('/contact');
  });
  it('calls handleLogOut function when Log Out button is clicked', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
    const {getByText} = render(<Navbar />);
    fireEvent.click(getByText('LOG OUT'));
    expect(push).toHaveBeenCalledWith('/api/auth/logout');
  });
});
