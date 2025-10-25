import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qrCode: string;
  jobTitle: string;
}

export function QRCodeDialog({ open, onOpenChange, qrCode, jobTitle }: QRCodeDialogProps) {
  const [scanned, setScanned] = useState(false);
  const [scanType, setScanType] = useState<'start' | 'end' | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const handleScan = (type: 'start' | 'end') => {
    if (type === 'start') {
      const time = new Date();
      setStartTime(time);
      setScanType('start');
      setScanned(true);
      toast.success(`Work started at ${time.toLocaleTimeString()}`);
    } else if (type === 'end' && startTime) {
      const endTime = new Date();
      const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60); // minutes
      const hours = duration / 60;
      const payment = hours * 150; // Mock ₹150/hour
      setScanType('end');
      toast.success(`Work completed! Duration: ${duration.toFixed(0)} minutes. Payment: ₹${payment.toFixed(2)}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code - {jobTitle}</DialogTitle>
          <DialogDescription>Scan to start or end work session</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          {/* QR Code placeholder */}
          <div className="w-64 h-64 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-48 h-48 bg-gray-900 mx-auto mb-2 rounded grid grid-cols-8 gap-1 p-2">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-gray-900'} rounded-sm`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">{qrCode}</p>
            </div>
          </div>

          {scanType === null && (
            <div className="w-full space-y-2">
              <p className="text-center text-muted-foreground">Scan this QR code to:</p>
              <Button onClick={() => handleScan('start')} className="w-full">
                Start Work (Worker scans recruiter's QR)
              </Button>
              <p className="text-center text-muted-foreground">or show to recruiter to:</p>
              <Button onClick={() => handleScan('end')} className="w-full" variant="outline">
                End Work (Recruiter scans worker's QR)
              </Button>
            </div>
          )}

          {scanType === 'start' && startTime && (
            <div className="w-full bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-center">Work started!</p>
              <p className="text-center text-muted-foreground">
                Start time: {startTime.toLocaleTimeString()}
              </p>
              <Button onClick={() => handleScan('end')} className="w-full mt-4">
                End Work
              </Button>
            </div>
          )}

          {scanType === 'end' && startTime && (
            <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-center">Work completed!</p>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <span>Start:</span>
                  <span>{startTime.toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>End:</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{((new Date().getTime() - startTime.getTime()) / (1000 * 60)).toFixed(0)} min</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Payment:</span>
                  <span className="font-bold">
                    ₹{(((new Date().getTime() - startTime.getTime()) / (1000 * 60 * 60)) * 150).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button className="w-full">Process Payment</Button>
                <Button variant="outline" className="w-full">Download Receipt</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
