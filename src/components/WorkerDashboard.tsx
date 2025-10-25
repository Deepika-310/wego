import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Menu, Search, Home, User, Settings, MapPin, List, Briefcase, LogOut, History } from 'lucide-react';
import { WorkerJobCard } from './WorkerJobCard';
import { WorkerJobDetailsDialog } from './WorkerJobDetailsDialog';
import { MyWorksDialog } from './MyWorksDialog';
import { GoogleMapView } from './GoogleMapView';
import { NotificationBar } from './NotificationBar';
import { MotivationalHome } from './MotivationalHome';
import { mockJobs, mockApplications } from '../lib/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface WorkerDashboardProps {
  user: any;
  onLogout: () => void;
}

export function WorkerDashboard({ user, onLogout }: WorkerDashboardProps) {
  const [currentView, setCurrentView] = useState<'home' | 'jobs' | 'profile' | 'settings' | 'history'>('home');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showMyWorks, setShowMyWorks] = useState(false);

  const myApplications = mockApplications.filter(app => app.workerId === user.id);

  const filteredJobs = mockJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <MotivationalHome user={user} />;
      
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
                <label className="text-muted-foreground">Completed Jobs</label>
                <p>23 jobs</p>
              </div>
              <div>
                <label className="text-muted-foreground">Total Earnings</label>
                <p>₹34,500.00</p>
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
                <span>Location Services</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <span>Nearby Job Alerts</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="mb-6">Job History</h2>
            <div className="space-y-4">
              {[
                { title: 'Warehouse Helper', date: '2025-10-10', earned: '₹1,200.00', rating: 5 },
                { title: 'Delivery Driver', date: '2025-10-08', earned: '₹1,440.00', rating: 5 },
                { title: 'Event Staff', date: '2025-10-05', earned: '₹1,600.00', rating: 4.8 },
                { title: 'Retail Sales', date: '2025-10-03', earned: '₹800.00', rating: 4.9 },
                { title: 'Warehouse Helper', date: '2025-09-30', earned: '₹900.00', rating: 5 },
              ].map((job, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4>{job.title}</h4>
                      <p className="text-muted-foreground">Completed: {job.date}</p>
                    </div>
                    <div className="text-right">
                      <p>{job.earned}</p>
                      <p className="text-muted-foreground">⭐ {job.rating}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'jobs':
        return (
          <div className="space-y-4">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'list' | 'map')}>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3>Available Jobs</h3>
                  <TabsList>
                    <TabsTrigger value="list">
                      <List className="w-4 h-4 mr-2" />
                      List
                    </TabsTrigger>
                    <TabsTrigger value="map">
                      <MapPin className="w-4 h-4 mr-2" />
                      Map
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="list">
                  {filteredJobs.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No jobs available</p>
                  ) : (
                    <div className="space-y-4">
                      {filteredJobs.map(job => (
                        <WorkerJobCard
                          key={job.id}
                          job={job}
                          onClick={() => handleJobClick(job)}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="map">
                  <GoogleMapView 
                    jobs={filteredJobs} 
                    onJobClick={handleJobClick}
                  />
                </TabsContent>
              </div>
            </Tabs>
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
                    variant={currentView === 'jobs' ? 'default' : 'ghost'}
                    className="justify-start"
                    onClick={() => setCurrentView('jobs')}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Browse Jobs
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
                    variant="default"
                    className="justify-start bg-green-600 hover:bg-green-700"
                    onClick={() => setShowMyWorks(true)}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Works For You
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

          {/* Right - Notifications */}
          <div className="flex items-center gap-2">
            <NotificationBar 
              jobs={mockJobs} 
              onJobClick={handleJobClick}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto p-4 max-w-6xl">
        {renderContent()}
      </div>

      {/* Dialogs */}
      {selectedJob && (
        <WorkerJobDetailsDialog
          open={showJobDetails}
          onOpenChange={setShowJobDetails}
          job={selectedJob}
          userId={user.id}
        />
      )}

      <MyWorksDialog
        open={showMyWorks}
        onOpenChange={setShowMyWorks}
        applications={myApplications}
        jobs={mockJobs}
      />
    </div>
  );
}
