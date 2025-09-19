import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import DailyQuote from '@/components/DailyQuote';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, MessageCircle, PenTool, TrendingUp, Calendar, Heart } from 'lucide-react';
import { apiService } from '@/lib/api';
import { getUser } from '@/lib/auth';
import type { MoodEntry } from '@/types';

const Index = () => {
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    const fetchRecentMoods = async () => {
      try {
        const response = await apiService.getMoods();
        if (response.success && response.data) {
          setRecentMoods(response.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch recent moods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMoods();
  }, []);

  const getAverageMood = () => {
    if (recentMoods.length === 0) return 0;
    return Math.round(recentMoods.reduce((sum, mood) => sum + mood.mood, 0) / recentMoods.length);
  };

  const getMoodTrend = () => {
    if (recentMoods.length < 2) return 'stable';
    const latest = recentMoods[0]?.mood || 0;
    const previous = recentMoods[1]?.mood || 0;
    if (latest > previous) return 'improving';
    if (latest < previous) return 'declining';
    return 'stable';
  };

  const quickActions = [
    {
      title: 'Log Mood',
      description: 'Track your current mood and energy',
      icon: PenTool,
      href: '/mood-logger',
      color: 'bg-blue-500',
    },
    {
      title: 'View Analytics',
      description: 'See your mood patterns and trends',
      icon: BarChart3,
      href: '/analytics',
      color: 'bg-green-500',
    },
    {
      title: 'AI Chat',
      description: 'Talk to your wellness companion',
      icon: MessageCircle,
      href: '/chatbot',
      color: 'bg-purple-500',
    },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            How are you feeling today? Let's check in on your wellbeing.
          </p>
        </div>

        {/* Daily Quote */}
        <DailyQuote />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getAverageMood()}/10</div>
              <p className="text-xs text-muted-foreground">
                Based on recent entries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mood Trend</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{getMoodTrend()}</div>
              <p className="text-xs text-muted-foreground">
                Compared to yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entries This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentMoods.length}</div>
              <p className="text-xs text-muted-foreground">
                Keep tracking daily
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card key={action.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <Link to={action.href}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${action.color} text-white`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{action.title}</CardTitle>
                          <CardDescription>{action.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        {recentMoods.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Mood Entries</CardTitle>
              <CardDescription>Your latest mood tracking activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMoods.map((mood) => (
                  <div key={mood.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">
                        Mood: {mood.mood}/10
                      </Badge>
                      <Badge variant="outline">
                        Energy: {mood.energy}/10
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {mood.activity}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(mood.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/mood-logger">View All Entries</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Index;