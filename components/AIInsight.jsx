'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function AIInsight() {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);

  const getInsight = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/insights');
      const data = await res.json();
      setInsight(data.insight);
    } catch (error) {
      console.error('Error fetching insights:', error);
      setInsight('Failed to get insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={getInsight} disabled={loading}>
          {loading ? 'Generating...' : 'Get AI Insights'}
        </Button>
        {insight && (
          <div className="mt-4 whitespace-pre-wrap rounded-md bg-gray-100 p-4">
            {insight}
          </div>
        )}
      </CardContent>
    </Card>
  );
}