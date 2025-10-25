import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Clock, DollarSign, FileText, Users } from 'lucide-react';
import { mockApplications } from '../lib/mockData';

interface JobCardProps {
  job: any;
  onViewApplicants: () => void;
  onViewStatus: () => void;
}

export function JobCard({ job, onViewApplicants, onViewStatus }: JobCardProps) {
  const applicants = mockApplications.filter(app => app.jobId === job.id);
  const applicantCount = applicants.length;

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="mb-1">{job.title}</h4>
          <p className="text-muted-foreground line-clamp-2">{job.description}</p>
        </div>
        <Badge variant="outline" className="ml-2">
          {job.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{job.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <DollarSign className="w-4 h-4" />
          <span>₹{job.moneyPerHour}/hr</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground col-span-2">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{job.location}</span>
        </div>
        {job.documentRequired && (
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <FileText className="w-4 h-4" />
            <span>{job.documentType} required</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onViewApplicants}
          className="flex-1"
        >
          <Users className="w-4 h-4 mr-2" />
          Applicants ({applicantCount})
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={onViewStatus}
          className="flex-1"
        >
          Status
        </Button>
      </div>
    </div>
  );
}
