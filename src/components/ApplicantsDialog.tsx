import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, FileText, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ApplicantsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: any;
  applications: any[];
}

export function ApplicantsDialog({ open, onOpenChange, job, applications }: ApplicantsDialogProps) {
  const [localApplications, setLocalApplications] = useState(applications);

  const handleRecruit = (appId: string) => {
    setLocalApplications(prev =>
      prev.map(app =>
        app.id === appId ? { ...app, status: 'recruited' } : app
      )
    );
    toast.success('Worker recruited successfully!');
  };

  const handleReject = (appId: string) => {
    setLocalApplications(prev =>
      prev.map(app =>
        app.id === appId ? { ...app, status: 'rejected' } : app
      )
    );
    toast.success('Application rejected');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{job.title} - Applicants</DialogTitle>
          <DialogDescription>Review and manage job applicants</DialogDescription>
        </DialogHeader>

        {localApplications.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No applicants yet</p>
        ) : (
          <div className="space-y-4">
            {localApplications.map((app) => (
              <div key={app.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="mb-1">{app.workerName}</h4>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{app.workerRating}</span>
                      </div>
                      <span>{app.workerCompletedJobs} jobs completed</span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      app.status === 'recruited' ? 'default' :
                      app.status === 'rejected' ? 'destructive' :
                      'outline'
                    }
                  >
                    {app.status}
                  </Badge>
                </div>

                <div className="mb-3">
                  <p className="text-muted-foreground">
                    Applied: {new Date(app.appliedDate).toLocaleString()}
                  </p>
                  {app.documentUrl && (
                    <div className="flex items-center gap-2 mt-2">
                      <FileText className="w-4 h-4" />
                      <a href="#" className="text-blue-600 hover:underline">
                        View submitted document
                      </a>
                    </div>
                  )}
                </div>

                <div className="mb-3 p-3 bg-gray-50 rounded">
                  <p className="text-muted-foreground">Work History</p>
                  <div className="mt-2 space-y-1">
                    <p>• Warehouse operations - 15 jobs</p>
                    <p>• Delivery services - 12 jobs</p>
                    <p>• Event staffing - 8 jobs</p>
                  </div>
                </div>

                {app.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleRecruit(app.id)}
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Recruit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleReject(app.id)}
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
