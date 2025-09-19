import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Quote } from 'lucide-react';
import { apiService } from '@/lib/api';
import type { Quote as QuoteType } from '@/types';

const DailyQuote = () => {
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await apiService.getTodayQuote();
        if (response.success && response.data) {
          setQuote(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch quote:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!quote) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Quote className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                "Every day is a new beginning. Take a deep breath and start again."
              </p>
              <p className="text-sm text-gray-600 mt-2">— Anonymous</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Quote className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <p className="text-lg font-medium text-gray-900 leading-relaxed">
              "{quote.text}"
            </p>
            <p className="text-sm text-gray-600 mt-3">— {quote.author}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyQuote;