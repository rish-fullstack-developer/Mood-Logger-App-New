import { useState } from 'react';
import Layout from '@/components/Layout';
import MoodForm from '@/components/MoodForm';
import MoodList from '@/components/MoodList';

const MoodLogger = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleMoodLogged = () => {
    // Trigger a refresh of the mood list
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mood Logger</h1>
          <p className="text-muted-foreground">
            Track your daily mood, energy levels, and activities to gain insights into your wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <MoodForm onSuccess={handleMoodLogged} />
          </div>
          <div key={refreshKey}>
            <MoodList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MoodLogger;