// // // src/pages/TourDetailPage.tsx
// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { 
// //   MapPin, 
// //   Clock, 
// //   Users, 
// //   Star, 
// //   Camera, 
// //   Car, 
// //   Utensils, 
// //   Phone, 
// //   Mail, 
// //   Navigation,
// //   Calendar,
// //   ArrowLeft,
// //   X
// // } from 'lucide-react';

// // // Extended Types based on your schema
// // interface Destination {
// //   name: string;
// //   description: string;
// //   duration: string;
// //   difficulty: string;
// //   highlights: string[];
// //   tips: string;
// //   bestTimeToVisit: string;
// //   localAttractions: string[];
// //   nearbyPlaces: string[];
// //   entryFee: string;
// //   location: {
// //     address: string;
// //   };
// // }

// // interface ItineraryItem {
// //   time: string;
// //   activity: string;
// //   description: string;
// //   duration: string;
// //   location: string;
// // }

// // interface PickupPoint {
// //   location: string;
// //   time: string;
// //   landmark: string;
// //   instructions: string;
// // }

// // interface Language {
// //   name: string;
// //   level: string;
// //   guides: number;
// // }

// // interface FAQ {
// //   question: string;
// //   answer: string;
// // }

// // interface Review {
// //   name: string;
// //   country: string;
// //   rating: number;
// //   comment: string;
// //   date: string;
// // }

// // interface Food {
// //   name: string;
// //   description: string;
// //   image: string;
// //   isVeg: boolean;
// //   recommended: boolean;
// //   priceRange: string;
// // }

// // interface Activity {
// //   title: string;
// //   description: string;
// //   duration: string;
// //   category: string;
// //   image: string;
// //   cost: number;
// //   ageLimit: string;
// //   safetyNotes: string;
// // }

// // interface Accommodation {
// //   name: string;
// //   type: string;
// //   address: string;
// //   priceRange: string;
// //   amenities: string[];
// //   rating: number;
// //   checkInTime: string;
// //   checkOutTime: string;
// // }

// // interface Transport {
// //   type: string;
// //   description: string;
// //   included: boolean;
// //   cost: number;
// //   duration: string;
// // }

// // interface SafetyInfo {
// //   tip: string;
// //   emergencyNumber: string;
// // }

// // interface LocalGuide {
// //   name: string;
// //   experienceYears: number;
// //   languages: string[];
// //   specialties: string[];
// //   rating: number;
// //   photo: string;
// // }

// // interface Culture {
// //   tradition: string;
// //   dressCode: string;
// //   do: string[];
// //   dont: string[];
// //   etiquette: string;
// // }

// // interface Medical {
// //   required: boolean;
// //   vaccinations: string[];
// //   healthTips: string;
// //   nearbyHospitals: string[];
// // }

// // interface Insurance {
// //   recommended: boolean;
// //   coverage: string[];
// //   providerSuggestions: string[];
// // }

// // interface PackingItem {
// //   item: string;
// //   required: boolean;
// //   notes: string;
// // }

// // interface TourDetails extends Tour {
// //   // Extended fields from your schema
// //   summary?: string;
// //   destinations: Destination[];
// //   itinerary: ItineraryItem[];
// //   pickupPoints: PickupPoint[];
// //   languages: Language[];
// //   faqs: FAQ[];
// //   reviews: Review[];
// //   foods: Food[];
// //   activities: Activity[];
// //   accommodations: Accommodation[];
// //   transport: Transport[];
// //   safetyInfo: SafetyInfo[];
// //   localGuides: LocalGuide[];
// //   culture: Culture[];
// //   medical: Medical[];
// //   insurance: Insurance[];
// //   packingList: PackingItem[];
// //   availableDates: string[];
// //   physicalRequirements: string;
// //   equipmentProvided: string[];
// //   equipmentRequired: string[];
// //   emergencyContact: {
// //     name: string;
// //     phone: string;
// //     email: string;
// //   };
// //   cancellationPolicy: string;
// //   refundPolicy: string;
// //   bestSeasons: string[];
// //   weatherConsiderations: string;
// // }

// // const API_BASE = 'http://localhost:5000/api';

// // const TourDetailPage: React.FC = () => {
// //   const { id } = useParams<{ id: string }>();
// //   console.log(id);
  
// //   const navigate = useNavigate();
// //   const [tour, setTour] = useState<TourDetails | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     if (id) {
// //       loadTourDetails(id);
// //     }
// //   }, [id]);

// //   const loadTourDetails = async (tourId: string) => {
// //     setLoading(true);
// //     setError('');
    
// //     try {
// //       const response = await fetch(`${API_BASE}/tours/${tourId}`);
// //       const data = await response.json();
// // console.log(data);

// //       if (data.success) {
// //         setTour(data.data);
// //       } else {
// //         setError(data.message || 'Failed to load tour details');
// //       }
// //     } catch (err) {
// //       setError('Error loading tour details: ' + (err as Error).message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
// //           <p className="mt-4 text-gray-600">Loading tour details...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error || !tour) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
// //             <X className="h-12 w-12 text-red-600 mx-auto mb-4" />
// //             <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Tour</h2>
// //             <p className="text-red-700 mb-4">{error || 'Tour not found'}</p>
// //             <button
// //               onClick={() => navigate('/tours')}
// //               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
// //             >
// //               <ArrowLeft className="h-4 w-4 mr-2" />
// //               Back to Tours
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header with Back Button */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="container mx-auto px-4 py-4">
// //           <button
// //             onClick={() => navigate('/tours')}
// //             className="text-blue-600 hover:text-blue-800 flex items-center"
// //           >
// //             <ArrowLeft className="h-4 w-4 mr-2" />
// //             Back to Tours
// //           </button>
// //         </div>
// //       </div>

// //       {/* Hero Section */}
// //       <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
// //         {tour.coverImage ? (
// //           <img 
// //             src={tour.coverImage} 
// //             alt={tour.title} 
// //             className="w-full h-full object-cover"
// //           />
// //         ) : (
// //           <div className="w-full h-full flex items-center justify-center text-white">
// //             <Camera className="h-16 w-16" />
// //           </div>
// //         )}
// //         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
// //           <div className="container mx-auto px-4 py-8 text-white">
// //             <div className="flex flex-wrap items-center gap-4 mb-4">
// //               <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
// //                 {tour.category}
// //               </span>
// //               <span className={`px-3 py-1 rounded-full text-sm ${
// //                 tour.bookingStatus === 'Available' ? 'bg-green-500' :
// //                 tour.bookingStatus === 'Limited' ? 'bg-yellow-500' :
// //                 'bg-red-500'
// //               }`}>
// //                 {tour.bookingStatus}
// //               </span>
// //               {tour.isFeatured && (
// //                 <span className="bg-orange-500 px-3 py-1 rounded-full text-sm">
// //                   Featured
// //                 </span>
// //               )}
// //             </div>
// //             <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>
// //             <div className="flex flex-wrap items-center gap-6 text-lg">
// //               <div className="flex items-center">
// //                 <Clock className="h-5 w-5 mr-2" />
// //                 {tour.duration}
// //               </div>
// //               <div className="flex items-center">
// //                 <Users className="h-5 w-5 mr-2" />
// //                 {tour.groupSize.min}-{tour.groupSize.max} people
// //               </div>
// //               <div className="flex items-center">
// //                 <Star className="h-5 w-5 mr-2 text-yellow-400" />
// //                 {tour.averageRating?.toFixed(1) || '0.0'} ({tour.totalReviews || 0} reviews)
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="container mx-auto px-4 py-8">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Main Content */}
// //           <div className="lg:col-span-2 space-y-8">
// //             {/* Overview */}
// //             <section className="bg-white rounded-lg shadow-sm p-6">
// //               <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
// //               <p className="text-gray-700 leading-relaxed mb-4">{tour.description}</p>
// //               {tour.summary && (
// //                 <p className="text-gray-600 leading-relaxed">{tour.summary}</p>
// //               )}
// //             </section>

// //             {/* Features */}
// //             {tour.features && (
// //               <section className="bg-white rounded-lg shadow-sm p-6">
// //                 <h2 className="text-2xl font-bold mb-4">Tour Features</h2>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   {Object.entries(tour.features).map(([key, value]) => value && (
// //                     <div key={key} className="flex items-center">
// //                       <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
// //                       <span className="text-gray-700 capitalize">
// //                         {key.replace(/([A-Z])/g, ' $1').trim()}
// //                       </span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </section>
// //             )}

