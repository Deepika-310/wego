import { Badge } from './ui/badge';
import { MapPin, Clock, DollarSign, FileText } from 'lucide-react';

interface WorkerJobCardProps {
  job: any;
  onClick: () => void;
}

export function WorkerJobCard({ job, onClick }: WorkerJobCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full border rounded-lg p-4 hover:shadow-md transition-shadow bg-white text-left"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="mb-1">{job.title}</h4>
          <p className="text-muted-foreground">{job.recruiterName}</p>
        </div>
        <Badge variant="outline">
          ₹{job.moneyPerHour}/hr
        </Badge>
      </div>

      <p className="text-muted-foreground line-clamp-2 mb-3">{job.description}</p>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{job.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{job.location.split(',')[0]}</span>
        </div>
        {job.documentRequired && (
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <FileText className="w-4 h-4" />
            <span>{job.documentType} required</span>
          </div>
        )}
      </div>
    </button>
  );
}
