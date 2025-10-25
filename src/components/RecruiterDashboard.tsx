import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Menu, Plus, Search, Home, User, Settings, History, LogOut, Briefcase } from 'lucide-react';
import { CreateJobDialog } from './CreateJobDialog';
import { JobCard } from './JobCard';
import { ApplicantsDialog } from './ApplicantsDialog';
import { JobStatusDialog } from './JobStatusDialog';
import { RecruiterMotivationalHome } from './RecruiterMotivationalHome';
import { mockJobs, mockApplications } from '../lib/mockData';

interface RecruiterDashboardProps {
  user: any;
  onLogout: () => void;
}

export function RecruiterDashboard({ user, onLogout }: RecruiterDashboardProps) {
  const [currentView, setCurrentView] = useState<'home' | 'posts' | 'profile' | 'settings' | 'history'>('home');
  const [jobs, setJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showApplicants, setShowApplicants] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showCreateJob, setShowCreateJob] = useState(false);

  const handleCreateJob = (jobData: any) => {
    const newJob = {
      id: Date.now().toString(),
      ...jobData,
      recruiterId: user.id,
      recruiterName: user.name,
      postedDate: new Date().toISOString(),
      status: 'active',
      applicants: []
    };
    setJobs([newJob, ...jobs]);
    setShowCreateJob(false);
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <RecruiterMotivationalHome user={user} onViewPosts={() => setCurrentView('posts')} />;

      case 'posts':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="mb-4">Active Job Posts</h3>
              {filteredJobs.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No jobs posted yet</p>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onViewApplicants={() => {
                        setSelectedJob(job);
                        setShowApplicants(true);
                      }}
                      onViewStatus={() => {
                        setSelectedJob(job);
                        setShowStatus(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="mb-6">Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground">Name</label>
                <p>{user.name}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Email</label>
                <p>{user.email}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Rating</label>
                <p>⭐ {user.rating}/5.0</p>
              </div>
              <div>
                <label className="text-muted-foreground">KYC Verification</label>
                <p className="text-green-600">{user.kycVerified ? '✓ Verified' : '✗ Not Verified'}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Total Jobs Posted</label>
                <p>{jobs.length}</p>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="mb-6">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <span>Email Notifications</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <span>SMS Notifications</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <span>Application Alerts</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="mb-6">Job History</h2>
            <div className="space-y-3">
              {jobs.slice(0, 5).map(job => (
                <div key={job.id} className="border-b pb-3">
                  <p>{job.title}</p>
                  <p className="text-muted-foreground">Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
                  <p className="text-muted-foreground">Pay: ₹{job.moneyPerHour}/hr</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          {/* Left - Menu */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navigate through the app</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <Button
                    variant={currentView === 'home' ? 'default' : 'ghost'}
                    className="justify-start"
                    onClick={() => setCurrentView('home')}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                  <Button
                    variant={currentView === 'posts' ? 'default' : 'ghost'}
                    className="justify-start"
                    onClick={() => setCurrentView('posts')}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Posts
                  </Button>
                  <Button
                    variant={currentView === 'profile' ? 'default' : 'ghost'}
                    className="justify-start"
                    onClick={() => setCurrentView('profile')}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant={currentView === 'settings' ? 'default' : 'ghost'}
                    className="justify-start"
                    onClick={() => setCurrentView('settings')}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant={currentView === 'history' ? 'default' : 'ghost'}
                    className="justify-start"
                    onClick={() => setCurrentView('history')}
                  >
                    <History className="w-4 h-4 mr-2" />
                    History
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-red-600 hover:text-red-700"
                    onClick={onLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Right - Post Job */}
          <Button onClick={() => setShowCreateJob(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Post
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto p-4 max-w-6xl">
        {renderContent()}
      </div>

      {/* Dialogs */}
      <CreateJobDialog
        open={showCreateJob}
        onOpenChange={setShowCreateJob}
        onSubmit={handleCreateJob}
      />

      {selectedJob && (
        <>
          <ApplicantsDialog
            open={showApplicants}
            onOpenChange={setShowApplicants}
            job={selectedJob}
            applications={mockApplications.filter(app => app.jobId === selectedJob.id)}
          />
          <JobStatusDialog
            open={showStatus}
            onOpenChange={setShowStatus}
            job={selectedJob}
            applications={mockApplications.filter(app => app.jobId === selectedJob.id)}
          />
        </>
      )}
    </div>
  );
}