// //             {/* Itinerary */}
// //             {tour.itinerary && tour.itinerary.length > 0 && (
// //               <section className="bg-white rounded-lg shadow-sm p-6">
// //                 <h2 className="text-2xl font-bold mb-4">Detailed Itinerary</h2>
// //                 <div className="space-y-6">
// //                   {tour.itinerary.map((item, index) => (
// //                     <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
// //                       <div className="flex-shrink-0 w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm text-center">
// //                         {item.time}
// //                       </div>
// //                       <div className="flex-1">
// //                         <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.activity}</h3>
// //                         <p className="text-gray-600 mb-2">{item.description}</p>
// //                         {item.duration && (
// //                           <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
// //                             Duration: {item.duration}
// //                           </span>
// //                         )}
// //                         {item.location && (
// //                           <div className="flex items-center mt-2 text-gray-500">
// //                             <MapPin className="h-4 w-4 mr-1" />
// //                             {item.location}
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </section>
// //             )}

// //             {/* Destinations */}
// //             {tour.destinations && tour.destinations.length > 0 && (
// //               <section className="bg-white rounded-lg shadow-sm p-6">
// //                 <h2 className="text-2xl font-bold mb-4">Destinations</h2>
// //                 <div className="grid gap-6">
// //                   {tour.destinations.map((destination, index) => (
// //                     <div key={index} className="border rounded-lg p-6">
// //                       <div className="flex justify-between items-start mb-3">
// //                         <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
// //                         <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded">
// //                           {destination.duration}
// //                         </span>
// //                       </div>
// //                       <p className="text-gray-600 mb-4">{destination.description}</p>
                      
// //                       {destination.highlights && destination.highlights.length > 0 && (
// //                         <div className="mb-4">
// //                           <h4 className="font-semibold mb-2">Highlights:</h4>
// //                           <div className="flex flex-wrap gap-2">
// //                             {destination.highlights.map((highlight, hi) => (
// //                               <span key={hi} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
// //                                 {highlight}
// //                               </span>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       )}

// //                       {destination.tips && (
// //                         <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
// //                           <strong className="text-yellow-800">Pro Tip:</strong>
// //                           <span className="text-yellow-700 ml-2">{destination.tips}</span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </section>
// //             )}

// //             {/* FAQs */}
// //             {tour.faqs && tour.faqs.length > 0 && (
// //               <section className="bg-white rounded-lg shadow-sm p-6">
// //                 <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
// //                 <div className="space-y-4">
// //                   {tour.faqs.map((faq, index) => (
// //                     <div key={index} className="border-b pb-4 last:border-b-0">
// //                       <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
// //                       <p className="text-gray-600">{faq.answer}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </section>
// //             )}

// //             {/* Reviews */}
// //             {tour.reviews && tour.reviews.length > 0 && (
// //               <section className="bg-white rounded-lg shadow-sm p-6">
// //                 <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
// //                 <div className="space-y-6">
// //                   {tour.reviews.map((review, index) => (
// //                     <div key={index} className="border rounded-lg p-4">
// //                       <div className="flex justify-between items-start mb-2">
// //                         <div>
// //                           <h3 className="font-semibold">{review.name}</h3>
// //                           <p className="text-gray-500 text-sm">{review.country}</p>
// //                         </div>
// //                         <div className="flex items-center">
// //                           <Star className="h-4 w-4 text-yellow-400 mr-1" />
// //                           <span>{review.rating}.0</span>
// //                         </div>
// //                       </div>
// //                       <p className="text-gray-700">{review.comment}</p>
// //                       <p className="text-gray-400 text-sm mt-2">
// //                         {new Date(review.date).toLocaleDateString()}
// //                       </p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </section>
// //             )}
// //           </div>

// //           {/* Sidebar */}
// //           <div className="space-y-6">
// //             {/* Booking Card */}
// //             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
// //               <div className="text-center mb-6">
// //                 <div className="text-3xl font-bold text-gray-900 mb-2">
// //                   {tour.currency} {tour.price?.toLocaleString()}
// //                 </div>
// //                 <div className="text-gray-600">per person</div>
// //               </div>

// //               <div className="space-y-3 text-sm mb-6">
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Duration:</span>
// //                   <span className="font-medium">{tour.duration}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Group Size:</span>
// //                   <span className="font-medium">{tour.groupSize.min}-{tour.groupSize.max}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Difficulty:</span>
// //                   <span className={`font-medium px-2 py-1 rounded text-xs ${
// //                     tour.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
// //                     tour.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
// //                     'bg-red-100 text-red-800'
// //                   }`}>
// //                     {tour.difficulty}
// //                   </span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-600">Age Range:</span>
// //                   <span className="font-medium">{tour.minAge}-{tour.maxAge} years</span>
// //                 </div>
// //               </div>

// //               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-4">
// //                 Book Now
// //               </button>

// //               <div className="text-center text-sm text-gray-600">
// //                 <div className="flex items-center justify-center mb-2">
// //                   <Star className="h-4 w-4 text-yellow-400 mr-1" />
// //                   <span className="font-semibold">{tour.averageRating?.toFixed(1) || '0.0'}</span>
// //                   <span className="ml-1">({tour.totalReviews || 0} reviews)</span>
// //                 </div>
// //                 <div>{tour.bookingStatus}</div>
// //               </div>
// //             </div>

// //             {/* Pickup Points */}
// //             {tour.pickupPoints && tour.pickupPoints.length > 0 && (
// //               <div className="bg-white rounded-lg shadow-sm p-6">
// //                 <h3 className="font-bold text-gray-900 mb-3">Pickup Points</h3>
// //                 <div className="space-y-3">
// //                   {tour.pickupPoints.map((point, index) => (
// //                     <div key={index} className="text-sm border-b pb-3 last:border-b-0">
// //                       <div className="font-medium flex items-center">
// //                         <MapPin className="h-4 w-4 mr-2 text-blue-600" />
// //                         {point.location}
// //                       </div>
// //                       <div className="text-gray-600 ml-6">
// //                         <div>Time: {point.time}</div>
// //                         {point.landmark && <div>Landmark: {point.landmark}</div>}
// //                         {point.instructions && <div>Instructions: {point.instructions}</div>}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Languages */}
// //             {tour.languages && tour.languages.length > 0 && (
// //               <div className="bg-white rounded-lg shadow-sm p-6">
// //                 <h3 className="font-bold text-gray-900 mb-3">Available Languages</h3>
// //                 <div className="space-y-2">
// //                   {tour.languages.map((lang, index) => (
// //                     <div key={index} className="flex justify-between text-sm">
// //                       <span>{lang.name}</span>
// //                       <span className="text-blue-600 capitalize">{lang.level}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Contact Info */}
// //             <div className="bg-blue-50 rounded-lg shadow-sm p-6">
// //               <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
// //               <div className="space-y-2 text-sm">
// //                 <div className="flex items-center">
// //                   <Phone className="h-4 w-4 mr-2 text-blue-600" />
// //                   <span>+1-234-567-8900</span>
// //                 </div>
// //                 <div className="flex items-center">
// //                   <Mail className="h-4 w-4 mr-2 text-blue-600" />
// //                   <span>support@tours.com</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TourDetailPage;
// // src/pages/TourDetailPage.tsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   MapPin, 
//   Clock, 
//   Users, 
//   Star, 
//   Camera, 
//   Car, 
//   Utensils, 
//   Phone, 
//   Mail, 
//   Navigation,
//   Calendar,
//   ArrowLeft,
//   X,
//   Heart,
//   Share2,
//   Check,
//   AlertCircle
// } from 'lucide-react';

// // Extended Types based on your schema
// interface Destination {
//   name: string;
//   description: string;
//   duration: string;
//   difficulty: string;
//   highlights: string[];
//   tips: string;
//   bestTimeToVisit: string;
//   localAttractions: string[];
//   nearbyPlaces: string[];
//   entryFee: string;
//   location: {
//     address: string;
//   };
// }

// interface ItineraryItem {
//   time: string;
//   activity: string;
//   description: string;
//   duration: string;
//   location: string;
// }

// interface PickupPoint {
//   location: string;
//   time: string;
//   landmark: string;
//   instructions: string;
// }

// interface Language {
//   name: string;
//   level: string;
//   guides: number;
// }

