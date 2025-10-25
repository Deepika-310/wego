import { useState, useEffect } from 'react';
import { Bell, X, MapPin, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NotificationBarProps {
  jobs: any[];
  onJobClick: (job: any) => void;
}

export function NotificationBar({ jobs, onJobClick }: NotificationBarProps) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Create dummy nearby notifications - always show the first 3 jobs as nearby
    const nearbyJobs = jobs.slice(0, 3).map((job, index) => ({
      ...job,
      distance: index === 0 ? '0.8 km' : index === 1 ? '1.5 km' : '2.3 km',
      timePosted: index === 0 ? '5 min ago' : index === 1 ? '15 min ago' : '1 hour ago'
    }));

    setNotifications(nearbyJobs);
  }, [jobs]);

  const removeNotification = (jobId: string) => {
    setNotifications(notifications.filter((n) => n.id !== jobId));
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
            {notifications.length}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Notification Panel */}
          <div className="absolute top-12 right-0 z-50 w-80 bg-white rounded-lg shadow-2xl border overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  <h4>Nearby Jobs</h4>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-white/90 text-sm mt-1">
                {notifications.length} job{notifications.length !== 1 ? 's' : ''} available near you
              </p>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No nearby jobs right now</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        onJobClick(job);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="flex-1">{job.title}</h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(job.id);
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {job.recruiterName}
                      </p>
                      <div className="flex items-center gap-4 text-sm mb-2">
                        <div className="flex items-center gap-1 text-blue-600">
                          <DollarSign className="w-4 h-4" />
                          <span>₹{job.moneyPerHour}/hr</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">
                            {job.location.split(',')[0]}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                          📍 {job.distance} away
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {job.timePosted}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
