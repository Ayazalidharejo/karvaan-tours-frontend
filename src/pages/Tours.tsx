
// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Star,
//   MapPin,
//   Clock,
//   Users,
//   Search,
//   Filter,
//   Calendar,
//   Camera,
//   Info,
//   Shield,
//   Mountain,
//   Building,
//   Trees,
//   Crown,
//   Heart
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const JapanTravel = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("popularity");
//   const [filterBy, setFilterBy] = useState("all");
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   // Tours data
//   const tours = [
//     {
//       id: 1,
//       title: "Mount Fuji & Hakone Full Day Tour",
//       price: "¥15,800",
//       originalPrice: "¥18,000",
//       duration: "10 hours",
//       rating: 4.9,
//       reviews: 2847,
//       image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
//       category: "mountain",
//       languages: ["English", "Japanese", "Chinese", "Korean"],
//       highlights: ["5th Station", "Lake Kawaguchi", "Hakone Ropeway", "Onsen Experience"],
//       difficulty: "Easy",
//       groupSize: "8-15 people",
//       pickup: "Tokyo Station",
//       includes: ["Transportation", "English Guide", "Lunch", "Entrance Fees"],
//       isPopular: true,
//       discount: 12
//     },
//     {
//       id: 2,
//       title: "Kyoto Golden Pavilion & Bamboo Forest",
//       price: "¥12,500",
//       originalPrice: "¥14,000",
//       duration: "8 hours",
//       rating: 4.8,
//       reviews: 1956,
//       image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&crop=center",
//       category: "cultural",
//       languages: ["English", "Korean", "Japanese"],
//       highlights: ["Kinkaku-ji Temple", "Arashiyama Bamboo", "Tea Ceremony", "Traditional Garden"],
//       difficulty: "Easy",
//       groupSize: "6-12 people",
//       pickup: "Kyoto Station",
//       includes: ["Transportation", "Guide", "Tea Ceremony", "Temple Access"],
//       isPopular: true,
//       discount: 11
//     },
//     {
//       id: 3,
//       title: "Tokyo City Highlights Private Tour",
//       price: "¥18,900",
//       originalPrice: "¥22,000",
//       duration: "6 hours",
//       rating: 4.7,
//       reviews: 1234,
//       image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=600&fit=crop&crop=center",
//       category: "urban",
//       languages: ["English", "Chinese", "Urdu"],
//       highlights: ["Senso-ji Temple", "Tokyo Tower", "Shibuya Crossing", "Meiji Shrine"],
//       difficulty: "Easy",
//       groupSize: "Private (1-6)",
//       pickup: "Hotel Pickup",
//       includes: ["Private Car", "Guide", "Flexible Itinerary", "Hotel Pickup"],
//       isPopular: false,
//       discount: 14
//     },
//     {
//       id: 4,
//       title: "Osaka Food & Culture Walking Tour",
//       price: "¥8,900",
//       originalPrice: "¥10,500",
//       duration: "4 hours",
//       rating: 4.8,
//       reviews: 987,
//       image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop&crop=center",
//       category: "food",
//       languages: ["English", "Japanese"],
//       highlights: ["Dotonbori District", "Street Food", "Osaka Castle", "Local Markets"],
//       difficulty: "Easy",
//       groupSize: "8-15 people",
//       pickup: "Osaka Station",
//       includes: ["Food Tastings", "Guide", "Walking Tour", "Cultural Sites"],
//       isPopular: true,
//       discount: 15
//     },
//     {
//       id: 5,
//       title: "Hiroshima Peace Memorial & Miyajima Island",
//       price: "¥14,200",
//       originalPrice: "¥16,000",
//       duration: "9 hours",
//       rating: 4.9,
//       reviews: 756,
//       image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=600&fit=crop&crop=center",
//       category: "historical",
//       languages: ["English", "Japanese", "Korean"],
//       highlights: ["Peace Memorial Park", "Itsukushima Shrine", "Floating Torii", "Local Lunch"],
//       difficulty: "Moderate",
//       groupSize: "10-20 people",
//       pickup: "Hiroshima Station",
//       includes: ["Transportation", "Guide", "Ferry", "Lunch", "Museum Entry"],
//       isPopular: false,
//       discount: 11
//     },
//     {
//       id: 6,
//       title: "Nara Deer Park & Todai-ji Temple",
//       price: "¥9,800",
//       originalPrice: "¥11,500",
//       duration: "5 hours",
//       rating: 4.6,
//       reviews: 1123,
//       image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=600&fit=crop&crop=center",
//       category: "nature",
//       languages: ["English", "Chinese", "Japanese"],
//       highlights: ["Sacred Deer", "Great Buddha", "Traditional Architecture", "Park Walking"],
//       difficulty: "Easy",
//       groupSize: "8-16 people",
//       pickup: "Nara Station",
//       includes: ["Transportation", "Guide", "Deer Cookies", "Temple Access"],
//       isPopular: true,
//       discount: 15
//     }
//   ];

