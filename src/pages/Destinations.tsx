import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  MapPin, 
  Clock, 
  Camera, 
  Search, 
  UtensilsCrossed, 
  Bed, 
  Info,
  Shield,
  Mountain,
  Building,
  Trees,
  Waves,
  Crown,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const destinations = [
    {
      id: 1,
      name: "Mount Fuji",
      nameJp: "富士山",
      category: "mountain",
      prefecture: "Shizuoka/Yamanashi",
      image: "/api/placeholder/600/400",
      rating: 4.9,
      reviews: 15420,
      price: "¥12,000",
      duration: "Full Day",
      description: "Japan's sacred mountain and highest peak, a UNESCO World Heritage site offering breathtaking views and spiritual significance.",
      highlights: ["5th Station Views", "Lake Kawaguchi", "Oshino Hakkai", "Chureito Pagoda"],
      bestTime: "April to October",
      difficulty: "Moderate",
      languages: ["English", "Japanese", "Chinese", "Korean", "Urdu"],
      nearbyAttractions: [
        "Lake Kawaguchi - Beautiful lake with Mount Fuji reflections",
        "Hakone National Park - Hot springs and scenic railways", 
        "Oshino Hakkai - Eight sacred ponds with crystal clear water",
        "Chureito Pagoda - Iconic pagoda with Mount Fuji backdrop"
      ],
      dining: [
        "Hoto Noodles - Traditional thick wheat noodles in miso soup",
        "Yoshida Udon - Local specialty udon noodles",
        "Fresh Trout - From nearby mountain streams",
        "Mount Fuji Beer - Local craft beer with mountain water"
      ],
      accommodation: [
        "Ryokan Inns - Traditional Japanese inns with hot springs",
        "Lake Hotels - Scenic hotels with Mount Fuji views",
        "Mountain Lodges - Rustic accommodations for climbers",
        "Resort Hotels - Luxury resorts with spa facilities"
      ],
      tips: [
        "Visit early morning for clearest views",
        "Check weather conditions before climbing",
        "Bring warm clothing even in summer",
        "Respect the sacred nature of the mountain"
      ],
      rules: [
        "No climbing during winter season (November-April)",
        "Stay on designated trails",
        "Carry your trash with you",
        "Respect other climbers and local customs"
      ],
      explorationWays: [
        "Hiking to the Summit - Challenge yourself with the full climbing experience",
        "5th Station Visit - Enjoy stunning views without the full climb",
        "Lake Cruise - See Mount Fuji from the water",
        "Scenic Train - Take the Fuji Express for panoramic views",
        "Photography Tour - Capture the perfect shot from various viewpoints",
        "Cultural Experience - Learn about Mount Fuji's spiritual significance"
      ]
    },
    {
      id: 2,
      name: "Tokyo Tower",
      nameJp: "東京タワー",
      category: "urban",
      prefecture: "Tokyo",
      image: "/api/placeholder/600/400",
      rating: 4.7,
      reviews: 8903,
      price: "¥8,000",
      duration: "Half Day",
      description: "Iconic red and white communications tower inspired by the Eiffel Tower, offering panoramic views of Tokyo.",
      highlights: ["Main Observatory", "Top Deck", "Night Illumination", "City Views"],
      bestTime: "Year-round, sunset recommended",
      difficulty: "Easy",
      languages: ["English", "Japanese", "Chinese", "Korean"],
      nearbyAttractions: [
        "Zojo-ji Temple - Historic Buddhist temple",
        "Roppongi Hills - Modern shopping and dining complex",
        "Imperial Palace - Japanese emperor's residence",
        "Ginza District - Upscale shopping area"
      ],
      dining: [
        "Tower Restaurant - Fine dining with city views",
        "Foot Town Food Court - Various Japanese cuisine options",
        "Nearby Izakayas - Traditional Japanese pubs",
        "Convenience Stores - Quick snacks and drinks"
      ],
      accommodation: [
        "Park Hotel Tokyo - Artist-designed rooms with tower views",
        "Prince Park Tower - Luxury hotel adjacent to the tower",
        "Business Hotels - Budget-friendly options in Kamiyacho",
        "Capsule Hotels - Unique Japanese accommodation experience"
      ],
      tips: [
        "Visit during clear weather for best views",
        "Buy tickets online to skip queues",
        "Best photos taken from nearby temples",
        "Check special illumination schedules"
      ],
      rules: [
        "No professional photography equipment without permission",
        "No food or drinks in observation decks",
        "Children must be supervised at all times",
        "Respect photography restrictions"
      ],
      explorationWays: [
        "Main Observatory - Classic Tokyo skyline views",
        "Top Deck Tour - Premium experience with guided tour",
        "Night Illumination - See the tower light up after dark",
        "Foot Town Shopping - Browse shops and exhibitions",
        "Temple Photography - Capture tower with traditional elements",
        "Seasonal Events - Special displays and light shows"
      ]
    },
    {
      id: 3,
      name: "Fushimi Inari Shrine",
      nameJp: "伏見稲荷大社",
      category: "cultural",
      prefecture: "Kyoto",
      image: "/api/placeholder/600/400",
      rating: 4.8,
      reviews: 12567,
      price: "¥6,000",
      duration: "Half Day",
      description: "Famous Shinto shrine featuring thousands of vermillion torii gates creating tunnels up the mountainside.",
      highlights: ["Thousand Torii Gates", "Mountain Hike", "Fox Statues", "Shrine Complex"],
      bestTime: "Early morning or late afternoon",
      difficulty: "Moderate",
      languages: ["English", "Japanese", "Chinese", "Korean"],
      nearbyAttractions: [
        "Kiyomizu-dera Temple - UNESCO World Heritage temple",
        "Gion District - Traditional geisha district",
        "Nijo Castle - Historic shogun residence",
        "Bamboo Forest - Arashiyama bamboo groves"
      ],
      dining: [
        "Kaiseki Cuisine - Traditional multi-course meals",
        "Tofu Cuisine - Buddhist vegetarian dishes",
        "Street Food - Local snacks around the shrine",
        "Tea Houses - Traditional Japanese tea ceremony"
      ],
      accommodation: [
        "Traditional Ryokans - Historic Japanese inns",
        "Machiya Houses - Converted traditional townhouses",
        "Temple Lodging - Stay at Buddhist temples",
        "Modern Hotels - Contemporary accommodations in city center"
      ],
      tips: [
        "Start early to avoid crowds",
        "Wear comfortable walking shoes",
        "Bring water for the mountain climb",
        "Respect shrine etiquette and customs"
      ],
      rules: [
        "Bow before entering shrine gates",
        "Purify hands and mouth at water basin",
        "No flash photography in sacred areas",
        "Speak quietly and respect worshippers"
      ],
      explorationWays: [
        "Full Mountain Hike - Complete trail to the summit",
        "Torii Tunnel Walk - Explore the famous vermillion gates",
        "Shrine Worship - Experience traditional Shinto rituals",
        "Photography Tour - Capture the iconic gates and statues",
        "Cultural Learning - Understand Inari deity significance",
        "Night Visit - Peaceful evening atmosphere with illumination"
      ]
    },
    {
      id: 4,
      name: "Arashiyama Bamboo Grove",
      nameJp: "嵐山竹林の小径",
      category: "nature",
      prefecture: "Kyoto",
      image: "/api/placeholder/600/400",
      rating: 4.6,
      reviews: 9876,
      price: "¥7,000",
      duration: "Half Day",
      description: "Enchanting bamboo forest with towering bamboo stalks creating a natural cathedral of green light.",
      highlights: ["Bamboo Forest Walk", "Light Filtering", "Natural Sounds", "Peaceful Atmosphere"],
      bestTime: "Morning or late afternoon",
      difficulty: "Easy",
      languages: ["English", "Japanese", "Chinese"],
      nearbyAttractions: [
        "Tenryu-ji Temple - Zen temple with beautiful gardens",
        "Togetsukyo Bridge - Iconic bridge over Katsura River",
        "Monkey Park - Iwatayama Monkey Park with city views",
        "Adashino Nenbutsu-ji - Temple with stone statues"
      ],
      dining: [
        "Traditional Tea Houses - Matcha and wagashi sweets",
        "Tofu Restaurants - Buddhist vegetarian cuisine",
        "River View Dining - Restaurants overlooking Katsura River",
        "Local Specialties - Kyoto-style kaiseki cuisine"
      ],
      accommodation: [
        "Luxury Ryokans - Traditional inns with private gardens",
        "Boutique Hotels - Modern accommodations with traditional elements",
        "Guest Houses - Budget-friendly local accommodations",
        "Temple Stays - Authentic Buddhist temple experiences"
      ],
      tips: [
        "Visit early morning for best lighting",
        "Walk slowly to appreciate the atmosphere",
        "Listen to the bamboo rustling in the wind",
        "Combine with nearby temple visits"
      ],
      rules: [
        "Stay on designated paths only",
        "No climbing on bamboo stalks",
        "Keep noise levels low",
        "Do not damage or take bamboo"
      ],
      explorationWays: [
        "Peaceful Walk - Meditative stroll through bamboo tunnels",
        "Photography Session - Capture the filtering light effects",
        "Sound Experience - Listen to natural bamboo music",
        "Temple Combination - Visit with nearby Tenryu-ji Temple",
        "Seasonal Changes - Experience different lighting throughout the year",
        "Cultural Learning - Understand bamboo significance in Japanese culture"
      ]
    },
    {
      id: 5,
      name: "Osaka Castle",
      nameJp: "大阪城",
      category: "historical",
      prefecture: "Osaka",
      image: "/api/placeholder/600/400",
      rating: 4.5,
      reviews: 7234,
      price: "¥9,000",
      duration: "Half Day",
      description: "Magnificent reconstructed castle with beautiful gardens, museum exhibits, and panoramic city views.",
      highlights: ["Castle Keep", "Historical Museum", "Cherry Blossoms", "Panoramic Views"],
      bestTime: "Spring for cherry blossoms, year-round",
      difficulty: "Easy",
      languages: ["English", "Japanese", "Chinese", "Korean"],
      nearbyAttractions: [
        "Dotonbori District - Famous entertainment and dining area",
        "Sumiyoshi Taisha - One of Japan's oldest shrines",
        "Shitennoji Temple - Historic Buddhist temple",
        "Kuromon Ichiba Market - Traditional food market"
      ],
      dining: [
        "Osaka Street Food - Takoyaki, okonomiyaki, kushikatsu",
        "Castle Park Restaurants - Dining with castle views",
        "Traditional Kaiseki - High-end Japanese cuisine",
        "Local Specialties - Authentic Osaka culinary experiences"
      ],
      accommodation: [
        "Castle View Hotels - Modern hotels with castle views",
        "Business Hotels - Convenient and affordable options",
        "Traditional Inns - Historic ryokans in the area",
        "Capsule Hotels - Unique Japanese accommodation"
      ],
      tips: [
        "Visit during cherry blossom season for best experience",
        "Climb to the top floor for panoramic views",
        "Learn about samurai history in the museum",
        "Explore the surrounding castle park"
      ],
      rules: [
        "No photography inside certain museum areas",
        "Respect historical artifacts and displays",
        "Follow designated paths in castle grounds",
        "Be respectful during cultural ceremonies"
      ],
      explorationWays: [
        "Historical Tour - Learn about Japanese castle architecture",
        "Museum Visit - Explore samurai artifacts and history",
        "Garden Walk - Enjoy the beautiful castle park",
        "Photography Session - Capture the castle from various angles",
        "Seasonal Events - Experience festivals and cultural celebrations",
        "Night Illumination - See the castle beautifully lit after dark"
      ]
    },
    {
      id: 6,
      name: "Shibuya Crossing",
      nameJp: "渋谷スクランブル交差点",
      category: "urban",
      prefecture: "Tokyo",
      image: "/api/placeholder/600/400",
      rating: 4.4,
      reviews: 5678,
      price: "¥5,000",
      duration: "2 Hours",
      description: "World's busiest pedestrian crossing, an iconic symbol of Tokyo's energy and modernity.",
      highlights: ["Crossing Experience", "Sky View", "Hachiko Statue", "Shopping District"],
      bestTime: "Evening rush hour for maximum activity",
      difficulty: "Easy",
      languages: ["English", "Japanese", "Chinese", "Korean", "Urdu"],
      nearbyAttractions: [
        "Hachiko Statue - Famous loyal dog memorial",
        "Shibuya Sky - Rooftop observation deck",
        "Meiji Shrine - Peaceful shrine in nearby Harajuku",
        "Takeshita Street - Youth culture and fashion street"
      ],
      dining: [
        "Shibuya Food Show - Department store basement food courts",
        "Ramen Streets - Various ramen shops in surrounding area",
        "International Cuisine - Global dining options",
        "Coffee Shops - Perfect for people-watching"
      ],
      accommodation: [
        "Shibuya Hotels - Central location near the crossing",
        "Capsule Hotels - Experience unique Japanese accommodation",
        "Business Hotels - Practical and affordable stays",
        "Luxury Hotels - High-end accommodations with city views"
      ],
      tips: [
        "Best viewed from surrounding building observation decks",
        "Experience crossing during rush hour",
        "Visit both day and night for different atmospheres",
        "Combine with nearby Harajuku district"
      ],
      rules: [
        "Follow traffic signals and crossing rules",
        "Be aware of your surroundings in crowds",
        "Don't stop in the middle of the crossing",
        "Respect others navigating the busy area"
      ],
      explorationWays: [
        "Crossing Experience - Be part of the famous pedestrian flow",
        "Sky View Observation - Watch from Shibuya Sky deck",
        "Street Photography - Capture the urban energy",
        "Shopping Exploration - Browse nearby department stores",
        "Cultural Immersion - Experience Tokyo's modern lifestyle",
        "Night Scene - See the crossing illuminated after dark"
      ]
    }
  ];

  const categories = [
    { id: "all", name: "All Destinations", icon: Crown },
    { id: "mountain", name: "Mountains", icon: Mountain },
    { id: "urban", name: "Urban", icon: Building },
    { id: "cultural", name: "Cultural", icon: Heart },
    { id: "nature", name: "Nature", icon: Trees },
    { id: "historical", name: "Historical", icon: Shield }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Japanese Destinations</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Explore the most beautiful and culturally significant places across Japan
            </p>
          </div>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDestinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="premium">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {destination.rating}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">
                      {destination.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{destination.nameJp} • {destination.prefecture}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {destination.duration}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 fill-primary text-primary" />
                          {destination.rating} ({destination.reviews})
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {destination.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Highlights:</h4>
                        <div className="flex flex-wrap gap-1">
                          {destination.highlights.slice(0, 3).map((highlight, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Languages:</h4>
                        <div className="flex flex-wrap gap-1">
                          {destination.languages.slice(0, 4).map((lang, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6 pt-4 border-t">
                    <Link to={`/destinations/${destination.id}`} className="flex-1">
                      <Button className="w-full" variant="outline" size="sm">
                        <Info className="h-4 w-4 mr-2" />
                        Learn More
                      </Button>
                    </Link>
                    <Link to={`/tours?destination=${destination.id}`} className="flex-1">
                      <Button className="w-full" variant="hero" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Book Tour
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🗾</div>
            <h3 className="text-2xl font-bold mb-2">No destinations found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or browse all destinations
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}>
              Show All Destinations
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;