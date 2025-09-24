

// import { useState, useEffect } from "react";
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
//   Heart,
//   Loader2,
//   ArrowLeft,
//   CheckCircle,
//   AlertCircle,
//   Compass,
//   Image as ImageIcon,
// } from "lucide-react";

// const Tours = () => {
//   const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'
//   const [selectedDestinationId, setSelectedDestinationId] = useState(null);

//   const handleViewDestination = (destinationId) => {
//     setSelectedDestinationId(destinationId);
//     setCurrentView('detail');
//   };

//   const handleBackToList = () => {
//     setCurrentView('list');
//     setSelectedDestinationId(null);
//   };

//   return (
//     <div>
//       {currentView === 'list' && <JapanTravel onViewDestination={handleViewDestination} />}
//       {currentView === 'detail' && (
//         <DestinationDetail 
//           destinationId={selectedDestinationId} 
//           onBack={handleBackToList}
//         />
//       )}
//     </div>
//   );
// };

// // Main Japan Travel Component
// const JapanTravel = ({ onViewDestination }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("popularity");
//   const [filterBy, setFilterBy] = useState("all");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [destinations, setDestinations] = useState([]);
//   const [tours, setTours] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // API base URL
//   const API_BASE_URL = 'http://localhost:5000/api';

//   // Fetch posts from backend
//   const fetchPosts = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/tourguides`);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
//       }
//       const data = await response.json();
//       console.log('API Response:', data); // Log for debugging

//       // Handle possible response structures
//       let posts = Array.isArray(data) ? data : (Array.isArray(data.posts) ? data.posts : []);
//       if (!Array.isArray(posts)) {
//         console.warn('Response is not an array, setting to empty array.');
//         posts = [];
//       }

//       // Transform data for destinations (mapping all schema fields)
//       const transformedDestinations = posts.map(post => ({
//         id: post._id || '',
//         title: post.title || '',
//         content: post.content || '',
//         imageUrl: post.imageUrl || '',
//         images: post.images || [],
//         price: post.price || '',
//         author: post.author || 'Admin',
//         category: post.category || '',
//         tags: post.tags || [],
//         status: post.status || 'published',
//         featured: post.featured || false,
//         views: post.views || 0,
//         slug: post.slug || '',
//         prefecture: post.prefecture || '',
//         nameJp: post.nameJp || '',
//         duration: post.duration || '',
//         durationHours: post.durationHours || 8,
//         about: post.about || '',
//         details: post.details || '',
//         description: post.description || '',
//         fullDescription: post.fullDescription || '',
//         highlights: post.highlights || [],
//         includes: post.includes || [],
//         notSuitableFor: post.notSuitableFor || [],
//         rules: post.rules || [],
//         guides: post.guides || [],
//         explorationWays: post.explorationWays || [],
//         bestTime: post.bestTime || '',
//         difficulty: post.difficulty || 'Easy',
//         meetingPoint: post.meetingPoint || '',
//         importantInformation: post.importantInformation || [],
//         nearbyAttractions: post.nearbyAttractions || [],
//         dining: post.dining || [],
//         accommodation: post.accommodation || [],
//         tips: post.tips || [],
//         languages: post.languages || [],
//         freeCancellation: {
//           available: post.freeCancellation?.available ?? true,
//           deadlineHours: post.freeCancellation?.deadlineHours ?? 24,
//           note: post.freeCancellation?.note || '',
//         },
//         reserveNowPayLater: {
//           available: post.reserveNowPayLater?.available ?? true,
//           note: post.reserveNowPayLater?.note || '',
//         },
//         liveTourGuide: {
//           available: post.liveTourGuide?.available ?? true,
//           languages: post.liveTourGuide?.languages || [],
//         },
//         rating: {
//           average: post.rating?.average || 0,
//           count: post.rating?.count || 0,
//         },
//         reviews: post.reviews?.map(review => ({
//           name: review.name || '',
//           rating: review.rating || 0,
//           comment: review.comment || '',
//           createdAt: review.createdAt || '',
//         })) || [],
//         createdAt: post.createdAt || '',
//         updatedAt: post.updatedAt || '',
//         // UI-specific fields
//         name: post.title || '',
//         nameJp: post.nameJp || post.title || '',
//         prefecture: post.prefecture || 'Unknown',
//         image: post.imageUrl || (post.images?.length > 0 ? post.images[0] : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'),
//         ratingValue: post.rating?.average || 4.5,
//         reviewCount: post.rating?.count || post.reviews?.length || 0,
//         price: post.price || '¥10,000',
//         duration: post.duration || 'Full Day',
//         description: post.description || post.content || 'Beautiful destination in Japan',
//       }));

//       // Transform data for tours (similar mapping)
//       const transformedTours = posts.map(post => ({
//         id: post._id || '',
//         title: post.title || '',
//         content: post.content || '',
//         imageUrl: post.imageUrl || '',
//         images: post.images || [],
//         price: post.price || '',
//         author: post.author || 'Admin',
//         category: post.category || '',
//         tags: post.tags || [],
//         status: post.status || 'published',
//         featured: post.featured || false,
//         views: post.views || 0,
//         slug: post.slug || '',
//         prefecture: post.prefecture || '',
//         nameJp: post.nameJp || '',
//         duration: post.duration || '',
//         durationHours: post.durationHours || 8,
//         about: post.about || '',
//         details: post.details || '',
//         description: post.description || '',
//         fullDescription: post.fullDescription || '',
//         highlights: post.highlights || [],
//         includes: post.includes || [],
//         notSuitableFor: post.notSuitableFor || [],
//         rules: post.rules || [],
//         guides: post.guides || [],
//         explorationWays: post.explorationWays || [],
//         bestTime: post.bestTime || '',
//         difficulty: post.difficulty || 'Easy',
//         meetingPoint: post.meetingPoint || '',
//         importantInformation: post.importantInformation || [],
//         nearbyAttractions: post.nearbyAttractions || [],
//         dining: post.dining || [],
//         accommodation: post.accommodation || [],
//         tips: post.tips || [],
//         languages: post.languages || [],
//         freeCancellation: {
//           available: post.freeCancellation?.available ?? true,
//           deadlineHours: post.freeCancellation?.deadlineHours ?? 24,
//           note: post.freeCancellation?.note || '',
//         },
//         reserveNowPayLater: {
//           available: post.reserveNowPayLater?.available ?? true,
//           note: post.reserveNowPayLater?.note || '',
//         },
//         liveTourGuide: {
//           available: post.liveTourGuide?.available ?? true,
//           languages: post.liveTourGuide?.languages || [],
//         },
//         rating: {
//           average: post.rating?.average || 0,
//           count: post.rating?.count || 0,
//         },
//         reviews: post.reviews?.map(review => ({
//           name: review.name || '',
//           rating: review.rating || 0,
//           comment: review.comment || '',
//           createdAt: review.createdAt || '',
//         })) || [],
//         createdAt: post.createdAt || '',
//         updatedAt: post.updatedAt || '',
//         // UI-specific fields
//         title: post.title || '',
//         price: post.price || '¥15,000',
//         originalPrice: null,
//         duration: post.duration || '8 hours',
//         rating: post.rating?.average || 4.5,
//         reviews: post.rating?.count || post.reviews?.length || 0,
//         image: post.imageUrl || (post.images?.length > 0 ? post.images[0] : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'),
//         category: post.category || 'cultural',
//         languages: post.languages || post.liveTourGuide?.languages || ['English', 'Japanese'],
//         highlights: post.highlights || [],
//         difficulty: post.difficulty || 'Easy',
//         groupSize: '8-15 people',
//         pickup: post.meetingPoint || 'Station',
//         includes: post.includes || [],
//         isPopular: post.featured || false,
//         discount: 0,
//       }));

//       setDestinations(transformedDestinations);
//       setTours(transformedTours);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching posts:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load data on component mount
//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   // Categories for filtering (aligned with schema's enum, excluding 'blog' and 'tour')
//   const categories = [
//     { id: "all", name: "All", icon: Crown },
//     { id: "mountain", name: "Mountains", icon: Mountain },
//     { id: "urban", name: "Urban", icon: Building },
//     { id: "cultural", name: "Cultural", icon: Heart },
//     { id: "nature", name: "Nature", icon: Trees },
//     { id: "temple", name: "Temples", icon: Shield },
//     { id: "modern", name: "Modern", icon: Building },
//     { id: "adventure", name: "Adventure", icon: Compass },
//     { id: "food", name: "Food & Cuisine", icon: Filter },
//     { id: "accommodation", name: "Accommodation", icon: Building },
//   ];

//   // Filter and sort tours
//   const filteredTours = tours.filter(tour => {
//     const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          (tour.highlights && tour.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase())));
//     const matchesFilter = filterBy === "all" || tour.category === filterBy;
//     return matchesSearch && matchesFilter;
//   });

//   const sortedTours = [...filteredTours].sort((a, b) => {
//     switch (sortBy) {
//       case "price-low":
//         return parseInt(a.price.replace(/[^0-9]/g, "") || 0) - parseInt(b.price.replace(/[^0-9]/g, "") || 0);
//       case "price-high":
//         return parseInt(b.price.replace(/[^0-9]/g, "") || 0) - parseInt(a.price.replace(/[^0-9]/g, "") || 0);
//       case "rating":
//         return b.rating - a.rating;
//       case "duration":
//         return parseInt(a.durationHours || 0) - parseInt(b.durationHours || 0);
//       default:
//         return b.isPopular ? 1 : -1;
//     }
//   });

//   // Filter destinations
//   const filteredDestinations = destinations.filter(dest => {
//     const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          dest.prefecture.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === "all" || dest.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
//           <h2 className="text-2xl font-bold mb-2">Loading Japan Travel Data...</h2>
//           <p className="text-muted-foreground">Please wait while we fetch the latest tours and destinations</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold mb-2">Failed to Load Data</h2>
//           <p className="text-muted-foreground mb-4">Error: {error}</p>
//           <Button onClick={() => fetchPosts()}>
//             Try Again
//           </Button>
//         </div>
//       </div>
//     );
//   }

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
//             <TabsTrigger value="tours">Tours ({tours.length})</TabsTrigger>
//             <TabsTrigger value="destinations">Destinations ({destinations.length})</TabsTrigger>
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
//                         onError={(e) => {
//                           e.target.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center";
//                         }}
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

//                         {tour.highlights?.length > 0 && (
//                           <div>
//                             <h4 className="font-semibold mb-2 text-sm">Tour Highlights:</h4>
//                             <div className="flex flex-wrap gap-1">
//                               {tour.highlights.slice(0, 3).map((highlight, index) => (
//                                 <Badge key={index} variant="secondary" className="text-xs">
//                                   {highlight}
//                                 </Badge>
//                               ))}
//                               {tour.highlights.length > 3 && (
//                                 <Badge variant="outline" className="text-xs">
//                                   +{tour.highlights.length - 3} more
//                                 </Badge>
//                               )}
//                             </div>
//                           </div>
//                         )}

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

//                         <div className="flex gap-2 pt-4">
//                           <Button 
//                             className="flex-1" 
//                             variant="outline"
//                             onClick={() => onViewDestination(tour.id)}
//                           >
//                             <Calendar className="h-4 w-4 mr-2" />
//                             View Details
//                           </Button>
//                           <Button className="flex-1" variant="hero">
//                             Book Now
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
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
//                           onError={(e) => {
//                             e.target.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center";
//                           }}
//                         />
//                         <div className="absolute top-4 left-4">
//                           <Badge variant="premium">
//                             <Star className="h-3 w-3 mr-1 fill-current" />
//                             {destination.ratingValue}
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
//                                 {destination.ratingValue} ({destination.reviewCount})
//                               </div>
//                             </div>
//                           </div>
                          
