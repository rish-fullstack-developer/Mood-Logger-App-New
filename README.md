MoodLogger - Mental Wellness Tracker
A comprehensive React-based web application for tracking mood, energy levels, and mental wellbeing. Built for R Square Consulting as part of their innovative mental productivity tool suite.

🌟 Features
🔐 Authentication
User Registration & Login: Secure JWT-based authentication
Protected Routes: Automatic redirection based on authentication status
Persistent Sessions: Secure token storage with automatic logout
📊 Mood Tracking
Interactive Mood Logging: Track mood (1-10), energy (1-10), sleep hours, and daily activities
Visual Feedback: Real-time emoji indicators and smooth slider controls
Activity Categories: Predefined activity types for consistent tracking
Notes Support: Optional notes for additional context
📈 Analytics & Insights
Weekly & Monthly Charts: Visual representation of mood and energy patterns
Interactive Graphs: Hover tooltips with detailed information
Trend Analysis: Automatic mood trend detection (improving/declining/stable)
Historical Data: Complete mood entry history with filtering
💬 AI Wellness Companion
Intelligent Chatbot: AI-powered mental health support and guidance
Real-time Conversations: Instant responses with typing indicators
Crisis Support Information: Built-in mental health resources and emergency contacts
Conversation History: Persistent chat history within sessions
🎯 Daily Motivation
Daily Quotes: Inspirational quotes fetched from API
Motivational Cards: Beautiful, responsive quote display
Fallback Content: Graceful handling when API is unavailable
📱 Responsive Design
Mobile-First: Optimized for mobile devices and tablets
Desktop Compatible: Full desktop experience with enhanced layouts
Modern UI: Clean, intuitive interface using Shadcn/UI components
Dark/Light Mode: Automatic theme adaptation
🛠️ Technology Stack
Frontend Framework: React 18 with TypeScript
Build Tool: Vite for fast development and optimized builds
UI Framework: Shadcn/UI with Radix UI primitives
Styling: Tailwind CSS for responsive design
Charts: Recharts for data visualization
Forms: React Hook Form with Zod validation
Routing: React Router v6 with protected routes
State Management: React Query for server state
Date Handling: date-fns for date formatting and manipulation
Icons: Lucide React for consistent iconography
🚀 Quick Start
Prerequisites
Node.js (v16 or higher)
pnpm (recommended) or npm
Installation
Clone the repository

git clone <your-repo-url>
cd mood-logger-app
Install dependencies

pnpm install
Environment Setup Create a .env file in the root directory:

NEXT_PUBLIC_API_URL=http://localhost:3001
Start development server

pnpm run dev
Open in browser Navigate to http://localhost:5173

Building for Production

# Build the application

pnpm run build

# Preview the build

pnpm run preview
🔌 API Integration
The application integrates with the following backend endpoints:

Authentication
POST /api/auth/register - User registration
POST /api/auth/login - User login
Mood Management
GET /api/moods - Fetch all mood entries
POST /api/moods - Create new mood entry
GET /api/moods/weekly - Get weekly mood data
GET /api/moods/monthly - Get monthly mood data
Additional Features
GET /api/quotes/today - Fetch daily motivational quote
POST /api/chatbot - Send message to AI chatbot
API Response Format
interface ApiResponse<T> {
success: boolean;
data?: T;
message?: string;
}
📁 Project Structure
src/
├── components/ # Reusable UI components
│ ├── ui/ # Shadcn/UI components
│ ├── AuthForm.tsx # Authentication form
│ ├── ChatMessage.tsx # Chat bubble component
│ ├── DailyQuote.tsx # Daily quote card
│ ├── Layout.tsx # Main app layout
│ ├── MoodChart.tsx # Analytics charts
│ ├── MoodForm.tsx # Mood logging form
│ ├── MoodList.tsx # Mood entries list
│ └── Navbar.tsx # Navigation component
├── lib/ # Utility functions
│ ├── api.ts # API service layer
│ ├── auth.ts # Authentication utilities
│ └── utils.ts # General utilities
├── pages/ # Application pages
│ ├── Analytics.tsx # Analytics dashboard
│ ├── Chatbot.tsx # AI chat interface
│ ├── Index.tsx # Dashboard/home page
│ ├── Login.tsx # Login page
│ ├── MoodLogger.tsx # Mood logging page
│ ├── NotFound.tsx # 404 page
│ └── Register.tsx # Registration page
├── types/ # TypeScript type definitions
│ └── index.ts # Application types
├── App.tsx # Main app component
├── main.tsx # Application entry point
└── index.css # Global styles
🎨 Design System
Color Palette
Primary: Blue tones for main actions and branding
Secondary: Green tones for positive indicators (energy, good moods)
Accent: Purple tones for AI/chat features
Neutral: Gray scale for text and backgrounds
Semantic: Red for warnings, Yellow for caution, Green for success
Typography
Headings: Bold, clear hierarchy
Body Text: Readable, accessible font sizes
UI Text: Consistent sizing for buttons and labels
Components
Cards: Consistent spacing and shadows
Forms: Clear labels, validation states
Buttons: Multiple variants (primary, secondary, outline)
Charts: Accessible colors and clear data representation
🔒 Security Features
JWT Token Management: Secure token storage and automatic refresh
Protected Routes: Authentication-based route protection
Input Validation: Client-side validation with Zod schemas
XSS Protection: Sanitized user inputs and outputs
CORS Handling: Proper cross-origin request handling
📱 Responsive Breakpoints
Mobile: < 768px (Single column layouts, mobile navigation)
Tablet: 768px - 1024px (Adapted layouts, touch-friendly)
Desktop: > 1024px (Multi-column layouts, hover states)
🧪 Testing Strategy
Manual Testing Checklist
[ ] User registration and login flow
[ ] Mood logging with all input types
[ ] Chart rendering with different data sets
[ ] Chat functionality with various message types
[ ] Responsive design across devices
[ ] Error handling for API failures
[ ] Authentication state persistence
Recommended Automated Tests
Unit tests for utility functions
Component tests for form validation
Integration tests for API calls
E2E tests for critical user flows
🚀 Deployment
Vercel Deployment (Recommended)
Connect your GitHub repository to Vercel
Set environment variables in Vercel dashboard
Deploy automatically on push to main branch
Netlify Deployment
Build the project: pnpm run build
Deploy the dist folder to Netlify
Configure environment variables in Netlify settings
Manual Deployment
Build the project: pnpm run build
Upload the dist folder to your hosting provider
Configure your web server to serve the SPA correctly
🔧 Environment Variables

# API Configuration

NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: Analytics

NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: Error Tracking

NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
🤝 Contributing
Fork the repository
Create a feature branch: git checkout -b feature/amazing-feature
Commit your changes: git commit -m 'Add amazing feature'
Push to the branch: git push origin feature/amazing-feature
Open a Pull Request
📄 License
This project is developed for R Square Consulting. All rights reserved.

🆘 Support
For technical support or questions about this project, please contact:

Development Team: [Your Email]
R Square Consulting: [Company Contact]
🎯 Future Enhancements
[ ] Push notifications for mood reminders
[ ] Data export functionality (PDF reports)
[ ] Integration with wearable devices
[ ] Advanced analytics with ML insights
[ ] Social features for sharing progress
[ ] Offline mode with data synchronization
[ ] Multi-language support
[ ] Accessibility improvements (WCAG 2.1 AA)
Built with ❤️ for R Square Consulting’s Mental Wellness Initiative
