import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Camera, 
  Car, 
  Train, 
  Utensils,
  Bed,
  Info,
  Shield,
  CheckCircle,
  AlertTriangle,
  Navigation,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

const TourGuide = () => {
  const topDestinations = [
    {
      name: "Mount Fuji 5th Station",
      description: "Experience Japan's most sacred mountain up close",
      duration: "3-4 hours",
      difficulty: "Easy",
      highlights: ["Panoramic Views", "Souvenir Shops", "Mountain Station"],
      tips: "Best visited early morning for clear weather"
    },
    {
      name: "Lake Kawaguchi",
      description: "Stunning lake with perfect Mount Fuji reflections",
      duration: "2-3 hours",
      difficulty: "Easy",
      highlights: ["Photo Spots", "Boat Rides", "Seasonal Views"],
      tips: "Cherry blossom season (April-May) is spectacular"
    },
    {
      name: "Oshino Hakkai",
      description: "Eight sacred ponds with crystal clear spring water",
      duration: "1-2 hours",
      difficulty: "Easy",
      highlights: ["Traditional Village", "Sacred Ponds", "Cultural Heritage"],
      tips: "Try the local specialty tofu and spring water"
    },
    {
      name: "Chureito Pagoda",
      description: "Iconic 5-story pagoda with Mount Fuji backdrop",
      duration: "1-2 hours",
      difficulty: "Moderate",
      highlights: ["Classic Photo Spot", "398 Steps Climb", "Seasonal Beauty"],
      tips: "Climb early morning or late afternoon for best lighting"
    },
    {
      name: "Hakone Ropeway",
      description: "Cable car journey with volcanic landscape views",
      duration: "2-3 hours",
      difficulty: "Easy",
      highlights: ["Aerial Views", "Volcanic Activity", "Lake Ashi"],
      tips: "Check weather conditions - clouds can block views"
    },
    {
      name: "Gotemba Premium Outlets",
      description: "Shopping with Mount Fuji views",
      duration: "2-4 hours",
      difficulty: "Easy",
      highlights: ["Designer Brands", "Mount Fuji Views", "Tax-Free Shopping"],
      tips: "Bring comfortable walking shoes"
    }
  ];

  const pickupPoints = [
    {
      location: "Tokyo Station (Marunouchi Central Exit)",
      time: "7:00 AM",
      landmark: "Near JR Central Towers",
      instructions: "Meet at the red brick station building main entrance"
    },
    {
      location: "Shinjuku Station (East Exit)",
      time: "7:30 AM", 
      landmark: "Studio Alta Building",
      instructions: "Large screen building across from JR East Exit"
    },
    {
      location: "Shibuya Station (Hachiko Exit)",
      time: "8:00 AM",
      landmark: "Hachiko Dog Statue",
      instructions: "Famous dog statue outside JR Shibuya Station"
    },
    {
      location: "Ueno Station (Park Exit)",
      time: "7:15 AM",
      landmark: "Ueno Park entrance",
      instructions: "Main entrance to Ueno Park near the station"
    },
    {
      location: "Hotel Pickup (Premium Tours)",
      time: "Flexible",
      landmark: "Your hotel lobby",
      instructions: "Available for private and premium group tours"
    }
  ];

  const languages = [
    { name: "English", level: "Native/Fluent", guides: 15 },
    { name: "Japanese", level: "Native", guides: 25 },
    { name: "Chinese (Mandarin)", level: "Fluent", guides: 8 },
    { name: "Korean", level: "Fluent", guides: 6 },
    { name: "Urdu", level: "Conversational", guides: 3 },
    { name: "Spanish", level: "Basic", guides: 2 }
  ];

  const itinerary = [
    {
      time: "7:00 AM",
      activity: "Pickup from Tokyo",
      description: "Meet your guide and board comfortable air-conditioned vehicle",
      duration: "30 minutes"
    },
    {
      time: "9:30 AM",
      activity: "Mount Fuji 5th Station",
      description: "Explore the mountain station, enjoy panoramic views and shopping",
      duration: "1.5 hours"
    },
    {
      time: "11:30 AM",
      activity: "Lake Kawaguchi",
      description: "Photo opportunities with Mount Fuji reflections, optional boat ride",
      duration: "2 hours"
    },
    {
      time: "1:30 PM",
      activity: "Traditional Japanese Lunch",
      description: "Authentic local cuisine with Mount Fuji views",
      duration: "1 hour"
    },
    {
      time: "3:00 PM",
      activity: "Oshino Hakkai Village",
      description: "Explore sacred ponds and traditional thatched-roof houses",
      duration: "1.5 hours"
    },
    {
      time: "5:00 PM",
      activity: "Chureito Pagoda",
      description: "Climb to the famous pagoda for iconic Mount Fuji photos",
      duration: "1 hour"
    },
    {
      time: "7:30 PM",
      activity: "Return to Tokyo",
      description: "Comfortable return journey with tour highlights recap",
      duration: "2.5 hours"
    }
  ];

  const faqs = [
    {
      question: "What should I wear for Mount Fuji tours?",
      answer: "Dress in layers as mountain weather changes quickly. Comfortable walking shoes are essential. Bring a warm jacket even in summer."
    },
    {
      question: "Is the tour suitable for elderly guests?",
      answer: "Yes! Most activities involve minimal walking. The 5th Station is accessible by bus, and we accommodate different mobility levels."
    },
    {
      question: "What happens if Mount Fuji is covered by clouds?",
      answer: "Weather can be unpredictable. We visit multiple viewpoints to maximize chances of clear views. Tours proceed rain or shine with alternative indoor activities."
    },
    {
      question: "Can I climb to Mount Fuji summit?",
      answer: "Summit climbing requires separate planning during climbing season (July-September). Our day tours visit the 5th Station at 2,300m elevation."
    },
    {
      question: "Are meals included in the tour?",
      answer: "Yes, traditional Japanese lunch is included. We accommodate dietary restrictions with advance notice."
    },
    {
      question: "How many people are in a typical group?",
      answer: "Groups range from 8-20 people for regular tours. Private tours are available for 1-8 guests."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Japan Travel Guide</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Complete guide to exploring Japan's most beautiful destinations with expert local knowledge
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="destinations" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="destinations">Top Destinations</TabsTrigger>
            <TabsTrigger value="itinerary">Sample Itinerary</TabsTrigger>
            <TabsTrigger value="pickup">Pickup Points</TabsTrigger>
            <TabsTrigger value="guides">Our Guides</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="destinations" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Must-Visit Destinations</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Discover the most spectacular locations on our Japan tours, each offering unique experiences and unforgettable memories
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topDestinations.map((destination, index) => (
                <Card key={index} className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{destination.name}</span>
                      <Badge variant="secondary">{destination.difficulty}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{destination.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-primary" />
                        {destination.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-primary" />
                        Must-see
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Highlights:</h4>
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.map((highlight, highlightIndex) => (
                          <Badge key={highlightIndex} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-start">
                        <Info className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{destination.tips}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-8">
              <Link to="/tours">
                <Button variant="hero" size="lg">
                  <Camera className="h-5 w-5 mr-2" />
                  Book Your Japan Adventure
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Sample Day Itinerary</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Experience the perfect day exploring Mount Fuji and surrounding attractions with our carefully planned schedule
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {itinerary.map((item, index) => (
                  <Card key={index} className="border-0 shadow-elegant">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                            {item.time}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{item.activity}</h3>
                          <p className="text-muted-foreground mb-3">{item.description}</p>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.duration}
                            </Badge>
                            {index < itinerary.length - 1 && (
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Navigation className="h-4 w-4 mr-1" />
                                Travel to next destination
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-elegant">
                  <CardContent className="p-6 text-center">
                    <Car className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Comfortable Transport</h3>
                    <p className="text-sm text-muted-foreground">Air-conditioned vehicles with professional drivers</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-elegant">
                  <CardContent className="p-6 text-center">
                    <Utensils className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Authentic Meals</h3>
                    <p className="text-sm text-muted-foreground">Traditional Japanese lunch with local specialties</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-elegant">
                  <CardContent className="p-6 text-center">
                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Expert Guides</h3>
                    <p className="text-sm text-muted-foreground">Knowledgeable local guides with cultural insights</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pickup" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Convenient Pickup Locations</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                We offer multiple pickup points across Tokyo for your convenience. All locations are easily accessible by public transport.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {pickupPoints.map((point, index) => (
                <Card key={index} className="border-0 shadow-elegant">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{point.location}</h3>
                        <p className="text-muted-foreground">{point.landmark}</p>
                      </div>
                      <Badge variant="premium" className="font-bold">
                        {point.time}
                      </Badge>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{point.instructions}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Train className="h-4 w-4 mr-1" />
                        JR Station Access
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 mr-1" />
                        Guide Contact Available
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-elegant bg-gradient-subtle">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <h3 className="text-lg font-semibold">Pickup Guidelines</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Before Pickup:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Arrive 10 minutes early at pickup point</li>
                      <li>• Have your booking confirmation ready</li>
                      <li>• Look for Carwan Tours signage</li>
                      <li>• Keep your phone accessible for guide contact</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">What to Bring:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Comfortable walking shoes</li>
                      <li>• Weather-appropriate clothing</li>
                      <li>• Camera or smartphone</li>
                      <li>• Water bottle and snacks</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Professional Tour Guides</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Our certified guides bring Japan's culture and history to life with expert knowledge and warm hospitality
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-6 w-6 mr-3 text-primary" />
                    Language Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {languages.map((lang, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <h4 className="font-semibold">{lang.name}</h4>
                          <p className="text-sm text-muted-foreground">{lang.level}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{lang.guides} guides</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-6 w-6 mr-3 text-primary" />
                    Guide Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Licensed Tour Guides",
                        description: "All guides are certified by Japan Tourism Agency",
                        icon: Shield
                      },
                      {
                        title: "Cultural Expertise",
                        description: "Deep knowledge of Japanese history, culture, and traditions",
                        icon: Users
                      },
                      {
                        title: "Safety Training",
                        description: "First aid certified and emergency response trained",
                        icon: CheckCircle
                      },
                      {
                        title: "Local Insights",
                        description: "Born and raised in Japan with insider knowledge",
                        icon: MapPin
                      }
                    ].map((qualification, index) => {
                      const IconComponent = qualification.icon;
                      return (
                        <div key={index} className="flex items-start">
                          <IconComponent className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">{qualification.title}</h4>
                            <p className="text-sm text-muted-foreground">{qualification.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-elegant">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">What Our Guests Say</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Sarah Johnson",
                      country: "USA",
                      rating: 5,
                      comment: "Our guide Yuki made the Mount Fuji tour absolutely magical. Her English was perfect and she shared so many interesting stories!"
                    },
                    {
                      name: "李明 (Li Ming)",
                      country: "China",
                      rating: 5,
                      comment: "导游的中文说得很好，对日本文化了解很深，让我们的旅行变得特别有意义。"
                    },
                    {
                      name: "김현수 (Kim Hyun-soo)",
                      country: "Korea",
                      rating: 5,
                      comment: "가이드의 한국어 실력이 뛰어났고, 일본의 숨겨진 명소들을 알려주어서 정말 좋았습니다."
                    }
                  ].map((review, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-center mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm mb-3 italic">"{review.comment}"</p>
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.country}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Find answers to common questions about our Japan tours and travel experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-elegant">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3 flex items-start">
                      <Info className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-elegant bg-gradient-primary text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Our travel experts are here to help you plan the perfect Japan experience. Contact us for personalized assistance and recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button variant="glass" size="lg">
                      <Phone className="h-5 w-5 mr-2" />
                      Contact Our Experts
                    </Button>
                  </Link>
                  <Link to="/tours">
                    <Button variant="glass" size="lg">
                      <Camera className="h-5 w-5 mr-2" />
                      Browse All Tours
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TourGuide;