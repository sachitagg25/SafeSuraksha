import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  MapPin, 
  Clock, 
  Star,
  Camera,
  Phone,
  Globe,
  Utensils,
  Building,
  Compass,
  Sparkles,
  Shield,
  Car
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
  recommendations?: Array<{
    name: string;
    type: string;
    rating: number;
    distance: string;
    image?: string;
  }>;
}

export function TourChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm SafeBot, your AI tour assistant. I can help you discover amazing places, recommend restaurants, provide safety tips, and answer questions about your destination. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "Show me nearby restaurants",
        "What are the top attractions?",
        "Safety tips for tourists",
        "Local transportation guide"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: 'Find Food', icon: Utensils, action: 'restaurants' },
    { label: 'Top Attractions', icon: Building, action: 'attractions' },
    { label: 'Safety Tips', icon: Shield, action: 'safety' },
    { label: 'Transportation', icon: Car, action: 'transport' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateBotResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const message = userMessage.toLowerCase();
    let response: Message;

    if (message.includes('restaurant') || message.includes('food') || message.includes('eat')) {
      response = {
        id: Date.now().toString(),
        content: "Here are some highly-rated restaurants near your location in New York:",
        sender: 'bot',
        timestamp: new Date(),
        recommendations: [
          {
            name: "Joe's Pizza",
            type: "Italian • Pizza",
            rating: 4.5,
            distance: "0.2 mi",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=150&fit=crop"
          },
          {
            name: "Katz's Delicatessen",
            type: "Deli • American",
            rating: 4.7,
            distance: "0.8 mi",
            image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=150&fit=crop"
          },
          {
            name: "Xi'an Famous Foods",
            type: "Chinese • Noodles",
            rating: 4.3,
            distance: "0.5 mi",
            image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=150&fit=crop"
          }
        ]
      };
    } else if (message.includes('attraction') || message.includes('tourist') || message.includes('visit')) {
      response = {
        id: Date.now().toString(),
        content: "Here are the top attractions you should visit in New York:",
        sender: 'bot',
        timestamp: new Date(),
        recommendations: [
          {
            name: "Statue of Liberty",
            type: "Monument • Historical",
            rating: 4.6,
            distance: "2.1 mi",
            image: "https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=200&h=150&fit=crop"
          },
          {
            name: "Central Park",
            type: "Park • Recreation",
            rating: 4.8,
            distance: "0.9 mi",
            image: "https://images.unsplash.com/photo-1539307235172-27ea7e13ea1a?w=200&h=150&fit=crop"
          },
          {
            name: "Empire State Building",
            type: "Landmark • Views",
            rating: 4.4,
            distance: "0.3 mi",
            image: "https://images.unsplash.com/photo-1529295947539-fb5fa6c0e069?w=200&h=150&fit=crop"
          }
        ]
      };
    } else if (message.includes('safety') || message.includes('safe') || message.includes('danger')) {
      response = {
        id: Date.now().toString(),
        content: "Here are important safety tips for tourists in New York:\n\n🛡️ Keep your belongings secure and be aware of pickpockets in crowded areas\n🚶‍♀️ Stay in well-lit areas, especially at night\n📱 Keep emergency contacts saved and share your location with trusted contacts\n🚇 Be cautious in subway stations late at night\n💳 Use official taxi services or ride-sharing apps\n📍 Know the location of nearby police stations and hospitals",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Show emergency contacts",
          "Find nearest police station",
          "Safety zones near me",
          "Report an incident"
        ]
      };
    } else if (message.includes('transport') || message.includes('subway') || message.includes('taxi')) {
      response = {
        id: Date.now().toString(),
        content: "Transportation options in New York:\n\n🚇 **Subway**: Most efficient for long distances. MetroCard or OMNY app required\n🚕 **Taxi**: Yellow cabs or ride-sharing (Uber/Lyft)\n🚶‍♀️ **Walking**: Great for short distances in Manhattan\n🚲 **Citi Bike**: Bike-sharing system available citywide\n🚌 **Bus**: Extensive network, good for crosstown travel\n\n💡 **Tip**: Download the MTA app for real-time subway updates!",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Subway map and routes",
          "Estimate taxi fare",
          "Find bike stations",
          "Public transport safety"
        ]
      };
    } else {
      response = {
        id: Date.now().toString(),
        content: "I can help you with:\n\n🍽️ **Restaurant recommendations** based on your location and preferences\n🏛️ **Tourist attractions** and must-see places\n🛡️ **Safety information** and emergency services\n🚇 **Transportation** guides and tips\n📍 **Local insights** and cultural information\n\nWhat would you like to know more about?",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Best local food spots",
          "Hidden gems in the area",
          "Emergency procedures",
          "Cultural etiquette tips"
        ]
      };
    }

    return response;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const botResponse = await generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      restaurants: "Show me nearby restaurants",
      attractions: "What are the top attractions?",
      safety: "Safety tips for tourists",
      transport: "Local transportation guide"
    };
    setInputValue(actionMessages[action as keyof typeof actionMessages]);
    handleSendMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--safety-light-teal)] to-[var(--safety-light-blue)] pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-[var(--safety-teal)] to-[var(--safety-blue)]">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">SurakshBot Assistant</h1>
          </div>
          <p className="text-muted-foreground">Your AI-powered tour guide and safety companion</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleQuickAction(action.action)}
                className="h-20 flex-col space-y-2 border-[var(--safety-teal)] text-[var(--safety-teal)] hover:bg-[var(--safety-light-teal)]"
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm">{action.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Chat Interface */}
        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b bg-gradient-to-r from-[var(--safety-teal)] to-[var(--safety-blue)] text-white">
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Chat with SurakshBot</span>
              <Badge className="ml-auto bg-white/20 text-white">Online</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages Area */}
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <Avatar className="w-8 h-8">
                        {message.sender === 'bot' ? (
                          <>
                            <AvatarImage src="/api/placeholder/32/32" />
                            <AvatarFallback className="bg-[var(--safety-teal)] text-white">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        ) : (
                          <>
                            <AvatarImage src="/api/placeholder/32/32" />
                            <AvatarFallback className="bg-[var(--safety-blue)] text-white">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div className={`p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-[var(--safety-teal)] text-white' 
                          : 'bg-gray-100'
                      }`}>
                        <p className="whitespace-pre-line">{message.content}</p>
                        <div className="flex items-center mt-1 text-xs opacity-70">
                          <Clock className="h-3 w-3 mr-1" />
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Recommendations */}
                {messages[messages.length - 1]?.recommendations && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                    {messages[messages.length - 1].recommendations?.map((rec, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-3">
                          <img 
                            src={rec.image} 
                            alt={rec.name}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                          <h4 className="font-medium text-sm">{rec.name}</h4>
                          <p className="text-xs text-muted-foreground">{rec.type}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs">{rec.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{rec.distance}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {messages[messages.length - 1]?.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs border-[var(--safety-teal)] text-[var(--safety-teal)] hover:bg-[var(--safety-light-teal)]"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-[var(--safety-teal)] text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me about restaurants, attractions, safety tips..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-[var(--safety-teal)] hover:bg-[var(--safety-blue)]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}