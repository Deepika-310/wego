import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft } from 'lucide-react';

interface AuthPageProps {
  role: 'recruiter' | 'worker';
  onLogin: (userData: any) => void;
  onBack: () => void;
}

export function AuthPage({ role, onLogin, onBack }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would authenticate
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      name: 'Demo User',
      email: 'demo@wego.com',
      role: role,
      rating: 4.5,
      kycVerified: true
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="mb-2">
              {role === 'recruiter' ? 'Recruiter' : 'Worker'} Portal
            </h2>
            <p className="text-muted-foreground">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </p>
          </div>

          <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(v) => setIsLogin(v === 'login')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="your@email.com" required />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input type="text" placeholder="John Doe" required />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="your@email.com" required />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="+1 234 567 8900" required />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
