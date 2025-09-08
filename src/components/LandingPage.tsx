import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Smartphone, 
  Users, 
  Clock,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface LandingPageProps {
  onStartJourney: () => void;
}

export function LandingPage({ onStartJourney }: LandingPageProps) {
  const features = [
    {
      icon: Shield,
      title: "Real-time Safety Alerts",
      description: "Get instant notifications about weather, crime, and crowd density in your area.",
      color: "from-[var(--safety-teal)] to-[var(--safety-blue)]"
    },
    {
      icon: MapPin,
      title: "Secure Digital ID",
      description: "Blockchain-verified tourist ID with secure health info and emergency contacts.",
      color: "from-[var(--safety-blue)] to-[var(--safety-green)]"
    },
    {
      icon: AlertTriangle,
      title: "Emergency SOS",
      description: "One-tap emergency response with GPS location sharing to local authorities.",
      color: "from-[var(--safety-green)] to-[var(--safety-teal)]"
    }
  ];

  const stats = [
    { label: "Cities Covered", value: "200+", icon: MapPin },
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Response Time", value: "<2min", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--safety-light-teal)] via-white to-[var(--safety-light-blue)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-[var(--safety-teal)] to-[var(--safety-blue)] text-white border-0">
                  🚀 Hackathon Project 2025
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[var(--safety-teal)] to-[var(--safety-blue)] bg-clip-text text-transparent">
                  Smart Tourist Safety Monitoring
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  Travel confidently with AI-powered safety monitoring, real-time alerts, and instant emergency response for tourists worldwide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={onStartJourney}
                  className="bg-gradient-to-r from-[var(--safety-teal)] to-[var(--safety-blue)] hover:from-[var(--safety-blue)] hover:to-[var(--safety-green)] text-white border-0 shadow-lg"
                >
                  Start Your Safe Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-[var(--safety-teal)] text-[var(--safety-teal)] hover:bg-[var(--safety-light-teal)]">
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-[var(--safety-teal)] to-[var(--safety-blue)]">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-[var(--safety-teal)]">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--safety-teal)]/20 to-[var(--safety-blue)]/20 rounded-3xl transform rotate-6"></div>
              <Card className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm border-0">
                <CardContent className="p-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1749410348464-852a98a001b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwc2FmZXR5JTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc1NjU0ODE2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Tourist Safety Mobile App"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">Stay Protected</h3>
                    <p className="text-sm opacity-90">Real-time monitoring</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Safety Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced technology meets human safety needs for the ultimate travel protection experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-[var(--safety-teal)] to-[var(--safety-blue)] text-white border-0 overflow-hidden">
            <CardContent className="p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 opacity-10">
                <Shield className="h-32 w-32" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6">Trusted by Tourists & Authorities Worldwide</h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5" />
                      <span>Blockchain-secured identity verification</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5" />
                      <span>GDPR compliant data protection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5" />
                      <span>24/7 emergency response coordination</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5" />
                      <span>Multi-language support</span>
                    </div>
                  </div>
                  <div>
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1730085422157-6783ac9306b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBzZWN1cml0eSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2NTQ4MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Travel Security Technology"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}