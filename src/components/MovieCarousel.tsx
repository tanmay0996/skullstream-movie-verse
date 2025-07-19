// src/components/MovieCarousel.tsx
import React from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface Props {
  title: string;
  movies: Movie[];
}

const MovieCarousel: React.FC<Props> = ({ title, movies }) => {
  return (
    <div className="px-6 py-4 text-white">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
