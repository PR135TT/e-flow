
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthContext } from '@/App';
import { AuthStatus } from '../AuthStatus';

// Mock the useAdmin hook
vi.mock('@/hooks/useAdmin', () => ({
  useAdmin: vi.fn(() => ({ isAdmin: false, isLoading: false }))
}));

// Mock the react-router-dom hooks
vi.mock('react-router-dom', () => ({
  Link: ({ to, children }: { to: string, children: React.ReactNode }) => (
    <a href={to} data-testid="mock-link">{children}</a>
  ),
}));

describe('AuthStatus Component', () => {
  it('renders sign in button when no user is logged in', () => {
    render(
      <AuthContext.Provider value={{ 
        user: null, 
        session: null
      }}>
        <AuthStatus />
      </AuthContext.Provider>
    );
    
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('renders user email when logged in', () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    
    render(
      <AuthContext.Provider value={{ 
        user: mockUser, 
        session: { user: mockUser, access_token: '123', refresh_token: '456' }
      }}>
        <AuthStatus />
      </AuthContext.Provider>
    );
    
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('shows admin badge for admin users', () => {
    const mockUser = { id: '123', email: 'admin@example.com' };
    
    // Override the mock to return isAdmin: true
    require('@/hooks/useAdmin').useAdmin.mockReturnValue({ isAdmin: true, isLoading: false });
    
    render(
      <AuthContext.Provider value={{ 
        user: mockUser, 
        session: { user: mockUser, access_token: '123', refresh_token: '456' }
      }}>
        <AuthStatus />
      </AuthContext.Provider>
    );
    
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });
});
