import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { AuthContextType, AuthProviderProps } from './types';
import { User, UserRole } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCKED_PLAYER: User = { id: 'player1', name: 'Player One', role: UserRole.Player };
const MOCKED_ADMIN: User = { id: 'admin1', name: 'Admin User', role: UserRole.Admin };

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedRole = localStorage.getItem('userRole') as UserRole;
    if (storedRole === UserRole.Admin) return MOCKED_ADMIN;
    if (storedRole === UserRole.Player) return MOCKED_PLAYER;
    return null;
  });

  const login = useCallback((role: UserRole) => {
    localStorage.setItem('userRole', role);
    if (role === UserRole.Admin) {
      setUser(MOCKED_ADMIN);
    } else {
      setUser(MOCKED_PLAYER);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userRole');
    setUser(null);
  }, []);

  const authContextValue = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === UserRole.Admin,
    login,
    logout,
  }), [user, login, logout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
