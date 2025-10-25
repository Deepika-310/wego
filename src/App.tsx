import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { WorkerDashboard } from './components/WorkerDashboard';
import { Toaster } from './components/ui/sonner';

type AppState = 
  | { view: 'landing' }
  | { view: 'auth'; role: 'recruiter' | 'worker' }
  | { view: 'dashboard'; role: 'recruiter' | 'worker'; user: any };

export default function App() {
  const [appState, setAppState] = useState<AppState>({ view: 'landing' });

  const handleSelectRole = (role: 'recruiter' | 'worker') => {
    setAppState({ view: 'auth', role });
  };

  const handleLogin = (userData: any) => {
    setAppState({ view: 'dashboard', role: userData.role, user: userData });
  };

  const handleLogout = () => {
    setAppState({ view: 'landing' });
  };

  const handleBack = () => {
    setAppState({ view: 'landing' });
  };

  return (
    <>
      {appState.view === 'landing' && (
        <LandingPage onSelectRole={handleSelectRole} />
      )}

      {appState.view === 'auth' && (
        <AuthPage
          role={appState.role}
          onLogin={handleLogin}
          onBack={handleBack}
        />
      )}

      {appState.view === 'dashboard' && appState.role === 'recruiter' && (
        <RecruiterDashboard
          user={appState.user}
          onLogout={handleLogout}
        />
      )}

      {appState.view === 'dashboard' && appState.role === 'worker' && (
        <WorkerDashboard
          user={appState.user}
          onLogout={handleLogout}
        />
      )}

      <Toaster />
    </>
  );
}
