
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Camera, 
  Car, 
  Utensils, 
  Phone, 
  Mail, 
  Navigation,
  Calendar,
  ArrowLeft,
  X,
  Heart,
  Share2,
  Check,
  AlertCircle
} from 'lucide-react';

// Extended Types based on your schema
interface Destination {
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  highlights: string[];
  tips: string;
  bestTimeToVisit: string;
  localAttractions: string[];
  nearbyPlaces: string[];
  entryFee: string;
  location: {
    address: string;
  };
}

interface ItineraryItem {
  time: string;
  activity: string;
  description: string;
  duration: string;
  location: string;
}

interface PickupPoint {
  location: string;
  time: string;
  landmark: string;
  instructions: string;
}

interface Language {
  name: string;
  level: string;
  guides: number;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Review {
  name: string;
  country: string;
  rating: number;
  comment: string;
  date: string;
}

interface Food {
  name: string;
  description: string;
  image: string;
  isVeg: boolean;
  recommended: boolean;
  priceRange: string;
}

interface Activity {
  title: string;
  description: string;
  duration: string;
  category: string;
  image: string;
  cost: number;
  ageLimit: string;
  safetyNotes: string;
}

interface Accommodation {
  name: string;
  type: string;
  address: string;
  priceRange: string;
  amenities: string[];
  rating: number;
  checkInTime: string;
  checkOutTime: string;
}

interface Transport {
  type: string;
  description: string;
  included: boolean;
  cost: number;
  duration: string;
}

interface SafetyInfo {
  tip: string;
  emergencyNumber: string;
}

interface LocalGuide {
  name: string;
  experienceYears: number;
  languages: string[];
  specialties: string[];
  rating: number;
  photo: string;
}

interface Culture {
  tradition: string;
  dressCode: string;
  do: string[];
  dont: string[];
  etiquette: string;
}

interface Medical {
  required: boolean;
  vaccinations: string[];
  healthTips: string;
  nearbyHospitals: string[];
}

interface Insurance {
  recommended: boolean;
  coverage: string[];
  providerSuggestions: string[];
}

interface PackingItem {
  item: string;
  required: boolean;
  notes: string;
}

interface TourDetails extends Tour {
  // Extended fields from your schema
  summary?: string;
  destinations: Destination[];
  itinerary: ItineraryItem[];
  pickupPoints: PickupPoint[];
  languages: Language[];
  faqs: FAQ[];
  reviews: Review[];
  foods: Food[];
  activities: Activity[];
  accommodations: Accommodation[];
  transport: Transport[];
  safetyInfo: SafetyInfo[];
  localGuides: LocalGuide[];
  culture: Culture[];
  medical: Medical[];
  insurance: Insurance[];
  packingList: PackingItem[];
  availableDates: string[];
  physicalRequirements: string;
  equipmentProvided: string[];
  equipmentRequired: string[];
  emergencyContact: {
    name: string;
    phone: string;
    email: string;
  };
  cancellationPolicy: string;
  refundPolicy: string;
  bestSeasons: string[];
  weatherConsiderations: string;
}

const API_BASE = 'https://karvaan-backend.vercel.app/api';

const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tour, setTour] = useState<TourDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      loadTourDetails(id);
    }
  }, [id]);

  const loadTourDetails = async (tourId: string) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE}/tours/${tourId}`);
      const data = await response.json();
console.log(data);

      if (data.success) {
        setTour(data.data);
      } else {
        setError(data.message || 'Failed to load tour details');
      }
    } catch (err) {
      setError('Error loading tour details: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const shareTour = () => {
    if (navigator.share) {
      navigator.share({
        title: tour?.title,
        text: tour?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Helper function to check if array has data
  const hasData = (array: any[]) => array && array.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <X className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Tour</h2>
            <p className="text-red-700 mb-4">{error || 'Tour not found'}</p>
            <button
              onClick={() => navigate('/tours')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tours
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/tours')}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tours
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={shareTour}
                className="p-2 text-gray-600 hover:text-blue-600"
                title="Share tour"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={toggleFavorite}
                className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
        {tour.coverImage ? (
          <img 
            src={tour.coverImage} 
            alt={tour.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="text-center">
              <Camera className="h-16 w-16 mx-auto mb-4" />
              <p className="text-xl">Explore {tour.title}</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="container mx-auto px-4 py-8 text-white">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                {tour.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                tour.bookingStatus === 'Available' ? 'bg-green-500' :
                tour.bookingStatus === 'Limited' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}>
                {tour.bookingStatus}
              </span>
              {tour.isFeatured && (
                <span className="bg-orange-500 px-3 py-1 rounded-full text-sm">
                  Featured
                </span>
              )}
              {tour.isPopular && (
                <span className="bg-pink-500 px-3 py-1 rounded-full text-sm">
                  Popular
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {tour.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {tour.groupSize.min}-{tour.groupSize.max} people
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                {tour.averageRating?.toFixed(1) || '0.0'} ({tour.totalReviews || 0} reviews)
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {tour.tourType}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'itinerary', label: 'Itinerary' },
              { id: 'destinations', label: 'Destinations' },
              { id: 'inclusions', label: 'Inclusions' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'faq', label: 'FAQ' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Overview */}
                <section className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">{tour.description}</p>
                  {tour.summary && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-2">Tour Summary</h3>
                      <p className="text-blue-800 leading-relaxed">{tour.summary}</p>
                    </div>
                  )}
                </section>

                {/* Features */}
                {tour.features && Object.values(tour.features).some(value => value) && (
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">Tour Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(tour.features).map(([key, value]) => value && (
                        <div key={key} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Check className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Physical Requirements */}
                {tour.physicalRequirements && (
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">Physical Requirements</h2>
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-orange-500 mr-3 mt-1" />
                      <p className="text-gray-700 leading-relaxed">{tour.physicalRequirements}</p>
                    </div>
                  </section>
                )}

                {/* Weather Considerations */}
                {tour.weatherConsiderations && (
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">Weather Considerations</h2>
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                      <p className="text-gray-700 leading-relaxed">{tour.weatherConsiderations}</p>
                    </div>
                  </section>
                )}

                {/* Tags */}
                {tour.tags && tour.tags.length > 0 && (
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">Tour Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {tour.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {/* Itinerary Tab */}
            {activeTab === 'itinerary' && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">Detailed Itinerary</h2>
                {hasData(tour.itinerary) ? (
                  <div className="space-y-6">
                    {tour.itinerary.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm text-center">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.activity}</h3>
                          <p className="text-gray-600 mb-2">{item.description}</p>
                          {item.duration && (
                            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded mr-2">
                              Duration: {item.duration}
                            </span>
                          )}
                          {item.location && (
                            <div className="flex items-center mt-2 text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {item.location}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No detailed itinerary available for this tour.</p>
                  </div>
                )}
              </section>
            )}

            {/* Destinations Tab */}
            {activeTab === 'destinations' && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">Destinations</h2>
                {hasData(tour.destinations) ? (
                  <div className="grid gap-6">
                    {tour.destinations.map((destination, index) => (
                      <div key={index} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
                          <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded">
                            {destination.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{destination.description}</p>
                        
                        {destination.highlights && destination.highlights.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Highlights:</h4>
                            <div className="flex flex-wrap gap-2">
                              {destination.highlights.map((highlight, hi) => (
                                <span key={hi} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {destination.tips && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                            <strong className="text-yellow-800">Pro Tip:</strong>
                            <span className="text-yellow-700 ml-2">{destination.tips}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No destination details available.</p>
                  </div>
                )}
              </section>
            )}

            {/* Inclusions Tab */}
            {activeTab === 'inclusions' && (
              <div className="space-y-6">
                {/* Cancellation Policy */}
                {tour.cancellationPolicy && (
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">Cancellation Policy</h2>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 leading-relaxed">{tour.cancellationPolicy}</p>
                    </div>
                  </section>
                )}

                {/* Refund Policy */}
                {tour.refundPolicy && (
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 leading-relaxed">{tour.refundPolicy}</p>
                    </div>
                  </section>
                )}

                {/* Equipment Provided */}
                {hasData(tour.equipmentProvided) && (
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">Equipment Provided</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tour.equipmentProvided.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Equipment Required */}
                {hasData(tour.equipmentRequired) && (
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">Equipment Required</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {tour.equipmentRequired.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                {hasData(tour.reviews) ? (
                  <div className="space-y-6">
                    {tour.reviews.map((review, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{review.name}</h3>
                            <p className="text-gray-500 text-sm">{review.country}</p>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>{review.rating}.0</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <p className="text-gray-400 text-sm mt-2">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No reviews yet. Be the first to review this tour!</p>
                  </div>
                )}
              </section>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                {hasData(tour.faqs) ? (
                  <div className="space-y-4">
                    {tour.faqs.map((faq, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No frequently asked questions available.</p>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {tour.currency} {tour.price?.toLocaleString()}
                </div>
                <div className="text-gray-600">per person</div>
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{tour.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Group Size:</span>
                  <span className="font-medium">{tour.groupSize.min}-{tour.groupSize.max}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className={`font-medium px-2 py-1 rounded text-xs ${
                    tour.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    tour.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {tour.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age Range:</span>
                  <span className="font-medium">{tour.minAge}-{tour.maxAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tour Type:</span>
                  <span className="font-medium">{tour.tourType}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-4 transition duration-200">
                Book Now
              </button>

              <div className="text-center text-sm text-gray-600">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-semibold">{tour.averageRating?.toFixed(1) || '0.0'}</span>
                  <span className="ml-1">({tour.totalReviews || 0} reviews)</span>
                </div>
                <div className={`font-medium ${
                  tour.bookingStatus === 'Available' ? 'text-green-600' :
                  tour.bookingStatus === 'Limited' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {tour.bookingStatus}
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-3">Quick Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{tour.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Priority:</span>
                  <span className="font-medium">{tour.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active:</span>
                  <span className={`font-medium ${tour.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {tour.isActive ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Featured:</span>
                  <span className={`font-medium ${tour.isFeatured ? 'text-green-600' : 'text-gray-600'}`}>
                    {tour.isFeatured ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Popular:</span>
                  <span className={`font-medium ${tour.isPopular ? 'text-green-600' : 'text-gray-600'}`}>
                    {tour.isPopular ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-50 rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  <span>+1-234-567-8900</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  <span>support@tours.com</span>
                </div>
                <button className="w-full mt-3 bg-white text-blue-600 border border-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition duration-200">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default TourDetailPage;