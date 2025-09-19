import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, Activity, Moon } from 'lucide-react';
import { format } from 'date-fns';
import { apiService } from '@/lib/api';
import type { MoodEntry } from '@/types';

const MoodList = () => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await apiService.getMoods();
        if (response.success && response.data) {
          setMoods(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch moods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  const getMoodColor = (mood: number) => {
    if (mood <= 3) return 'bg-red-100 text-red-800';
    if (mood <= 5) return 'bg-yellow-100 text-yellow-800';
    if (mood <= 7) return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  const getEnergyColor = (energy: number) => {
    if (energy <= 3) return 'bg-gray-100 text-gray-800';
    if (energy <= 5) return 'bg-orange-100 text-orange-800';
    if (energy <= 7) return 'bg-blue-100 text-blue-800';
    return 'bg-purple-100 text-purple-800';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Mood Entries</CardTitle>
          <CardDescription>Your latest mood tracking entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (moods.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Mood Entries</CardTitle>
          <CardDescription>Your latest mood tracking entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No mood entries yet. Start by logging your first mood!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Mood Entries</CardTitle>
        <CardDescription>Your latest mood tracking entries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {moods.slice(0, 5).map((mood) => (
            <div key={mood.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {format(new Date(mood.createdAt), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(mood.createdAt), 'HH:mm')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className={getMoodColor(mood.mood)}>
                    Mood: {mood.mood}/10
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className={getEnergyColor(mood.energy)}>
                    Energy: {mood.energy}/10
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mood.activity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Moon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mood.sleep}h sleep</span>
                </div>
              </div>

              {mood.notes && (
                <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                  "{mood.notes}"
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodList;