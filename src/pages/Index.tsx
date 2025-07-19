// src/pages/Index.tsx
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import MovieCarousel from '../components/MovieCarousel';
import {
  useTrendingMovies,
  useTopRatedMovies,
  useUpcomingMovies,
  useActionMovies,
  useComedyMovies
} from '../hooks/useMovies';

const Index = () => {
  const { data: trending = [] } = useTrendingMovies();
  const { data: topRated = [] } = useTopRatedMovies();
  const { data: upcoming = [] } = useUpcomingMovies();
  const { data: action = [] } = useActionMovies();
  const { data: comedy = [] } = useComedyMovies();

  return (
    <div className="bg-black min-h-screen">
      <HeroBanner />

      <MovieCarousel title="Trending Now" movies={trending} />
      <MovieCarousel title="Top Rated" movies={topRated} />
      <MovieCarousel title="Upcoming" movies={upcoming} />
      <MovieCarousel title="Action" movies={action} />
      <MovieCarousel title="Comedy" movies={comedy} />
    </div>
  );
};

export default Index;
