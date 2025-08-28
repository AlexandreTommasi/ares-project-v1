import { User, UserRole } from '@/types/auth';
import { ReactNode } from 'react';

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
};

export type AuthProviderProps = {
  children: ReactNode;
};