// interface FAQ {
//   question: string;
//   answer: string;
// }

// interface Review {
//   name: string;
//   country: string;
//   rating: number;
//   comment: string;
//   date: string;
// }

// interface Food {
//   name: string;
//   description: string;
//   image: string;
//   isVeg: boolean;
//   recommended: boolean;
//   priceRange: string;
// }

// interface Activity {
//   title: string;
//   description: string;
//   duration: string;
//   category: string;
//   image: string;
//   cost: number;
//   ageLimit: string;
//   safetyNotes: string;
// }

// interface Accommodation {
//   name: string;
//   type: string;
//   address: string;
//   priceRange: string;
//   amenities: string[];
//   rating: number;
//   checkInTime: string;
//   checkOutTime: string;
// }

// interface Transport {
//   type: string;
//   description: string;
//   included: boolean;
//   cost: number;
//   duration: string;
// }

// interface SafetyInfo {
//   tip: string;
//   emergencyNumber: string;
// }

// interface LocalGuide {
//   name: string;
//   experienceYears: number;
//   languages: string[];
//   specialties: string[];
//   rating: number;
//   photo: string;
// }

// interface Culture {
//   tradition: string;
//   dressCode: string;
//   do: string[];
//   dont: string[];
//   etiquette: string;
// }

// interface Medical {
//   required: boolean;
//   vaccinations: string[];
//   healthTips: string;
//   nearbyHospitals: string[];
// }

// interface Insurance {
//   recommended: boolean;
//   coverage: string[];
//   providerSuggestions: string[];
// }

// interface PackingItem {
//   item: string;
//   required: boolean;
//   notes: string;
// }

// interface TourDetails extends Tour {
//   // Extended fields from your schema
//   summary?: string;
//   destinations: Destination[];
//   itinerary: ItineraryItem[];
//   pickupPoints: PickupPoint[];
//   languages: Language[];
//   faqs: FAQ[];
//   reviews: Review[];
//   foods: Food[];
//   activities: Activity[];
//   accommodations: Accommodation[];
//   transport: Transport[];
//   safetyInfo: SafetyInfo[];
//   localGuides: LocalGuide[];
//   culture: Culture[];
//   medical: Medical[];
//   insurance: Insurance[];
//   packingList: PackingItem[];
//   availableDates: string[];
//   physicalRequirements: string;
//   equipmentProvided: string[];
//   equipmentRequired: string[];
//   emergencyContact: {
//     name: string;
//     phone: string;
//     email: string;
//   };
//   cancellationPolicy: string;
//   refundPolicy: string;
//   bestSeasons: string[];
//   weatherConsiderations: string;
// }

// const API_BASE = 'http://localhost:5000/api';

// const TourDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [tour, setTour] = useState<TourDetails | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     if (id) {
//       loadTourDetails(id);
//     }
//   }, [id]);

//   const loadTourDetails = async (tourId: string) => {
//     setLoading(true);
//     setError('');
    
//     try {
//       const response = await fetch(`${API_BASE}/tours/${tourId}`);
//       const data = await response.json();

//       if (data.success) {
//         setTour(data.data);
//       } else {
//         setError(data.message || 'Failed to load tour details');
//       }
//     } catch (err) {
//       setError('Error loading tour details: ' + (err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };

//   const shareTour = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: tour?.title,
//         text: tour?.description,
//         url: window.location.href,
//       });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert('Link copied to clipboard!');
//     }
//   };

//   // Helper function to check if array has data
//   const hasData = (array: any[]) => array && array.length > 0;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading tour details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !tour) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
//             <X className="h-12 w-12 text-red-600 mx-auto mb-4" />
//             <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Tour</h2>
//             <p className="text-red-700 mb-4">{error || 'Tour not found'}</p>
//             <button
//               onClick={() => navigate('/tours')}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Tours
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header with Back Button */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => navigate('/tours')}
//               className="text-blue-600 hover:text-blue-800 flex items-center"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back to Tours
//             </button>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={shareTour}
//                 className="p-2 text-gray-600 hover:text-blue-600"
//                 title="Share tour"
//               >
//                 <Share2 className="h-5 w-5" />
//               </button>
//               <button
//                 onClick={toggleFavorite}
//                 className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
//                 title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
//               >
//                 <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
//         {tour.coverImage ? (
//           <img 
//             src={tour.coverImage} 
//             alt={tour.title} 
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-purple-600">
//             <div className="text-center">
//               <Camera className="h-16 w-16 mx-auto mb-4" />
//               <p className="text-xl">Explore {tour.title}</p>
//             </div>
//           </div>
//         )}
//         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
//           <div className="container mx-auto px-4 py-8 text-white">
//             <div className="flex flex-wrap items-center gap-4 mb-4">
//               <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
//                 {tour.category}
//               </span>
//               <span className={`px-3 py-1 rounded-full text-sm ${
//                 tour.bookingStatus === 'Available' ? 'bg-green-500' :
//                 tour.bookingStatus === 'Limited' ? 'bg-yellow-500' :
//                 'bg-red-500'
//               }`}>
//                 {tour.bookingStatus}
//               </span>
//               {tour.isFeatured && (
//                 <span className="bg-orange-500 px-3 py-1 rounded-full text-sm">
//                   Featured
//                 </span>
//               )}
//               {tour.isPopular && (
//                 <span className="bg-pink-500 px-3 py-1 rounded-full text-sm">
//                   Popular
//                 </span>
//               )}
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>
//             <div className="flex flex-wrap items-center gap-6 text-lg">
//               <div className="flex items-center">
//                 <Clock className="h-5 w-5 mr-2" />
//                 {tour.duration}
//               </div>
//               <div className="flex items-center">
//                 <Users className="h-5 w-5 mr-2" />
//                 {tour.groupSize.min}-{tour.groupSize.max} people
//               </div>
//               <div className="flex items-center">
//                 <Star className="h-5 w-5 mr-2 text-yellow-400" />
//                 {tour.averageRating?.toFixed(1) || '0.0'} ({tour.totalReviews || 0} reviews)
//               </div>
//               <div className="flex items-center">
//                 <MapPin className="h-5 w-5 mr-2" />
//                 {tour.tourType}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white border-b">
//         <div className="container mx-auto px-4">
//           <div className="flex overflow-x-auto space-x-8">
//             {[
//               { id: 'overview', label: 'Overview' },
//               { id: 'itinerary', label: 'Itinerary' },
//               { id: 'destinations', label: 'Destinations' },
//               { id: 'inclusions', label: 'Inclusions' },
//               { id: 'reviews', label: 'Reviews' },
//               { id: 'faq', label: 'FAQ' },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Overview Tab */}
//             {activeTab === 'overview' && (
//               <>
//                 {/* Overview */}
//                 <section className="bg-white rounded-lg shadow-sm p-6">
//                   <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
//                   <p className="text-gray-700 leading-relaxed mb-4">{tour.description}</p>
//                   {tour.summary && (
//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                       <h3 className="font-semibold text-blue-900 mb-2">Tour Summary</h3>
//                       <p className="text-blue-800 leading-relaxed">{tour.summary}</p>
//                     </div>
//                   )}
//                 </section>

//                 {/* Features */}
//                 {tour.features && Object.values(tour.features).some(value => value) && (
//                   <section className="bg-white rounded-lg shadow-sm p-6">
//                     <h2 className="text-2xl font-bold mb-4">Tour Features</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {Object.entries(tour.features).map(([key, value]) => value && (
//                         <div key={key} className="flex items-center p-3 bg-gray-50 rounded-lg">
//                           <Check className="h-5 w-5 text-green-500 mr-3" />
//                           <span className="text-gray-700 capitalize">
//                             {key.replace(/([A-Z])/g, ' $1').trim()}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </section>
//                 )}

//                 {/* Physical Requirements */}
//                 {tour.physicalRequirements && (
//                   <section className="bg-white rounded-lg shadow-sm p-6">
//                     <h2 className="text-2xl font-bold mb-4">Physical Requirements</h2>
//                     <div className="flex items-start">
//                       <AlertCircle className="h-5 w-5 text-orange-500 mr-3 mt-1" />
//                       <p className="text-gray-700 leading-relaxed">{tour.physicalRequirements}</p>
//                     </div>
//                   </section>
//                 )}

