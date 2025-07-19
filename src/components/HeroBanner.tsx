import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, VolumeX } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-hero-gradient"></div>
      
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 left-32 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-white/8 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-2 p-8 transform rotate-12">
          {Array.from({ length: 64 }).map((_, i) => (
            <div 
              key={i} 
              className="bg-white/20 rounded-sm"
              style={{
                animationDelay: `${i * 0.1}s`,
                animation: 'glow-pulse 3s ease-in-out infinite'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-8 animate-slide-in">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider">
              DAN DA DAN
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-neon-glow to-hero-gradient-end rounded-full shadow-glow"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="play" size="lg" className="px-8 py-3 text-lg">
              <Play className="h-6 w-6 mr-2 fill-current" />
              PLAY
            </Button>
            <Button variant="mute" size="lg" className="px-6 py-3">
              <VolumeX className="h-6 w-6" />
            </Button>
          </div>

          {/* Description */}
          <div className="max-w-lg">
            <p className="text-white/90 text-lg leading-relaxed">
              In a bet to prove whether ghosts or aliens exist, two high schoolers face terrifying paranormal threats, gain superpowers and maybe even fall in love.
            </p>
          </div>

          {/* Additional Info */}
          <div className="flex items-center space-x-6 text-white/80">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★★★★☆</span>
              <span>4.2</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <span>2024</span>
            <div className="w-px h-4 bg-white/30"></div>
            <span className="bg-white/20 px-2 py-1 rounded text-sm">HD</span>
            <span className="bg-white/20 px-2 py-1 rounded text-sm">16+</span>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroBanner;