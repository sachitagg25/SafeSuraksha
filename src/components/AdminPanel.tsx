import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';
import mohaliMapImage from 'figma:asset/91768c5f11564e004e69b934816a90dba0d940d9.png';
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Phone,
  Send,
  Eye,
  Activity,
  TrendingUp,
  Radio,
  Zap,
  CheckCircle,
  Search
} from 'lucide-react';

export function AdminPanel() {
  const [selectedIncident, setSelectedIncident] = useState<number | null>(null);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const stats = [
    {
      title: 'Active Tourists',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'text-[var(--safety-teal)]'
    },
    {
      title: 'SOS Alerts',
      value: '3',
      change: '-2 from yesterday',
      icon: AlertTriangle,
      color: 'text-red-500'
    },
    {
      title: 'Incidents Today',
      value: '15',
      change: '+5%',
      icon: Shield,
      color: 'text-orange-500'
    },
    {
      title: 'Response Time',
      value: '1.2min',
      change: '-15%',
      icon: Clock,
      color: 'text-green-500'
    }
  ];

  const sosAlerts = [
    {
      id: 1,
      tourist: 'Sarah J.',
      location: 'Central Park, NY',
      time: '2 min ago',
      type: 'Emergency SOS',
      status: 'responding',
      coordinates: '40.7829, -73.9654'
    },
    {
      id: 2,
      tourist: 'Mike R.',
      location: 'Times Square, NY',
      time: '15 min ago',
      type: 'Medical Emergency',
      status: 'resolved',
      coordinates: '40.7580, -73.9855'
    },
    {
      id: 3,
      tourist: 'Anna L.',
      location: 'Brooklyn Bridge, NY',
      time: '1 hour ago',
      type: 'Safety Concern',
      status: 'investigating',
      coordinates: '40.7061, -73.9969'
    }
  ];

  const incidents = [
    {
      id: 1,
      title: 'Pickpocketing Reports',
      location: 'Subway Station 42nd St',
      severity: 'high',
      reports: 5,
      time: '30 min ago',
      status: 'active'
    },
    {
      id: 2,
      title: 'Fake Taxi Scam',
      location: 'JFK Airport',
      severity: 'medium',
      reports: 3,
      time: '2 hours ago',
      status: 'investigating'
    },
    {
      id: 3,
      title: 'Weather Alert',
      location: 'Manhattan Area',
      severity: 'low',
      reports: 12,
      time: '4 hours ago',
      status: 'broadcast'
    }
  ];

  const touristLocations = [
    { id: 1, area: 'Times Square', count: 342, risk: 'low' },
    { id: 2, area: 'Central Park', count: 198, risk: 'medium' },
    { id: 3, area: 'Brooklyn Bridge', count: 156, risk: 'low' },
    { id: 4, area: 'Statue of Liberty', count: 89, risk: 'low' },
    { id: 5, area: 'Empire State Building', count: 67, risk: 'high' }
  ];

  const handleBroadcast = () => {
    // Simulate broadcasting alert
    setBroadcastMessage('');
    alert('Alert broadcast sent to all tourists in the area!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--safety-light-teal)] to-[var(--safety-light-blue)] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Authority Dashboard</h1>
            <p className="text-muted-foreground">Real-time monitoring and emergency response coordination</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-800">
              <Activity className="h-3 w-3 mr-1" />
              All Systems Online
            </Badge>
            <Button className="bg-red-500 hover:bg-red-600">
              <Radio className="h-4 w-4 mr-2" />
              Emergency Broadcast
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-green-600">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gray-100`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Live Map and SOS Alerts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Monitoring Map */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-[var(--safety-teal)]" />
                    <span>Live Tourist Monitoring</span>
                  </div>
                  <Badge className="bg-[var(--safety-teal)] text-white">
                    {touristLocations.reduce((sum, loc) => sum + loc.count, 0)} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <ImageWithFallback
                    src={mohaliMapImage}
                    alt="Mohali Emergency Monitoring - Live Map"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Heatmap Indicators */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Risk Levels</h4>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-xs">High Risk</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-xs">Medium Risk</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-xs">Low Risk</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active SOS Indicators */}
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="absolute -inset-2 border-2 border-red-500 rounded-full opacity-50 animate-ping"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active SOS Alerts */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span>Active SOS Alerts</span>
                  <Badge className="bg-red-100 text-red-800">3</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sosAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        alert.status === 'responding' ? 'bg-red-500' :
                        alert.status === 'investigating' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}>
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{alert.tourist} - {alert.type}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          <span>{alert.location}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{alert.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{alert.coordinates}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        className={
                          alert.status === 'responding' ? 'bg-red-100 text-red-800' :
                          alert.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }
                      >
                        {alert.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Controls and Reports */}
          <div className="space-y-6">
            {/* Emergency Broadcast */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Radio className="h-5 w-5 text-[var(--safety-blue)]" />
                  <span>Emergency Broadcast</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type your emergency alert message..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  rows={3}
                />
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleBroadcast}
                    className="flex-1 bg-red-500 hover:bg-red-600"
                    disabled={!broadcastMessage.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Broadcast
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Alert will be sent to all tourists in the selected area
                </p>
              </CardContent>
            </Card>

            {/* Tourist Distribution */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-[var(--safety-green)]" />
                  <span>Tourist Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {touristLocations.map((location) => (
                  <div key={location.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        location.risk === 'high' ? 'bg-red-500' :
                        location.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <span className="text-sm font-medium">{location.area}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{location.count}</div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          location.risk === 'high' ? 'border-red-500 text-red-700' :
                          location.risk === 'medium' ? 'border-yellow-500 text-yellow-700' :
                          'border-green-500 text-green-700'
                        }`}
                      >
                        {location.risk}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Incidents */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-[var(--safety-teal)]" />
                  <span>Recent Incidents</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {incidents.map((incident) => (
                  <div 
                    key={incident.id} 
                    className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => setSelectedIncident(incident.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{incident.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{incident.location}</span>
                          <span>•</span>
                          <span>{incident.reports} reports</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{incident.time}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge 
                          className={
                            incident.severity === 'high' ? 'bg-red-100 text-red-800' :
                            incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }
                        >
                          {incident.severity}
                        </Badge>
                        <div>
                          <Button size="sm" variant="ghost" className="h-6 px-2">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
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