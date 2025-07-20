import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Trophy, 
  Bell, 
  Coins, 
  User,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-nav-gradient border-b border-white/10 backdrop-blur-lg ">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Main Navigation */}
          <div className="flex items-center space-x-8">
            {/* Skull Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black text-lg font-bold">💀</span>
              </div>
              <span className="text-white font-bold text-xl tracking-wider">STREAM</span>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-white hover:text-neon-glow font-medium">
                HOMEPAGE
              </Button>
              <Button variant="ghost" className="text-white/80 hover:text-white font-medium">
                PREMIUM
              </Button>
              <Button variant="ghost" className="text-white/80 hover:text-white font-medium">
                LIVE
              </Button>
              <Link to="/search">
              <Button variant="ghost" className="text-white/80 hover:text-white font-medium">
                CATEGORIES
              </Button>
              </Link>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Action Icons */}
            <div className="hidden sm:flex items-center space-x-3">
             
  <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
    <Search className="h-5 w-5" />
  </Button>

              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                <Trophy className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white/80 hover:text-white">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>

            {/* Coin Count */}
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1">
              <Coins className="h-4 w-4 text-yellow-400" />
              <span className="text-white font-medium text-sm">1,234</span>
            </div>

            {/* User Avatar */}
            <div className="relative">
              <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/20">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-nav-bg"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;