//   // Destinations data
//   const destinations = [
//     {
//       id: 1,
//       name: "Mount Fuji",
//       nameJp: "富士山",
//       category: "mountain",
//       prefecture: "Shizuoka/Yamanashi",
//       image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop&crop=center",
//       rating: 4.9,
//       reviews: 15420,
//       price: "¥12,000",
//       duration: "Full Day",
//       description: "Japan's sacred mountain and highest peak, a UNESCO World Heritage site offering breathtaking views and spiritual significance.",
//       highlights: ["5th Station Views", "Lake Kawaguchi", "Oshino Hakkai", "Chureito Pagoda"],
//       bestTime: "April to October",
//       difficulty: "Moderate",
//       languages: ["English", "Japanese", "Chinese", "Korean", "Urdu"],
//       nearbyAttractions: [
//         "Lake Kawaguchi - Beautiful lake with Mount Fuji reflections",
//         "Hakone National Park - Hot springs and scenic railways",
//         "Oshino Hakkai - Eight sacred ponds with crystal clear water",
//         "Chureito Pagoda - Iconic pagoda with Mount Fuji backdrop"
//       ],
//       dining: [
//         "Hoto Noodles - Traditional thick wheat noodles in miso soup",
//         "Yoshida Udon - Local specialty udon noodles",
//         "Fresh Trout - From nearby mountain streams",
//         "Mount Fuji Beer - Local craft beer with mountain water"
//       ],
//       accommodation: [
//         "Ryokan Inns - Traditional Japanese inns with hot springs",
//         "Lake Hotels - Scenic hotels with Mount Fuji views",
//         "Mountain Lodges - Rustic accommodations for climbers",
//         "Resort Hotels - Luxury resorts with spa facilities"
//       ],
//       tips: [
//         "Visit early morning for clearest views",
//         "Check weather conditions before climbing",
//         "Bring warm clothing even in summer",
//         "Respect the sacred nature of the mountain"
//       ],
//       rules: [
//         "No climbing during winter season (November-April)",
//         "Stay on designated trails",
//         "Carry your trash with you",
//         "Respect other climbers and local customs"
//       ],
//       explorationWays: [
//         "Hiking to the Summit - Challenge yourself with the full climbing experience",
//         "5th Station Visit - Enjoy stunning views without the full climb",
//         "Lake Cruise - See Mount Fuji from the water",
//         "Scenic Train - Take the Fuji Express for panoramic views",
//         "Photography Tour - Capture the perfect shot from various viewpoints",
//         "Cultural Experience - Learn about Mount Fuji's spiritual significance"
//       ]
//     },
//     {
//       id: 2,
//       name: "Tokyo Tower",
//       nameJp: "東京タワー",
//       category: "urban",
//       prefecture: "Tokyo",
//       image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop&crop=center0",
//       rating: 4.7,
//       reviews: 8903,
//       price: "¥8,000",
//       duration: "Half Day",
//       description: "Iconic red and white communications tower inspired by the Eiffel Tower, offering panoramic views of Tokyo.",
//       highlights: ["Main Observatory", "Top Deck", "Night Illumination", "City Views"],
//       bestTime: "Year-round, sunset recommended",
//       difficulty: "Easy",
//       languages: ["English", "Japanese", "Chinese", "Korean"],
//       nearbyAttractions: [
//         "Zojo-ji Temple - Historic Buddhist temple",
//         "Roppongi Hills - Modern shopping and dining complex",
//         "Imperial Palace - Japanese emperor's residence",
//         "Ginza District - Upscale shopping area"
//       ],
//       dining: [
//         "Tower Restaurant - Fine dining with city views",
//         "Foot Town Food Court - Various Japanese cuisine options",
//         "Nearby Izakayas - Traditional Japanese pubs",
//         "Convenience Stores - Quick snacks and drinks"
//       ],
//       accommodation: [
//         "Park Hotel Tokyo - Artist-designed rooms with tower views",
//         "Prince Park Tower - Luxury hotel adjacent to the tower",
//         "Business Hotels - Budget-friendly options in Kamiyacho",
//         "Capsule Hotels - Unique Japanese accommodation experience"
//       ],
//       tips: [
//         "Visit during clear weather for best views",
//         "Buy tickets online to skip queues",
//         "Best photos taken from nearby temples",
//         "Check special illumination schedules"
//       ],
//       rules: [
//         "No professional photography equipment without permission",
//         "No food or drinks in observation decks",
//         "Children must be supervised at all times",
//         "Respect photography restrictions"
//       ],
//       explorationWays: [
//         "Main Observatory - Classic Tokyo skyline views",
//         "Top Deck Tour - Premium experience with guided tour",
//         "Night Illumination - See the tower light up after dark",
//         "Foot Town Shopping - Browse shops and exhibitions",
//         "Temple Photography - Capture tower with traditional elements",
//         "Seasonal Events - Special displays and light shows"
//       ]
//     },
//     {
//       id: 3,
//       name: "Fushimi Inari Shrine",
//       nameJp: "伏見稲荷大社",
//       category: "cultural",
//       prefecture: "Kyoto",
//       image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&crop=center",
//       rating: 4.8,
//       reviews: 12567,
//       price: "¥6,000",
//       duration: "Half Day",
//       description: "Famous Shinto shrine featuring thousands of vermillion torii gates creating tunnels up the mountainside.",
//       highlights: ["Thousand Torii Gates", "Mountain Hike", "Fox Statues", "Shrine Complex"],
//       bestTime: "Early morning or late afternoon",
//       difficulty: "Moderate",
//       languages: ["English", "Japanese", "Chinese", "Korean"],
//       nearbyAttractions: [
//         "Kiyomizu-dera Temple - UNESCO World Heritage temple",
//         "Gion District - Traditional geisha district",
//         "Nijo Castle - Historic shogun residence",
//         "Bamboo Forest - Arashiyama bamboo groves"
//       ],
//       dining: [
//         "Kaiseki Cuisine - Traditional multi-course meals",
//         "Tofu Cuisine - Buddhist vegetarian dishes",
//         "Street Food - Local snacks around the shrine",
//         "Tea Houses - Traditional Japanese tea ceremony"
//       ],
//       accommodation: [
//         "Traditional Ryokans - Historic Japanese inns",
//         "Machiya Houses - Converted traditional townhouses",
//         "Temple Lodging - Stay at Buddhist temples",
//         "Modern Hotels - Contemporary accommodations in city center"
//       ],
//       tips: [
//         "Start early to avoid crowds",
//         "Wear comfortable walking shoes",
//         "Bring water for the mountain climb",
//         "Respect shrine etiquette and customs"
//       ],
//       rules: [
//         "Bow before entering shrine gates",
//         "Purify hands and mouth at water basin",
//         "No flash photography in sacred areas",
//         "Speak quietly and respect worshippers"
//       ],
//       explorationWays: [
//         "Full Mountain Hike - Complete trail to the summit",
//         "Torii Tunnel Walk - Explore the famous vermillion gates",
//         "Shrine Worship - Experience traditional Shinto rituals",
//         "Photography Tour - Capture the iconic gates and statues",
//         "Cultural Learning - Understand Inari deity significance",
//         "Night Visit - Peaceful evening atmosphere with illumination"
//       ]
//     },
//     {
//       id: 4,
//       name: "Arashiyama Bamboo Grove",
//       nameJp: "嵐山竹林の小径",
//       category: "nature",
//       prefecture: "Kyoto",
//       image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
//       rating: 4.6,
//       reviews: 9876,
//       price: "¥7,000",
//       duration: "Half Day",
//       description: "Enchanting bamboo forest with towering bamboo stalks creating a natural cathedral of green light.",
//       highlights: ["Bamboo Forest Walk", "Light Filtering", "Natural Sounds", "Peaceful Atmosphere"],
//       bestTime: "Morning or late afternoon",
//       difficulty: "Easy",
//       languages: ["English", "Japanese", "Chinese"],
//       nearbyAttractions: [
//         "Tenryu-ji Temple - Zen temple with beautiful gardens",
//         "Togetsukyo Bridge - Iconic bridge over Katsura River",
//         "Monkey Park - Iwatayama Monkey Park with city views",
//         "Adashino Nenbutsu-ji - Temple with stone statues"
//       ],
//       dining: [
//         "Traditional Tea Houses - Matcha and wagashi sweets",
//         "Tofu Restaurants - Buddhist vegetarian cuisine",
//         "River View Dining - Restaurants overlooking Katsura River",
//         "Local Specialties - Kyoto-style kaiseki cuisine"
//       ],
//       accommodation: [
//         "Luxury Ryokans - Traditional inns with private gardens",
//         "Boutique Hotels - Modern accommodations with traditional elements",
//         "Guest Houses - Budget-friendly local accommodations",
//         "Temple Stays - Authentic Buddhist temple experiences"
//       ],
//       tips: [
//         "Visit early morning for best lighting",
//         "Walk slowly to appreciate the atmosphere",
//         "Listen to the bamboo rustling in the wind",
//         "Combine with nearby temple visits"
//       ],
//       rules: [
//         "Stay on designated paths only",
//         "No climbing on bamboo stalks",
//         "Keep noise levels low",
//         "Do not damage or take bamboo"
//       ],
//       explorationWays: [
//         "Peaceful Walk - Meditative stroll through bamboo tunnels",
//         "Photography Session - Capture the filtering light effects",
//         "Sound Experience - Listen to natural bamboo music",
//         "Temple Combination - Visit with nearby Tenryu-ji Temple",
//         "Seasonal Changes - Experience different lighting throughout the year",
//         "Cultural Learning - Understand bamboo significance in Japanese culture"
//       ]
//     },
//     {
//       id: 5,
//       name: "Osaka Castle",
//       nameJp: "大阪城",
//       category: "historical",
//       prefecture: "Osaka",
//       image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=600&fit=crop&crop=center",
//       rating: 4.5,
//       reviews: 7234,
//       price: "¥9,000",
//       duration: "Half Day",
//       description: "Magnificent reconstructed castle with beautiful gardens, museum exhibits, and panoramic city views.",
//       highlights: ["Castle Keep", "Historical Museum", "Cherry Blossoms", "Panoramic Views"],
//       bestTime: "Spring for cherry blossoms, year-round",
//       difficulty: "Easy",
//       languages: ["English", "Japanese", "Chinese", "Korean"],
//       nearbyAttractions: [
//         "Dotonbori District - Famous entertainment and dining area",
//         "Sumiyoshi Taisha - One of Japan's oldest shrines",
//         "Shitennoji Temple - Historic Buddhist temple",
//         "Kuromon Ichiba Market - Traditional food market"
//       ],
//       dining: [
//         "Osaka Street Food - Takoyaki, okonomiyaki, kushikatsu",
//         "Castle Park Restaurants - Dining with castle views",
//         "Traditional Kaiseki - High-end Japanese cuisine",
//         "Local Specialties - Authentic Osaka culinary experiences"
//       ],
//       accommodation: [
//         "Castle View Hotels - Modern hotels with castle views",
//         "Business Hotels - Convenient and affordable options",
//         "Traditional Inns - Historic ryokans in the area",
//         "Capsule Hotels - Unique Japanese accommodation"
//       ],
//       tips: [
//         "Visit during cherry blossom season for best experience",
//         "Climb to the top floor for panoramic views",
//         "Learn about samurai history in the museum",
//         "Explore the surrounding castle park"
//       ],
//       rules: [
//         "No photography inside certain museum areas",
//         "Respect historical artifacts and displays",
//         "Follow designated paths in castle grounds",
//         "Be respectful during cultural ceremonies"
//       ],
//       explorationWays: [
//         "Historical Tour - Learn about Japanese castle architecture",
//         "Museum Visit - Explore samurai artifacts and history",
//         "Garden Walk - Enjoy the beautiful castle park",
//         "Photography Session - Capture the castle from various angles",
//         "Seasonal Events - Experience festivals and cultural celebrations",
//         "Night Illumination - See the castle beautifully lit after dark"
//       ]
//     },
//     {
//       id: 6,
//       name: "Shibuya Crossing",
//       nameJp: "渋谷スクランブル交差点",
//       category: "urban",
//       prefecture: "Tokyo",
//       image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop&crop=center",
//       rating: 4.4,
//       reviews: 5678,
//       price: "¥5,000",
//       duration: "2 Hours",
//       description: "World's busiest pedestrian crossing, an iconic symbol of Tokyo's energy and modernity.",
//       highlights: ["Crossing Experience", "Sky View", "Hachiko Statue", "Shopping District"],
//       bestTime: "Evening rush hour for maximum activity",
//       difficulty: "Easy",
//       languages: ["English", "Japanese", "Chinese", "Korean", "Urdu"],
//       nearbyAttractions: [
//         "Hachiko Statue - Famous loyal dog memorial",
//         "Shibuya Sky - Rooftop observation deck",
//         "Meiji Shrine - Peaceful shrine in nearby Harajuku",
//         "Takeshita Street - Youth culture and fashion street"
//       ],
//       dining: [
//         "Shibuya Food Show - Department store basement food courts",
//         "Ramen Streets - Various ramen shops in surrounding area",
//         "International Cuisine - Global dining options",
//         "Coffee Shops - Perfect for people-watching"
//       ],
//       accommodation: [
//         "Shibuya Hotels - Central location near the crossing",
//         "Capsule Hotels - Experience unique Japanese accommodation",
//         "Business Hotels - Practical and affordable stays",
//         "Luxury Hotels - High-end accommodations with city views"
//       ],
//       tips: [
//         "Best viewed from surrounding building observation decks",
//         "Experience crossing during rush hour",
//         "Visit both day and night for different atmospheres",
//         "Combine with nearby Harajuku district"
//       ],
//       rules: [
//         "Follow traffic signals and crossing rules",
//         "Be aware of your surroundings in crowds",
//         "Don't stop in the middle of the crossing",
//         "Respect others navigating the busy area"
//       ],
//       explorationWays: [
//         "Crossing Experience - Be part of the famous pedestrian flow",
//         "Sky View Observation - Watch from Shibuya Sky deck",
//         "Street Photography - Capture the urban energy",
//         "Shopping Exploration - Browse nearby department stores",
//         "Cultural Immersion - Experience Tokyo's modern lifestyle",
//         "Night Scene - See the crossing illuminated after dark"
//       ]
//     }
//   ];

//   // Categories for filtering
//   const categories = [
//     { id: "all", name: "All", icon: Crown },
//     { id: "mountain", name: "Mountains", icon: Mountain },
//     { id: "urban", name: "Urban", icon: Building },
//     { id: "cultural", name: "Cultural", icon: Heart },
//     { id: "nature", name: "Nature", icon: Trees },
//     { id: "historical", name: "Historical", icon: Shield },
//     { id: "food", name: "Food & Cuisine", icon: Filter }
//   ];

//   // Filter and sort tours
//   const filteredTours = tours.filter(tour => {
//     const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          tour.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()));
//     const matchesFilter = filterBy === "all" || tour.category === filterBy;
//     return matchesSearch && matchesFilter;
//   });

//   const sortedTours = [...filteredTours].sort((a, b) => {
//     switch (sortBy) {
//       case "price-low":
//         return parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, ""));
//       case "price-high":
//         return parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, ""));
//       case "rating":
//         return b.rating - a.rating;
//       case "duration":
//         return parseInt(a.duration) - parseInt(b.duration);
//       default:
//         return b.isPopular ? 1 : -1;
//     }
//   });

//   // Filter destinations
//   const filteredDestinations = destinations.filter(dest => {
//     const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          dest.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === "all" || dest.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-gradient-primary text-white py-16">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">Explore Japan</h1>
//             <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
//               Discover Japan's beauty with expertly crafted tours and iconic destinations
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-col gap-6">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search tours or destinations..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             <div className="flex flex-col md:flex-row gap-4 items-center">
//               <div className="flex flex-wrap gap-2">
//                 {categories.map((category) => {
//                   const IconComponent = category.icon;
//                   return (
//                     <Button
//                       key={category.id}
//                       variant={selectedCategory === category.id ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => {
//                         setSelectedCategory(category.id);
//                         setFilterBy(category.id);
//                       }}
//                       className="flex items-center gap-2"
//                     >
//                       <IconComponent className="h-4 w-4" />
//                       {category.name}
//                     </Button>
//                   );
//                 })}
//               </div>

//               <Select value={sortBy} onValueChange={setSortBy}>
//                 <SelectTrigger className="w-40">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="popularity">Most Popular</SelectItem>
//                   <SelectItem value="rating">Highest Rated</SelectItem>
//                   <SelectItem value="price-low">Price: Low to High</SelectItem>
//                   <SelectItem value="price-high">Price: High to Low</SelectItem>
//                   <SelectItem value="duration">Duration</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs for Tours and Destinations */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <Tabs defaultValue="tours" className="w-full">
//           <TabsList className="grid w-full grid-cols-2 mb-6">
//             <TabsTrigger value="tours">Tours</TabsTrigger>
//             <TabsTrigger value="destinations">Destinations</TabsTrigger>
//           </TabsList>

//           {/* Tours Tab */}
//           <TabsContent value="tours">
//             <div>
//               <p className="text-muted-foreground mb-6">
//                 Showing {sortedTours.length} tour{sortedTours.length !== 1 ? 's' : ''} 
//                 {searchTerm && ` for "${searchTerm}"`}
//                 {filterBy !== "all" && ` in ${filterBy} category`}
//               </p>
//               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
//                 {sortedTours.map((tour) => (
//                   <Card key={tour.id} className="overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
//                     <div className="relative">
//                       <img 
//                         src={tour.image} 
//                         alt={tour.title}
//                         className="w-full h-48 object-cover"
//                       />
//                       <div className="absolute top-4 left-4 flex gap-2">
//                         {tour.isPopular && (
//                           <Badge variant="premium">
//                             <Star className="h-3 w-3 mr-1 fill-current" />
//                             Popular
//                           </Badge>
//                         )}
//                         {tour.discount > 0 && (
//                           <Badge variant="destructive">
//                             -{tour.discount}%
//                           </Badge>
//                         )}
//                       </div>
//                       <div className="absolute top-4 right-4">
//                         <div className="bg-white/90 backdrop-blur rounded-lg px-3 py-2">
//                           <div className="text-lg font-bold text-primary">{tour.price}</div>
//                           {tour.originalPrice && (
//                             <div className="text-sm text-muted-foreground line-through">{tour.originalPrice}</div>
//                           )}
//                         </div>
//                       </div>
//                       <div className="absolute bottom-4 left-4 right-4">
//                         <div className="flex items-center justify-between text-white">
//                           <div className="flex items-center bg-black/50 backdrop-blur rounded px-2 py-1">
//                             <Star className="h-4 w-4 mr-1 fill-current text-yellow-400" />
//                             <span className="font-semibold">{tour.rating}</span>
//                             <span className="text-white/80 ml-1">({tour.reviews})</span>
//                           </div>
//                           <div className="flex items-center bg-black/50 backdrop-blur rounded px-2 py-1">
//                             <Clock className="h-4 w-4 mr-1" />
//                             <span>{tour.duration}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <CardContent className="p-6">
//                       <CardHeader className="p-0 mb-4">
//                         <CardTitle className="text-xl leading-tight">{tour.title}</CardTitle>
//                       </CardHeader>

