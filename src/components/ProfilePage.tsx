import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User, 
  Shield, 
  Phone, 
  Mail, 
  Heart, 
  Globe, 
  Bell, 
  Lock,
  CheckCircle,
  Edit3,
  Camera,
  MapPin,
  Calendar
} from 'lucide-react';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    nationality: 'United States',
    language: 'English',
    emergencyContact: 'John Johnson - +1 (555) 987-6543',
    medicalInfo: 'Type 1 Diabetes, Allergic to Penicillin',
    preferences: {
      alertsEnabled: true,
      locationSharing: true,
      emergencyNotifications: true,
      weatherAlerts: true
    }
  });

  const travelHistory = [
    { city: 'Paris, France', date: 'Dec 2024', duration: '5 days', status: 'completed' },
    { city: 'Tokyo, Japan', date: 'Oct 2024', duration: '7 days', status: 'completed' },
    { city: 'Barcelona, Spain', date: 'Aug 2024', duration: '4 days', status: 'completed' },
    { city: 'New York, USA', date: 'Jan 2025', duration: 'Current', status: 'active' }
  ];

  const securityFeatures = [
    { name: 'Blockchain Identity Verification', status: 'active' },
    { name: 'Biometric Authentication', status: 'active' },
    { name: 'End-to-End Encryption', status: 'active' },
    { name: 'Emergency Contact Sync', status: 'active' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--safety-light-teal)] to-[var(--safety-light-blue)] pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tourist Profile</h1>
            <p className="text-muted-foreground">Manage your secure digital identity and travel preferences</p>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-[var(--safety-teal)] hover:bg-[var(--safety-blue)]"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & ID */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-24 h-24 mx-auto border-4 border-[var(--safety-teal)]">
                    <AvatarImage src="/api/placeholder/96/96" alt="Profile" />
                    <AvatarFallback className="text-2xl bg-[var(--safety-light-teal)]">SJ</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="mb-2">{profile.name}</CardTitle>
                <Badge className="bg-green-100 text-green-800 mb-4">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Tourist
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-[var(--safety-teal)]" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-[var(--safety-teal)]" />
                    <span className="text-sm">{profile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-[var(--safety-teal)]" />
                    <span className="text-sm">{profile.nationality}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-[var(--safety-green)]" />
                  <span>Security Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{feature.name}</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details & Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-[var(--safety-teal)]" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={profile.nationality}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <Input
                    id="language"
                    value={profile.language}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    value={profile.emergencyContact}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="medical">Medical Information</Label>
                  <Textarea
                    id="medical"
                    value={profile.medicalInfo}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Safety Preferences */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-[var(--safety-blue)]" />
                  <span>Safety Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Safety Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive real-time safety notifications</p>
                  </div>
                  <Switch 
                    checked={profile.preferences.alertsEnabled}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Location Sharing</Label>
                    <p className="text-sm text-muted-foreground">Share location with emergency contacts</p>
                  </div>
                  <Switch 
                    checked={profile.preferences.locationSharing}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Emergency Notifications</Label>
                    <p className="text-sm text-muted-foreground">Instant alerts for emergencies</p>
                  </div>
                  <Switch 
                    checked={profile.preferences.emergencyNotifications}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weather Alerts</Label>
                    <p className="text-sm text-muted-foreground">Weather-related safety warnings</p>
                  </div>
                  <Switch 
                    checked={profile.preferences.weatherAlerts}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Travel History */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-[var(--safety-green)]" />
                  <span>Travel History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {travelHistory.map((trip, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-[var(--safety-teal)]">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{trip.city}</h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Calendar className="h-3 w-3" />
                            <span>{trip.date}</span>
                            <span>•</span>
                            <span>{trip.duration}</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        className={trip.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {trip.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}