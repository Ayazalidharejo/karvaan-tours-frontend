import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Users, Camera, Heart, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/mount-fuji-hero.jpg";
import mountFujiHero from "@/assets/mount-fuji-hero.jpg";
import tokyoTower from "@/assets/tokyo-tower.jpg";
import fushimiInari from "@/assets/fushimi-inari.jpg";
import bambooForest from "@/assets/bamboo-forest.jpg";
import osakacastle from "@/assets/osaka-castle.jpg";
import shibuyaCrossing from "@/assets/shibuya-crossing.jpg";

const Home = () => {
  const featuredDestinations = [
    {
      id: 1,
      name: "Mount Fuji",
      image: "/api/placeholder/400/300",
      rating: 4.9,
      price: "¥12,000",
      duration: "Full Day",
      description: "Sacred mountain with breathtaking views and cultural significance",
      highlights: ["Lake Kawaguchi", "Oshino Hakkai", "5th Station"]
    },
    {
      id: 2,
      name: "Tokyo Tower",
      image: "/api/placeholder/400/300",
      rating: 4.8,
      price: "¥8,000",
      duration: "Half Day",
      description: "Iconic red tower offering panoramic city views",
      highlights: ["Observatory Deck", "City Views", "Night Illumination"]
    },
    {
      id: 3,
      name: "Fushimi Inari Shrine",
      image: "/api/placeholder/400/300",
      rating: 4.9,
      price: "¥6,000",
      duration: "Half Day",
      description: "Thousands of vermillion torii gates creating magical tunnels",
      highlights: ["Torii Gates", "Mountain Hike", "Sacred Fox Statues"]
    },
    {
      id: 4,
      name: "Arashiyama Bamboo Grove",
      image: "/api/placeholder/400/300",
      rating: 4.7,
      price: "¥7,000",
      duration: "Half Day",
      description: "Enchanting bamboo forest with filtered sunlight",
      highlights: ["Bamboo Forest", "Temple Visits", "Monkey Park"]
    },
    {
      id: 5,
      name: "Osaka Castle",
      image: "/api/placeholder/400/300",
      rating: 4.6,
      price: "¥9,000",
      duration: "Half Day",
      description: "Historic castle with beautiful gardens and museum",
      highlights: ["Castle Keep", "Cherry Blossoms", "Historical Museum"]
    },
    {
      id: 6,
      name: "Shibuya Crossing",
      image: "/api/placeholder/400/300",
      rating: 4.5,
      price: "¥5,000",
      duration: "2 Hours",
      description: "World's busiest pedestrian crossing in Tokyo",
      highlights: ["Crossing Experience", "Sky View", "Shopping District"]
    }
  ];

  const topTours = [
    {
      id: 1,
      title: "Mount Fuji & Hakone Full Day Tour",
      price: "¥15,800",
      duration: "10 hours",
      rating: 4.9,
      reviews: 2847,
      image: heroImage,
      languages: ["English", "Japanese", "Chinese"],
      includes: ["Transportation", "Guide", "Lunch", "Entrance Fees"]
    },
    {
      id: 2,
      title: "Kyoto Golden Pavilion & Bamboo Forest",
      price: "¥12,500",
      duration: "8 hours",
      rating: 4.8,
      reviews: 1956,
      image: "/api/placeholder/400/300",
      languages: ["English", "Korean", "Japanese"],
      includes: ["Transportation", "Guide", "Tea Ceremony", "Temple Access"]
    },
    {
      id: 3,
      title: "Tokyo City Highlights Private Tour",
      price: "¥18,900",
      duration: "6 hours",
      rating: 4.7,
      reviews: 1234,
      image: "/api/placeholder/400/300",
      languages: ["English", "Chinese", "Urdu"],
      includes: ["Private Car", "Guide", "Flexible Itinerary", "Hotel Pickup"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Carwan Tours
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/tours" className="text-foreground hover:text-primary transition-colors">Tours</Link>
              <Link to="/destinations" className="text-foreground hover:text-primary transition-colors">Destinations</Link>
              <Link to="/guide" className="text-foreground hover:text-primary transition-colors">Guide</Link>
              <Link to="/blogs" className="text-foreground hover:text-primary transition-colors">Blog</Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
              <Link to="/admin/login" className="text-foreground hover:text-primary transition-colors">Admin</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
              <Button variant="hero" size="sm">Book Now</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover the Magic of
            <span className="block bg-gradient-sunset bg-clip-text text-transparent">Mount Fuji</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{animationDelay: "0.2s"}}>
            Experience Japan's most sacred mountain with expert guides and unforgettable memories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: "0.4s"}}>
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              <Camera className="mr-2 h-5 w-5" />
              Explore Tours
            </Button>
            <Button variant="glass" size="lg" className="text-lg px-8 py-6">
              <MapPin className="mr-2 h-5 w-5" />
              Plan Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Famous Japanese Destinations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the most beautiful and culturally significant places across Japan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <Card key={destination.id} className="group overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="premium" className="bg-white/90 text-primary">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {destination.rating}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-white text-xl font-bold mb-1">{destination.name}</h3>
                        <div className="flex items-center text-white/80 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          {destination.duration}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-lg font-bold">{destination.price}</div>
                        <div className="text-white/80 text-sm">per person</div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{destination.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                  <Link to={`/destinations/${destination.id}`}>
                    <Button className="w-full" variant="outline">
                      <MapPin className="h-4 w-4 mr-2" />
                      Explore Destination
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Tours */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Popular Tours</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of satisfied travelers on our most beloved Japanese adventures
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {topTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
                <div className="relative">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="premium">Best Seller</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur rounded-full px-3 py-1 text-sm font-semibold">
                      {tour.price}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-primary text-primary" />
                      {tour.rating} ({tour.reviews})
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Languages Available:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tour.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Includes:</h4>
                    <div className="grid grid-cols-2 gap-1 text-sm text-muted-foreground">
                      {tour.includes.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to={`/tours/${tour.id}`}>
                    <Button className="w-full" variant="hero">
                      <Users className="h-4 w-4 mr-2" />
                      Book This Tour
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Whitelist/Featured Destinations Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              ⭐ FEATURED DESTINATIONS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Most Popular Places to Visit
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore Japan's most iconic landmarks and hidden gems - our top recommended destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[
              {
                name: "Mount Fuji",
                image: mountFujiHero,
                description: "Japan's sacred mountain and UNESCO World Heritage site",
                rating: "4.9/5",
                visitors: "2M+ visitors"
              },
              {
                name: "Tokyo Tower",
                image: tokyoTower,
                description: "Iconic red tower offering panoramic city views",
                rating: "4.7/5",
                visitors: "1.5M+ visitors"
              },
              {
                name: "Fushimi Inari",
                image: fushimiInari,
                description: "Thousands of vermillion torii gates",
                rating: "4.8/5",
                visitors: "3M+ visitors"
              },
              {
                name: "Bamboo Forest",
                image: bambooForest,
                description: "Mystical bamboo groves in Arashiyama",
                rating: "4.6/5",
                visitors: "800K+ visitors"
              },
              {
                name: "Osaka Castle",
                image: osakacastle,
                description: "Historic castle with cherry blossoms",
                rating: "4.5/5",
                visitors: "1.2M+ visitors"
              },
              {
                name: "Shibuya Crossing",
                image: shibuyaCrossing,
                description: "World's busiest pedestrian crossing",
                rating: "4.4/5",
                visitors: "2.5M+ visitors"
              }
            ].map((destination) => (
              <Card key={destination.name} className="group hover:shadow-xl transition-all duration-500 overflow-hidden border-2 hover:border-primary/50">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-white/90 text-black hover:bg-white">
                    {destination.rating}
                  </Badge>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.visitors}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-sm mb-4">{destination.description}</p>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Route Direction Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              🗺️ TRAVEL ROUTES
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Popular Travel Routes & Directions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow our recommended routes with detailed stops and directions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Route 1: Tokyo to Mount Fuji */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-6 h-6" />
                  Tokyo to Mount Fuji Day Trip
                </CardTitle>
                <p className="text-primary-foreground/90">Duration: 10-12 hours | Distance: 120km</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { time: "06:00", location: "Tokyo (Shibuya/Shinjuku)", action: "Pickup from hotel", icon: "🚌" },
                    { time: "08:30", location: "Lake Kawaguchi", action: "Photo stop & breakfast", icon: "📸" },
                    { time: "10:00", location: "Mount Fuji 5th Station", action: "Main viewing point", icon: "🗻" },
                    { time: "12:00", location: "Oshino Hakkai", action: "Traditional village visit", icon: "🏘️" },
                    { time: "14:00", location: "Hakone", action: "Lunch & hot springs", icon: "🍜" },
                    { time: "16:00", location: "Gotemba Outlets", action: "Shopping (optional)", icon: "🛍️" },
                    { time: "18:00", location: "Return to Tokyo", action: "Drop-off at hotel", icon: "🏨" }
                  ].map((stop, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                      <div className="text-2xl">{stop.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{stop.time}</Badge>
                          <span className="font-semibold">{stop.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{stop.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Route 2: Kyoto Cultural Tour */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-secondary to-accent text-white">
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-6 h-6" />
                  Kyoto Cultural Heritage Tour
                </CardTitle>
                <p className="text-secondary-foreground/90">Duration: 8-10 hours | Distance: 45km</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { time: "08:00", location: "Kyoto Station", action: "Meet your guide", icon: "🚅" },
                    { time: "09:00", location: "Fushimi Inari Shrine", action: "Torii gates hiking", icon: "⛩️" },
                    { time: "11:00", location: "Bamboo Grove", action: "Arashiyama bamboo walk", icon: "🎋" },
                    { time: "13:00", location: "Traditional Restaurant", action: "Kaiseki lunch", icon: "🍱" },
                    { time: "14:30", location: "Kiyomizu Temple", action: "Temple & city views", icon: "🏯" },
                    { time: "16:00", location: "Gion District", action: "Geisha spotting", icon: "👘" },
                    { time: "17:30", location: "Kyoto Station", action: "Tour completion", icon: "✅" }
                  ].map((stop, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                      <div className="text-2xl">{stop.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{stop.time}</Badge>
                          <span className="font-semibold">{stop.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{stop.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
              <MapPin className="w-5 h-5 mr-2" />
              View All Routes & Book Now
            </Button>
          </div>
        </div>
      </section>

      {/* Language Support Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              🌐 MULTILINGUAL SUPPORT
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Guides Available in Multiple Languages
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our professional guides speak your language for the best experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { lang: "English", flag: "🇺🇸", level: "Native" },
              { lang: "Japanese", flag: "🇯🇵", level: "Native" },
              { lang: "Chinese", flag: "🇨🇳", level: "Fluent" },
              { lang: "Korean", flag: "🇰🇷", level: "Fluent" },
              { lang: "Urdu", flag: "🇵🇰", level: "Fluent" }
            ].map((language) => (
              <Card key={language.lang} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{language.flag}</div>
                <h3 className="font-semibold mb-1">{language.lang}</h3>
                <Badge variant="secondary" className="text-xs">{language.level}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50,000+</div>
              <div className="text-primary-foreground/80">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-primary-foreground/80">Tour Packages</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15</div>
              <div className="text-primary-foreground/80">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Carwan Tours
              </h3>
              <p className="text-muted-foreground mb-4">
                Your trusted partner for unforgettable Japanese adventures and cultural experiences.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">Facebook</Button>
                <Button variant="ghost" size="sm">Instagram</Button>
                <Button variant="ghost" size="sm">Twitter</Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/tours" className="block text-muted-foreground hover:text-primary transition-colors">Tours</Link>
                <Link to="/destinations" className="block text-muted-foreground hover:text-primary transition-colors">Destinations</Link>
                <Link to="/guide" className="block text-muted-foreground hover:text-primary transition-colors">Travel Guide</Link>
                <Link to="/blogs" className="block text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
                <Link to="/faq" className="block text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
                <Link to="/testimonials" className="block text-muted-foreground hover:text-primary transition-colors">Reviews</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>📧 info@carwantours.com</p>
                <p>📞 +81-3-1234-5678</p>
                <p>📍 Tokyo, Japan</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Carwan Tours. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;