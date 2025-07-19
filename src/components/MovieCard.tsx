import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Star, Play } from 'lucide-react';

interface MovieCardProps {
  title: string;
  image: string;
  rating?: number;
  year?: number;
  genre?: string;
  overview?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  title, 
  image, 
  rating = 4.0, 
  year = 2024, 
  genre = "Action",
  overview = "An exciting movie experience awaits you."
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="relative overflow-hidden bg-card border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-card">
        {/* Movie Poster */}
        <div className="aspect-[2/3] overflow-hidden">
          <img 
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition-colors">
              <Play className="h-6 w-6 text-white fill-current ml-1" />
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-card-gradient transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-white/90 text-sm">{rating}</span>
            </div>
            <span className="text-white/70 text-sm">{year}</span>
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-white/20 px-2 py-1 rounded text-xs text-white">{genre}</span>
            <span className="bg-white/20 px-2 py-1 rounded text-xs text-white">HD</span>
          </div>
          
          <p className="text-white/80 text-sm line-clamp-2">{overview}</p>
        </div>
      </Card>

      {/* Hover Preview (Optional enhancement for later) */}
      {isHovered && (
        <div className="absolute top-0 left-full ml-4 w-80 bg-card border border-white/10 rounded-lg p-4 shadow-hero z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="space-y-3">
            <h4 className="text-white font-bold text-lg">{title}</h4>
            <div className="flex items-center space-x-4 text-sm text-white/80">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{rating}</span>
              </div>
              <span>{year}</span>
              <span>{genre}</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">{overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;