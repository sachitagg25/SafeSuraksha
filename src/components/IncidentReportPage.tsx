import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { 
  AlertTriangle, 
  Camera, 
  MapPin, 
  Clock, 
  Send, 
  Upload,
  CheckCircle,
  Users,
  Shield,
  FileText,
  X
} from 'lucide-react';

export function IncidentReportPage() {
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [reportForm, setReportForm] = useState({
    type: '',
    severity: '',
    title: '',
    description: '',
    location: 'Times Square, New York, NY (Auto-detected)',
    anonymous: false
  });

  const incidentTypes = [
    { value: 'safety', label: 'Safety Concern', icon: Shield },
    { value: 'crime', label: 'Crime/Theft', icon: AlertTriangle },
    { value: 'medical', label: 'Medical Emergency', icon: FileText },
    { value: 'harassment', label: 'Harassment', icon: Users },
    { value: 'scam', label: 'Tourist Scam', icon: AlertTriangle },
    { value: 'other', label: 'Other', icon: FileText }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low - Minor concern', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium - Needs attention', color: 'bg-yellow-500' },
    { value: 'high', label: 'High - Urgent response needed', color: 'bg-orange-500' },
    { value: 'critical', label: 'Critical - Immediate danger', color: 'bg-red-500' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulate image upload
      const newImages = Array.from(files).map((file, index) => 
        `https://images.unsplash.com/photo-1588268393007-068bc70a443d?w=200&h=200&fit=crop&crop=center&auto=format`
      );
      setUploadedImages(prev => [...prev, ...newImages].slice(0, 3)); // Max 3 images
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Emergency Services API Integration
    const incidentReport = {
      id: `INC_${Date.now()}`,
      timestamp: new Date().toISOString(),
      location: {
        address: reportForm.location,
        coordinates: { lat: 40.7580, lng: -73.9855 } // GPS coordinates
      },
      incident: {
        type: reportForm.type,
        severity: reportForm.severity,
        title: reportForm.title,
        description: reportForm.description
      },
      reporter: {
        touristId: 'SAFE_123456',
        verified: true,
        anonymous: reportForm.anonymous
      },
      media: uploadedImages,
      emergencyServices: {
        notifyPolice: reportForm.severity === 'critical' || reportForm.type === 'crime',
        notifyMedical: reportForm.type === 'medical',
        notifyFire: reportForm.type === 'fire',
        priorityLevel: reportForm.severity
      },
      autoActions: {
        alertNearbyTourists: true,
        updateSafetyMap: true,
        notifyAuthorities: reportForm.severity === 'high' || reportForm.severity === 'critical'
      }
    };

    console.log('Emergency Services API Called:', incidentReport);
    
    // Simulate API calls to emergency services
    if (incidentReport.emergencyServices.notifyPolice) {
      console.log('Police notified automatically');
    }
    if (incidentReport.emergencyServices.notifyMedical) {
      console.log('Medical services alerted');
    }

    setReportSubmitted(true);
    setTimeout(() => setReportSubmitted(false), 5000);
  };

  const recentReports = [
    {
      id: 1,
      type: 'safety',
      title: 'Suspicious Activity Near Hotel',
      location: 'Manhattan, NY',
      time: '2 hours ago',
      status: 'investigating',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'scam',
      title: 'Fake Taxi Overcharging',
      location: 'JFK Airport, NY',
      time: '5 hours ago',
      status: 'resolved',
      severity: 'low'
    },
    {
      id: 3,
      type: 'crime',
      title: 'Pickpocketing Attempt',
      location: 'Central Park, NY',
      time: '1 day ago',
      status: 'reported',
      severity: 'high'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--safety-light-teal)] to-[var(--safety-light-blue)] pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Report an Incident</h1>
          <p className="text-muted-foreground">Help keep fellow tourists safe by reporting safety concerns or incidents</p>
        </div>

        {/* Success Alert */}
        {reportSubmitted && (
          <Alert className="mb-6 border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700 font-medium">
              Report submitted successfully! Authorities and nearby tourists have been notified. Thank you for helping keep everyone safe.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Report Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-[var(--safety-teal)]" />
                  <span>Incident Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Incident Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type">Incident Type</Label>
                    <Select value={reportForm.type} onValueChange={(value) => setReportForm({...reportForm, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent>
                        {incidentTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center space-x-2">
                                <Icon className="h-4 w-4" />
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Severity Level */}
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity Level</Label>
                    <Select value={reportForm.severity} onValueChange={(value) => setReportForm({...reportForm, severity: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity level" />
                      </SelectTrigger>
                      <SelectContent>
                        {severityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                              <span>{level.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Incident Title</Label>
                    <Input
                      id="title"
                      placeholder="Brief description of the incident"
                      value={reportForm.title}
                      onChange={(e) => setReportForm({...reportForm, title: e.target.value})}
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--safety-teal)]" />
                      <Input
                        id="location"
                        value={reportForm.location}
                        onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Location auto-detected via GPS</p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide as much detail as possible about what happened..."
                      value={reportForm.description}
                      onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                      rows={4}
                      required
                    />
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-3">
                    <Label>Photos/Evidence (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[var(--safety-teal)] transition-colors">
                      <div className="space-y-2">
                        <Camera className="h-8 w-8 text-gray-400 mx-auto" />
                        <div>
                          <label htmlFor="photos" className="cursor-pointer">
                            <span className="text-[var(--safety-teal)] hover:underline">Upload photos</span>
                            <span className="text-gray-500"> or drag and drop</span>
                          </label>
                          <input
                            id="photos"
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB (Max 3 files)</p>
                      </div>
                    </div>

                    {/* Uploaded Images */}
                    {uploadedImages.length > 0 && (
                      <div className="flex space-x-3">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Upload ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Emergency Services Integration Notice */}
                  {(reportForm.severity === 'critical' || reportForm.severity === 'high') && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div className="text-sm">
                          <h4 className="font-medium text-red-700 mb-1">Emergency Services Will Be Notified</h4>
                          <p className="text-red-600">
                            Due to the {reportForm.severity} severity level, this incident will be automatically 
                            forwarded to appropriate emergency services and local authorities for immediate response.
                          </p>
                          <div className="mt-2 space-y-1 text-xs text-red-600">
                            {reportForm.type === 'crime' && <p>• Police will be notified</p>}
                            {reportForm.type === 'medical' && <p>• Medical services will be alerted</p>}
                            <p>• Nearby tourists will receive safety alerts</p>
                            <p>• Your location will be shared with responders</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      type="submit" 
                      className={`flex-1 ${
                        reportForm.severity === 'critical' 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-[var(--safety-teal)] hover:bg-[var(--safety-blue)]'
                      }`}
                      disabled={!reportForm.type || !reportForm.severity || !reportForm.title}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {reportForm.severity === 'critical' ? 'Emergency Report' : 'Submit Report'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1 border-[var(--safety-green)] text-[var(--safety-green)] hover:bg-[var(--safety-light-green)]"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Share with Tourists
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recent Reports */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-red-500 text-red-500 hover:bg-red-50"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency SOS
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[var(--safety-teal)] text-[var(--safety-teal)] hover:bg-[var(--safety-light-teal)]"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Find Safe Zone
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-[var(--safety-blue)] text-[var(--safety-blue)] hover:bg-[var(--safety-light-blue)]"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Contact Authorities
                </Button>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-[var(--safety-teal)]" />
                  <span>Recent Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentReports.map((report) => (
                  <div key={report.id} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{report.title}</h4>
                      <Badge 
                        variant={
                          report.status === 'resolved' ? 'default' :
                          report.status === 'investigating' ? 'secondary' : 'outline'
                        }
                        className="text-xs"
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{report.location}</span>
                      </div>
                      <span>{report.time}</span>
                    </div>
                    <div className="mt-2">
                      <Badge 
                        className={
                          report.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          report.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }
                      >
                        {report.severity} priority
                      </Badge>
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