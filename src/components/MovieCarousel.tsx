// src/components/MovieCarousel.tsx
import React, { useEffect, useRef, useState } from 'react';
import { tmdb } from '../lib/tmdb';           // ← proxy‑aware client
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

const SCROLL_AMOUNT = 300;

const MovieCarousel: React.FC<Props> = ({ title, category }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  // Determine TMDB path & extra params per category
  const getRequestConfig = () => {
    switch (category) {
      case 'trending':
        return { path: '/trending/movie/week', params: { page } };
      case 'top_rated':
        return { path: '/movie/top_rated',     params: { page } };
      case 'upcoming':
        return { path: '/movie/upcoming',      params: { page } };
      case 'action':
        return { path: '/discover/movie',      params: { with_genres: 28, page } };
      case 'comedy':
        return { path: '/discover/movie',      params: { with_genres: 35, page } };
      default:
        return { path: '', params: {} };
    }
  };

  const fetchMovies = async () => {
    if (!hasMore || isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const { path, params } = getRequestConfig();
      const res = await tmdb.get(path, { params });
      const newMovies = res.data.results as Movie[];

      setMovies((prev) => [...prev, ...newMovies]);
      setPage((prev) => prev + 1);
      if (page >= res.data.total_pages) setHasMore(false);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchMovies(); // initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 200
      ) {
        fetchMovies();
      }
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
    // we deliberately omit deps for scroll listener stability
  }, [hasMore]);

  const scrollLeft = () =>
    containerRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  const scrollRight = () =>
    containerRef.current?.scrollBy({ left: SCROLL_AMOUNT,  behavior: 'smooth' });

  return (
    <div className="px-6 py-4 text-white relative">
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      <button
        onClick={scrollLeft}
        aria-label="Scroll Left"
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 shadow-lg z-10"
        style={{ width: 40, height: 40 }}
      >
        ‹
      </button>

      <button
        onClick={scrollRight}
        aria-label="Scroll Right"
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 shadow-lg z-10"
        style={{ width: 40, height: 40 }}
      >
        ›
      </button>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
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
