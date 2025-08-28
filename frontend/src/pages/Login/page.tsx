import { useAuth } from '@/contexts/AuthContext/context';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/common/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose a role to simulate login.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={() => login(UserRole.Player)} size="lg">Login as Player</Button>
          <Button onClick={() => login(UserRole.Admin)} variant="secondary" size="lg">Login as Admin</Button>
        </CardContent>
      </Card>
    </div>
  );
}
