import { useState, useEffect, useCallback } from 'react';

export interface ProcessedCFData {
  rating: number;
  rank: string;
  maxRating: number;
  maxRank: string;
  totalProblemsSolved: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  heatmap: number[];
}

export default function useCodeforcesData() {
  const [data, setData] = useState<ProcessedCFData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/codeforces');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error fetching data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Listen for global refresh events to sync all hook instances
    const handleRefresh = () => fetchData();
    window.addEventListener('refresh-cf-stats', handleRefresh);
    return () => window.removeEventListener('refresh-cf-stats', handleRefresh);
  }, [fetchData]);

  const refresh = useCallback(() => {
    // Dispatch a global event so all hook instances refresh
    window.dispatchEvent(new CustomEvent('refresh-cf-stats'));
  }, []);

  return { data, isLoading, error, refresh };
}