//                           <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
//                             {destination.description}
//                           </p>
                          
//                           <div className="space-y-3">
//                             {destination.highlights?.length > 0 && (
//                               <div>
//                                 <h4 className="font-semibold mb-2 text-sm">Highlights:</h4>
//                                 <div className="flex flex-wrap gap-1">
//                                   {destination.highlights.slice(0, 3).map((highlight, index) => (
//                                     <Badge key={index} variant="secondary" className="text-xs">
//                                       {highlight}
//                                     </Badge>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
                            
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
//                           <Button 
//                             className="flex-1" 
//                             variant="outline" 
//                             size="sm"
//                             onClick={() => onViewDestination(destination.id)}
//                           >
//                             <Info className="h-4 w-4 mr-2" />
//                             Learn More
//                           </Button>
//                           <Button className="flex-1" variant="hero" size="sm">
//                             <Camera className="h-4 w-4 mr-2" />
//                             Book Tour
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// // Destination Detail Component
// const DestinationDetail = ({ destinationId, onBack }) => {
//   const [destination, setDestination] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const API_BASE_URL = 'http://localhost:5000/api';

//   const fetchDestination = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/posts/${destinationId}`);
//       if (!response.ok) {
//         throw new Error(`Failed to fetch destination details: ${response.status} ${response.statusText}`);
//       }
//       const data = await response.json();
//       console.log('Destination API Response:', data); // Log for debugging

//       // Transform data for destination (mapping all schema fields)
//       const transformedDestination = {
//         id: data._id || '',
//         title: data.title || '',
//         content: data.content || '',
//         imageUrl: data.imageUrl || '',
//         images: data.images || [],
//         price: data.price || '',
//         author: data.author || 'Admin',
//         category: data.category || '',
//         tags: data.tags || [],
//         status: data.status || 'published',
//         featured: data.featured || false,
//         views: data.views || 0,
//         slug: data.slug || '',
//         prefecture: data.prefecture || '',
//         nameJp: data.nameJp || '',
//         duration: data.duration || '',
//         durationHours: data.durationHours || 8,
//         about: data.about || '',
//         details: data.details || '',
//         description: data.description || '',
//         fullDescription: data.fullDescription || '',
//         highlights: data.highlights || [],
//         includes: data.includes || [],
//         notSuitableFor: data.notSuitableFor || [],
//         rules: data.rules || [],
//         guides: data.guides || [],
//         explorationWays: data.explorationWays || [],
//         bestTime: data.bestTime || '',
//         difficulty: data.difficulty || 'Easy',
//         meetingPoint: data.meetingPoint || '',
//         importantInformation: data.importantInformation || [],
//         nearbyAttractions: data.nearbyAttractions || [],
//         dining: data.dining || [],
//         accommodation: data.accommodation || [],
//         tips: data.tips || [],
//         languages: data.languages || [],
//         freeCancellation: {
//           available: data.freeCancellation?.available ?? true,
//           deadlineHours: data.freeCancellation?.deadlineHours ?? 24,
//           note: data.freeCancellation?.note || '',
//         },
//         reserveNowPayLater: {
//           available: data.reserveNowPayLater?.available ?? true,
//           note: data.reserveNowPayLater?.note || '',
//         },
//         liveTourGuide: {
//           available: data.liveTourGuide?.available ?? true,
//           languages: data.liveTourGuide?.languages || [],
//         },
//         rating: {
//           average: data.rating?.average || 0,
//           count: data.rating?.count || 0,
//         },
//         reviews: data.reviews?.map(review => ({
//           name: review.name || 'Anonymous',
//           rating: review.rating || 0,
//           comment: review.comment || '',
//           createdAt: review.createdAt || '',
//         })) || [],
//         createdAt: data.createdAt || '',
//         updatedAt: data.updatedAt || '',
//         // UI-specific fields
//         name: data.title || '',
//         nameJp: data.nameJp || data.title || '',
//         prefecture: data.prefecture || 'Unknown',
//         image: data.imageUrl || (data.images?.length > 0 ? data.images[0] : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'),
//         rating: data.rating?.average || 4.5,
//         reviewsCount: data.rating?.count || data.reviews?.length || 0,
//         price: data.price || '¥12,000',
//         duration: data.duration || 'Full Day',
//         description: data.description || data.content || 'Beautiful destination in Japan',
//         detailedDescription: data.fullDescription || data.details || data.description || data.content || 'Beautiful destination in Japan',
//       };

//       setDestination(transformedDestination);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (destinationId) {
//       fetchDestination();
//     }
//   }, [destinationId]);

//   // Image gallery navigation
//   const nextImage = () => {
//     if (destination?.images?.length > 0) {
//       setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
//     }
//   };

//   const prevImage = () => {
//     if (destination?.images?.length > 0) {
//       setCurrentImageIndex((prev) => (prev - 1 + destination.images.length) % destination.images.length);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
//           <h2 className="text-2xl font-bold mb-2">Loading Destination Details...</h2>
//         </div>
//       </div>
//     );
//   }

//   if (error || !destination) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold mb-2">Failed to Load Destination</h2>
//           <p className="text-muted-foreground mb-4">{error || 'Destination not found'}</p>
//           <Button onClick={onBack}>
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Go Back
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Back Navigation */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <Button variant="ghost" className="mb-4" onClick={onBack}>
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Destinations
//         </Button>
//       </div>

