import Layout from '@/components/Layout';
import MoodChart from '@/components/MoodChart';

const Analytics = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Visualize your mood and energy patterns to understand your wellbeing trends.
          </p>
        </div>

        <MoodChart />
      </div>
    </Layout>
  );
};

export default Analytics;