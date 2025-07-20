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
import Navigation from '@/components/Navigation';

const Index = () => {
  const { data: trending = [] } = useTrendingMovies();
  const { data: topRated = [] } = useTopRatedMovies();
  const { data: upcoming = [] } = useUpcomingMovies();
  const { data: action = [] } = useActionMovies();
  const { data: comedy = [] } = useComedyMovies();

  return (
   
    <div className="bg-black min-h-screen">
       <Navigation/>
      <HeroBanner />

    <MovieCarousel title="Trending Now" category="trending" />
<MovieCarousel title="Top Rated" category="top_rated" />
<MovieCarousel title="Upcoming" category="upcoming" />
<MovieCarousel title="Action" category="action" />
<MovieCarousel title="Comedy" category="comedy" />

    </div>
  );
};

export default Index;