//       {/* Hero Section with Image Gallery */}
//       <div className="relative h-[60vh] overflow-hidden">
//         <img 
//           src={destination.images?.length > 0 ? destination.images[currentImageIndex] : destination.image} 
//           alt={destination.name}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             e.target.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center";
//           }}
//         />
//         <div className="absolute inset-0 bg-black/40" />
//         {destination.images?.length > 1 && (
//           <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
//             <Button variant="ghost" onClick={prevImage} className="text-white">
//               &larr;
//             </Button>
//             <Button variant="ghost" onClick={nextImage} className="text-white">
//               &rarr;
//             </Button>
//           </div>
//         )}
//         <div className="absolute bottom-8 left-0 right-0">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-white">
//               <div className="flex items-center gap-4 mb-4">
//                 <Badge variant="premium" className="bg-white/20 backdrop-blur text-white border-white/30">
//                   <Star className="h-3 w-3 mr-1 fill-current" />
//                   {destination.rating}
//                 </Badge>
//                 <Badge variant="secondary" className="bg-white/20 backdrop-blur text-white border-white/30">
//                   {destination.category}
//                 </Badge>
//               </div>
//               <h1 className="text-4xl md:text-6xl font-bold mb-2">{destination.name}</h1>
//               <p className="text-xl opacity-90 mb-4">{destination.nameJp} • {destination.prefecture}</p>
//               <div className="flex items-center gap-6 text-white/90">
//                 <div className="flex items-center">
//                   <Clock className="h-4 w-4 mr-2" />
//                   {destination.duration}
//                 </div>
//                 <div className="flex items-center">
//                   <Users className="h-4 w-4 mr-2" />
//                   {destination.reviewsCount.toLocaleString()} reviews
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="md:col-span-2">
//             {/* About Section */}
//             <Card className="border-0 shadow-elegant mb-6">
//               <CardContent className="p-6">
//                 <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
//                 {destination.fullDescription && (
//                   <p className="text-muted-foreground mb-4 leading-relaxed">{destination.fullDescription}</p>
//                 )}
//                 {destination.description && destination.description !== destination.fullDescription && (
//                   <p className="text-muted-foreground mb-4 leading-relaxed">{destination.description}</p>
//                 )}
//                 {destination.about && (
//                   <p className="text-muted-foreground mb-4 leading-relaxed">{destination.about}</p>
//                 )}
//                 {destination.details && (
//                   <p className="text-muted-foreground mb-4 leading-relaxed">{destination.details}</p>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Highlights */}
//             {destination.highlights?.length > 0 && (
//               <Card className="border-0 shadow-elegant mb-6">
//                 <CardContent className="p-6">
//                   <h3 className="text-lg font-bold mb-4">Highlights</h3>
//                   <div className="grid md:grid-cols-2 gap-2">
//                     {destination.highlights.map((highlight, index) => (
//                       <div key={index} className="flex items-center">
//                         <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
//                         <span className="text-sm">{highlight}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Reviews */}
//             {destination.reviews?.length > 0 && (
//               <Card className="border-0 shadow-elegant mb-6">
//                 <CardContent className="p-6">
//                   <h3 className="text-lg font-bold mb-4">Reviews ({destination.reviewsCount})</h3>
//                   <div className="space-y-4">
//                     {destination.reviews.map((review, index) => (
//                       <div key={index} className="border-b pb-4 last:border-b-0">
//                         <div className="flex items-center justify-between mb-2">
//                           <div className="flex items-center">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
//                             <span className="font-semibold">{review.rating}/5</span>
//                           </div>
//                           <span className="text-sm text-muted-foreground">
//                             {new Date(review.createdAt).toLocaleDateString()}
//                           </span>
//                         </div>
//                         <p className="font-medium">{review.name}</p>
//                         <p className="text-sm text-muted-foreground">{review.comment}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Additional Information */}
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Quick Facts */}
//               <Card className="border-0 shadow-elegant">
//                 <CardContent className="p-6">
//                   <h3 className="text-lg font-bold mb-4">Quick Facts</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Best Time:</span>
//                       <span>{destination.bestTime || 'Year-round'}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Difficulty:</span>
//                       <span>{destination.difficulty}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Duration:</span>
//                       <span>{destination.duration} ({destination.durationHours} hours)</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Meeting Point:</span>
//                       <span>{destination.meetingPoint || 'Not specified'}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Author:</span>
//                       <span>{destination.author}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Views:</span>
//                       <span>{destination.views.toLocaleString()}</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Policies */}
//               <Card className="border-0 shadow-elegant">
//                 <CardContent className="p-6">
//                   <h3 className="text-lg font-bold mb-4">Policies</h3>
//                   <div className="space-y-2 text-sm">
//                     <div>
//                       <span className="text-muted-foreground">Free Cancellation:</span>
//                       <span className="ml-2">
//                         {destination.freeCancellation.available 
//                           ? `Yes (${destination.freeCancellation.deadlineHours} hours)`
//                           : 'No'}
//                         {destination.freeCancellation.note && ` - ${destination.freeCancellation.note}`}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">Reserve Now, Pay Later:</span>
//                       <span className="ml-2">
//                         {destination.reserveNowPayLater.available ? 'Yes' : 'No'}
//                         {destination.reserveNowPayLater.note && ` - ${destination.reserveNowPayLater.note}`}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-muted-foreground">Live Tour Guide:</span>
//                       <span className="ml-2">
//                         {destination.liveTourGuide.available 
//                           ? `Yes (${destination.liveTourGuide.languages.join(', ') || 'English, Japanese'})`
//                           : 'No'}
//                       </span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Tips and Rules */}
//             {(destination.tips?.length > 0 || destination.rules?.length > 0) && (
//               <div className="grid md:grid-cols-2 gap-6 mt-6">
//                 {destination.tips?.length > 0 && (
//                   <Card className="border-0 shadow-elegant">
//                     <CardContent className="p-6">
//                       <h3 className="text-lg font-bold mb-4 flex items-center">
//                         <Info className="h-4 w-4 mr-2 text-primary" />
//                         Visitor Tips
//                       </h3>
//                       <div className="space-y-2">
//                         {destination.tips.map((tip, index) => (
//                           <div key={index} className="flex items-start">
//                             <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
//                             <span className="text-sm">{tip}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )}

