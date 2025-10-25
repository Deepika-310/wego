import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';

interface CreateJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (jobData: any) => void;
}

export function CreateJobDialog({ open, onOpenChange, onSubmit }: CreateJobDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    moneyPerHour: '',
    location: '',
    documentRequired: false,
    documentType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      moneyPerHour: parseFloat(formData.moneyPerHour),
      coordinates: { lat: 40.7128, lng: -74.0060 } // Mock coordinates
    });
    setFormData({
      title: '',
      description: '',
      duration: '',
      moneyPerHour: '',
      location: '',
      documentRequired: false,
      documentType: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post New Job</DialogTitle>
          <DialogDescription>Fill in the details to create a new job posting</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Job Title *</Label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Warehouse Helper"
            />
          </div>

          <div>
            <Label>Description *</Label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the job requirements and responsibilities"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Duration *</Label>
              <Input
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 4 hours"
              />
            </div>

            <div>
              <Label>Money per Hour (₹) *</Label>
              <Input
                required
                type="number"
                step="1"
                value={formData.moneyPerHour}
                onChange={(e) => setFormData({ ...formData, moneyPerHour: e.target.value })}
                placeholder="150"
              />
            </div>
          </div>

          <div>
            <Label>Location *</Label>
            <Input
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Full address"
            />
          </div>

          <div className="flex items-center justify-between border p-4 rounded-lg">
            <div>
              <Label>Document Required</Label>
              <p className="text-muted-foreground">Require workers to submit documents</p>
            </div>
            <Switch
              checked={formData.documentRequired}
              onCheckedChange={(checked) => setFormData({ ...formData, documentRequired: checked })}
            />
          </div>

          {formData.documentRequired && (
            <div>
              <Label>Document Type</Label>
              <Input
                value={formData.documentType}
                onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                placeholder="e.g., ID Proof, Driver License"
              />
            </div>
          )}

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Post Job
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
