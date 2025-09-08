import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';
import mohaliMapImage from 'figma:asset/91768c5f11564e004e69b934816a90dba0d940d9.png';
import { 
  MapPin, 
  Shield, 
  AlertTriangle, 
  Phone, 
  Users, 
  Cloud, 
  Car,
  Bell,
  Clock,
  Navigation,
  Zap,
  MessageCircle,
  Utensils,
  X,
  CheckCircle
} from 'lucide-react';

export function TouristDashboard() {
  const [sosActive, setSosActive] = useState(false);
  const [geofenceAlerts, setGeofenceAlerts] = useState<Array<{
    id: string;
    type: 'entering' | 'leaving';
    zone: string;
    timestamp: Date;
    acknowledged: boolean;
  }>>([
    {
      id: '1',
      type: 'entering',
      zone: 'Safe Zone - Tourist Information Center',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      acknowledged: false
    },
    {
      id: '2',
      type: 'leaving',
      zone: 'High Risk Area - Construction Zone',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      acknowledged: true
    }
  ]);

  const alerts = [
    {
      id: 1,
      type: 'weather',
      severity: 'medium',
      title: 'Heavy Rain Alert',
      description: 'Severe weather expected in your area. Seek indoor shelter.',
      time: '2 min ago',
      icon: Cloud,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'safety',
      severity: 'high',
      title: 'Area Safety Notice',
      description: 'Increased police activity in Times Square. Stay alert.',
      time: '15 min ago',
      icon: Shield,
      color: 'bg-orange-500'
    },
    {
      id: 3,
      type: 'traffic',
      severity: 'low',
      title: 'Traffic Update',
      description: 'Light traffic on Broadway. Good time to travel.',
      time: '1 hour ago',
      icon: Car,
      color: 'bg-green-500'
    }
  ];

  const safeZones = [
    { name: 'Police Station 14th Precinct', distance: '0.2 mi', type: 'police' },
    { name: 'Tourist Information Center', distance: '0.4 mi', type: 'info' },
    { name: 'Emergency Medical Center', distance: '0.6 mi', type: 'medical' },
    { name: 'Embassy of Your Country', distance: '1.2 mi', type: 'embassy' }
  ];

  const handleSOS = () => {
    setSosActive(true);
    // Simulate emergency services integration
    const emergencyCall = {
      location: { lat: 40.7580, lng: -73.9855 },
      timestamp: new Date(),
      touristId: 'SAFE_123456',
      emergencyContacts: ['+1-911', '+1-555-POLICE'],
      medicalInfo: 'Type 1 Diabetes, Allergic to Penicillin'
    };
    
    console.log('Emergency Services API Called:', emergencyCall);
    
    // Simulate SOS activation
    setTimeout(() => setSosActive(false), 5000);
  };

  const acknowledgeGeofenceAlert = (alertId: string) => {
    setGeofenceAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--safety-light-teal)] to-[var(--safety-light-blue)] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Safety Dashboard</h1>
          <p className="text-muted-foreground">Current location: Landran, Mohali, Punjab</p>
        </div>

        {/* Geofencing Alerts */}
        {/* {geofenceAlerts.some(alert => !alert.acknowledged) && (
          <div className="mb-6 space-y-3">
            {geofenceAlerts
              .filter(alert => !alert.acknowledged)
              .map(alert => (
                <Alert key={alert.id} className={`border-2 shadow-sm ${alert.type === 'entering' ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}`}>
                  <div className="flex items-start sm:items-center justify-between gap-3 w-full">
                    <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                      <div className={`p-2 rounded-full shrink-0 ${alert.type === 'entering' ? 'bg-green-500' : 'bg-orange-500'}`}>
                        <Navigation className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm sm:text-base mb-1">
                          {alert.type === 'entering' ? 'Entered Safe Zone' : 'Left Safe Zone'}
                        </h4>
                        <AlertDescription className={`text-xs sm:text-sm leading-relaxed ${alert.type === 'entering' ? 'text-green-700' : 'text-orange-700'}`}>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <span className="font-medium">{alert.zone}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="text-xs opacity-75">{alert.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </AlertDescription>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="shrink-0 h-8 w-8 p-0"
                      onClick={() => acknowledgeGeofenceAlert(alert.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Alert>
              ))}
          </div>
        )} */}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Map and Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map View */}
            <Card className="overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-[var(--safety-teal)]" />
                    <span>Live Location & Safe Zones</span>
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800">
                    <Navigation className="h-3 w-3 mr-1" />
                    GPS Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <ImageWithFallback
                    src={mohaliMapImage}
                    alt="Mohali Safety Map - Current Location"
                    className="w-full h-80 object-cover"
                  />
                  {/* Map Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Your Location Marker */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-6 h-6 bg-[var(--safety-teal)] rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                      <div className="absolute -inset-2 border-2 border-[var(--safety-teal)] rounded-full opacity-30 animate-ping"></div>
                    </div>
                  </div>

                  {/* Safe Zone Markers */}
                  <div className="absolute top-8 right-8">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
                  </div>
                  <div className="absolute bottom-12 left-12">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"></div>
                  </div>
                  <div className="absolute top-16 left-1/3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow"></div>
                  </div>

                  {/* Map Controls */}
                  <div className="absolute bottom-4 right-4 space-y-2">
                    <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm">
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Button 
                size="lg" 
                onClick={handleSOS}
                className={`h-20 flex-col space-y-2 ${sosActive 
                  ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                  : 'bg-red-500 hover:bg-red-600'
                } text-white border-0`}
              >
                <Phone className="h-6 w-6" />
                <span className="text-sm">
                  {sosActive ? 'SOS ACTIVE' : 'Emergency SOS'}
                </span>
              </Button>

              <Button variant="outline" size="lg" className="h-20 flex-col space-y-2 border-[var(--safety-blue)] text-[var(--safety-blue)] hover:bg-[var(--safety-light-blue)]">
                <Shield className="h-6 w-6" />
                <span className="text-sm">Find Safe Zone</span>
              </Button>

              <Button variant="outline" size="lg" className="h-20 flex-col space-y-2 border-[var(--safety-green)] text-[var(--safety-green)] hover:bg-[var(--safety-light-green)]">
                <Utensils className="h-6 w-6" />
                <span className="text-sm">Find Food</span>
              </Button>

              <Button variant="outline" size="lg" className="h-20 flex-col space-y-2 border-[var(--safety-teal)] text-[var(--safety-teal)] hover:bg-[var(--safety-light-teal)]">
                <MessageCircle className="h-6 w-6" />
                <span className="text-sm">Ask SurakshBot</span>
              </Button>

              <Button variant="outline" size="lg" className="h-20 flex-col space-y-2 border-[var(--safety-teal)] text-[var(--safety-teal)] hover:bg-[var(--safety-light-teal)]">
                <Bell className="h-6 w-6" />
                <span className="text-sm">Alert Settings</span>
              </Button>
            </div>
          </div>

          {/* Right Column - Alerts and Safe Zones */}
          <div className="space-y-6">
            {/* SOS Status */}
            {sosActive && (
              <Alert className="border-red-500 bg-red-50 animate-pulse">
                <Zap className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-700 font-medium">
                  SOS Alert Sent! Emergency services have been notified. Stay calm and wait for assistance.
                </AlertDescription>
              </Alert>
            )}

            {/* Real-time Alerts */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-[var(--safety-teal)]" />
                  <span>Live Alerts</span>
                  <Badge className="ml-auto">3</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => {
                  const Icon = alert.icon;
                  return (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className={`p-2 rounded-lg ${alert.color}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{alert.title}</h4>
                          <Badge 
                            variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {alert.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Nearby Safe Zones */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-[var(--safety-green)]" />
                  <span>Nearby Safe Zones</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {safeZones.map((zone, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-green-500">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{zone.name}</h4>
                        <p className="text-xs text-gray-600 capitalize">{zone.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{zone.distance}</div>
                      <Button size="sm" variant="ghost" className="text-xs h-6 px-2">
                        Navigate
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}