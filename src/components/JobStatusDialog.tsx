import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MessageSquare, QrCode, CheckCircle, XCircle, Clock } from 'lucide-react';
import { QRCodeDialog } from './QRCodeDialog';
import { ChatDialog } from './ChatDialog';

interface JobStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: any;
  applications: any[];
}

export function JobStatusDialog({ open, onOpenChange, job, applications }: JobStatusDialogProps) {
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);

  const recruitedApps = applications.filter(app => app.status === 'recruited');
  const acceptedApps = applications.filter(app => app.status === 'accepted');
  const rejectedByWorker = applications.filter(app => app.status === 'declined');

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{job.title} - Status</DialogTitle>
            <DialogDescription>View worker responses and manage job status</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Accepted Workers */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h4>Accepted Workers ({acceptedApps.length})</h4>
              </div>
              {acceptedApps.length === 0 ? (
                <p className="text-muted-foreground">No workers have accepted yet</p>
              ) : (
                <div className="space-y-3">
                  {acceptedApps.map((app) => (
                    <div key={app.id} className="border rounded-lg p-4 bg-green-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p>{app.workerName}</p>
                          <p className="text-muted-foreground">⭐ {app.workerRating}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedChat(app)}
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Chat
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => setSelectedQR(app.qrCode)}
                          >
                            <QrCode className="w-4 h-4 mr-2" />
                            QR Code
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Waiting for Response */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <h4>Waiting for Response ({recruitedApps.length})</h4>
              </div>
              {recruitedApps.length === 0 ? (
                <p className="text-muted-foreground">No pending responses</p>
              ) : (
                <div className="space-y-3">
                  {recruitedApps.map((app) => (
                    <div key={app.id} className="border rounded-lg p-4 bg-blue-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p>{app.workerName}</p>
                          <p className="text-muted-foreground">⭐ {app.workerRating}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedChat(app)}
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Chat
                          </Button>
                          <Badge>Pending</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rejected by Workers */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-600" />
                <h4>Rejected by Workers ({rejectedByWorker.length})</h4>
              </div>
              {rejectedByWorker.length === 0 ? (
                <p className="text-muted-foreground">No rejections</p>
              ) : (
                <div className="space-y-3">
                  {rejectedByWorker.map((app) => (
                    <div key={app.id} className="border rounded-lg p-4 bg-red-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p>{app.workerName}</p>
                          <p className="text-muted-foreground">⭐ {app.workerRating}</p>
                        </div>
                        <Badge variant="destructive">Declined</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <QRCodeDialog
        open={!!selectedQR}
        onOpenChange={(open) => !open && setSelectedQR(null)}
        qrCode={selectedQR || ''}
        jobTitle={job.title}
      />

      {selectedChat && (
        <ChatDialog
          open={!!selectedChat}
          onOpenChange={(open) => !open && setSelectedChat(null)}
          participant={selectedChat}
          jobTitle={job.title}
        />
      )}
    </>
  );
}