//                 {/* Weather Considerations */}
//                 {tour.weatherConsiderations && (
//                   <section className="bg-white rounded-lg shadow-sm p-6">
//                     <h2 className="text-2xl font-bold mb-4">Weather Considerations</h2>
//                     <div className="flex items-start">
//                       <AlertCircle className="h-5 w-5 text-blue-500 mr-3 mt-1" />
//                       <p className="text-gray-700 leading-relaxed">{tour.weatherConsiderations}</p>
//                     </div>
//                   </section>
//                 )}

//                 {/* Tags */}
//                 {tour.tags && tour.tags.length > 0 && (
//                   <section className="bg-white rounded-lg shadow-sm p-6">
//                     <h2 className="text-2xl font-bold mb-4">Tour Tags</h2>
//                     <div className="flex flex-wrap gap-2">
//                       {tour.tags.map((tag, index) => (
//                         <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </section>
//                 )}
//               </>
//             )}

//             {/* Itinerary Tab */}
//             {activeTab === 'itinerary' && (
//               <section className="bg-white rounded-lg shadow-sm p-6">
//                 <h2 className="text-2xl font-bold mb-4">Detailed Itinerary</h2>
//                 {hasData(tour.itinerary) ? (
//                   <div className="space-y-6">
//                     {tour.itinerary.map((item, index) => (
//                       <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
//                         <div className="flex-shrink-0 w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm text-center">
//                           {item.time}
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.activity}</h3>
//                           <p className="text-gray-600 mb-2">{item.description}</p>
//                           {item.duration && (
//                             <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded mr-2">
//                               Duration: {item.duration}
//                             </span>
//                           )}
//                           {item.location && (
//                             <div className="flex items-center mt-2 text-gray-500">
//                               <MapPin className="h-4 w-4 mr-1" />
//                               {item.location}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                     <p>No detailed itinerary available for this tour.</p>
//                   </div>
//                 )}
//               </section>
//             )}

//             {/* Destinations Tab */}
//             {activeTab === 'destinations' && (
//               <section className="bg-white rounded-lg shadow-sm p-6">
//                 <h2 className="text-2xl font-bold mb-4">Destinations</h2>
//                 {hasData(tour.destinations) ? (
//                   <div className="grid gap-6">
//                     {tour.destinations.map((destination, index) => (
//                       <div key={index} className="border rounded-lg p-6">
//                         <div className="flex justify-between items-start mb-3">
//                           <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
//                           <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded">
//                             {destination.duration}
//                           </span>
//                         </div>
//                         <p className="text-gray-600 mb-4">{destination.description}</p>
                        
//                         {destination.highlights && destination.highlights.length > 0 && (
//                           <div className="mb-4">
//                             <h4 className="font-semibold mb-2">Highlights:</h4>
//                             <div className="flex flex-wrap gap-2">
//                               {destination.highlights.map((highlight, hi) => (
//                                 <span key={hi} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
//                                   {highlight}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         )}

//                         {destination.tips && (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
//                             <strong className="text-yellow-800">Pro Tip:</strong>
//                             <span className="text-yellow-700 ml-2">{destination.tips}</span>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                     <p>No destination details available.</p>
//                   </div>
//                 )}
//               </section>
//             )}

//             {/* Inclusions Tab */}
//             {activeTab === 'inclusions' && (
//               <div className="space-y-6">
//                 {/* Cancellation Policy */}
//                 {tour.cancellationPolicy && (
//                   <section className="bg-white rounded-lg shadow-sm p-6">
//                     <h2 className="text-2xl font-bold mb-4">Cancellation Policy</h2>
//                     <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                       <p className="text-green-800 leading-relaxed">{tour.cancellationPolicy}</p>
//                     </div>
//                   </section>
//                 )}

//                 {/* Refund Policy */}
//                 {tour.refundPolicy && (
//                   <section className="bg-white rounded-lg shadow-sm p-6">
//                     <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                       <p className="text-blue-800 leading-relaxed">{tour.refundPolicy}</p>
//                     </div>
//                   </section>
//                 )}

//                 {/* Equipment Provided */}
//                 {hasData(tour.equipmentProvided) && (
//                   <section className="bg-white rounded-lg shadow-sm p-6">
//                     <h2 className="text-2xl font-bold mb-4">Equipment Provided</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                       {tour.equipmentProvided.map((item, index) => (
//                         <div key={index} className="flex items-center">
//                           <Check className="h-4 w-4 text-green-500 mr-2" />
//                           <span className="text-gray-700">{item}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </section>
//                 )}

//                 {/* Equipment Required */}
//                 {hasData(tour.equipmentRequired) && (
//                   <section className="bg-white rounded-lg shadow-sm p-6">
//                     <h2 className="text-2xl font-bold mb-4">Equipment Required</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                       {tour.equipmentRequired.map((item, index) => (
//                         <div key={index} className="flex items-center">
//                           <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
//                           <span className="text-gray-700">{item}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </section>
//                 )}
//               </div>
//             )}

//             {/* Reviews Tab */}
//             {activeTab === 'reviews' && (
//               <section className="bg-white rounded-lg shadow-sm p-6">
//                 <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
//                 {hasData(tour.reviews) ? (
//                   <div className="space-y-6">
//                     {tour.reviews.map((review, index) => (
//                       <div key={index} className="border rounded-lg p-4">
//                         <div className="flex justify-between items-start mb-2">
//                           <div>
//                             <h3 className="font-semibold">{review.name}</h3>
//                             <p className="text-gray-500 text-sm">{review.country}</p>
//                           </div>
//                           <div className="flex items-center">
//                             <Star className="h-4 w-4 text-yellow-400 mr-1" />
//                             <span>{review.rating}.0</span>
//                           </div>
//                         </div>
//                         <p className="text-gray-700">{review.comment}</p>
//                         <p className="text-gray-400 text-sm mt-2">
//                           {new Date(review.date).toLocaleDateString()}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                     <p>No reviews yet. Be the first to review this tour!</p>
//                   </div>
//                 )}
//               </section>
//             )}

//             {/* FAQ Tab */}
//             {activeTab === 'faq' && (
//               <section className="bg-white rounded-lg shadow-sm p-6">
//                 <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
//                 {hasData(tour.faqs) ? (
//                   <div className="space-y-4">
//                     {tour.faqs.map((faq, index) => (
//                       <div key={index} className="border-b pb-4 last:border-b-0">
//                         <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
//                         <p className="text-gray-600">{faq.answer}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-8 text-gray-500">
//                     <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                     <p>No frequently asked questions available.</p>
//                   </div>
//                 )}
//               </section>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Booking Card */}
//             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
//               <div className="text-center mb-6">
//                 <div className="text-3xl font-bold text-gray-900 mb-2">
//                   {tour.currency} {tour.price?.toLocaleString()}
//                 </div>
//                 <div className="text-gray-600">per person</div>
//               </div>

//               <div className="space-y-3 text-sm mb-6">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Duration:</span>
//                   <span className="font-medium">{tour.duration}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Group Size:</span>
//                   <span className="font-medium">{tour.groupSize.min}-{tour.groupSize.max}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Difficulty:</span>
//                   <span className={`font-medium px-2 py-1 rounded text-xs ${
//                     tour.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
//                     tour.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {tour.difficulty}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Age Range:</span>
//                   <span className="font-medium">{tour.minAge}-{tour.maxAge} years</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tour Type:</span>
//                   <span className="font-medium">{tour.tourType}</span>
//                 </div>
//               </div>

//               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-4 transition duration-200">
//                 Book Now
//               </button>

//               <div className="text-center text-sm text-gray-600">
//                 <div className="flex items-center justify-center mb-2">
//                   <Star className="h-4 w-4 text-yellow-400 mr-1" />
//                   <span className="font-semibold">{tour.averageRating?.toFixed(1) || '0.0'}</span>
//                   <span className="ml-1">({tour.totalReviews || 0} reviews)</span>
//                 </div>
//                 <div className={`font-medium ${
//                   tour.bookingStatus === 'Available' ? 'text-green-600' :
//                   tour.bookingStatus === 'Limited' ? 'text-yellow-600' :
//                   'text-red-600'
//                 }`}>
//                   {tour.bookingStatus}
//                 </div>
//               </div>
//             </div>