//                       <div className="space-y-4">
//                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                           <div className="flex items-center">
//                             <Users className="h-4 w-4 mr-1" />
//                             {tour.groupSize}
//                           </div>
//                           <div className="flex items-center">
//                             <MapPin className="h-4 w-4 mr-1" />
//                             {tour.pickup}
//                           </div>
//                         </div>

//                         <div>
//                           <h4 className="font-semibold mb-2 text-sm">Tour Highlights:</h4>
//                           <div className="flex flex-wrap gap-1">
//                             {tour.highlights.slice(0, 3).map((highlight, index) => (
//                               <Badge key={index} variant="secondary" className="text-xs">
//                                 {highlight}
//                               </Badge>
//                             ))}
//                             {tour.highlights.length > 3 && (
//                               <Badge variant="outline" className="text-xs">
//                                 +{tour.highlights.length - 3} more
//                               </Badge>
//                             )}
//                           </div>
//                         </div>

//                         <div>
//                           <h4 className="font-semibold mb-2 text-sm">Languages:</h4>
//                           <div className="flex flex-wrap gap-1">
//                             {tour.languages.map((lang, index) => (
//                               <Badge key={index} variant="outline" className="text-xs">
//                                 {lang}
//                               </Badge>
//                             ))}
//                           </div>
//                         </div>

