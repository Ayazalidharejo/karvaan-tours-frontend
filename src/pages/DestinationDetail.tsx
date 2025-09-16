import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  MapPin, 
  Clock, 
  Camera, 
  UtensilsCrossed, 
  Bed, 
  Info,
  Shield,
  ArrowLeft,
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
  Compass,
  Heart
} from "lucide-react";

const DestinationDetail = () => {
  const { id } = useParams();

  // Mock data - in real app, fetch based on ID
  const destination = {
    id: parseInt(id || "1"),
    name: "Mount Fuji",
    nameJp: "富士山",
    category: "mountain",
    prefecture: "Shizuoka/Yamanashi",
    image: "/api/placeholder/800/500",
    gallery: [
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300",
      "/api/placeholder/400/300"
    ],
    rating: 4.9,
    reviews: 15420,
    price: "¥12,000",
    duration: "Full Day",
    description: "Japan's sacred mountain and highest peak, a UNESCO World Heritage site offering breathtaking views and spiritual significance. Mount Fuji stands at 3,776 meters and is considered the spiritual heart of Japan, attracting millions of visitors and climbers each year.",
    detailedDescription: "Mount Fuji, known as Fuji-san in Japanese, is not just Japan's highest mountain but also its most iconic symbol. This active stratovolcano has been dormant since 1707 and is considered sacred in Japanese culture. The mountain's perfect conical shape has inspired artists, poets, and pilgrims for centuries. Located on the border between Shizuoka and Yamanashi prefectures, Mount Fuji offers various ways to experience its beauty, from climbing to the summit to enjoying views from the surrounding Five Lakes region.",
    highlights: ["5th Station Views", "Lake Kawaguchi", "Oshino Hakkai", "Chureito Pagoda", "Hakone Ropeway", "Fujisan World Heritage Centre"],
    bestTime: "April to October (climbing season: July-September)",
    difficulty: "Moderate to Challenging",
    elevation: "3,776m",
    climbingTime: "5-8 hours up, 3-5 hours down",
    languages: ["English", "Japanese", "Chinese", "Korean", "Urdu"],
    nearbyAttractions: [
      {
        name: "Lake Kawaguchi",
        description: "Beautiful lake with Mount Fuji reflections, famous for cherry blossoms in spring",
        distance: "15 km",
        time: "30 minutes by car"
      },
      {
        name: "Hakone National Park",
        description: "Hot springs and scenic railways with Mount Fuji views",
        distance: "25 km", 
        time: "45 minutes by car"
      },
      {
        name: "Oshino Hakkai",
        description: "Eight sacred ponds with crystal clear water from Mount Fuji",
        distance: "20 km",
        time: "35 minutes by car"
      },
      {
        name: "Chureito Pagoda",
        description: "Iconic five-story pagoda with Mount Fuji backdrop",
        distance: "10 km",
        time: "20 minutes by car"
      }
    ],
    dining: [
      {
        name: "Hoto Noodles",
        description: "Traditional thick wheat noodles in miso soup, a Yamanashi specialty perfect after climbing",
        priceRange: "¥800-1,500",
        type: "Local Specialty"
      },
      {
        name: "Yoshida Udon",
        description: "Local specialty udon noodles with a firmer texture, served at the mountain base",
        priceRange: "¥600-1,200",
        type: "Local Specialty"
      },
      {
        name: "Fresh Trout",
        description: "Grilled trout from nearby mountain streams, often served at mountain huts",
        priceRange: "¥1,000-2,000",
        type: "Seafood"
      },
      {
        name: "Mount Fuji Beer",
        description: "Local craft beer brewed with pure Mount Fuji spring water",
        priceRange: "¥500-800",
        type: "Beverage"
      }
    ],
    accommodation: [
      {
        name: "Traditional Ryokans",
        description: "Historic Japanese inns with hot springs and Mount Fuji views",
        priceRange: "¥15,000-40,000 per night",
        amenities: ["Hot Springs", "Traditional Meals", "Fuji Views", "Cultural Experience"]
      },
      {
        name: "Lake Hotels",
        description: "Modern hotels with scenic lake and mountain views",
        priceRange: "¥8,000-25,000 per night",
        amenities: ["Lake Views", "Western Rooms", "Restaurants", "Tour Services"]
      },
      {
        name: "Mountain Lodges",
        description: "Basic accommodations for climbers, located on climbing routes",
        priceRange: "¥3,000-8,000 per night",
        amenities: ["Basic Beds", "Shared Facilities", "Climbing Access", "Mountain Meals"]
      },
      {
        name: "Resort Hotels",
        description: "Luxury resorts with spa facilities and premium services",
        priceRange: "¥20,000-60,000 per night",
        amenities: ["Luxury Spa", "Fine Dining", "Concierge", "Premium Views"]
      }
    ],
    tips: [
      "Visit early morning for clearest views and fewer crowds",
      "Check weather conditions before climbing - visibility can change quickly",
      "Bring warm clothing even in summer as temperatures drop with altitude",
      "Respect the sacred nature of the mountain and local customs",
      "Stay hydrated and bring enough water for the climb",
      "Book accommodation in advance during peak season",
      "Consider purchasing climbing insurance for summit attempts",
      "Learn basic Japanese phrases for better local interaction"
    ],
    rules: [
      "Climbing season is from July 1st to September 10th only",
      "No climbing during winter season (November-April) due to dangerous conditions",
      "Stay on designated trails at all times for safety",
      "Carry all trash with you - leave no trace policy strictly enforced",
      "Respect other climbers and maintain proper trail etiquette",
      "No camping outside designated areas",
      "Flash photography prohibited in certain sacred areas",
      "Quiet hours observed near shrines and sacred sites"
    ],
    explorationWays: [
      {
        title: "Summit Climbing",
        description: "Challenge yourself with the full climbing experience to Japan's highest peak. The journey takes you through different climate zones and offers incredible sunrise views.",
        duration: "12-15 hours",
        difficulty: "Challenging",
        bestFor: "Adventure seekers, fitness enthusiasts"
      },
      {
        title: "5th Station Visit",
        description: "Enjoy stunning Mount Fuji views without the full climb. Access by car or bus to experience the mountain atmosphere at 2,300m elevation.",
        duration: "2-4 hours",
        difficulty: "Easy",
        bestFor: "Families, photography, quick visits"
      },
      {
        title: "Lake Cruise",
        description: "See Mount Fuji reflected in the pristine waters of Lake Kawaguchi. Different seasons offer varying perspectives and natural beauty.",
        duration: "1-2 hours",
        difficulty: "Easy",
        bestFor: "Relaxation, photography, romantic trips"
      },
      {
        title: "Scenic Train Journey",
        description: "Take the Fuji Express for panoramic views while traveling comfortably. Multiple viewing opportunities along the route.",
        duration: "3-5 hours",
        difficulty: "Easy",
        bestFor: "Sightseeing, comfort travel, families"
      },
      {
        title: "Photography Tour",
        description: "Capture the perfect shot from various viewpoints including Chureito Pagoda, Lake Kawaguchi, and hidden local spots known to photographers.",
        duration: "Full day",
        difficulty: "Moderate",
        bestFor: "Photography enthusiasts, artists"
      },
      {
        title: "Cultural Experience",
        description: "Learn about Mount Fuji's spiritual significance through shrine visits, traditional ceremonies, and cultural workshops with local guides.",
        duration: "Half to full day",
        difficulty: "Easy",
        bestFor: "Cultural learners, spiritual seekers"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link to="/destinations">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Destinations
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-white">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="premium" className="bg-white/20 backdrop-blur text-white border-white/30">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {destination.rating}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 backdrop-blur text-white border-white/30">
                  {destination.category}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-2">{destination.name}</h1>
              <p className="text-xl opacity-90 mb-4">{destination.nameJp} • {destination.prefecture}</p>
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {destination.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {destination.reviews.toLocaleString()} reviews
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {destination.elevation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attractions">Attractions</TabsTrigger>
            <TabsTrigger value="dining">Dining</TabsTrigger>
            <TabsTrigger value="stay">Stay</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <Card className="border-0 shadow-elegant">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {destination.detailedDescription}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3">Quick Facts</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Best Time to Visit:</span>
                            <span>{destination.bestTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Difficulty Level:</span>
                            <span>{destination.difficulty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Elevation:</span>
                            <span>{destination.elevation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Climbing Time:</span>
                            <span>{destination.climbingTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-3">Languages Available</h3>
                        <div className="flex flex-wrap gap-2">
                          {destination.languages.map((lang, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-elegant">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {destination.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-elegant">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Book Your Visit</h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{destination.price}</div>
                        <div className="text-sm text-muted-foreground">Starting price per person</div>
                      </div>
                      
                      <Button className="w-full" variant="hero" size="lg">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Tour
                      </Button>
                      
                      <Button className="w-full" variant="outline">
                        <Heart className="h-4 w-4 mr-2" />
                        Add to Wishlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-elegant">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Photo Gallery</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {destination.gallery.map((image, index) => (
                        <img 
                          key={index}
                          src={image} 
                          alt={`${destination.name} gallery ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Camera className="h-4 w-4 mr-2" />
                      View All Photos
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attractions" className="space-y-6">
            <h2 className="text-3xl font-bold">Nearby Attractions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {destination.nearbyAttractions.map((attraction, index) => (
                <Card key={index} className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold">{attraction.name}</h3>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>{attraction.distance}</div>
                        <div>{attraction.time}</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{attraction.description}</p>
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dining" className="space-y-6">
            <h2 className="text-3xl font-bold">Local Cuisine & Dining</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {destination.dining.map((dish, index) => (
                <Card key={index} className="border-0 shadow-elegant">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                        <Badge variant="secondary" className="mb-2">{dish.type}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">{dish.priceRange}</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{dish.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stay" className="space-y-6">
            <h2 className="text-3xl font-bold">Where to Stay</h2>
            <div className="space-y-6">
              {destination.accommodation.map((place, index) => (
                <Card key={index} className="border-0 shadow-elegant">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                        <p className="text-muted-foreground mb-4">{place.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">{place.priceRange}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Amenities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {place.amenities.map((amenity, amenityIndex) => (
                          <Badge key={amenityIndex} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-primary" />
                    Visitor Tips
                  </h2>
                  <div className="space-y-3">
                    {destination.tips.map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-orange-500" />
                    Rules & Guidelines
                  </h2>
                  <div className="space-y-3">
                    {destination.rules.map((rule, index) => (
                      <div key={index} className="flex items-start">
                        <AlertCircle className="h-4 w-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="explore" className="space-y-6">
            <h2 className="text-3xl font-bold">Top 6 Ways to Explore {destination.name}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.explorationWays.map((way, index) => (
                <Card key={index} className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mr-3">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold">{way.title}</h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{way.description}</p>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{way.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <Badge variant="outline" className="text-xs">{way.difficulty}</Badge>
                      </div>
                      <div className="mt-3">
                        <span className="text-muted-foreground text-xs">Best for: </span>
                        <span className="text-xs">{way.bestFor}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Compass className="h-4 w-4 mr-2" />
                      Plan This Experience
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DestinationDetail;