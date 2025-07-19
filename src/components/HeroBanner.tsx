// src/components/HeroBanner.tsx
import React from 'react';
import { useFeaturedMovie } from '../hooks/useMovies';

const HeroBanner = () => {
  const { data: movie, isLoading, error } = useFeaturedMovie();

  if (isLoading) return <div className="text-white text-xl">Loading...</div>;
  if (error) return <div className="text-red-500">Failed to load featured movie.</div>;

  return (
    <div
      className="relative w-full h-[60vh] bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-10 left-10">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="max-w-xl mt-4 text-sm">{movie.overview}</p>
        <div className="mt-6 flex gap-4">
          <button className="bg-white text-black px-4 py-2 rounded">▶ Play</button>
          <button className="bg-gray-700 px-4 py-2 rounded">🔇 Mute</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