//                         <div>
//                           <h4 className="font-semibold mb-2 text-sm">Includes:</h4>
//                           <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
//                             {tour.includes.slice(0, 4).map((item, index) => (
//                               <div key={index} className="flex items-center">
//                                 <div className="w-1 h-1 bg-primary rounded-full mr-2" />
//                                 {item}
//                               </div>
//                             ))}
//                           </div>
//                         </div>

//                         <div className="flex gap-2 pt-4">
//                           <Link to={`/tours/${tour.id}`} className="flex-1">
//                             <Button className="w-full" variant="outline">
//                               <Calendar className="h-4 w-4 mr-2" />
//                               View Details
//                             </Button>
//                           </Link>
//                           <Link to={`/tours/${tour.id}/book`} className="flex-1">
//                             <Button className="w-full" variant="hero">
//                               Book Now
//                             </Button>
//                           </Link>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {sortedTours.length === 0 && (
//                 <div className="text-center py-20">
//                   <div className="text-6xl mb-4">🔍</div>
//                   <h3 className="text-2xl font-bold mb-2">No tours found</h3>
//                   <p className="text-muted-foreground mb-4">
//                     Try adjusting your search criteria or browse all tours
//                   </p>
//                   <Button onClick={() => {
//                     setSearchTerm("");
//                     setFilterBy("all");
//                     setSortBy("popularity");
//                     setSelectedCategory("all");
//                   }}>
//                     Clear Filters
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </TabsContent>

