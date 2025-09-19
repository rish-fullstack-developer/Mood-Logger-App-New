export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: number; // 1-10 scale
  energy: number; // 1-10 scale
  activity: string;
  sleep: number; // hours
  notes?: string;
  createdAt: string;
}

export interface MoodFormData {
  mood: number;
  energy: number;
  activity: string;
  sleep: number;
  notes?: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  response: string;
  timestamp: string;
  isUser: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}