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
    <div className="relative group cursor-pointer">
      <Card className="relative overflow-hidden bg-card border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-card hover:z-10">
        {/* Movie Poster */}
        <div className="aspect-[2/3] overflow-hidden">
          <img 
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Hover Overlay with Movie Info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            {/* Play Button */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition-colors">
                <Play className="h-6 w-6 text-white fill-current ml-1" />
              </div>
            </div>
            
            {/* Movie Information */}
            <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{title}</h3>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-white/90 text-sm font-medium">{rating}</span>
                </div>
                <span className="text-white/70 text-sm">{year}</span>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-white/20 px-2 py-1 rounded text-xs text-white font-medium">{genre}</span>
                <span className="bg-white/20 px-2 py-1 rounded text-xs text-white font-medium">HD</span>
              </div>
              
              <p className="text-white/90 text-sm line-clamp-3 leading-relaxed">{overview}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MovieCard;