//           {/* Destinations Tab */}
//           <TabsContent value="destinations">
//             <div>
//               <p className="text-muted-foreground mb-6">
//                 Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} 
//                 {searchTerm && ` for "${searchTerm}"`}
//                 {selectedCategory !== "all" && ` in ${selectedCategory} category`}
//               </p>
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {filteredDestinations.map((destination) => (
//                   <Card key={destination.id} className="overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
//                     <div className="grid md:grid-cols-2 gap-0">
//                       <div className="relative">
//                         <img 
//                           src={destination.image} 
//                           alt={destination.name}
//                           className="w-full h-64 md:h-full object-cover"
//                         />
//                         <div className="absolute top-4 left-4">
//                           <Badge variant="premium">
//                             <Star className="h-3 w-3 mr-1 fill-current" />
//                             {destination.rating}
//                           </Badge>
//                         </div>
//                         <div className="absolute top-4 right-4">
//                           <Badge variant="secondary">
//                             {destination.category}
//                           </Badge>
//                         </div>
//                       </div>
                      
//                       <CardContent className="p-6 flex flex-col justify-between">
//                         <div>
//                           <div className="mb-4">
//                             <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
//                             <p className="text-sm text-muted-foreground mb-2">{destination.nameJp} • {destination.prefecture}</p>
//                             <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                               <div className="flex items-center">
//                                 <Clock className="h-4 w-4 mr-1" />
//                                 {destination.duration}
//                               </div>
//                               <div className="flex items-center">
//                                 <Star className="h-4 w-4 mr-1 fill-primary text-primary" />
//                                 {destination.rating} ({destination.reviews})
//                               </div>
//                             </div>
//                           </div>
                          
//                           <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
//                             {destination.description}
//                           </p>
                          
//                           <div className="space-y-3">
//                             <div>
//                               <h4 className="font-semibold mb-2 text-sm">Highlights:</h4>
//                               <div className="flex flex-wrap gap-1">
//                                 {destination.highlights.slice(0, 3).map((highlight, index) => (
//                                   <Badge key={index} variant="secondary" className="text-xs">
//                                     {highlight}
//                                   </Badge>
//                                 ))}
//                               </div>
//                             </div>
                            
//                             <div>
//                               <h4 className="font-semibold mb-2 text-sm">Languages:</h4>
//                               <div className="flex flex-wrap gap-1">
//                                 {destination.languages.slice(0, 4).map((lang, index) => (
//                                   <Badge key={index} variant="outline" className="text-xs">
//                                     {lang}
//                                   </Badge>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex gap-2 mt-6 pt-4 border-t">
//                           <Link to={`/destinations/${destination.id}`} className="flex-1">
//                             <Button className="w-full" variant="outline" size="sm">
//                               <Info className="h-4 w-4 mr-2" />
//                               Learn More
//                             </Button>
//                           </Link>
//                           <Link to={`/tours?destination=${destination.id}`} className="flex-1">
//                             <Button className="w-full" variant="hero" size="sm">
//                               <Camera className="h-4 w-4 mr-2" />
//                               Book Tour
//                             </Button>
//                           </Link>
//                         </div>
//                       </CardContent>
//                     </div>
//                   </Card>
//                 ))}
//               </div>

//               {filteredDestinations.length === 0 && (
//                 <div className="text-center py-20">
//                   <div className="text-6xl mb-4">🗾</div>
//                   <h3 className="text-2xl font-bold mb-2">No destinations found</h3>
//                   <p className="text-muted-foreground mb-4">
//                     Try adjusting your search or browse all destinations
//                   </p>
//                   <Button onClick={() => {
//                     setSearchTerm("");
//                     setSelectedCategory("all");
//                     setFilterBy("all");
//                   }}>
//                     Show All Destinations
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default JapanTravel;

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  MapPin,
  Clock,
  Users,
  Search,
  Filter,
  Calendar,
  Camera,
  Info,
  Shield,
  Mountain,
  Building,
  Trees,
  Crown,
  Heart,
  Loader2,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Compass
} from "lucide-react";

const Tours = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);

  const handleViewDestination = (destinationId) => {
    setSelectedDestinationId(destinationId);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedDestinationId(null);
  };

  return (
    <div>
      {currentView === 'list' && <JapanTravel onViewDestination={handleViewDestination} />}
      {currentView === 'detail' && (
        <DestinationDetail 
          destinationId={selectedDestinationId} 
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};

// Main Japan Travel Component
const JapanTravel = ({ onViewDestination }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [destinations, setDestinations] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL - adjust this to your backend URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Fetch destinations from backend
  const fetchDestinations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/detail-forms`);
      if (!response.ok) {
        throw new Error('Failed to fetch destinations');
      }
      const data = await response.json();
      
      const transformedDestinations = data.detailForms.map(dest => ({
        id: dest._id,
        name: dest.name,
        nameJp: dest.nameJp || dest.name,
        category: dest.category,
        prefecture: dest.prefecture,
        image: dest.image || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
        rating: dest.rating || 4.5,
        reviews: dest.reviews || 100,
        price: dest.price || "¥10,000",
        duration: dest.duration || "Full Day",
        description: dest.description || "Beautiful destination in Japan",
        highlights: dest.highlights || [],
        bestTime: dest.bestTime || "Year-round",
        difficulty: dest.difficulty || "Easy",
        languages: dest.languages || ["English", "Japanese"]
      }));
      
      setDestinations(transformedDestinations);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching destinations:', err);
    }
  };

  // Fetch tours from backend
  const fetchTours = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/short-forms`);
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }
      const data = await response.json();
      
      const transformedTours = data.shortForms.map(tour => ({
        id: tour._id,
        title: tour.title,
        price: tour.price || "¥15,000",
        originalPrice: tour.originalPrice,
        duration: tour.duration || "8 hours",
        rating: tour.rating || 4.5,
        reviews: tour.reviews || 100,
        image: tour.image || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
        category: tour.category || "cultural",
        languages: tour.languages || ["English", "Japanese"],
        highlights: tour.highlights || [],
        difficulty: tour.difficulty || "Easy",
        groupSize: tour.groupSize || "8-15 people",
        pickup: tour.pickup || "Station",
        includes: tour.includes || [],
        isPopular: tour.isPopular || false,
        discount: tour.discount || 0
      }));
      
      setTours(transformedTours);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tours:', err);
    }
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchDestinations(), fetchTours()]);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Categories for filtering
  const categories = [
    { id: "all", name: "All", icon: Crown },
    { id: "mountain", name: "Mountains", icon: Mountain },
    { id: "urban", name: "Urban", icon: Building },
    { id: "cultural", name: "Cultural", icon: Heart },
    { id: "nature", name: "Nature", icon: Trees },
    { id: "historical", name: "Historical", icon: Shield },
    { id: "food", name: "Food & Cuisine", icon: Filter }
  ];

  // Filter and sort tours
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (tour.highlights && tour.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase())));
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

  // Filter destinations
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Loading Japan Travel Data...</h2>
          <p className="text-muted-foreground">Please wait while we fetch the latest tours and destinations</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Failed to Load Data</h2>
          <p className="text-muted-foreground mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Explore Japan</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Discover Japan's beauty with expertly crafted tours and iconic destinations
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tours or destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setFilterBy(category.id);
                      }}
                      className="flex items-center gap-2"
                    >
                      <IconComponent className="h-4 w-4" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>

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

      {/* Tabs for Tours and Destinations */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="tours" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="tours">Tours ({tours.length})</TabsTrigger>
            <TabsTrigger value="destinations">Destinations ({destinations.length})</TabsTrigger>
          </TabsList>

          {/* Tours Tab */}
          <TabsContent value="tours">
            <div>
              <p className="text-muted-foreground mb-6">
                Showing {sortedTours.length} tour{sortedTours.length !== 1 ? 's' : ''} 
                {searchTerm && ` for "${searchTerm}"`}
                {filterBy !== "all" && ` in ${filterBy} category`}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedTours.map((tour) => (
                  <Card key={tour.id} className="overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
                    <div className="relative">
                      <img 
                        src={tour.image} 
                        alt={tour.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center";
                        }}
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

                        {tour.highlights && tour.highlights.length > 0 && (
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
                        )}

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

                        <div className="flex gap-2 pt-4">
                          <Button className="flex-1" variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button className="flex-1" variant="hero">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Destinations Tab */}
          <TabsContent value="destinations">
            <div>
              <p className="text-muted-foreground mb-6">
                Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} 
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "all" && ` in ${selectedCategory} category`}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredDestinations.map((destination) => (
                  <Card key={destination.id} className="overflow-hidden border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative">
                        <img 
                          src={destination.image} 
                          alt={destination.name}
                          className="w-full h-64 md:h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center";
                          }}
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
                            {destination.highlights && destination.highlights.length > 0 && (
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
                            )}
                            
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
                          <Button 
                            className="flex-1" 
                            variant="outline" 
                            size="sm"
                            onClick={() => onViewDestination(destination.id)}
                          >
                            <Info className="h-4 w-4 mr-2" />
                            Learn More
                          </Button>
                          <Button className="flex-1" variant="hero" size="sm">
                            <Camera className="h-4 w-4 mr-2" />
                            Book Tour
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Destination Detail Component
const DestinationDetail = ({ destinationId, onBack }) => {
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api';

  const fetchDestination = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/detail-forms/${destinationId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch destination details');
      }
      const data = await response.json();
      
      const transformedDestination = {
        id: data._id,
        name: data.name,
        nameJp: data.nameJp || data.name,
        category: data.category,
        prefecture: data.prefecture,
        image: data.image || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
        rating: data.rating || 4.5,
        reviews: data.reviews || 100,
        price: data.price || "¥12,000",
        duration: data.duration || "Full Day",
        description: data.description || "Beautiful destination in Japan",
        detailedDescription: data.detailedDescription || data.description,
        highlights: data.highlights || [],
        bestTime: data.bestTime || "Year-round",
        difficulty: data.difficulty || "Easy",
        languages: data.languages || ["English", "Japanese"],
        nearbyAttractions: data.nearbyAttractions || [],
        dining: data.dining || [],
        accommodation: data.accommodation || [],
        tips: data.tips || [],
        rules: data.rules || [],
        explorationWays: data.explorationWays || []
      };
      
      setDestination(transformedDestination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (destinationId) {
      fetchDestination();
    }
  }, [destinationId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Loading Destination Details...</h2>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Failed to Load Destination</h2>
          <p className="text-muted-foreground mb-4">{error || 'Destination not found'}</p>
          <Button onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button variant="ghost" className="mb-4" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Destinations
        </Button>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="border-0 shadow-elegant">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {destination.detailedDescription}
                </p>
                
                {destination.highlights && destination.highlights.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Highlights</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {destination.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Quick Facts</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Best Time:</span>
                        <span>{destination.bestTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <span>{destination.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Languages</h3>
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

            {/* Tips and Rules */}
            {(destination.tips.length > 0 || destination.rules.length > 0) && (
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {destination.tips.length > 0 && (
                  <Card className="border-0 shadow-elegant">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center">
                        <Info className="h-4 w-4 mr-2 text-primary" />
                        Visitor Tips
                      </h3>
                      <div className="space-y-2">
                        {destination.tips.slice(0, 3).map((tip, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm">{typeof tip === 'string' ? tip : tip.description}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {destination.rules.length > 0 && (
                  <Card className="border-0 shadow-elegant">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-orange-500" />
                        Important Rules
                      </h3>
                      <div className="space-y-2">
                        {destination.rules.slice(0, 3).map((rule, index) => (
                          <div key={index} className="flex items-start">
                            <AlertCircle className="h-3 w-3 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm">{typeof rule === 'string' ? rule : rule.description}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
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

            {/* Exploration Ways */}
            {destination.explorationWays.length > 0 && (
              <Card className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Ways to Explore</h3>
                  <div className="space-y-3">
                    {destination.explorationWays.slice(0, 3).map((way, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold text-sm mb-1">
                          {way.title || `Experience ${index + 1}`}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {way.description ? way.description.slice(0, 80) + '...' : 'Explore this destination'}
                        </p>
                        {way.duration && (
                          <div className="flex items-center mt-2">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="text-xs">{way.duration}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Compass className="h-4 w-4 mr-2" />
                    View All Options
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tours;