//                 {destination.rules?.length > 0 && (
//                   <Card className="border-0 shadow-elegant">
//                     <CardContent className="p-6">
//                       <h3 className="text-lg font-bold mb-4 flex items-center">
//                         <Shield className="h-4 w-4 mr-2 text-orange-500" />
//                         Important Rules
//                       </h3>
//                       <div className="space-y-2">
//                         {destination.rules.map((rule, index) => (
//                           <div key={index} className="flex items-start">
//                             <AlertCircle className="h-3 w-3 text-orange-500 mr-2 mt-1 flex-shrink-0" />
//                             <span className="text-sm">{rule}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )}
//               </div>
//             )}

//             {/* Nearby Services */}
//             {(destination.nearbyAttractions?.length > 0 || destination.dining?.length > 0 || destination.accommodation?.length > 0) && (
//               <Card className="border-0 shadow-elegant mt-6">
//                 <CardContent className="p-6">
//                   <h3 className="text-lg font-bold mb-4">Nearby Services</h3>
//                   <div className="grid md:grid-cols-3 gap-4">
//                     {destination.nearbyAttractions?.length > 0 && (
//                       <div>
//                         <h4 className="font-semibold mb-2">Attractions</h4>
//                         <ul className="text-sm text-muted-foreground list-disc pl-4">
//                           {destination.nearbyAttractions.map((attraction, index) => (
//                             <li key={index}>{attraction}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                     {destination.dining?.length > 0 && (
//                       <div>
//                         <h4 className="font-semibold mb-2">Dining</h4>
//                         <ul className="text-sm text-muted-foreground list-disc pl-4">
//                           {destination.dining.map((dining, index) => (
//                             <li key={index}>{dining}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                     {destination.accommodation?.length > 0 && (
//                       <div>
//                         <h4 className="font-semibold mb-2">Accommodation</h4>
//                         <ul className="text-sm text-muted-foreground list-disc pl-4">
//                           {destination.accommodation.map((acc, index) => (
//                             <li key={index}>{acc}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Important Information */}
//             {destination.importantInformation?.length > 0 && (
//               <Card className="border-0 shadow-elegant mt-6">
//                 <CardContent className="p-6">
//                   <h3 className="text-lg font-bold mb-4">Important Information</h3>
//                   <ul className="text-sm text-muted-foreground list-disc pl-4">
//                     {destination.importantInformation.map((info, index) => (
//                       <li key={index}>{info}</li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Tags */}
//             {destination.tags?.length > 0 && (
//               <Card className="border-0 shadow-elegant mt-6">
//                 <CardContent className="p-6">
//                   <h3 className="text-lg font-bold mb-4">Tags</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {destination.tags.map((tag, index) => (
//                       <Badge key={index} variant="secondary" className="text-xs">
//                         {tag}
//                       </Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Booking Card */}
//             <Card className="border-0 shadow-elegant">
//               <CardContent className="p-6">
//                 <h3 className="text-xl font-bold mb-4">Book Your Visit</h3>
//                 <div className="space-y-4">
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-primary mb-2">{destination.price}</div>
//                     <div className="text-sm text-muted-foreground">Starting price per person</div>
//                   </div>
//                   <Button className="w-full" variant="hero" size="lg">
//                     <Calendar className="h-4 w-4 mr-2" />
//                     Book Tour
//                   </Button>
//                   <Button className="w-full" variant="outline">
//                     <Heart className="h-4 w-4 mr-2" />
//                     Add to Wishlist
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Guides */}
//             {destination.guides?.length > 0 && (
//               <Card className="border-0 shadow-elegant">
//                 <CardContent className="p-6">
//                   <h3 className="text-lg font-bold mb-4">Guides</h3>
//                   <div className="space-y-2">
//                     {destination.guides.map((guide, index) => (
//                       <div key={index} className="flex items-center">
//                         <Users className="h-4 w-4 mr-2 text-primary" />
//                         <span className="text-sm">{guide}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Exploration Ways */}
//             {destination.explorationWays?.length > 0 && (
//               <Card className="border-0 shadow-elegant">
//                 <CardContent className="p-6">
//                   <h3 className="text-lg font-bold mb-4">Ways to Explore</h3>
//                   <div className="space-y-3">
//                     {destination.explorationWays.map((way, index) => (
//                       <div key={index} className="p-3 bg-muted/50 rounded-lg">
//                         <h4 className="font-semibold text-sm mb-1">Experience {index + 1}</h4>
//                         <p className="text-xs text-muted-foreground">{way}</p>
//                         <div className="flex items-center mt-2">
//                           <Clock className="h-3 w-3 mr-1" />
//                           <span className="text-xs">{destination.duration}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <Button variant="outline" size="sm" className="w-full mt-4">
//                     <Compass className="h-4 w-4 mr-2" />
//                     View All Options
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Gallery Preview */}
//             {destination.images?.length > 0 && (
//               <Card className="border-0 shadow-elegant">
//                 <CardContent className="p-6">
//                   <h3 className="text-lg font-bold mb-4">Gallery</h3>
//                   <div className="grid grid-cols-3 gap-2">
//                     {destination.images.slice(0, 6).map((img, index) => (
//                       <img
//                         key={index}
//                         src={img}
//                         alt={`${destination.name} ${index + 1}`}
//                         className="w-full h-20 object-cover rounded"
//                         onError={(e) => {
//                           e.target.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center";
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tours;
// 

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
  Compass,
  Image as ImageIcon,
} from "lucide-react";
import axios from 'axios';

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

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tourguides?limit=1000`);
      const apiData = response.data;
      console.log('API Response:', apiData); // Log for debugging

      // Handle possible response structures
      let posts = Array.isArray(apiData.data) ? apiData.data : [];
      if (!Array.isArray(posts)) {
        console.warn('Response data is not an array, setting to empty array.');
        posts = [];
      }

      // Transform data for destinations (mapping all schema fields)
      const transformedDestinations = posts.map(post => ({
        id: post._id || '',
        title: post.title || '',
        content: post.content || '',
        imageUrl: post.imageUrl || '',
        images: post.images || [],
        price: post.price || '',
        author: post.author || 'Admin',
        category: post.category || '',
        tags: post.tags || [],
        status: post.status || 'published',
        featured: post.featured || false,
        views: post.views || 0,
        slug: post.slug || '',
        prefecture: post.prefecture || '',
        nameJp: post.nameJp || '',
        duration: post.duration || '',
        durationHours: post.durationHours || 8,
        about: post.about || '',
        details: post.details || '',
        description: post.description || '',
        fullDescription: post.fullDescription || '',
        highlights: post.highlights || [],
        includes: post.includes || [],
        notSuitableFor: post.notSuitableFor || [],
        rules: post.rules || [],
        guides: post.guides || [],
        explorationWays: post.explorationWays || [],
        bestTime: post.bestTime || '',
        difficulty: post.difficulty || 'Easy',
        meetingPoint: post.meetingPoint || '',
        importantInformation: post.importantInformation || [],
        nearbyAttractions: post.nearbyAttractions || [],
        dining: post.dining || [],
        accommodation: post.accommodation || [],
        tips: post.tips || [],
        languages: post.languages || [],
        freeCancellation: {
          available: post.freeCancellation?.available ?? true,
          deadlineHours: post.freeCancellation?.deadlineHours ?? 24,
          note: post.freeCancellation?.note || '',
        },
        reserveNowPayLater: {
          available: post.reserveNowPayLater?.available ?? true,
          note: post.reserveNowPayLater?.note || '',
        },
        liveTourGuide: {
          available: post.liveTourGuide?.available ?? true,
          languages: post.liveTourGuide?.languages || [],
        },
        rating: {
          average: post.rating?.average || 0,
          count: post.rating?.count || 0,
        },
        reviews: post.reviews?.map(review => ({
          name: review.name || '',
          rating: review.rating || 0,
          comment: review.comment || '',
          createdAt: review.createdAt || '',
        })) || [],
        createdAt: post.createdAt || '',
        updatedAt: post.updatedAt || '',
        // UI-specific fields
        name: post.title || '',
        nameJp: post.nameJp || post.title || '',
        prefecture: post.prefecture || 'Unknown',
        image: post.imageUrl || (post.images?.length > 0 ? post.images[0] : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'),
        ratingValue: post.rating?.average || 4.5,
        reviewCount: post.rating?.count || post.reviews?.length || 0,
        price: post.price || '¥10,000',
        duration: post.duration || 'Full Day',
        description: post.description || post.content || 'Beautiful destination in Japan',
      }));

      // Transform data for tours (similar mapping)
      const transformedTours = posts.map(post => ({
        id: post._id || '',
        title: post.title || '',
        content: post.content || '',
        imageUrl: post.imageUrl || '',
        images: post.images || [],
        price: post.price || '',
        author: post.author || 'Admin',
        category: post.category || '',
        tags: post.tags || [],
        status: post.status || 'published',
        featured: post.featured || false,
        views: post.views || 0,
        slug: post.slug || '',
        prefecture: post.prefecture || '',
        nameJp: post.nameJp || '',
        duration: post.duration || '',
        durationHours: post.durationHours || 8,
        about: post.about || '',
        details: post.details || '',
        description: post.description || '',
        fullDescription: post.fullDescription || '',
        highlights: post.highlights || [],
        includes: post.includes || [],
        notSuitableFor: post.notSuitableFor || [],
        rules: post.rules || [],
        guides: post.guides || [],
        explorationWays: post.explorationWays || [],
        bestTime: post.bestTime || '',
        difficulty: post.difficulty || 'Easy',
        meetingPoint: post.meetingPoint || '',
        importantInformation: post.importantInformation || [],
        nearbyAttractions: post.nearbyAttractions || [],
        dining: post.dining || [],
        accommodation: post.accommodation || [],
        tips: post.tips || [],
        languages: post.languages || [],
        freeCancellation: {
          available: post.freeCancellation?.available ?? true,
          deadlineHours: post.freeCancellation?.deadlineHours ?? 24,
          note: post.freeCancellation?.note || '',
        },
        reserveNowPayLater: {
          available: post.reserveNowPayLater?.available ?? true,
          note: post.reserveNowPayLater?.note || '',
        },
        liveTourGuide: {
          available: post.liveTourGuide?.available ?? true,
          languages: post.liveTourGuide?.languages || [],
        },
        rating: {
          average: post.rating?.average || 0,
          count: post.rating?.count || 0,
        },
        reviews: post.reviews?.map(review => ({
          name: review.name || '',
          rating: review.rating || 0,
          comment: review.comment || '',
          createdAt: review.createdAt || '',
        })) || [],
        createdAt: post.createdAt || '',
        updatedAt: post.updatedAt || '',
        // UI-specific fields
        title: post.title || '',
        price: post.price || '¥15,000',
        originalPrice: null,
        duration: post.duration || '8 hours',
        rating: post.rating?.average || 4.5,
        reviews: post.rating?.count || post.reviews?.length || 0,
        image: post.imageUrl || (post.images?.length > 0 ? post.images[0] : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'),
        category: post.category || 'cultural',
        languages: post.languages || post.liveTourGuide?.languages || ['English', 'Japanese'],
        highlights: post.highlights || [],
        difficulty: post.difficulty || 'Easy',
        groupSize: '8-15 people',
        pickup: post.meetingPoint || 'Station',
        includes: post.includes || [],
        isPopular: post.featured || false,
        discount: 0,
      }));

      setDestinations(transformedDestinations);
      setTours(transformedTours);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Categories for filtering (aligned with schema's enum, excluding 'blog' and 'tour')
  const categories = [
    { id: "all", name: "All", icon: Crown },
    { id: "mountain", name: "Mountains", icon: Mountain },
    { id: "urban", name: "Urban", icon: Building },
    { id: "cultural", name: "Cultural", icon: Heart },
    { id: "nature", name: "Nature", icon: Trees },
    { id: "temple", name: "Temples", icon: Shield },
    { id: "modern", name: "Modern", icon: Building },
    { id: "adventure", name: "Adventure", icon: Compass },
    { id: "food", name: "Food & Cuisine", icon: Filter },
    { id: "accommodation", name: "Accommodation", icon: Building },
  ];

  // Filter and sort tours
  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (tour.highlights && tour.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesFilter = filterBy === "all" || tour.category === filterBy;
    return matchesSearch && matchesFilter;
  });

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price.replace(/[^0-9]/g, "") || 0) - parseInt(b.price.replace(/[^0-9]/g, "") || 0);
      case "price-high":
        return parseInt(b.price.replace(/[^0-9]/g, "") || 0) - parseInt(a.price.replace(/[^0-9]/g, "") || 0);
      case "rating":
        return b.rating - a.rating;
      case "duration":
        return parseInt(a.durationHours || 0) - parseInt(b.durationHours || 0);
      default:
        return b.isPopular ? 1 : -1;
    }
  });

  // Filter destinations
  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.prefecture.toLowerCase().includes(searchTerm.toLowerCase());
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
          <Button onClick={() => fetchPosts()}>
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

                        {tour.highlights?.length > 0 && (
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
                          <Button 
                            className="flex-1" 
                            variant="outline"
                            onClick={() => onViewDestination(tour.id)}
                          >
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
                            {destination.ratingValue}
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
                                {destination.ratingValue} ({destination.reviewCount})
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                            {destination.description}
                          </p>
                          
                          <div className="space-y-3">
                            {destination.highlights?.length > 0 && (
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const API_BASE_URL = 'http://localhost:5000/api';

  const fetchDestination = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/tourguides/${destinationId}`);
      const apiData = response.data;
      console.log('Destination API Response:', apiData); // Log for debugging

      const data = apiData.data || {}; // Extract the actual data object

      // Transform data for destination (mapping all schema fields)
      const transformedDestination = {
        id: data._id || '',
        title: data.title || '',
        content: data.content || '',
        imageUrl: data.imageUrl || '',
        images: data.images || [],
        price: data.price || '',
        author: data.author || 'Admin',
        category: data.category || '',
        tags: data.tags || [],
        status: data.status || 'published',
        featured: data.featured || false,
        views: data.views || 0,
        slug: data.slug || '',
        prefecture: data.prefecture || '',
        nameJp: data.nameJp || '',
        duration: data.duration || '',
        durationHours: data.durationHours || 8,
        about: data.about || '',
        details: data.details || '',
        description: data.description || '',
        fullDescription: data.fullDescription || '',
        highlights: data.highlights || [],
        includes: data.includes || [],
        notSuitableFor: data.notSuitableFor || [],
        rules: data.rules || [],
        guides: data.guides || [],
        explorationWays: data.explorationWays || [],
        bestTime: data.bestTime || '',
        difficulty: data.difficulty || 'Easy',
        meetingPoint: data.meetingPoint || '',
        importantInformation: data.importantInformation || [],
        nearbyAttractions: data.nearbyAttractions || [],
        dining: data.dining || [],
        accommodation: data.accommodation || [],
        tips: data.tips || [],
        languages: data.languages || [],
        freeCancellation: {
          available: data.freeCancellation?.available ?? true,
          deadlineHours: data.freeCancellation?.deadlineHours ?? 24,
          note: data.freeCancellation?.note || '',
        },
        reserveNowPayLater: {
          available: data.reserveNowPayLater?.available ?? true,
          note: data.reserveNowPayLater?.note || '',
        },
        liveTourGuide: {
          available: data.liveTourGuide?.available ?? true,
          languages: data.liveTourGuide?.languages || [],
        },
        rating: {
          average: data.rating?.average || 0,
          count: data.rating?.count || 0,
        },
        reviews: data.reviews?.map(review => ({
          name: review.name || 'Anonymous',
          rating: review.rating || 0,
          comment: review.comment || '',
          createdAt: review.createdAt || '',
        })) || [],
        createdAt: data.createdAt || '',
        updatedAt: data.updatedAt || '',
        // UI-specific fields
        name: data.title || '',
        nameJp: data.nameJp || data.title || '',
        prefecture: data.prefecture || 'Unknown',
        image: data.imageUrl || (data.images?.length > 0 ? data.images[0] : 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center'),
        rating: data.rating?.average || 4.5,
        reviewsCount: data.rating?.count || data.reviews?.length || 0,
        price: data.price || '¥12,000',
        duration: data.duration || 'Full Day',
        description: data.description || data.content || 'Beautiful destination in Japan',
        detailedDescription: data.fullDescription || data.details || data.description || data.content || 'Beautiful destination in Japan',
      };

      setDestination(transformedDestination);
    } catch (err) {
      setError(err.message || 'Failed to fetch destination details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (destinationId) {
      fetchDestination();
    }
  }, [destinationId]);

  // Image gallery navigation
  const nextImage = () => {
    if (destination?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
    }
  };

  const prevImage = () => {
    if (destination?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + destination.images.length) % destination.images.length);
    }
  };

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

      {/* Hero Section with Image Gallery */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={destination.images?.length > 0 ? destination.images[currentImageIndex] : destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center";
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        {destination.images?.length > 1 && (
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
            <Button variant="ghost" onClick={prevImage} className="text-white">
              &larr;
            </Button>
            <Button variant="ghost" onClick={nextImage} className="text-white">
              &rarr;
            </Button>
          </div>
        )}
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
                  {destination.reviewsCount.toLocaleString()} reviews
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
            {/* About Section */}
            <Card className="border-0 shadow-elegant mb-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                {destination.fullDescription && (
                  <p className="text-muted-foreground mb-4 leading-relaxed">{destination.fullDescription}</p>
                )}
                {destination.description && destination.description !== destination.fullDescription && (
                  <p className="text-muted-foreground mb-4 leading-relaxed">{destination.description}</p>
                )}
                {destination.about && (
                  <p className="text-muted-foreground mb-4 leading-relaxed">{destination.about}</p>
                )}
                {destination.details && (
                  <p className="text-muted-foreground mb-4 leading-relaxed">{destination.details}</p>
                )}
              </CardContent>
            </Card>

            {/* Highlights */}
            {destination.highlights?.length > 0 && (
              <Card className="border-0 shadow-elegant mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            {destination.reviews?.length > 0 && (
              <Card className="border-0 shadow-elegant mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Reviews ({destination.reviewsCount})</h3>
                  <div className="space-y-4">
                    {destination.reviews.map((review, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-semibold">{review.rating}/5</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Quick Facts */}
              <Card className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Quick Facts</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Best Time:</span>
                      <span>{destination.bestTime || 'Year-round'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span>{destination.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{destination.duration} ({destination.durationHours} hours)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meeting Point:</span>
                      <span>{destination.meetingPoint || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Author:</span>
                      <span>{destination.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Views:</span>
                      <span>{destination.views.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Policies */}
              <Card className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Policies</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Free Cancellation:</span>
                      <span className="ml-2">
                        {destination.freeCancellation.available 
                          ? `Yes (${destination.freeCancellation.deadlineHours} hours)`
                          : 'No'}
                        {destination.freeCancellation.note && ` - ${destination.freeCancellation.note}`}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reserve Now, Pay Later:</span>
                      <span className="ml-2">
                        {destination.reserveNowPayLater.available ? 'Yes' : 'No'}
                        {destination.reserveNowPayLater.note && ` - ${destination.reserveNowPayLater.note}`}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Live Tour Guide:</span>
                      <span className="ml-2">
                        {destination.liveTourGuide.available 
                          ? `Yes (${destination.liveTourGuide.languages.join(', ') || 'English, Japanese'})`
                          : 'No'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tips and Rules */}
            {(destination.tips?.length > 0 || destination.rules?.length > 0) && (
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {destination.tips?.length > 0 && (
                  <Card className="border-0 shadow-elegant">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center">
                        <Info className="h-4 w-4 mr-2 text-primary" />
                        Visitor Tips
                      </h3>
                      <div className="space-y-2">
                        {destination.tips.map((tip, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {destination.rules?.length > 0 && (
                  <Card className="border-0 shadow-elegant">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-orange-500" />
                        Important Rules
                      </h3>
                      <div className="space-y-2">
                        {destination.rules.map((rule, index) => (
                          <div key={index} className="flex items-start">
                            <AlertCircle className="h-3 w-3 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-sm">{rule}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Nearby Services */}
            {(destination.nearbyAttractions?.length > 0 || destination.dining?.length > 0 || destination.accommodation?.length > 0) && (
              <Card className="border-0 shadow-elegant mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Nearby Services</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {destination.nearbyAttractions?.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Attractions</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-4">
                          {destination.nearbyAttractions.map((attraction, index) => (
                            <li key={index}>{attraction}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {destination.dining?.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Dining</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-4">
                          {destination.dining.map((dining, index) => (
                            <li key={index}>{dining}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {destination.accommodation?.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Accommodation</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-4">
                          {destination.accommodation.map((acc, index) => (
                            <li key={index}>{acc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Important Information */}
            {destination.importantInformation?.length > 0 && (
              <Card className="border-0 shadow-elegant mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Important Information</h3>
                  <ul className="text-sm text-muted-foreground list-disc pl-4">
                    {destination.importantInformation.map((info, index) => (
                      <li key={index}>{info}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {destination.tags?.length > 0 && (
              <Card className="border-0 shadow-elegant mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
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

            {/* Guides */}
            {destination.guides?.length > 0 && (
              <Card className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Guides</h3>
                  <div className="space-y-2">
                    {destination.guides.map((guide, index) => (
                      <div key={index} className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm">{guide}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Exploration Ways */}
            {destination.explorationWays?.length > 0 && (
              <Card className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Ways to Explore</h3>
                  <div className="space-y-3">
                    {destination.explorationWays.map((way, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold text-sm mb-1">Experience {index + 1}</h4>
                        <p className="text-xs text-muted-foreground">{way}</p>
                        <div className="flex items-center mt-2">
                          <Clock className="h-3 w-3 mr-1" />
                          <span className="text-xs">{destination.duration}</span>
                        </div>
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

            {/* Gallery Preview */}
            {destination.images?.length > 0 && (
              <Card className="border-0 shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Gallery</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {destination.images.slice(0, 6).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${destination.name} ${index + 1}`}
                        className="w-full h-20 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center";
                        }}
                      />
                    ))}
                  </div>
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