import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { MapPin, Clock, DollarSign, FileText, Upload } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { mockApplications } from '../lib/mockData';

interface WorkerJobDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: any;
  userId: string;
}

export function WorkerJobDetailsDialog({ open, onOpenChange, job, userId }: WorkerJobDetailsDialogProps) {
  const [document, setDocument] = useState<File | null>(null);
  const hasApplied = mockApplications.some(app => app.jobId === job.id && app.workerId === userId);

  const handleApply = () => {
    if (job.documentRequired && !document) {
      toast.error('Please upload required document');
      return;
    }
    toast.success('Application submitted successfully!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{job.title}</DialogTitle>
          <DialogDescription>View job details and apply</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-muted-foreground">Company</label>
            <p>{job.recruiterName}</p>
          </div>

          <div>
            <label className="text-muted-foreground">Description</label>
            <p>{job.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-muted-foreground">Duration</label>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <p>{job.duration}</p>
              </div>
            </div>

            <div>
              <label className="text-muted-foreground">Pay Rate</label>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <p>₹{job.moneyPerHour}/hour</p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-muted-foreground">Location</label>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <p>{job.location}</p>
            </div>
          </div>

          {job.documentRequired && (
            <div className="border rounded-lg p-4 bg-yellow-50">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5" />
                <label>Required Document: {job.documentType}</label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  onChange={(e) => setDocument(e.target.files?.[0] || null)}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
              {document && (
                <p className="text-green-600 mt-2">✓ {document.name}</p>
              )}
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-muted-foreground">Posted on: {new Date(job.postedDate).toLocaleDateString()}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={hasApplied}
              className="flex-1"
            >
              {hasApplied ? 'Already Applied' : 'Apply Now'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
