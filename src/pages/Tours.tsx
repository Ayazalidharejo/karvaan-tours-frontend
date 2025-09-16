import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Clock, Users, Search, Filter, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Tours = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [filterBy, setFilterBy] = useState("all");

  const tours = [
    {
      id: 1,
      title: "Mount Fuji & Hakone Full Day Tour",
      price: "¥15,800",
      originalPrice: "¥18,000",
      duration: "10 hours",
      rating: 4.9,
      reviews: 2847,
      image: "/api/placeholder/400/300",
      category: "mountain",
      languages: ["English", "Japanese", "Chinese", "Korean"],
      highlights: ["5th Station", "Lake Kawaguchi", "Hakone Ropeway", "Onsen Experience"],
      difficulty: "Easy",
      groupSize: "8-15 people",
      pickup: "Tokyo Station",
      includes: ["Transportation", "English Guide", "Lunch", "Entrance Fees"],
      isPopular: true,
      discount: 12
    },
    {
      id: 2,
      title: "Kyoto Golden Pavilion & Bamboo Forest",
      price: "¥12,500",
      originalPrice: "¥14,000",
      duration: "8 hours",
      rating: 4.8,
      reviews: 1956,
      image: "/api/placeholder/400/300",
      category: "cultural",
      languages: ["English", "Korean", "Japanese"],
      highlights: ["Kinkaku-ji Temple", "Arashiyama Bamboo", "Tea Ceremony", "Traditional Garden"],
      difficulty: "Easy",
      groupSize: "6-12 people",
      pickup: "Kyoto Station",
      includes: ["Transportation", "Guide", "Tea Ceremony", "Temple Access"],
      isPopular: true,
      discount: 11
    },
    {
      id: 3,
      title: "Tokyo City Highlights Private Tour",
      price: "¥18,900",
      originalPrice: "¥22,000",
      duration: "6 hours",
      rating: 4.7,
      reviews: 1234,
      image: "/api/placeholder/400/300",
      category: "urban",
      languages: ["English", "Chinese", "Urdu"],
      highlights: ["Senso-ji Temple", "Tokyo Tower", "Shibuya Crossing", "Meiji Shrine"],
      difficulty: "Easy",
      groupSize: "Private (1-6)",
      pickup: "Hotel Pickup",
      includes: ["Private Car", "Guide", "Flexible Itinerary", "Hotel Pickup"],
      isPopular: false,
      discount: 14
    },
    {
      id: 4,
      title: "Osaka Food & Culture Walking Tour",
      price: "¥8,900",
      originalPrice: "¥10,500",
      duration: "4 hours",
      rating: 4.8,
      reviews: 987,
      image: "/api/placeholder/400/300",
      category: "food",
      languages: ["English", "Japanese"],
      highlights: ["Dotonbori District", "Street Food", "Osaka Castle", "Local Markets"],
      difficulty: "Easy",
      groupSize: "8-15 people",
      pickup: "Osaka Station",
      includes: ["Food Tastings", "Guide", "Walking Tour", "Cultural Sites"],
      isPopular: true,
      discount: 15
    },
    {
      id: 5,
      title: "Hiroshima Peace Memorial & Miyajima Island",
      price: "¥14,200",
      originalPrice: "¥16,000",
      duration: "9 hours",
      rating: 4.9,
      reviews: 756,
      image: "/api/placeholder/400/300",
      category: "historical",
      languages: ["English", "Japanese", "Korean"],
      highlights: ["Peace Memorial Park", "Itsukushima Shrine", "Floating Torii", "Local Lunch"],
      difficulty: "Moderate",
      groupSize: "10-20 people",
      pickup: "Hiroshima Station",
      includes: ["Transportation", "Guide", "Ferry", "Lunch", "Museum Entry"],
      isPopular: false,
      discount: 11
    },
    {
      id: 6,
      title: "Nara Deer Park & Todai-ji Temple",
      price: "¥9,800",
      originalPrice: "¥11,500",
      duration: "5 hours",
      rating: 4.6,
      reviews: 1123,
      image: "/api/placeholder/400/300",
      category: "nature",
      languages: ["English", "Chinese", "Japanese"],
      highlights: ["Sacred Deer", "Great Buddha", "Traditional Architecture", "Park Walking"],
      difficulty: "Easy",
      groupSize: "8-16 people",
      pickup: "Nara Station",
      includes: ["Transportation", "Guide", "Deer Cookies", "Temple Access"],
      isPopular: true,
      discount: 15
    }
  ];

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterBy === "all" || tour.category === filterBy;
    return matchesSearch && matchesFilter;
  });

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, ""));
      case "price-high":
        return parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, ""));
      case "rating":
        return b.rating - a.rating;
      case "duration":
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return b.isPopular ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Japan Tours & Experiences</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Discover the beauty of Japan with our expertly crafted tours and authentic cultural experiences
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tours, destinations, or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tours</SelectItem>
                  <SelectItem value="mountain">Mountain</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="urban">Urban</SelectItem>
                  <SelectItem value="food">Food & Cuisine</SelectItem>
                  <SelectItem value="historical">Historical</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Counter */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-muted-foreground">
          Showing {sortedTours.length} tour{sortedTours.length !== 1 ? 's' : ''} 
          {searchTerm && ` for "${searchTerm}"`}
          {filterBy !== "all" && ` in ${filterBy} category`}
        </p>
      </div>

      {/* Tours Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {tour.isPopular && (
                    <Badge variant="premium">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                  {tour.discount > 0 && (
                    <Badge variant="destructive">
                      -{tour.discount}%
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur rounded-lg px-3 py-2">
                    <div className="text-lg font-bold text-primary">{tour.price}</div>
                    {tour.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">{tour.originalPrice}</div>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center bg-black/50 backdrop-blur rounded px-2 py-1">
                      <Star className="h-4 w-4 mr-1 fill-current text-yellow-400" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span className="text-white/80 ml-1">({tour.reviews})</span>
                    </div>
                    <div className="flex items-center bg-black/50 backdrop-blur rounded px-2 py-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{tour.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl leading-tight">{tour.title}</CardTitle>
                </CardHeader>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {tour.groupSize}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {tour.pickup}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Tour Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tour.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {tour.highlights.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tour.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Languages:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tour.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Includes:</h4>
                    <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                      {tour.includes.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Link to={`/tours/${tour.id}`} className="flex-1">
                      <Button className="w-full" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    <Link to={`/tours/${tour.id}/book`} className="flex-1">
                      <Button className="w-full" variant="hero">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedTours.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No tours found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all tours
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setFilterBy("all");
              setSortBy("popularity");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;