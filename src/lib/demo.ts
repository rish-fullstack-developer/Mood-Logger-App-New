// Demo data and utilities for showcasing the app without backend
export const demoUser = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@example.com'
};

export const demoMoods = [
  {
    id: '1',
    userId: 'demo-user',
    mood: 8,
    energy: 7,
    activity: 'Exercise',
    sleep: 7.5,
    notes: 'Great workout session today!',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    id: '2',
    userId: 'demo-user',
    mood: 6,
    energy: 5,
    activity: 'Work/Study',
    sleep: 6,
    notes: 'Busy day at work but manageable',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: '3',
    userId: 'demo-user',
    mood: 9,
    energy: 9,
    activity: 'Social Time',
    sleep: 8,
    notes: 'Amazing time with friends!',
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
];

export const demoQuote = {
  id: 'demo-quote',
  text: 'The only way to do great work is to love what you do.',
  author: 'Steve Jobs',
  date: new Date().toISOString(),
};

// Enable demo mode by default for showcase
export const isDemoMode = true;