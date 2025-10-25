import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send } from 'lucide-react';

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participant?: any;
  jobTitle: string;
}

export function ChatDialog({ open, onOpenChange, participant, jobTitle }: ChatDialogProps) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'recruiter',
      text: 'Hi, looking forward to working with you!',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      sender: 'worker',
      text: 'Thank you! When should I arrive?',
      timestamp: new Date(Date.now() - 1800000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        sender: 'worker',
        text: newMessage,
        timestamp: new Date()
      }
    ]);
    setNewMessage('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Chat - {jobTitle}</DialogTitle>
          <DialogDescription>
            {participant?.workerName ? `Message with ${participant.workerName}` : 'Message with recruiter'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-[400px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'worker' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === 'worker'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === 'worker' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
