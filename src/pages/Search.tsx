import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useSearchMovies } from '../hooks/useSearchMovies';
import MovieCard from '../components/MovieCard';
import Skeleton from '../components/ui/skeleton';
// import { Skeleton } from '@/components/ui/skeleton';

const Search = () => {
  const [query, setQuery] = useState('');
  const { data: results, isLoading } = useSearchMovies(query);

  return (
    <div className="px-6 py-4 text-white">
      <SearchBar onSearch={setQuery} />
      
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-[270px] w-[180px]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {results?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
