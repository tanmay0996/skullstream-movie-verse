import { useQuery } from '@tanstack/react-query';
import { tmdb } from '../lib/tmdb';

export const useTrendingMovies = () =>
  useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      const res = await tmdb.get('/trending/movie/week');
      return res.data.results;
    },
  });

export const useTopRatedMovies = () =>
  useQuery({
    queryKey: ['topRated'],
    queryFn: async () => {
      const res = await tmdb.get('/movie/top_rated');
      return res.data.results;
    },
  });

export const useUpcomingMovies = () =>
  useQuery({
    queryKey: ['upcoming'],
    queryFn: async () => {
      const res = await tmdb.get('/movie/upcoming');
      return res.data.results;
    },
  });

export const useActionMovies = () =>
  useQuery({
    queryKey: ['action'],
    queryFn: async () => {
      const res = await tmdb.get('/discover/movie', {
        params: { with_genres: 28 },
      });
      return res.data.results;
    },
  });

export const useComedyMovies = () =>
  useQuery({
    queryKey: ['comedy'],
    queryFn: async () => {
      const res = await tmdb.get('/discover/movie', {
        params: { with_genres: 35 },
      });
      return res.data.results;
    },
  });

export const useFeaturedMovie = () =>
  useQuery({
    queryKey: ['featured'],
    queryFn: async () => {
      const res = await tmdb.get('/movie/popular');
      return res.data.results[0]; // pick the first one
    },
  });
