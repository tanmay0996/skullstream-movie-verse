import React, { useState } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface MovieCardProps {
  movie: Movie;
}

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // Add safety check for movie prop
  if (!movie) {
    return null;
  }

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    // Set initial position only once when hover starts
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Remove mouse tracking - let preview stay in fixed position
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleWatchNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add your watch now logic here
    console.log(`Watch now clicked for: ${movie.title}`);
    // You can replace this with navigation or modal logic
    // Example: window.open(`/watch/${movie.id}`, '_blank');
  };

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add your watchlist logic here
    console.log(`Added to watchlist: ${movie.title}`);
    // Example: addToWatchlist(movie.id);
  };

  return (
    <>
      <div
        className="relative flex-shrink-0 w-[180px] h-[270px] rounded-xl overflow-hidden cursor-pointer 
                   transition-transform duration-300 group z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="w-full h-full rounded-xl transform transition-transform duration-300 
                     group-hover:scale-105"
        >
          {/* Movie Poster */}
          <img
            src={`${imageBaseUrl}${movie.poster_path || ''}`}
            alt={movie.title || 'Movie poster'}
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/180x270/374151/9CA3AF?text=No+Image';
            }}
          />

          {/* Simple hover indicator */}
          <div
            className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-300 rounded-xl flex items-center justify-center"
          >
            <div className="bg-white bg-opacity-20 rounded-full p-2">
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Preview */}
      {isHovered && (
        <div
          className="fixed z-50"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 100,
            transform: 'translateY(-50%)'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 p-6 w-[400px] animate-in fade-in duration-200">
            <div className="flex gap-4">
              {/* Poster */}
              <img
                src={`${imageBaseUrl}${movie.poster_path || ''}`}
                alt={movie.title || 'Movie poster'}
                className="w-[120px] h-[180px] object-cover rounded-lg flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/120x180/374151/9CA3AF?text=No+Image';
                }}
              />
              
              {/* Details */}
              <div className="flex-1 text-white">
                <h3 className="text-lg font-bold mb-2 leading-tight">{movie.title || 'Untitled'}</h3>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm font-medium">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">📅</span>
                    <span className="text-sm text-gray-300">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Overview</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {movie.overview || "No overview available"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button 
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
                    onClick={handleWatchNow}
                  >
                    Watch Now
                  </button>
                  <button 
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer"
                    onClick={handleAddToWatchlist}
                  >
                    + Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;