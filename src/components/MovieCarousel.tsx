// src/components/MovieCarousel.tsx
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
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
  category: 'trending' | 'top_rated' | 'upcoming' | 'action' | 'comedy';
}

const getEndpoint = (category: Props['category'], page: number) => {
  const base = `https://api.themoviedb.org/3`;
  const key = import.meta.env.VITE_TMDB_API_KEY;

  switch (category) {
    case 'trending':
      return `${base}/trending/movie/week?api_key=${key}&page=${page}`;
    case 'top_rated':
      return `${base}/movie/top_rated?api_key=${key}&page=${page}`;
    case 'upcoming':
      return `${base}/movie/upcoming?api_key=${key}&page=${page}`;
    case 'action':
      return `${base}/discover/movie?api_key=${key}&with_genres=28&page=${page}`;
    case 'comedy':
      return `${base}/discover/movie?api_key=${key}&with_genres=35&page=${page}`;
    default:
      return '';
  }
};

const SCROLL_AMOUNT = 300;

const MovieCarousel: React.FC<Props> = ({ title, category }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  const fetchMovies = async () => {
    if (!hasMore || isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const res = await axios.get(getEndpoint(category, page));
      const newMovies = res.data.results;
      setMovies((prev) => [...prev, ...newMovies]);
      setPage((prev) => prev + 1);
      if (page >= res.data.total_pages) setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchMovies(); // Initial load
  }, []);

  // Infinite scroll logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 200
      ) {
        fetchMovies();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [page, hasMore]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    }
  };

  return (
    <div className="px-6 py-4 text-white relative">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      {/* Left Button */}
      <button
        onClick={scrollLeft}
        aria-label="Scroll Left"
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 shadow-lg z-10"
        style={{ width: 40, height: 40 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        aria-label="Scroll Right"
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 shadow-lg z-160"
        style={{ width: 40, height: 40 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
