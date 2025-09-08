import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { TouristDashboard } from './components/TouristDashboard';
import { ProfilePage } from './components/ProfilePage';
import { IncidentReportPage } from './components/IncidentReportPage';
import { AdminPanel } from './components/AdminPanel';
import { TourChatbot } from './components/TourChatbot';
import { RecommendationsPage } from './components/RecommendationsPage';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Alert, AlertDescription } from './components/ui/alert';
import { 
  WifiOff, 
  Phone, 
  Shield, 
  MapPin,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Simulate online/offline status
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly go offline for demo purposes (5% chance)
      if (Math.random() < 0.05) {
        setIsOnline(false);
        setTimeout(() => setIsOnline(true), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleStartJourney = () => {
    setCurrentScreen('dashboard');
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Offline Mode Component
  const OfflineMode = () => (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 text-center space-y-6">
          <div className="p-4 rounded-full bg-orange-100 w-fit mx-auto">
            <WifiOff className="h-8 w-8 text-orange-600" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Offline Mode</h2>
            <p className="text-muted-foreground">
              You're currently offline. Essential safety features are still available.
            </p>
          </div>

          <Alert className="border-orange-500 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-700">
              GPS location and cached safety zones are available. SOS will use SMS backup.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              size="lg" 
              className="bg-red-500 hover:bg-red-600 text-white flex-col space-y-1 h-20"
            >
              <Phone className="h-6 w-6" />
              <span className="text-sm">Emergency SMS</span>
            </Button>

            <Button 
              size="lg" 
              variant="outline" 
              className="border-[var(--safety-teal)] text-[var(--safety-teal)] flex-col space-y-1 h-20"
            >
              <MapPin className="h-6 w-6" />
              <span className="text-sm">Cached Map</span>
            </Button>
          </div>

          <div className="pt-4">
            <Badge className="bg-orange-100 text-orange-800">
              Attempting to reconnect...
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onStartJourney={handleStartJourney} />;
      case 'dashboard':
        return <TouristDashboard />;
      case 'recommendations':
        return <RecommendationsPage />;
      case 'chatbot':
        return <TourChatbot />;
      case 'profile':
        return <ProfilePage />;
      case 'report':
        return <IncidentReportPage />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <LandingPage onStartJourney={handleStartJourney} />;
    }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <Navigation
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isOnline={isOnline}
      />

      {/* Main Content */}
      <main className="relative">
        {renderCurrentScreen()}
      </main>

      {/* Offline Mode Overlay */}
      {!isOnline && <OfflineMode />}

      {/* Demo Floating Action Button (for hackathon demo) */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 p-0 bg-gradient-to-r from-[var(--safety-teal)] to-[var(--safety-blue)] hover:from-[var(--safety-blue)] hover:to-[var(--safety-green)] text-white shadow-lg"
          onClick={() => setCurrentScreen(currentScreen === 'admin' ? 'dashboard' : 'admin')}
        >
          <Shield className="h-6 w-6" />
        </Button>
      </div>

      {/* Global Styles for Demo */}
      <style jsx global>{`
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: var(--safety-teal);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: var(--safety-blue);
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.2s ease-in-out;
        }

        /* Custom gradient backgrounds */
        .gradient-bg {
          background: linear-gradient(135deg, var(--safety-light-teal) 0%, var(--safety-light-blue) 100%);
        }

        /* Glassmorphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Animation utilities */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }

        /* Loading animation */
        @keyframes pulse-ring {
          0% { transform: scale(0.33); }
          80%, 100% { opacity: 0; }
        }

        .pulse-ring {
          animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
      `}</style>
    </div>
  );
}