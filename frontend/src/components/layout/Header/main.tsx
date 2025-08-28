import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext/context';
import { Button } from '@/components/common/Button';

export const Header = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const linkStyle = ({ isActive }: { isActive: boolean }) => 
    `text-lg font-medium ${isActive ? 'text-indigo-400' : 'text-gray-300'} hover:text-indigo-400 transition-colors`;

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 shadow-md sticky top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="text-2xl font-bold text-white">Guessing Game</NavLink>
          <div className="flex gap-6">
            <NavLink to="/" className={linkStyle}>Game</NavLink>
            {isAdmin && <NavLink to="/admin" className={linkStyle}>Admin</NavLink>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-300">Welcome, {user?.name}</span>
              <Button onClick={logout} variant="secondary" size="sm">Logout</Button>
            </>
          ) : (
            <NavLink to="/login">
              <Button variant="primary" size="sm">Login</Button>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};
