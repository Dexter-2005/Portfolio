import { useState, useEffect } from 'react';

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/codeforces');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err: any) {
        setError(err.message || 'Error fetching data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}