//             {/* Quick Info */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="font-bold text-gray-900 mb-3">Quick Information</h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Category:</span>
//                   <span className="font-medium">{tour.category}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Priority:</span>
//                   <span className="font-medium">{tour.priority}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Active:</span>
//                   <span className={`font-medium ${tour.isActive ? 'text-green-600' : 'text-red-600'}`}>
//                     {tour.isActive ? 'Yes' : 'No'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Featured:</span>
//                   <span className={`font-medium ${tour.isFeatured ? 'text-green-600' : 'text-gray-600'}`}>
//                     {tour.isFeatured ? 'Yes' : 'No'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Popular:</span>
//                   <span className={`font-medium ${tour.isPopular ? 'text-green-600' : 'text-gray-600'}`}>
//                     {tour.isPopular ? 'Yes' : 'No'}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Info */}
//             <div className="bg-blue-50 rounded-lg shadow-sm p-6">
//               <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex items-center">
//                   <Phone className="h-4 w-4 mr-2 text-blue-600" />
//                   <span>+1-234-567-8900</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Mail className="h-4 w-4 mr-2 text-blue-600" />
//                   <span>support@tours.com</span>
//                 </div>
//                 <button className="w-full mt-3 bg-white text-blue-600 border border-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition duration-200">
//                   Contact Us
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
    
//   );
// };

// export default TourDetailPage;


"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  Search,
  Star,
  MapPin,
  Users,
  AlertCircle,
  DollarSign,
  BarChart3,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Shield,
   Briefcase,
  Heart,
  ShoppingBag,
  Camera,
  Utensils,
  Mountain,
  Palette,
  BookOpen,
  Zap,
} from "lucide-react"

const API_BASE = "https://karvaan-backend.vercel.app/api"

type Tour = {
  _id?: string
  title?: string
  description?: string
  summary?: string
  coverImage?: string
  price?: number
  pricePerPerson?: number
  currency?: string
  duration?: string
  availableDates?: Date[]
  category?: string
  difficulty?: "Easy" | "Moderate" | "Hard" | "Expert"
  bookingStatus?: "Available" | "Limited" | "Sold Out" | "Suspended"
  tourType?: "Group" | "Private" | "Premium"
  minAge?: number
  maxAge?: number
  groupSize?: { min: number; max: number }
  features?: {
    comfortableTransport?: boolean
    authenticMeals?: boolean
    expertGuides?: boolean
    photoOpportunities?: boolean
    culturalExperience?: boolean
  }
  tags?: string[]
  physicalRequirements?: string
  weatherConsiderations?: string
  cancellationPolicy?: string
  refundPolicy?: string
  isFeatured?: boolean
  isPopular?: boolean
  isActive?: boolean
  priority?: number
  bestSeasons?: string[]
  equipmentProvided?: string[]
  equipmentRequired?: string[]
  emergencyContact?: {
    name?: string
    phone?: string
    email?: string
  }
  
  // Nested arrays from schema
  destinations?: Array<{
    name?: string
    description?: string
    duration?: string
    difficulty?: "Easy" | "Moderate" | "Hard"
    highlights?: string[]
    tips?: string
    bestTimeToVisit?: string
    localAttractions?: string[]
    nearbyPlaces?: string[]
    entryFee?: string
    location?: {
      address?: string
    }
  }>
  
  itinerary?: Array<{
    time?: string
    activity?: string
    description?: string
    duration?: string
    location?: string
  }>
  
  pickupPoints?: Array<{
    location?: string
    time?: string
    landmark?: string
    instructions?: string
  }>
  
  languages?: Array<{
    name?: string
    level?: "Native" | "Fluent" | "Conversational" | "Basic"
    guides?: number
  }>
  
  faqs?: Array<{
    question?: string
    answer?: string
  }>
  
  reviews?: Array<{
    name?: string
    country?: string
    rating?: number
    comment?: string
    date?: Date
  }>
  
  foods?: Array<{
    name?: string
    description?: string
    image?: string
    isVeg?: boolean
    recommended?: boolean
    priceRange?: string
  }>
  
  activities?: Array<{
    title?: string
    description?: string
    duration?: string
    category?: "Adventure" | "Cultural" | "Relaxation" | "Food" | "Shopping"
    image?: string
    cost?: number
    ageLimit?: string
    safetyNotes?: string
  }>
  
  events?: Array<{
    title?: string
    description?: string
    date?: Date
    location?: string
  }>
  
  accommodations?: Array<{
    name?: string
    type?: "Hotel" | "Hostel" | "Resort" | "Homestay" | "Camping"
    address?: string
    priceRange?: string
    amenities?: string[]
    rating?: number
    checkInTime?: string
    checkOutTime?: string
  }>
  
  transport?: Array<{
    type?: "Bus" | "Car" | "Train" | "Flight" | "Boat" | "Bicycle" | "Walking"
    description?: string
    included?: boolean
    cost?: number
    duration?: string
  }>
  
  safetyInfo?: Array<{
    tip?: string
    emergencyNumber?: string
  }>
  
  shopping?: Array<{
    item?: string
    market?: string
    priceRange?: string
    description?: string
  }>
  
  localGuides?: Array<{
    name?: string
    experienceYears?: number
    languages?: string[]
    specialties?: string[]
    rating?: number
    photo?: string
  }>
  
  photoSpots?: Array<{
    location?: string
    description?: string
    bestTime?: string
    tip?: string
  }>
  
  culture?: Array<{
    tradition?: string
    dressCode?: string
    do?: string[]
    dont?: string[]
    etiquette?: string
  }>
  
  medical?: Array<{
    required?: boolean
    vaccinations?: string[]
    healthTips?: string
    nearbyHospitals?: string[]
  }>
  
  insurance?: Array<{
    recommended?: boolean
    coverage?: string[]
    providerSuggestions?: string[]
  }>
  
  packingList?: Array<{
    item?: string
    required?: boolean
    notes?: string
  }>

  // Admin fields
  createdBy?: string
  lastUpdatedBy?: string
  createdAt?: Date
  updatedAt?: Date
  
  // Statistics
  averageRating?: number
  totalReviews?: number
}

type ToursResponse = {
  success: boolean
  message?: string
  data: Tour[]
  pagination?: { pages?: number; page?: number; total?: number; limit?: number }
}

type StatsResponse = {
  success: boolean
  data: {
    totalTours?: number
    featuredTours?: number
    averagePrice?: number
    categoriesStats?: Array<{ category: string; count: number }>
  }
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const data = await res.json()
  return data
}

