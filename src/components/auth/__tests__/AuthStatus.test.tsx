
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthStatus } from '../AuthStatus';
import { AuthContext } from '@/App';
import { MemoryRouter } from 'react-router-dom';

// Mock the useAdmin hook
vi.mock('@/hooks/useAdmin', () => ({
  useAdmin: () => ({ isAdmin: false })
}));

// Mock supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signOut: vi.fn().mockResolvedValue({ error: null })
    }
  }
}));

describe('AuthStatus', () => {
  it('renders sign in link when user is not logged in', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user: null, session: null }}>
          <AuthStatus />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders user info when user is logged in', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user: { id: '1', email: 'test@example.com' }, session: {} }}>
          <AuthStatus />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Signed In')).toBeInTheDocument();
  });

  it('renders admin badge when user is admin', () => {
    // Override the mock for this specific test
    vi.mocked(useAdmin).mockReturnValueOnce({ isAdmin: true });
    
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user: { id: '1', email: 'admin@example.com' }, session: {} }}>
          <AuthStatus />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    
    // Since the NavigationMenuTrigger might not fully expand in tests,
    // check for the Admin icon or indicator
    const adminIcon = document.querySelector('.text-yellow-400');
    expect(adminIcon).toBeInTheDocument();
  });
});

// Helper for the vi.mocked usage
import { useAdmin } from '@/hooks/useAdmin';
