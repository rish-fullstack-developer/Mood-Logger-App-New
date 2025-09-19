import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, TooltipProps } from 'recharts';
import { format, parseISO } from 'date-fns';
import { apiService } from '@/lib/api';
import type { MoodEntry } from '@/types';

interface ChartDataPoint {
  date: string;
  mood: number;
  energy: number;
  sleep: number;
}

const MoodChart = () => {
  const [weeklyData, setWeeklyData] = useState<MoodEntry[]>([]);
  const [monthlyData, setMonthlyData] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weeklyResponse, monthlyResponse] = await Promise.all([
          apiService.getWeeklyMoods(),
          apiService.getMonthlyMoods(),
        ]);

        if (weeklyResponse.success && weeklyResponse.data) {
          setWeeklyData(weeklyResponse.data);
        }

        if (monthlyResponse.success && monthlyResponse.data) {
          setMonthlyData(monthlyResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch mood data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processChartData = (data: MoodEntry[]): ChartDataPoint[] => {
    return data.map((entry) => ({
      date: format(parseISO(entry.createdAt), 'MMM dd'),
      mood: entry.mood,
      energy: entry.energy,
      sleep: entry.sleep,
    }));
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'mood' && `Mood: ${entry.value}/10`}
              {entry.dataKey === 'energy' && `Energy: ${entry.value}/10`}
              {entry.dataKey === 'sleep' && `Sleep: ${entry.value}h`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mood Analytics</CardTitle>
          <CardDescription>Track your mood and energy patterns over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Analytics</CardTitle>
        <CardDescription>Track your mood and energy patterns over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
            <TabsTrigger value="monthly">Monthly View</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={processChartData(weeklyData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    name="Mood"
                  />
                  <Line
                    type="monotone"
                    dataKey="energy"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    name="Energy"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processChartData(monthlyData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="mood" fill="#3b82f6" name="Mood" />
                  <Bar dataKey="energy" fill="#10b981" name="Energy" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        {weeklyData.length === 0 && monthlyData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No data available yet. Start logging your moods to see analytics!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodChart;