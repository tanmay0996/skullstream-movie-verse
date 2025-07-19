import React from "react";

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
  return (
    <div
      className="relative flex-shrink-0 w-[180px] h-[270px] rounded-xl overflow-hidden cursor-pointer 
                 transition-transform duration-300 group perspective-[1000px]"
    >
      <div
        className="w-full h-full rounded-xl transform transition-transform duration-300 
                   group-hover:rotate-x-3 group-hover:rotate-y-3 group-hover:scale-105"
      >
        {/* Movie Poster */}
        <img
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover rounded-xl"
        />

        {/* Hover Content Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300 p-4 flex flex-col justify-end text-white rounded-xl"
        >
          <h3 className="text-sm font-semibold line-clamp-1">{movie.title}</h3>
          <p className="text-xs mt-1">
            ⭐ {movie.vote_average} | 📅 {movie.release_date}
          </p>
          <p className="text-xs mt-2 line-clamp-3">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
