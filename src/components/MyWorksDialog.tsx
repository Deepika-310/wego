import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, QrCode, MessageSquare } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { QRCodeDialog } from './QRCodeDialog';
import { ChatDialog } from './ChatDialog';

interface MyWorksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applications: any[];
  jobs: any[];
}

// Extended dummy data for works
const getDummyWorks = (applications: any[], jobs: any[]) => {
  const baseApps = applications.map(app => ({ ...app }));
  
  // Add more dummy recruited jobs
  const dummyRecruited = [
    {
      id: 'recruited-1',
      jobId: jobs[0]?.id || '1',
      workerId: baseApps[0]?.workerId || 'w1',
      status: 'recruited',
      appliedDate: '2025-10-12',
    },
    {
      id: 'recruited-2',
      jobId: jobs[1]?.id || '2',
      workerId: baseApps[0]?.workerId || 'w1',
      status: 'recruited',
      appliedDate: '2025-10-11',
    },
    {
      id: 'recruited-3',
      jobId: jobs[2]?.id || '3',
      workerId: baseApps[0]?.workerId || 'w1',
      status: 'recruited',
      appliedDate: '2025-10-10',
    },
  ];

  // Add more dummy accepted jobs
  const dummyAccepted = [
    {
      id: 'accepted-1',
      jobId: jobs[0]?.id || '1',
      workerId: baseApps[0]?.workerId || 'w1',
      status: 'accepted',
      appliedDate: '2025-10-09',
    },
    {
      id: 'accepted-2',
      jobId: jobs[3]?.id || '4',
      workerId: baseApps[0]?.workerId || 'w1',
      status: 'accepted',
      appliedDate: '2025-10-08',
    },
  ];

  return [...baseApps, ...dummyRecruited, ...dummyAccepted];
};

export function MyWorksDialog({ open, onOpenChange, applications, jobs }: MyWorksDialogProps) {
  const [localApplications, setLocalApplications] = useState(() => getDummyWorks(applications, jobs));
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');

  const handleAccept = (appId: string) => {
    setLocalApplications(prev =>
      prev.map(app =>
        app.id === appId ? { ...app, status: 'accepted' } : app
      )
    );
    toast.success('Job accepted! QR code generated');
  };

  const handleDecline = (appId: string) => {
    setLocalApplications(prev =>
      prev.map(app =>
        app.id === appId ? { ...app, status: 'declined' } : app
      )
    );
    toast.success('Job declined');
  };

  const recruitedApps = localApplications.filter(app => app.status === 'recruited');
  const acceptedApps = localApplications.filter(app => app.status === 'accepted');
  const appliedApps = localApplications.filter(app => app.status === 'applied');

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Works For You</DialogTitle>
            <DialogDescription>Manage your job applications and accepted works</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Pending Acceptance */}
            <div>
              <h4 className="mb-3">Waiting for Your Response ({recruitedApps.length})</h4>
              {recruitedApps.length === 0 ? (
                <p className="text-muted-foreground">No pending job offers</p>
              ) : (
                <div className="space-y-3">
                  {recruitedApps.map((app) => {
                    const job = jobs.find(j => j.id === app.jobId);
                    if (!job) return null;
                    return (
                      <div key={app.id} className="border rounded-lg p-4 bg-blue-50">
                        <div className="mb-3">
                          <h4>{job.title}</h4>
                          <p className="text-muted-foreground">{job.recruiterName}</p>
                          <p className="text-muted-foreground">₹{job.moneyPerHour}/hr · {job.duration}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleAccept(app.id)}
                            className="flex-1"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDecline(app.id)}
                            className="flex-1"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Decline
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedChat({ ...app, recruiterName: job.recruiterName });
                              setSelectedJobTitle(job.title);
                            }}
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accepted Jobs */}
            <div>
              <h4 className="mb-3">Accepted Jobs ({acceptedApps.length})</h4>
              {acceptedApps.length === 0 ? (
                <p className="text-muted-foreground">No accepted jobs yet</p>
              ) : (
                <div className="space-y-3">
                  {acceptedApps.map((app) => {
                    const job = jobs.find(j => j.id === app.jobId);
                    if (!job) return null;
                    return (
                      <div key={app.id} className="border rounded-lg p-4 bg-green-50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4>{job.title}</h4>
                            <p className="text-muted-foreground">{job.recruiterName}</p>
                            <p className="text-muted-foreground">₹{job.moneyPerHour}/hr · {job.duration}</p>
                          </div>
                          <Badge className="bg-green-600">Accepted</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => setSelectedQR(app.id)}
                            className="flex-1"
                          >
                            <QrCode className="w-4 h-4 mr-2" />
                            Show QR Code
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedChat({ ...app, recruiterName: job.recruiterName });
                              setSelectedJobTitle(job.title);
                            }}
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Applied Jobs */}
            <div>
              <h4 className="mb-3">Applied Jobs ({appliedApps.length})</h4>
              {appliedApps.length === 0 ? (
                <p className="text-muted-foreground">No pending applications</p>
              ) : (
                <div className="space-y-3">
                  {appliedApps.map((app) => {
                    const job = jobs.find(j => j.id === app.jobId);
                    if (!job) return null;
                    return (
                      <div key={app.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4>{job.title}</h4>
                            <p className="text-muted-foreground">{job.recruiterName}</p>
                            <p className="text-muted-foreground">₹{job.moneyPerHour}/hr · {job.duration}</p>
                          </div>
                          <Badge variant="outline">Pending</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedChat({ ...app, recruiterName: job.recruiterName });
                              setSelectedJobTitle(job.title);
                            }}
                            className="flex-1"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Chat with Recruiter
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Applied: {new Date(app.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {selectedQR && (
        <QRCodeDialog
          open={!!selectedQR}
          onOpenChange={(open) => !open && setSelectedQR(null)}
          jobId={selectedQR}
        />
      )}

      {selectedChat && (
        <ChatDialog
          open={!!selectedChat}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedChat(null);
              setSelectedJobTitle('');
            }
          }}
          participant={selectedChat}
          jobTitle={selectedJobTitle}
        />
      )}
    </>
  );
}
