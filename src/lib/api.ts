import { getAuthHeaders } from './auth';
import { isDemoMode, demoMoods, demoQuote } from './demo';
import type { LoginData, RegisterData, MoodFormData, ApiResponse, AuthResponse, MoodEntry, Quote } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Authentication
  async login(credentials: LoginData): Promise<ApiResponse<AuthResponse>> {
    if (isDemoMode) {
      return {
        success: true,
        data: {
          token: 'demo-token',
          user: { id: 'demo-user', name: 'Demo User', email: credentials.email }
        }
      };
    }
    return this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    if (isDemoMode) {
      return {
        success: true,
        data: {
          token: 'demo-token',
          user: { id: 'demo-user', name: userData.name, email: userData.email }
        }
      };
    }
    return this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Mood logging
  async getMoods(): Promise<ApiResponse<MoodEntry[]>> {
    if (isDemoMode) {
      return { success: true, data: demoMoods };
    }
    return this.request<MoodEntry[]>('/api/moods');
  }

  async createMood(moodData: MoodFormData): Promise<ApiResponse<MoodEntry>> {
    if (isDemoMode) {
      const newMood: MoodEntry = {
        id: Date.now().toString(),
        userId: 'demo-user',
        ...moodData,
        createdAt: new Date().toISOString(),
      };
      return { success: true, data: newMood };
    }
    return this.request<MoodEntry>('/api/moods', {
      method: 'POST',
      body: JSON.stringify(moodData),
    });
  }

  async getWeeklyMoods(): Promise<ApiResponse<MoodEntry[]>> {
    if (isDemoMode) {
      return { success: true, data: demoMoods };
    }
    return this.request<MoodEntry[]>('/api/moods/weekly');
  }

  async getMonthlyMoods(): Promise<ApiResponse<MoodEntry[]>> {
    if (isDemoMode) {
      return { success: true, data: demoMoods };
    }
    return this.request<MoodEntry[]>('/api/moods/monthly');
  }

  // Daily quote
  async getTodayQuote(): Promise<ApiResponse<Quote>> {
    if (isDemoMode) {
      return { success: true, data: demoQuote };
    }
    return this.request<Quote>('/api/quotes/today');
  }

  // Chatbot
  async sendChatMessage(message: string): Promise<ApiResponse<{ response: string }>> {
    if (isDemoMode) {
      // Simple demo responses
      const responses = [
        "Thank you for sharing that with me. How are you feeling about it?",
        "It sounds like you're going through a lot. Remember that it's okay to take things one day at a time.",
        "That's a great insight! Self-awareness is an important step in mental wellness.",
        "I hear you. It's completely normal to have ups and downs. What helps you feel better when you're struggling?",
        "It's wonderful that you're taking care of your mental health. Keep up the great work!",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return { success: true, data: { response: randomResponse } };
    }
    return this.request<{ response: string }>('/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }
}

export const apiService = new ApiService();