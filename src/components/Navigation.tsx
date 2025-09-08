import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home, 
  User, 
  FileText, 
  Shield, 
  Moon, 
  Sun,
  Wifi,
  WifiOff,
  MapPin,
  MessageCircle
} from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isOnline: boolean;
}

export function Navigation({ 
  currentScreen, 
  onScreenChange, 
  isDarkMode, 
  onToggleDarkMode,
  isOnline 
}: NavigationProps) {
  const screens = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'recommendations', label: 'Discover', icon: MapPin },
    { id: 'chatbot', label: 'Assistant', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'report', label: 'Report', icon: FileText },
    { id: 'admin', label: 'Admin', icon: Shield },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[var(--safety-teal)] to-[var(--safety-blue)]">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">SafarSuraksha</h1>
              <p className="text-xs text-muted-foreground">Tourist Safety Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {screens.map((screen) => {
              const Icon = screen.icon;
              return (
                <Button
                  key={screen.id}
                  variant={currentScreen === screen.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onScreenChange(screen.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{screen.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Status and Theme Toggle */}
          <div className="flex items-center space-x-3">
            {/* Online/Offline Status */}
            <Badge 
              variant={isOnline ? "default" : "destructive"}
              className="flex items-center space-x-1"
            >
              {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              <span className="text-xs">{isOnline ? 'Online' : 'Offline'}</span>
            </Badge>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleDarkMode}
              className="p-2"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex space-x-1 overflow-x-auto">
            {screens.map((screen) => {
              const Icon = screen.icon;
              return (
                <Button
                  key={screen.id}
                  variant={currentScreen === screen.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onScreenChange(screen.id)}
                  className="flex items-center space-x-1 whitespace-nowrap"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{screen.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}