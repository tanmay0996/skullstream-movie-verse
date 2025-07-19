import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  image: string;
  rating?: number;
  year?: number;
  genre?: string;
  overview?: string;
}

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white tracking-wide">{title}</h2>
          
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('left')}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('right')}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Movie Cards Carousel */}
        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {movies.map((movie, index) => (
              <div key={movie.id} className="flex-none w-64">
                <MovieCard {...movie} />
              </div>
            ))}
          </div>

          {/* Gradient Fade on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default MovieCarousel;