function useDebouncedValue<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function TourAdminComponent() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearch = useDebouncedValue(searchTerm, 350)

  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<"view" | "add" | "edit">("view")
  const [uiError, setUiError] = useState<string>("")
  const [saving, setSaving] = useState(false)

  const toursUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: String(currentPage),
      limit: "15",
    })
    if (debouncedSearch) params.set("search", debouncedSearch)
    return `${API_BASE}/tours?${params.toString()}`
  }, [currentPage, debouncedSearch])

  const {
    data: toursResp,
    error: toursError,
    isLoading: toursLoading,
    mutate: mutateTours,
  } = useSWR<ToursResponse>(toursUrl, fetcher)

  const {
    data: statsResp,
    error: statsError,
    isLoading: statsLoading,
    mutate: mutateStats,
  } = useSWR<StatsResponse>(`${API_BASE}/tours/stats/overview`, fetcher)

  const tours = (toursResp?.success ? toursResp.data : []) as Tour[]
  const totalPages = toursResp?.pagination?.pages || 1
  const stats = statsResp?.success ? statsResp.data : null

  const handleAddTour = () => {
    setSelectedTour(null)
    setModalType("add")
    setShowModal(true)
  }

  const handleEditTour = (tour: Tour) => {
    setSelectedTour(tour)
    setModalType("edit")
    setShowModal(true)
  }

  const handleViewTour = async (tourId?: string) => {
    if (!tourId) return
    try {
      const res = await fetch(`${API_BASE}/tours/${tourId}`)
      const data = await res.json()
      if (data.success) {
        setSelectedTour(data.data)
        setModalType("view")
        setShowModal(true)
      } else {
        setUiError(data.message || "Failed to load tour details")
      }
    } catch (err: any) {
      setUiError("Error loading tour details: " + (err?.message || "Unknown error"))
    }
  }

  const handleDeleteTour = async (tourId?: string) => {
    if (!tourId) return
    const ok = window.confirm("Are you sure you want to delete this tour?")
    if (!ok) return
    setSaving(true)
    setUiError("")
    try {
      const res = await fetch(`${API_BASE}/tours/${tourId}`, { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        alert("Tour deleted successfully!")
        await mutateTours()
        await mutateStats()
      } else {
        setUiError(data.message || "Failed to delete tour")
      }
    } catch (err: any) {
      setUiError("Error deleting tour: " + (err?.message || "Unknown error"))
    } finally {
      setSaving(false)
    }
  }

  const handleSaveTour = async (tourData: Tour) => {
    setSaving(true)
    setUiError("")
    try {
      const url = modalType === "add" ? `${API_BASE}/tours` : `${API_BASE}/tours/${(selectedTour as Tour)._id}`
      const method = modalType === "add" ? "POST" : "PUT"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tourData),
      })
      const data = await res.json()
      if (data.success) {
        alert(modalType === "add" ? "Tour created successfully!" : "Tour updated successfully!")
        setShowModal(false)
        await mutateTours()
        await mutateStats()
      } else {
        setUiError(data.message || "Failed to save tour")
      }
    } catch (err: any) {
      setUiError("Error saving tour: " + (err?.message || "Unknown error"))
    } finally {
      setSaving(false)
    }
  }

  const filteredTours = useMemo(() => {
    if (!searchTerm) return tours
    const q = searchTerm.toLowerCase()
    return tours.filter(
      (t) =>
        t.title?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.category?.toLowerCase().includes(q),
    )
  }, [tours, searchTerm])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Tour Management Admin</h1>
            <button
              type="button"
              onClick={handleAddTour}
              className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add New Tour
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && !statsLoading && !statsError && (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Tours</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTours ?? 0}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Featured Tours</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.featuredTours ?? 0}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Price</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.round(stats.averagePrice ?? 0)}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.categoriesStats?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {(uiError || toursError || statsError) && (
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center rounded-md border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mr-3 h-5 w-5 text-red-400" />
            <span className="text-red-700">
              {uiError || (toursError ? "Failed to load tours" : "") || (statsError ? "Failed to load stats" : "")}
            </span>
            <button
              type="button"
              onClick={() => setUiError("")}
              className="ml-auto text-red-400 hover:text-red-600"
              aria-label="Dismiss error"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tours..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full rounded-lg border border-gray-300 px-10 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tours Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          {toursLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            </div>
          ) : filteredTours.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-lg text-gray-500">No tours found</div>
            </div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Tour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredTours.map((tour) => (
                    <tr key={tour._id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 to-purple-500">
                              <MapPin className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{tour.title}</div>
                            <div className="text-sm text-gray-500">{tour.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {tour.currency} {tour.price?.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">{tour.tourType}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{tour.duration}</div>
                        <div className="text-sm text-gray-500">{tour.difficulty}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            tour.bookingStatus === "Available"
                              ? "bg-green-100 text-green-800"
                              : tour.bookingStatus === "Limited"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {tour.bookingStatus}
                        </span>
                        <div className="mt-1 flex gap-1">
                          {tour.isFeatured && (
                            <span className="rounded bg-orange-100 px-1 py-0.5 text-xs text-orange-800">Featured</span>
                          )}
                          {tour.isPopular && (
                            <span className="rounded bg-blue-100 px-1 py-0.5 text-xs text-blue-800">Popular</span>
                          )}
                          {tour.isActive === false && (
                            <span className="rounded bg-red-100 px-1 py-0.5 text-xs text-red-800">Inactive</span>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 text-yellow-400" />
                          {tour.averageRating?.toFixed(1) || "0.0"} ({tour.totalReviews || 0})
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => handleViewTour(tour._id)}
                            className="rounded p-1 text-blue-600 hover:bg-blue-50 hover:text-blue-900"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditTour(tour)}
                            className="rounded p-1 text-green-600 hover:bg-green-50 hover:text-green-900"
                            title="Edit Tour"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTour(tour._id)}
                            className="rounded p-1 text-red-600 hover:bg-red-50 hover:text-red-900"
                            title="Delete Tour"
                            disabled={saving}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t bg-white px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded border border-gray-300 px-3 py-1 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <TourModal
          tour={selectedTour}
          type={modalType}
          onClose={() => setShowModal(false)}
          onSave={handleSaveTour}
          loading={saving}
        />
      )}
    </div>
  )
}

/* ---------------------- Tour Modal ---------------------- */

function TourModal({
  tour,
  type,
  onClose,
  onSave,
  loading,
}: {
  tour: Tour | null
  type: "view" | "add" | "edit"
  onClose: () => void
  onSave: (data: Tour) => void
  loading: boolean
}) {
  const defaultData: Tour = {
    title: "",
    description: "",
    summary: "",
    coverImage: "",
    price: undefined,
    pricePerPerson: undefined,
    currency: "USD",
    duration: "",
    availableDates: [],
    category: "Cultural",
    difficulty: "Easy",
    bookingStatus: "Available",
    tourType: "Group",
    minAge: 0,
    maxAge: 99,
    groupSize: { min: 1, max: 20 },
    features: {
      comfortableTransport: false,
      authenticMeals: false,
      expertGuides: false,
      photoOpportunities: false,
      culturalExperience: false,
    },
    tags: [],
    physicalRequirements: "",
    weatherConsiderations: "",
    cancellationPolicy: "Free cancellation up to 24 hours before the tour",
    refundPolicy: "Full refund for cancellations made 24+ hours in advance",
    isFeatured: false,
    isPopular: false,
    isActive: true,
    priority: 0,
    bestSeasons: [],
    equipmentProvided: [],
    equipmentRequired: [],
    emergencyContact: {
      name: "",
      phone: "",
      email: "",
    },
    destinations: [],
    itinerary: [],
    pickupPoints: [],
    languages: [],
    faqs: [],
    reviews: [],
    foods: [],
    activities: [],
    events: [],
    accommodations: [],
    transport: [],
    safetyInfo: [],
    shopping: [],
    localGuides: [],
    photoSpots: [],
    culture: [],
    medical: [],
    insurance: [],
    packingList: [],
  }

  const [formData, setFormData] = useState<Tour>(tour || defaultData)
  const [activeTab, setActiveTab] = useState<
    | "basic"
    | "details"
    | "pricing"
    | "features"
    | "destinations"
    | "itinerary"
    | "pickup"
    | "languages"
    | "faqs"
    | "reviews"
    | "foods"
    | "activities"
    | "events"
    | "accommodations"
    | "transport"
    | "safety"
    | "shopping"
    | "guides"
    | "photos"
    | "culture"
    | "medical"
    | "insurance"
    | "packing"
    | "admin"
  >("basic")
  const [newItem, setNewItem] = useState<Record<string, any>>({})

  useEffect(() => {
    setFormData(tour || defaultData)
  }, [tour])

  const handleInputChange = useCallback((field: keyof Tour, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const handleNestedChange = useCallback((parent: keyof Tour, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev as any)[parent],
        [field]: value,
      },
    }))
  }, [])

  const handleArrayAdd = useCallback((arrayName: keyof Tour, item: any) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...((prev as any)[arrayName] || []), item],
    }))
    setNewItem({})
  }, [])

  const handleArrayRemove = useCallback((arrayName: keyof Tour, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: ((prev as any)[arrayName] || []).filter((_: any, i: number) => i !== index),
    }))
  }, [])

  const handleStringArrayChange = useCallback((field: keyof Tour, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim()).filter(Boolean),
    }))
  }, [])

  const handleSubmit = useCallback(() => {
    if (!formData.title || !formData.price) {
      alert("Please fill in required fields (Title and Price)")
      return
    }
    onSave(formData)
  }, [formData, onSave])

  if (type === "view" && tour) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="max-h-screen w-full max-w-6xl overflow-y-auto rounded-lg bg-white">
          <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
            <h2 className="text-2xl font-bold text-gray-900">{tour.title}</h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Basic Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-600">Description:</span>
                      <p className="text-gray-800">{tour.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium text-gray-600">Price:</span>
                        <p className="text-gray-800">
                          {tour.currency} {tour.price?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Duration:</span>
                        <p className="text-gray-800">{tour.duration}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Category:</span>
                        <p className="text-gray-800">{tour.category}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Difficulty:</span>
                        <p className="text-gray-800">{tour.difficulty}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                {tour.features && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Features</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(tour.features).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <div className={`mr-2 h-3 w-3 rounded-full ${value ? "bg-green-500" : "bg-gray-300"}`}></div>
                          <span className="capitalize text-sm">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Destinations */}
                {tour.destinations && tour.destinations.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Destinations ({tour.destinations.length})</h3>
                    <div className="max-h-40 space-y-3 overflow-y-auto">
                      {tour.destinations.map((dest, index) => (
                        <div key={index} className="rounded-lg bg-gray-50 p-3">
                          <div className="font-medium">{dest.name}</div>
                          <div className="text-sm text-gray-600">{dest.description}</div>
                          <div className="text-xs text-blue-600">
                            {dest.duration} {dest.difficulty ? `- ${dest.difficulty}` : ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="space-y-6">
                {/* Itinerary */}
                {tour.itinerary && tour.itinerary.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Itinerary ({tour.itinerary.length})</h3>
                    <div className="max-h-40 space-y-2 overflow-y-auto">
                      {tour.itinerary.map((item, index) => (
                        <div key={index} className="rounded-lg bg-gray-50 p-3">
                          <div className="flex justify-between">
                            <span className="font-medium">{item.activity}</span>
                            <span className="text-sm text-blue-600">{item.time}</span>
                          </div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pickup Points */}
                {tour.pickupPoints && tour.pickupPoints.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Pickup Points ({tour.pickupPoints.length})</h3>
                    <div className="max-h-40 space-y-2 overflow-y-auto">
                      {tour.pickupPoints.map((point, index) => (
                        <div key={index} className="rounded-lg bg-gray-50 p-3">
                          <div className="flex justify-between">
                            <span className="font-medium">{point.location}</span>
                            <span className="text-sm text-blue-600">{point.time}</span>
                          </div>
                          <div className="text-sm text-gray-600">{point.landmark}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQs */}
                {tour.faqs && tour.faqs.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">FAQs ({tour.faqs.length})</h3>
                    <div className="max-h-40 space-y-2 overflow-y-auto">
                      {tour.faqs.map((faq, index) => (
                        <div key={index} className="rounded-lg bg-gray-50 p-3">
                          <div className="text-sm font-medium">{faq.question}</div>
                          <div className="text-sm text-gray-600">{faq.answer}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Statistics */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold">Statistics</h3>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Average Rating:</span>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 text-yellow-400" />
                          <span className="font-medium">{tour.averageRating?.toFixed(1) || "0.0"}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Reviews:</span>
                        <p className="font-medium">{tour.totalReviews || 0}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Group Size:</span>
                        <p className="font-medium">
                          {tour.groupSize?.min}-{tour.groupSize?.max}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Age Range:</span>
                        <p className="font-medium">
                          {tour.minAge}-{tour.maxAge} years
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-screen w-full max-w-6xl overflow-y-auto rounded-lg bg-white">
        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
          <h2 className="text-2xl font-bold text-gray-900">{type === "add" ? "Add New Tour" : "Edit Tour"}</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-4 overflow-x-auto px-6 py-2">
            {[
              { id: "basic", label: "Basic", icon: BookOpen },
              { id: "pricing", label: "Pricing", icon: DollarSign },
              { id: "details", label: "Details", icon: User },
              { id: "features", label: "Features", icon: Zap },
              { id: "destinations", label: "Destinations", icon: MapPin },
              { id: "itinerary", label: "Itinerary", icon: Clock },
              { id: "pickup", label: "Pickup", icon: MapPin },
              { id: "languages", label: "Languages", icon: BookOpen },
              { id: "faqs", label: "FAQs", icon: AlertCircle },
              { id: "foods", label: "Foods", icon: Utensils },
              { id: "activities", label: "Activities", icon: Mountain },
              { id: "accommodations", label: "Accommodations", icon:  Briefcase },
              { id: "transport", label: "Transport", icon: Car },
              { id: "safety", label: "Safety", icon: Shield },
              { id: "shopping", label: "Shopping", icon: ShoppingBag },
              { id: "guides", label: "Guides", icon: User },
              { id: "photos", label: "Photos", icon: Camera },
              { id: "culture", label: "Culture", icon: Palette },
              { id: "medical", label: "Medical", icon: Heart },
              { id: "insurance", label: "Insurance", icon: Shield },
              { id: "packing", label: "Packing", icon:  Briefcase },
              { id: "admin", label: "Admin", icon: User },
            ].map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center whitespace-nowrap py-2 px-1 text-sm font-medium border-b-2 ${
                    activeTab === (tab.id as any)
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <IconComponent className="mr-1 h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ""}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      rows={4}
                      value={formData.description || ""}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Summary</label>
                    <textarea
                      rows={3}
                      value={formData.summary || ""}
                      onChange={(e) => handleInputChange("summary", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Cover Image URL</label>
                    <input
                      type="url"
                      value={formData.coverImage || ""}
                      onChange={(e) => handleInputChange("coverImage", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Duration</label>
                    <input
                      type="text"
                      value={formData.duration || ""}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      placeholder="e.g., Full Day, 8 hours, 3 days"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                      <select
                        value={formData.category || "Cultural"}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="Cultural">Cultural</option>
                        <option value="Nature">Nature</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Food">Food</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Historical">Historical</option>
                        <option value="Spiritual">Spiritual</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Difficulty</label>
                      <select
                        value={formData.difficulty || "Easy"}
                        onChange={(e) => handleInputChange("difficulty", e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Hard">Hard</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Booking Status</label>
                      <select
                        value={formData.bookingStatus || "Available"}
                        onChange={(e) => handleInputChange("bookingStatus", e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="Available">Available</option>
                        <option value="Limited">Limited</option>
                        <option value="Sold Out">Sold Out</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Tour Type</label>
                      <select
                        value={formData.tourType || "Group"}
                        onChange={(e) => handleInputChange("tourType", e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="Group">Group</option>
                        <option value="Private">Private</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(formData.tags) ? formData.tags.join(", ") : ""}
                      onChange={(e) => handleStringArrayChange("tags", e.target.value)}
                      placeholder="mountain, hiking, adventure, photography"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === "pricing" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Price *</label>
                    <input
                      type="number"
                      required
                      value={formData.price ?? ""}
                      onChange={(e) => handleInputChange("price", Number(e.target.value))}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Price Per Person</label>
                    <input
                      type="number"
                      value={formData.pricePerPerson ?? ""}
                      onChange={(e) => handleInputChange("pricePerPerson", Number(e.target.value))}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Currency</label>
                    <select
                      value={formData.currency || "USD"}
                      onChange={(e) => handleInputChange("currency", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="USD">USD</option>
                      <option value="PKR">PKR</option>
                      <option value="EUR">EUR</option>
                      <option value="JPY">JPY</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Cancellation Policy</label>
                    <textarea
                      rows={3}
                      value={formData.cancellationPolicy || ""}
                      onChange={(e) => handleInputChange("cancellationPolicy", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Refund Policy</label>
                    <textarea
                      rows={3}
                      value={formData.refundPolicy || ""}
                      onChange={(e) => handleInputChange("refundPolicy", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Min Age</label>
                      <input
                        type="number"
                        value={formData.minAge ?? 0}
                        onChange={(e) => handleInputChange("minAge", Number(e.target.value))}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Max Age</label>
                      <input
                        type="number"
                        value={formData.maxAge ?? 99}
                        onChange={(e) => handleInputChange("maxAge", Number(e.target.value))}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Min Group Size</label>
                      <input
                        type="number"
                        value={formData.groupSize?.min ?? 1}
                        onChange={(e) => handleNestedChange("groupSize", "min", Number(e.target.value))}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Max Group Size</label>
                      <input
                        type="number"
                        value={formData.groupSize?.max ?? 20}
                        onChange={(e) => handleNestedChange("groupSize", "max", Number(e.target.value))}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Physical Requirements</label>
                    <textarea
                      rows={3}
                      value={formData.physicalRequirements || ""}
                      onChange={(e) => handleInputChange("physicalRequirements", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Weather Considerations</label>
                    <textarea
                      rows={3}
                      value={formData.weatherConsiderations || ""}
                      onChange={(e) => handleInputChange("weatherConsiderations", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Best Seasons</label>
                    <input
                      type="text"
                      value={Array.isArray(formData.bestSeasons) ? formData.bestSeasons.join(", ") : ""}
                      onChange={(e) => handleStringArrayChange("bestSeasons", e.target.value)}
                      placeholder="Spring, Summer, Autumn, Winter"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Equipment Provided</label>
                    <input
                      type="text"
                      value={Array.isArray(formData.equipmentProvided) ? formData.equipmentProvided.join(", ") : ""}
                      onChange={(e) => handleStringArrayChange("equipmentProvided", e.target.value)}
                      placeholder="tent, sleeping bag, hiking poles"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Equipment Required</label>
                    <input
                      type="text"
                      value={Array.isArray(formData.equipmentRequired) ? formData.equipmentRequired.join(", ") : ""}
                      onChange={(e) => handleStringArrayChange("equipmentRequired", e.target.value)}
                      placeholder="hiking boots, water bottle, sunscreen"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-3 font-medium text-gray-900">Emergency Contact</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={formData.emergencyContact?.name || ""}
                          onChange={(e) => handleNestedChange("emergencyContact", "name", e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                          <input
                            type="text"
                            value={formData.emergencyContact?.phone || ""}
                            onChange={(e) => handleNestedChange("emergencyContact", "phone", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            value={formData.emergencyContact?.email || ""}
                            onChange={(e) => handleNestedChange("emergencyContact", "email", e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === "features" && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Tour Features</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {Object.entries(formData.features || {}).map(([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={!!value}
                        onChange={(e) => handleNestedChange("features", key, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm capitalize text-gray-700">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!!formData.isFeatured}
                    onChange={(e) => handleInputChange("isFeatured", e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Featured Tour</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!!formData.isPopular}
                    onChange={(e) => handleInputChange("isPopular", e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Popular Tour</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive !== false}
                    onChange={(e) => handleInputChange("isActive", e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">Active Tour</span>
                </label>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Priority</label>
                <input
                  type="number"
                  value={formData.priority ?? 0}
                  onChange={(e) => handleInputChange("priority", Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  max="100"
                />
                <p className="mt-1 text-sm text-gray-500">Higher number means higher priority in listings</p>
              </div>
            </div>
          )}

          {/* Admin Tab */}
          {activeTab === "admin" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Created By</label>
                    <input
                      type="text"
                      value={formData.createdBy || ""}
                      onChange={(e) => handleInputChange("createdBy", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Last Updated By</label>
                    <input
                      type="text"
                      value={formData.lastUpdatedBy || ""}
                      onChange={(e) => handleInputChange("lastUpdatedBy", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Created At</label>
                    <input
                      type="datetime-local"
                      value={formData.createdAt ? new Date(formData.createdAt).toISOString().slice(0, 16) : ""}
                      onChange={(e) => handleInputChange("createdAt", new Date(e.target.value))}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Updated At</label>
                    <input
                      type="datetime-local"
                      value={formData.updatedAt ? new Date(formData.updatedAt).toISOString().slice(0, 16) : ""}
                      onChange={(e) => handleInputChange("updatedAt", new Date(e.target.value))}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Array Tabs */}
          {[
            "destinations", "itinerary", "pickup", "languages", "faqs", "reviews", 
            "foods", "activities", "events", "accommodations", "transport", "safety",
            "shopping", "guides", "photos", "culture", "medical", "insurance", "packing"
          ].includes(activeTab) && (
            <ArrayManager
              activeTab={activeTab}
              formData={formData}
              newItem={newItem}
              setNewItem={setNewItem}
              onAdd={handleArrayAdd}
              onRemove={handleArrayRemove}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 flex justify-end space-x-4 border-t bg-white p-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {type === "add" ? "Create Tour" : "Update Tour"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ------------------ Array Manager Component ------------------ */

function ArrayManager({
  activeTab,
  formData,
  newItem,
  setNewItem,
  onAdd,
  onRemove,
}: {
  activeTab: string
  formData: Tour
  newItem: Record<string, any>
  setNewItem: React.Dispatch<React.SetStateAction<Record<string, any>>>
  onAdd: (arrayName: keyof Tour, item: any) => void
  onRemove: (arrayName: keyof Tour, index: number) => void
}) {
  const getArrayConfig = () => {
    const configs = {
      destinations: {
        title: "Destinations",
        arrayName: "destinations" as keyof Tour,
        fields: [
          { key: "name", label: "Name", type: "text", required: true },
          { key: "description", label: "Description", type: "textarea" },
          { key: "duration", label: "Duration", type: "text" },
          { key: "difficulty", label: "Difficulty", type: "select", options: ["Easy", "Moderate", "Hard"] },
          { key: "highlights", label: "Highlights", type: "text" },
          { key: "tips", label: "Tips", type: "textarea" },
          { key: "bestTimeToVisit", label: "Best Time to Visit", type: "text" },
          { key: "localAttractions", label: "Local Attractions", type: "text" },
          { key: "nearbyPlaces", label: "Nearby Places", type: "text" },
          { key: "entryFee", label: "Entry Fee", type: "text" },
        ],
      },
      itinerary: {
        title: "Itinerary",
        arrayName: "itinerary" as keyof Tour,
        fields: [
          { key: "time", label: "Time", type: "text", required: true },
          { key: "activity", label: "Activity", type: "text", required: true },
          { key: "description", label: "Description", type: "textarea" },
          { key: "duration", label: "Duration", type: "text" },
          { key: "location", label: "Location", type: "text" },
        ],
      },
      pickup: {
        title: "Pickup Points",
        arrayName: "pickupPoints" as keyof Tour,
        fields: [
          { key: "location", label: "Location", type: "text", required: true },
          { key: "time", label: "Time", type: "text", required: true },
          { key: "landmark", label: "Landmark", type: "text" },
          { key: "instructions", label: "Instructions", type: "textarea" },
        ],
      },
      languages: {
        title: "Languages",
        arrayName: "languages" as keyof Tour,
        fields: [
          { key: "name", label: "Language", type: "text", required: true },
          { key: "level", label: "Level", type: "select", options: ["Native", "Fluent", "Conversational", "Basic"] },
          { key: "guides", label: "Number of Guides", type: "number" },
        ],
      },
      faqs: {
        title: "FAQs",
        arrayName: "faqs" as keyof Tour,
        fields: [
          { key: "question", label: "Question", type: "text", required: true },
          { key: "answer", label: "Answer", type: "textarea", required: true },
        ],
      },
      // Add more configurations for other array types...
    }

    return (configs as any)[activeTab] || null
  }

  const config = getArrayConfig()
  if (!config) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Configuration for {activeTab} not implemented yet</div>
      </div>
    )
  }

  const currentArray: any[] = (formData as any)[config.arrayName] || []

  const handleAdd = () => {
    const requiredFields = config.fields.filter((f: any) => f.required)
    const hasAllRequired = requiredFields.every((field: any) => newItem[field.key])
    if (!hasAllRequired) {
      alert("Please fill in all required fields")
      return
    }
    onAdd(config.arrayName, { ...newItem })
  }

  const renderItemSummary = (item: Record<string, any>) => {
    const primaryField = config.fields.find((f: any) => f.required) || config.fields[0]
    return (
      <div className="text-sm">
        <div className="font-medium text-gray-900">{item[primaryField.key] || "Unnamed Item"}</div>
        {Object.entries(item)
          .filter(([key, value]) => value && key !== primaryField.key)
          .slice(0, 2)
          .map(([key, value]) => (
            <div key={key} className="text-gray-600">
              {typeof value === "string" ? value : JSON.stringify(value)}
            </div>
          ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">{config.title}</h3>

        {/* Add New Item Form */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <h4 className="mb-3 font-medium text-gray-900">Add New {config.title.slice(0, -1)}</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {config.fields.map((field: any) => (
              <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {field.label} {field.required ? "*" : ""}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    rows={3}
                    value={newItem[field.key] || ""}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : field.type === "select" ? (
                  <select
                    value={newItem[field.key] || ""}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option: string) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === "number" ? (
                  <input
                    type="number"
                    value={newItem[field.key] || ""}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, [field.key]: Number(e.target.value) }))}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    type="text"
                    value={newItem[field.key] || ""}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-4 flex items-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add {config.title.slice(0, -1)}
          </button>
        </div>

        {/* Current Items List */}
        <div className="space-y-3">
          {currentArray.length === 0 ? (
            <p className="py-8 text-center text-gray-500">No {config.title.toLowerCase()} added yet</p>
          ) : (
            currentArray.map((item: any, index: number) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">{renderItemSummary(item)}</div>
                  <div className="ml-4">
                    <button
                      type="button"
                      onClick={() => onRemove(config.arrayName, index)}
                      className="rounded bg-red-50 px-3 py-2 text-sm text-red-600 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}