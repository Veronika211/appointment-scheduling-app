import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {AuthProvider} from 'components/auth/AuthProvider';
import {useUser} from '@auth0/nextjs-auth0/client';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@auth0/nextjs-auth0/client');

describe('AuthProvider', () => {
  it('renders the loader when user data is still loading', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      isLoading: true,
    });
    render(
      <AuthProvider>
        <div>Child component</div>
      </AuthProvider>,
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
  it('renders the Landing component when user is not logged in', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
    });
    render(
      <AuthProvider>
        <div>Child component</div>
      </AuthProvider>,
    );
    expect(screen.getByText('Software cures the world.')).toBeInTheDocument();
    expect(screen.queryByText('SIGN IN')).toBeInTheDocument();
  });

  it('renders the Layout component when user is logged in', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: {name: 'Test'},
      isLoading: false,
    });

    render(
      <AuthProvider>
        <div>Child component</div>
      </AuthProvider>,
    );
    expect(screen.getByAltText('navbar-logo')).toBeInTheDocument();
  });
});
