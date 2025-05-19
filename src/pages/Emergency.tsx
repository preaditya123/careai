
import { useState } from "react";
import Header from "@/components/Header";
import { Ambulance, MapPin, Phone, Building2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface Hospital {
  id: number;
  name: string;
  address: string;
  distance: string;
  phone: string;
  waitTime: string;
}

const mockHospitals: Hospital[] = [
  {
    id: 1,
    name: "City General Hospital",
    address: "123 Medical Center Blvd",
    distance: "1.2 miles",
    phone: "(555) 123-4567",
    waitTime: "15 min",
  },
  {
    id: 2,
    name: "Memorial Health Center",
    address: "456 Healthcare Ave",
    distance: "2.5 miles",
    phone: "(555) 987-6543",
    waitTime: "25 min",
  },
  {
    id: 3,
    name: "University Medical Center",
    address: "789 Research Pkwy",
    distance: "3.8 miles",
    phone: "(555) 456-7890",
    waitTime: "10 min",
  },
];

const EmergencyPage = () => {
  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[] | null>(null);
  const [isEmergencyCalling, setIsEmergencyCalling] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;
    
    setIsSearching(true);
    
    // Simulate location search
    setTimeout(() => {
      setHospitals(mockHospitals);
      setIsSearching(false);
    }, 1500);
  };

  const handleEmergencyCall = () => {
    setIsEmergencyCalling(true);
    
    // Simulate emergency call
    setTimeout(() => {
      toast({
        title: "Emergency Services Contacted",
        description: "An ambulance has been dispatched to your location.",
      });
      setIsEmergencyCalling(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="page-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Ambulance className="text-emergency h-8 w-8" />
            <h1 className="page-header mb-0">Emergency Assistant</h1>
          </div>
          
          <Card className="border-border/50 mb-6 bg-red-500/10 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <Button 
                  variant="destructive" 
                  size="lg" 
                  className="w-full md:w-auto animate-pulse-gentle"
                  onClick={handleEmergencyCall}
                  disabled={isEmergencyCalling}
                >
                  {isEmergencyCalling ? "Contacting..." : "Call Emergency Services (911)"}
                </Button>
                <p className="text-sm text-muted-foreground">
                  For life-threatening emergencies, click to simulate a 911 call. 
                  Your location will be shared automatically with emergency responders.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50 md:col-span-1">
              <CardHeader>
                <CardTitle className="text-xl">Find Nearby Hospitals</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Your Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="Enter address or use current location"
                          className="pl-10"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isSearching || !location.trim()}>
                      {isSearching ? "Searching..." : "Search Hospitals"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Nearby Hospitals</CardTitle>
              </CardHeader>
              <CardContent>
                {isSearching && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Searching for hospitals near you...</p>
                  </div>
                )}
                
                {!hospitals && !isSearching && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Building2 className="mx-auto h-12 w-12 mb-4 opacity-30" />
                    <p>Enter your location to find nearby hospitals</p>
                  </div>
                )}
                
                {hospitals && (
                  <div className="space-y-4">
                    {hospitals.map((hospital) => (
                      <div key={hospital.id} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{hospital.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{hospital.address}</span>
                              <span className="mx-2">•</span>
                              <span>{hospital.distance}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-xs">
                            <Clock className="h-3 w-3" />
                            <span>Wait: {hospital.waitTime}</span>
                          </div>
                        </div>
                        <div className="flex mt-4 gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Phone className="h-3 w-3 mr-1" /> Call
                          </Button>
                          <Button size="sm" className="flex-1">Directions</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
