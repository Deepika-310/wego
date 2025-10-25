export const mockJobs = [
  {
    id: '1',
    title: 'Warehouse Helper',
    description: 'Need help organizing inventory and packing boxes in warehouse. Must be able to lift 50lbs.',
    duration: '4 hours',
    moneyPerHour: 150,
    location: '123 Industrial Ave, Downtown',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    documentRequired: true,
    documentType: 'ID Proof',
    recruiterId: 'rec1',
    recruiterName: 'ABC Logistics',
    postedDate: new Date().toISOString(),
    status: 'active'
  },
  {
    id: '2',
    title: 'Delivery Driver',
    description: 'Deliver packages within city limits. Must have valid driver license and clean driving record.',
    duration: '6 hours',
    moneyPerHour: 180,
    location: '456 Commerce St, Midtown',
    coordinates: { lat: 40.7580, lng: -73.9855 },
    documentRequired: true,
    documentType: 'Driver License',
    recruiterId: 'rec2',
    recruiterName: 'Quick Delivery Co',
    postedDate: new Date(Date.now() - 86400000).toISOString(),
    status: 'active'
  },
  {
    id: '3',
    title: 'Event Staff',
    description: 'Help with event setup, guest registration, and breakdown. Friendly attitude required.',
    duration: '8 hours',
    moneyPerHour: 200,
    location: '789 Event Plaza, Uptown',
    coordinates: { lat: 40.7829, lng: -73.9654 },
    documentRequired: false,
    documentType: '',
    recruiterId: 'rec3',
    recruiterName: 'Premier Events',
    postedDate: new Date(Date.now() - 172800000).toISOString(),
    status: 'active'
  },
  {
    id: '4',
    title: 'Retail Sales Associate',
    description: 'Assist customers, stock shelves, and handle cash register during busy weekend.',
    duration: '5 hours',
    moneyPerHour: 160,
    location: '321 Shopping Mall, West End',
    coordinates: { lat: 40.7489, lng: -73.9680 },
    documentRequired: false,
    documentType: '',
    recruiterId: 'rec4',
    recruiterName: 'Fashion Retail Store',
    postedDate: new Date(Date.now() - 259200000).toISOString(),
    status: 'active'
  }
];

export const mockWorkers = [
  {
    id: 'worker1',
    name: 'John Smith',
    email: 'john@example.com',
    rating: 4.8,
    completedJobs: 45,
    skills: ['Warehouse', 'Delivery', 'Manual Labor'],
    kycVerified: true
  },
  {
    id: 'worker2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    rating: 4.9,
    completedJobs: 62,
    skills: ['Customer Service', 'Events', 'Retail'],
    kycVerified: true
  },
  {
    id: 'worker3',
    name: 'Mike Davis',
    email: 'mike@example.com',
    rating: 4.6,
    completedJobs: 38,
    skills: ['Delivery', 'Driving', 'Logistics'],
    kycVerified: true
  },
  {
    id: 'worker4',
    name: 'Emily Brown',
    email: 'emily@example.com',
    rating: 4.7,
    completedJobs: 51,
    skills: ['Events', 'Hospitality', 'Customer Service'],
    kycVerified: false
  }
];

export const mockApplications = [
  {
    id: 'app1',
    jobId: '1',
    workerId: 'worker1',
    workerName: 'John Smith',
    workerRating: 4.8,
    workerCompletedJobs: 45,
    appliedDate: new Date().toISOString(),
    status: 'pending', // pending, recruited, rejected, accepted, declined
    documentUrl: 'https://example.com/doc1.pdf',
    qrCode: 'QR-CODE-APP1'
  },
  {
    id: 'app2',
    jobId: '1',
    workerId: 'worker2',
    workerName: 'Sarah Johnson',
    workerRating: 4.9,
    workerCompletedJobs: 62,
    appliedDate: new Date(Date.now() - 3600000).toISOString(),
    status: 'recruited',
    documentUrl: 'https://example.com/doc2.pdf',
    qrCode: 'QR-CODE-APP2'
  },
  {
    id: 'app3',
    jobId: '2',
    workerId: 'worker3',
    workerName: 'Mike Davis',
    workerRating: 4.6,
    workerCompletedJobs: 38,
    appliedDate: new Date(Date.now() - 7200000).toISOString(),
    status: 'accepted',
    documentUrl: 'https://example.com/doc3.pdf',
    qrCode: 'QR-CODE-APP3'
  },
  {
    id: 'app4',
    jobId: '2',
    workerId: 'worker4',
    workerName: 'Emily Brown',
    workerRating: 4.7,
    workerCompletedJobs: 51,
    appliedDate: new Date(Date.now() - 10800000).toISOString(),
    status: 'rejected',
    documentUrl: '',
    qrCode: 'QR-CODE-APP4'
  }
];

export const mockChats = [
  {
    id: 'chat1',
    applicationId: 'app2',
    messages: [
      {
        id: 'msg1',
        senderId: 'rec1',
        senderName: 'ABC Logistics',
        message: 'Hi, when can you start?',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'msg2',
        senderId: 'worker2',
        senderName: 'Sarah Johnson',
        message: 'I can start tomorrow morning!',
        timestamp: new Date(Date.now() - 3000000).toISOString()
      }
    ]
  }
];
