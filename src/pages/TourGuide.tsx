
"use client"
import React, { useState, useEffect } from 'react';
import { 
  Search, 
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
  Filter,
  X,
  Eye
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api'; // Change to your backend URL

const TourUserComponent = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedTour, setSelectedTour] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ['Cultural', 'Nature', 'Adventure', 'Food', 'Shopping', 'Historical', 'Spiritual'];
  const difficulties = ['Easy', 'Moderate', 'Hard', 'Expert'];

  useEffect(() => {
    loadTours();
  }, [currentPage, selectedCategory, selectedDifficulty, searchTerm, priceRange]);

  const loadTours = async () => {
    setLoading(true);
    setError('');
    
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedDifficulty && { difficulty: selectedDifficulty }),
        ...(searchTerm && { search: searchTerm }),
        ...(priceRange.min && { minPrice: priceRange.min }),
        ...(priceRange.max && { maxPrice: priceRange.max })
      });

      const response = await fetch(`${API_BASE}/tours?${params}`);
      const data = await response.json();

      if (data.success) {
        setTours(data.data);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        setError(data.message || 'Failed to load tours');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
      console.error('Error loading tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    loadTours();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedDifficulty('');
    setPriceRange({ min: '', max: '' });
    setCurrentPage(1);
  };

  const viewTourDetails = async (tourId) => {
    try {
      const response = await fetch(`${API_BASE}/tours/${tourId}`);
      const data = await response.json();
      
      if (data.success) {
        setSelectedTour(data.data);
        setShowModal(true);
      } else {
        setError('Failed to load tour details');
      }
    } catch (err) {
      setError('Error loading tour details');
    }
  };

  if (loading && tours.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Explore Amazing Tours</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Discover incredible destinations with expert guides and unforgettable experiences
          </p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-red-700">{error}</span>
            </div>
            <button onClick={() => setError('')} className="text-red-600 hover:text-red-800">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Tours</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title or destination..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Levels</option>
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <input
                  type="number"
                  placeholder="10000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-800 flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"
              >
                <Search className="h-4 w-4 mr-2" />
                Search Tours
              </button>
            </div>
          </form>
        </div>

        {/* Tours Grid */}
        {tours.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No tours found matching your criteria</div>
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-800 underline"
            >
              Clear filters and show all tours
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} onView={() => viewTourDetails(tour._id)} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Loading Indicator for Pagination */}
        {loading && tours.length > 0 && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}
      </div>

      {/* Tour Details Modal */}
      {showModal && selectedTour && (
        <TourDetailsModal
          tour={selectedTour}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

// Tour Card Component
const TourCard = ({ tour, onView }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
        {tour.coverImage ? (
          <img 
            src={tour.coverImage} 
            alt={tour.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="w-full h-full flex items-center justify-center text-white" style={{display: tour.coverImage ? 'none' : 'flex'}}>
          <Camera className="h-12 w-12" />
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            tour.bookingStatus === 'Available' ? 'bg-green-100 text-green-800' :
            tour.bookingStatus === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {tour.bookingStatus}
          </span>
        </div>

        {/* Featured Badge */}
        {tour.isFeatured && (
          <div className="absolute top-4 left-4">
            <span className="bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
            {tour.category}
          </span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">
              {tour.averageRating?.toFixed(1) || '0.0'} ({tour.totalReviews || 0})
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
        
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{tour.groupSize?.min}-{tour.groupSize?.max}</span>
          </div>
          <div className="flex items-center">
            <span className={`px-2 py-1 text-xs rounded ${
              tour.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              tour.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {tour.difficulty}
            </span>
          </div>
        </div>

        {/* Features */}
        {tour.features && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tour.features.comfortableTransport && <Car className="h-4 w-4 text-blue-500" title="Comfortable Transport" />}
            {tour.features.authenticMeals && <Utensils className="h-4 w-4 text-green-500" title="Authentic Meals" />}
            {tour.features.photoOpportunities && <Camera className="h-4 w-4 text-purple-500" title="Photo Opportunities" />}
            {tour.features.expertGuides && <Users className="h-4 w-4 text-orange-500" title="Expert Guides" />}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            {tour.currency} {tour.price?.toLocaleString()}
          </div>
          <button
            onClick={onView}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Tour Details Modal Component
const TourDetailsModal = ({ tour, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{tour.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Hero Image */}
          <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-6 relative overflow-hidden">
            {tour.coverImage ? (
              <img 
                src={tour.coverImage} 
                alt={tour.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <Camera className="h-16 w-16" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">About This Tour</h3>
                <p className="text-gray-600 leading-relaxed">{tour.description}</p>
                {tour.summary && (
                  <p className="text-gray-600 leading-relaxed mt-2">{tour.summary}</p>
                )}
              </div>

              {/* Features */}
              {tour.features && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Tour Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(tour.features).map(([key, value]) => value && (
                      <div key={key} className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="capitalize text-gray-700">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Destinations */}
              {tour.destinations && tour.destinations.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Top Destinations</h3>
                  <div className="grid gap-4">
                    {tour.destinations.map((dest, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{dest.name}</h4>
                          <span className="text-sm text-blue-600">{dest.duration}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{dest.description}</p>
                        {dest.highlights && (
                          <div className="flex flex-wrap gap-1">
                            {dest.highlights.map((highlight, hi) => (
                              <span key={hi} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {highlight}
                              </span>
                            ))}
                          </div>
                        )}
                        {dest.tips && (
                          <div className="mt-2 p-2 bg-yellow-50 rounded text-sm text-yellow-800">
                            <strong>Tip:</strong> {dest.tips}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {tour.itinerary && tour.itinerary.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Itinerary</h3>
                  <div className="space-y-4">
                    {tour.itinerary.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.activity}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                          {item.duration && (
                            <span className="inline-block mt-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              {item.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {tour.faqs && tour.faqs.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {tour.faqs.map((faq, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price & Booking */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900">
                    {tour.currency} {tour.price?.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">per person</div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Group Size:</span>
                    <span className="font-medium">{tour.groupSize?.min}-{tour.groupSize?.max} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className={`font-medium px-2 py-1 rounded text-xs ${
                      tour.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      tour.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tour.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age Range:</span>
                    <span className="font-medium">{tour.minAge}-{tour.maxAge} years</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-center text-yellow-500 mb-2">
                    <Star className="h-5 w-5 mr-1" />
                    <span className="font-bold">{tour.averageRating?.toFixed(1) || '0.0'}</span>
                    <span className="text-gray-600 ml-1">({tour.totalReviews || 0} reviews)</span>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                    Book Now
                  </button>
                </div>
              </div>

              {/* Pickup Points */}
              {tour.pickupPoints && tour.pickupPoints.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3">Pickup Points</h4>
                  <div className="space-y-3">
                    {tour.pickupPoints.slice(0, 3).map((point, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                          {point.location}
                        </div>
                        <div className="text-gray-600 ml-5">
                          <div>{point.time}</div>
                          <div>{point.landmark}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {tour.languages && tour.languages.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3">Available Languages</h4>
                  <div className="space-y-2">
                    {tour.languages.map((lang, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{lang.name}</span>
                        <span className="text-blue-600">{lang.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Need Help?</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-blue-600" />
                    <span>+1-234-567-8900</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-blue-600" />
                    <span>support@tours.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourUserComponent;