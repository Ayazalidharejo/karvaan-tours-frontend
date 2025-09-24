
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
  Filter,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Types
interface Tour {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  category: string;
  difficulty: string;
  coverImage?: string;
  bookingStatus: 'Available' | 'Limited' | 'Sold Out' | 'Suspended';
  isFeatured: boolean;
  averageRating?: number;
  totalReviews?: number;
  groupSize: {
    min: number;
    max: number;
  };
  features: {
    comfortableTransport: boolean;
    authenticMeals: boolean;
    photoOpportunities: boolean;
    expertGuides: boolean;
    culturalExperience: boolean;
  };
  minAge: number;
  maxAge: number;
}

interface PaginationInfo {
  page: number;
  pages: number;
  total: number;
}

interface ApiResponse {
  success: boolean;
  data: Tour[];
  pagination?: PaginationInfo;
  message?: string;
}

const API_BASE = 'https://karvaan-backend.vercel.app/api';

const TourListPage: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

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
        page: currentPage.toString(),
        limit: '12',
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedDifficulty && { difficulty: selectedDifficulty }),
        ...(searchTerm && { search: searchTerm }),
        ...(priceRange.min && { minPrice: priceRange.min }),
        ...(priceRange.max && { maxPrice: priceRange.max })
      });

      const response = await fetch(`${API_BASE}/tours?${params}`);
      const data: ApiResponse = await response.json();

      if (data.success) {
        setTours(data.data);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        setError(data.message || 'Failed to load tours');
      }
    } catch (err) {
      setError('Network error: ' + (err as Error).message);
      console.error('Error loading tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
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

  const viewTourDetails = (tourId: string) => {
    navigate(`/tours/${tourId}`);
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
    </div>
  );
};

// Tour Card Component
interface TourCardProps {
  tour: Tour;
  onView: () => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onView }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
        {tour.coverImage ? (
          <img 
            src={tour.coverImage} 
            alt={tour.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              ((e.target as HTMLImageElement).nextSibling as HTMLElement).style.display = 'flex';
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
            <span>{tour.groupSize.min}-{tour.groupSize.max}</span>
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
            {tour.features.culturalExperience && <MapPin className="h-4 w-4 text-indigo-500" title="Cultural Experience" />}
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
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourListPage;