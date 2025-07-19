import React from 'react';
import Navigation from '@/components/Navigation';
import HeroBanner from '@/components/HeroBanner';
import MovieCarousel from '@/components/MovieCarousel';
import { sampleMovies, trendingMovies } from '@/data/movieData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Movie Carousels */}
      <div className="space-y-12 pb-16">
        <MovieCarousel 
          title="NEW RELEASES" 
          movies={sampleMovies} 
        />
        
        <MovieCarousel 
          title="TRENDING NOW" 
          movies={trendingMovies} 
        />
        
        <MovieCarousel 
          title="RECOMMENDED FOR YOU" 
          movies={[...sampleMovies].reverse()} 
        />
      </div>
    </div>
  );
};

export default Index;
