import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  MapPin, 
  Star, 
  Clock, 
  DollarSign, 
  Utensils, 
  Building, 
  Coffee,
  ShoppingBag,
  Camera,
  Heart,
  Navigation,
  Filter,
  Search,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';

interface Recommendation {
  id: string;
  name: string;
  type: string;
  category: string;
  rating: number;
  priceLevel: number;
  distance: string;
  openNow: boolean;
  image: string;
  description: string;
  tags: string[];
  coordinates: { lat: number; lng: number };
  estimatedTime?: string;
  specialOffer?: string;
}

export function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState('food');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userLocation] = useState({ lat: 40.7580, lng: -73.9855 }); // Times Square

  const recommendations: Record<string, Recommendation[]> = {
    food: [
      {
        id: '1',
        name: "Joe's Pizza",
        type: "Italian Restaurant",
        category: "food",
        rating: 4.5,
        priceLevel: 2,
        distance: "0.2 mi",
        openNow: true,
        image: "https://images.unsplash.com/photo-1588560107833-167198a53677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHJlY29tbWVuZGF0aW9uc3xlbnwxfHx8fDE3NTY1NzQ5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Authentic New York style pizza with crispy thin crust",
        tags: ["Pizza", "Quick Bite", "Takeout"],
        coordinates: { lat: 40.7580, lng: -73.9855 },
        estimatedTime: "5-10 min",
        specialOffer: "10% off for tourists"
      },
      {
        id: '2',
        name: "Katz's Delicatessen",
        type: "Jewish Deli",
        category: "food",
        rating: 4.7,
        priceLevel: 3,
        distance: "0.8 mi",
        openNow: true,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkZWxpJTIwZm9vZHxlbnwxfHx8fDE3NTY1NzQ5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Historic deli famous for pastrami sandwiches since 1888",
        tags: ["Deli", "Historic", "Pastrami"],
        coordinates: { lat: 40.7223, lng: -73.9876 }
      },
      {
        id: '3',
        name: "Xi'an Famous Foods",
        type: "Chinese Restaurant",
        category: "food",
        rating: 4.3,
        priceLevel: 2,
        distance: "0.5 mi",
        openNow: true,
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhuaW9kbGVzJTIwYXNpYW58ZW58MXx8fHwxNzU2NTc0OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Hand-pulled noodles and authentic Xi'an street food",
        tags: ["Noodles", "Spicy", "Authentic"],
        coordinates: { lat: 40.7505, lng: -73.9934 }
      }
    ],
    places: [
      {
        id: '4',
        name: "Statue of Liberty",
        type: "Monument",
        category: "places",
        rating: 4.6,
        priceLevel: 3,
        distance: "2.1 mi",
        openNow: true,
        image: "https://images.unsplash.com/photo-1728587155266-a8887ad11240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwYXR0cmFjdGlvbnMlMjBueWN8ZW58MXx8fHwxNzU2NTc0OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Iconic symbol of freedom and democracy",
        tags: ["Monument", "Historic", "Ferry Required"],
        coordinates: { lat: 40.6892, lng: -74.0445 },
        estimatedTime: "Half day trip"
      },
      {
        id: '5',
        name: "Central Park",
        type: "Park",
        category: "places",
        rating: 4.8,
        priceLevel: 1,
        distance: "0.9 mi",
        openNow: true,
        image: "https://images.unsplash.com/photo-1539307235172-27ea7e13ea1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjZW50cmFsJTIwcGFyayUyMG55Y3xlbnwxfHx8fDE3NTY1NzQ5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Urban oasis with lakes, trails, and attractions",
        tags: ["Park", "Walking", "Nature"],
        coordinates: { lat: 40.7829, lng: -73.9654 }
      },
      {
        id: '6',
        name: "Empire State Building",
        type: "Landmark",
        category: "places",
        rating: 4.4,
        priceLevel: 4,
        distance: "0.3 mi",
        openNow: true,
        image: "https://images.unsplash.com/photo-1529295947539-fb5fa6c0e069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXBpcmUlMjBzdGF0ZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc1NjU3NDkxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Art Deco skyscraper with stunning city views",
        tags: ["Skyscraper", "Views", "Historic"],
        coordinates: { lat: 40.7484, lng: -73.9857 }
      }
    ],
    experiences: [
      {
        id: '7',
        name: "Broadway Show",
        type: "Entertainment",
        category: "experiences",
        rating: 4.9,
        priceLevel: 4,
        distance: "0.1 mi",
        openNow: true,
        image: "https://images.unsplash.com/photo-1635193000702-aa2668fdedca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGV4cGVyaWVuY2VzJTIwdHJhdmVsfGVufDF8fHx8MTc1NjU3NDkxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "World-class theatrical performances in the Theater District",
        tags: ["Theater", "Entertainment", "Culture"],
        coordinates: { lat: 40.7590, lng: -73.9845 },
        estimatedTime: "2-3 hours"
      },
      {
        id: '8',
        name: "Food Tour",
        type: "Culinary Experience",
        category: "experiences",
        rating: 4.6,
        priceLevel: 3,
        distance: "0.0 mi",
        openNow: true,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdG91cnxlbnwxfHx8fDE3NTY1NzQ5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Guided tour through NYC's best food neighborhoods",
        tags: ["Food", "Walking", "Guided"],
        coordinates: { lat: 40.7580, lng: -73.9855 },
        estimatedTime: "3-4 hours"
      }
    ]
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const renderPriceLevel = (level: number) => {
    return Array(4).fill(0).map((_, i) => (
      <DollarSign 
        key={i} 
        className={`h-3 w-3 ${i < level ? 'text-green-500' : 'text-gray-300'}`} 
      />
    ));
  };

  const filteredRecommendations = recommendations[activeTab]?.filter(rec =>
    rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--safety-light-teal)] to-[var(--safety-light-blue)] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Amazing Places</h1>
          <p className="text-muted-foreground">Personalized recommendations based on your location and preferences</p>
        </div>

        {/* Location Info */}
        <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[var(--safety-teal)]">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Current Location</h3>
                  <p className="text-sm text-muted-foreground">Landran, Mohali, Punjab</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                <Navigation className="h-3 w-3 mr-1" />
                GPS Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search restaurants, attractions, experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="border-[var(--safety-teal)] text-[var(--safety-teal)]">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="food" className="flex items-center space-x-2">
              <Utensils className="h-4 w-4" />
              <span>Food & Dining</span>
            </TabsTrigger>
            <TabsTrigger value="places" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Attractions</span>
            </TabsTrigger>
            <TabsTrigger value="experiences" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Experiences</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[var(--safety-teal)]">
                    {filteredRecommendations.length}
                  </div>
                  <p className="text-sm text-muted-foreground">Found nearby</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[var(--safety-green)]">
                    {filteredRecommendations.filter(r => r.openNow).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Open now</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[var(--safety-blue)]">
                    {Math.round(filteredRecommendations.reduce((acc, r) => acc + r.rating, 0) / filteredRecommendations.length * 10) / 10 || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Avg rating</p>
                </CardContent>
              </Card>
              <Card className="border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[var(--warning-orange)]">
                    {filteredRecommendations.filter(r => r.specialOffer).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Special offers</p>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((rec) => (
                <Card key={rec.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={rec.image}
                      alt={rec.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 space-y-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full w-8 h-8 p-0 bg-white/90 backdrop-blur-sm"
                        onClick={() => toggleFavorite(rec.id)}
                      >
                        <Heart className={`h-4 w-4 ${favorites.includes(rec.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge className={`${rec.openNow ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {rec.openNow ? 'Open' : 'Closed'}
                      </Badge>
                    </div>
                    {rec.specialOffer && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-[var(--warning-orange)] text-white">
                          <Award className="h-3 w-3 mr-1" />
                          Special Offer
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-[var(--safety-teal)] transition-colors">
                          {rec.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{rec.type}</p>
                      </div>

                      <p className="text-sm">{rec.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{rec.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderPriceLevel(rec.priceLevel)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{rec.distance}</span>
                        </div>
                        {rec.estimatedTime && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{rec.estimatedTime}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {rec.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {rec.specialOffer && (
                        <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
                          <p className="text-sm text-orange-700 font-medium">{rec.specialOffer}</p>
                        </div>
                      )}

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1 bg-[var(--safety-teal)] hover:bg-[var(--safety-blue)]">
                          <Navigation className="h-3 w-3 mr-1" />
                          Directions
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-[var(--safety-teal)] text-[var(--safety-teal)]">
                          <Users className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRecommendations.length === 0 && (
              <div className="text-center py-12">
                <div className="p-4 rounded-full bg-gray-100 w-fit mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No recommendations found</h3>
                <p className="text-muted-foreground">Try adjusting your search or browse different categories</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}