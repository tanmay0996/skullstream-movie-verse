import React, { useState, useEffect } from "react";

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
  if (!movie) return null;

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!isMobile) {
      setIsHovered(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  const handleTouchStart = () => {
    if (isMobile) {
      setIsHovered(true);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  const handleWatchNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Watch now clicked for: ${movie.title}`);
  };

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Added to watchlist: ${movie.title}`);
  };

  return (
    <>
      <div
        className="relative flex-shrink-0 w-[180px] h-[270px] rounded-xl overflow-hidden cursor-pointer 
                   transition-transform duration-300 group z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
      >
        <div className="w-full h-full rounded-xl transform transition-transform duration-300 group-hover:scale-105">
          <img
            src={`${imageBaseUrl}${movie.poster_path || ''}`}
            alt={movie.title || 'Movie poster'}
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/180x270/374151/9CA3AF?text=No+Image';
            }}
          />
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

      {isHovered && (
        <>
          {/* Mobile overlay background */}
          {isMobile && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={handleClose}
            />
          )}
          
          <div
            className={`fixed z-50 max-w-full px-2 md:px-0 ${
              isMobile 
                ? 'inset-x-4 top-1/2 transform -translate-y-1/2' 
                : ''
            }`}
            style={!isMobile ? {
              left: Math.min(mousePosition.x + 20, window.innerWidth - 420),
              top: Math.max(mousePosition.y - 100, 80),
              transform: 'translateY(-50%)',
            } : {}}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={!isMobile ? handleMouseLeave : undefined}
          >
            <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 p-4 md:p-6 w-full sm:w-[360px] md:w-[400px] animate-in fade-in duration-200 relative">
              
              {/* X button for mobile */}
              {isMobile && (
                <button 
                  onClick={handleClose}
                  className="absolute top-3 right-3 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors md:hidden"
                  aria-label="Close"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    fill="white" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={`${imageBaseUrl}${movie.poster_path || ''}`}
                  alt={movie.title || 'Movie poster'}
                  className="w-full sm:w-[100px] md:w-[120px] h-[160px] md:h-[180px] object-cover rounded-lg flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/120x180/374151/9CA3AF?text=No+Image';
                  }}
                />
                <div className="flex-1 text-white">
                  <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 leading-tight pr-8 md:pr-0">
                    {movie.title || 'Untitled'}
                  </h3>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm font-medium">{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">📅</span>
                      <span className="text-sm text-gray-300">{movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-300 mb-1">Overview</h4>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-5">
                      {movie.overview || "No overview available"}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button 
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs font-medium transition-colors"
                      onClick={handleWatchNow}
                    >
                      Watch Now
                    </button>
                    <button 
                      className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-xs font-medium transition-colors"
                      onClick={handleAddToWatchlist}
                    >
                      + Watchlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MovieCard;