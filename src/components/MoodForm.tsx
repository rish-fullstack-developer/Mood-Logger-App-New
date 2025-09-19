import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Heart } from 'lucide-react';
import { apiService } from '@/lib/api';
import type { MoodFormData } from '@/types';

const moodSchema = z.object({
  mood: z.number().min(1).max(10),
  energy: z.number().min(1).max(10),
  activity: z.string().min(1, 'Please select an activity'),
  sleep: z.number().min(0).max(24),
  notes: z.string().optional(),
});

const activities = [
  'Work/Study',
  'Exercise',
  'Social Time',
  'Relaxation',
  'Hobbies',
  'Family Time',
  'Outdoor Activities',
  'Reading',
  'Entertainment',
  'Other'
];

interface MoodFormProps {
  onSuccess?: () => void;
}

const MoodForm = ({ onSuccess }: MoodFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MoodFormData>({
    resolver: zodResolver(moodSchema),
    defaultValues: {
      mood: 5,
      energy: 5,
      sleep: 8,
    },
  });

  const moodValue = watch('mood', 5);
  const energyValue = watch('energy', 5);
  const sleepValue = watch('sleep', 8);

  const getMoodEmoji = (value: number) => {
    if (value <= 2) return '😢';
    if (value <= 4) return '😕';
    if (value <= 6) return '😐';
    if (value <= 8) return '🙂';
    return '😊';
  };

  const getEnergyEmoji = (value: number) => {
    if (value <= 2) return '😴';
    if (value <= 4) return '😪';
    if (value <= 6) return '😐';
    if (value <= 8) return '😊';
    return '⚡';
  };

  const onSubmit = async (data: MoodFormData) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await apiService.createMood(data);
      
      if (response.success) {
        setSuccess(true);
        reset();
        onSuccess?.();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.message || 'Failed to log mood');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-red-500" />
          <span>How are you feeling today?</span>
        </CardTitle>
        <CardDescription>
          Track your mood, energy, and activities to better understand your wellbeing patterns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Mood Slider */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Mood {getMoodEmoji(moodValue)} ({moodValue}/10)
            </Label>
            <Slider
              value={[moodValue]}
              onValueChange={(value) => setValue('mood', value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Very Low</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Energy Slider */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Energy Level {getEnergyEmoji(energyValue)} ({energyValue}/10)
            </Label>
            <Slider
              value={[energyValue]}
              onValueChange={(value) => setValue('energy', value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Exhausted</span>
              <span>Energized</span>
            </div>
          </div>

          {/* Activity Selection */}
          <div className="space-y-2">
            <Label htmlFor="activity">Primary Activity</Label>
            <Select onValueChange={(value) => setValue('activity', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your main activity today" />
              </SelectTrigger>
              <SelectContent>
                {activities.map((activity) => (
                  <SelectItem key={activity} value={activity}>
                    {activity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.activity && (
              <p className="text-sm text-destructive">{errors.activity.message}</p>
            )}
          </div>

          {/* Sleep Hours */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              Sleep Hours ({sleepValue}h)
            </Label>
            <Slider
              value={[sleepValue]}
              onValueChange={(value) => setValue('sleep', value[0])}
              max={24}
              min={0}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0h</span>
              <span>24h</span>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional thoughts or observations about your day..."
              {...register('notes')}
              rows={3}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                Mood logged successfully! 🎉
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log My Mood
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MoodForm;