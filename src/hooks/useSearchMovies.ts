// src/hooks/useSearchMovies.ts
import { useQuery } from '@tanstack/react-query';
import { tmdb } from '../lib/tmdb';

export const useSearchMovies = (query: string) =>
  useQuery({
    queryKey: ['search', query],
    enabled: !!query,
    queryFn: async () => {
      const res = await tmdb.get('/search/movie', {
        params: { query },
      });
      return res.data.results;
    },
  });
