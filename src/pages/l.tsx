<section id="languages" className="py-20 bg-white">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <Badge variant="outline" className="mb-4">🌐 MULTILINGUAL SUPPORT</Badge>
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">Guides Available in Multiple Languages</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our professional guides speak your language for the best experience</p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//             {[
//               { lang: "English", flag: "🇺🇸", level: "Native" },
//               { lang: "Japanese", flag: "🇯🇵", level: "Native" },
//               { lang: "Chinese", flag: "🇨🇳", level: "Fluent" },
//               { lang: "Korean", flag: "🇰🇷", level: "Fluent" },
//               { lang: "Urdu", flag: "🇵🇰", level: "Fluent" },
//             ].map((language) => (
//               <Card key={language.lang} className="text-center p-6 hover:shadow-lg transition-shadow">
//                 <div className="text-4xl mb-3">{language.flag}</div>
//                 <h3 className="font-semibold mb-1">{language.lang}</h3>
//                 <Badge variant="secondary" className="text-xs">{language.level}</Badge>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
 <div className="text-center mt-10">
//             <Link to="/blog">
//               <Button variant="ghost" className="underline underline-offset-4">View all destinations</Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Top Tours (short-forms) */}
//       <section id="tours" className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">Popular Tours</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">Join thousands of satisfied travelers on our most beloved Japanese adventures</p>
//           </div>

//           {loadingTop ? (
//             <GridSkeleton rows={3} />
//           ) : topTours.length === 0 ? (
//             <EmptyState label="No tours found. Please create some short-form tours in the admin panel." />
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {topTours.map((t, idx) => (
//                 <Card key={t.id ?? `t-${idx}`} className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
//                   <div className="relative">
//                     {t.image ? (
//                       <img src={t.image} alt={t.title} loading="lazy" className="w-full h-48 object-cover" />
//                     ) : (
//                       <div className="w-full h-48 bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
//                         <Star className="h-12 w-12 text-gray-400" />
//                       </div>
//                     )}
//                     <div className="absolute top-4 left-4"><Badge className="bg-red-500 text-white">Best Seller</Badge></div>
//                     <div className="absolute top-4 right-4">
//                       <div className="bg-white/90 backdrop-blur rounded-full px-3 py-1 text-sm font-semibold">{t.price}</div>
//                     </div>
//                   </div>
//                   <CardContent className="p-6">
//                     <h3 className="text-xl font-bold mb-2">{t.title}</h3>
//                     <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
//                       <div className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {t.duration}</div>
//                       <div className="flex items-center"><Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" /> {t.rating} ({t.reviews})</div>
//                     </div>

//                     <div className="mb-4">
//                       <h4 className="font-semibold mb-2">Languages Available:</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {(t.languages || []).map((lang, i) => (
//                           <Badge key={i} variant="outline" className="text-xs">{lang}</Badge>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="mb-6">
//                       <h4 className="font-semibold mb-2">Includes:</h4>
//                       <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
//                         {(t.includes || []).map((item, i) => (
//                           <div key={i} className="flex items-center"><div className="w-1 h-1 bg-blue-600 rounded-full mr-2" />{item}</div>
//                         ))}
//                       </div>
//                     </div>

//                     {t.id ? (
//                       <Link to={`/short-form/${t.id}`}>
//                         <Button className="w-full bg-blue-600 hover:bg-blue-700">Book This Tour</Button>
//                       </Link>
//                     ) : (
//                       <Button className="w-full" disabled>Book This Tour</Button>
//                     )}
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>








































































import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, Edit, Trash2, Eye, Save, X, Search, Filter,
  Users, MapPin, Calendar, Star, Phone, Mail,
  Globe, Shield, CheckCircle, AlertTriangle,
  Camera, Clock, Navigation, Utensils, Car
} from "lucide-react";

// API Service
const API_BASE = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('adminToken');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` })
      },
      ...options
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth
  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: credentials
    });
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('adminToken', response.token);
    }
    return response;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('adminToken');
  }

  // Tour Guides
  async getTourGuides(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/tour-guides${query ? '?' + query : ''}`);
  }

  async createTourGuide(data) {
    return this.request('/tour-guides', { method: 'POST', body: data });
  }

  async updateTourGuide(id, data) {
    return this.request(`/tour-guides/${id}`, { method: 'PUT', body: data });
  }

  async deleteTourGuide(id) {
    return this.request(`/tour-guides/${id}`, { method: 'DELETE' });
  }

  // Destinations
  async getDestinations(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/destinations${query ? '?' + query : ''}`);
  }

  async createDestination(data) {
    return this.request('/destinations', { method: 'POST', body: data });
  }

  async updateDestination(id, data) {
    return this.request(`/destinations/${id}`, { method: 'PUT', body: data });
  }

  async deleteDestination(id) {
    return this.request(`/destinations/${id}`, { method: 'DELETE' });
  }

  // Tours
  async getTours(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/tours${query ? '?' + query : ''}`);
  }

  async createTour(data) {
    return this.request('/tours', { method: 'POST', body: data });
  }

  async updateTour(id, data) {
    return this.request(`/tours/${id}`, { method: 'PUT', body: data });
  }

  async deleteTour(id) {
    return this.request(`/tours/${id}`, { method: 'DELETE' });
  }

  // FAQs
  async getFAQs(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/faqs${query ? '?' + query : ''}`);
  }

  async createFAQ(data) {
    return this.request('/faqs', { method: 'POST', body: data });
  }

  async updateFAQ(id, data) {
    return this.request(`/faqs/${id}`, { method: 'PUT', body: data });
  }

  async deleteFAQ(id) {
    return this.request(`/faqs/${id}`, { method: 'DELETE' });
  }
}

const api = new ApiService();

// Login Component
const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.login(credentials);
      onLogin();
    } catch (error) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('guides');
  const [tourGuides, setTourGuides] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [tours, setTours] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load data
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'guides':
          const guidesData = await api.getTourGuides();
          setTourGuides(guidesData.guides || []);
          break;
        case 'destinations':
          const destinationsData = await api.getDestinations();
          setDestinations(destinationsData.destinations || []);
          break;
        case 'tours':
          const toursData = await api.getTours();
          setTours(toursData.tours || []);
          break;
        case 'faqs':
          const faqsData = await api.getFAQs();
          setFaqs(faqsData || []);
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Tour Guide Form
  const TourGuideForm = ({ guide, onSave, onCancel }) => {
    const [formData, setFormData] = useState(guide || {
      name: '',
      email: '',
      phone: '',
      languages: [{ name: '', level: 'Conversational' }],
      qualifications: [{ title: '', description: '' }],
      specializations: [],
      experience: 0,
      bio: '',
      location: { city: '', region: '', country: 'Japan' }
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (guide) {
          await api.updateTourGuide(guide._id, formData);
        } else {
          await api.createTourGuide(formData);
        }
        onSave();
      } catch (error) {
        console.error('Error saving guide:', error);
      }
    };

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{guide ? 'Edit Guide' : 'Add New Guide'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Experience (years)</label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md"
                  min="0"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  // Destination Form
  const DestinationForm = ({ destination, onSave, onCancel }) => {
    const [formData, setFormData] = useState(destination || {
      name: '',
      description: '',
      duration: '',
      difficulty: 'Easy',
      highlights: [''],
      tips: '',
      location: { address: '', city: '', region: '', country: 'Japan' }
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (destination) {
          await api.updateDestination(destination._id, formData);
        } else {
          await api.createDestination(formData);
        }
        onSave();
      } catch (error) {
        console.error('Error saving destination:', error);
      }
    };

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{destination ? 'Edit Destination' : 'Add New Destination'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="e.g., 2-3 hours"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tips</label>
              <textarea
                value={formData.tips}
                onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows="2"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  // FAQ Form
  const FAQForm = ({ faq, onSave, onCancel }) => {
    const [formData, setFormData] = useState(faq || {
      question: '',
      answer: '',
      category: 'General',
      order: 0
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (faq) {
          await api.updateFAQ(faq._id, formData);
        } else {
          await api.createFAQ(formData);
        }
        onSave();
      } catch (error) {
        console.error('Error saving FAQ:', error);
      }
    };

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{faq ? 'Edit FAQ' : 'Add New FAQ'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Question</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Answer</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows="4"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="General">General</option>
                  <option value="Booking">Booking</option>
                  <option value="Tours">Tours</option>
                  <option value="Travel">Travel</option>
                  <option value="Payment">Payment</option>
                  <option value="Cancellation">Cancellation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md"
                  min="0"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      switch (type) {
        case 'guide':
          await api.deleteTourGuide(id);
          break;
        case 'destination':
          await api.deleteDestination(id);
          break;
        case 'tour':
          await api.deleteTour(id);
          break;
        case 'faq':
          await api.deleteFAQ(id);
          break;
      }
      loadData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="guides">Tour Guides</TabsTrigger>
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="tours">Tours</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>

          {/* Tour Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Tour Guides</h2>
              <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Guide
              </Button>
            </div>

            {showForm && (
              <TourGuideForm
                guide={editingItem}
                onSave={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  loadData();
                }}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tourGuides.map((guide) => (
                  <Card key={guide._id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{guide.name}</CardTitle>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm text-gray-600">
                              {guide.rating || 0} ({guide.totalReviews || 0} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem(guide);
                              setShowForm(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete('guide', guide._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          {guide.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          {guide.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <Globe className="h-4 w-4 mr-2 text-gray-500" />
                          {guide.languages?.length || 0} languages
                        </div>
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 mr-2 text-gray-500" />
                          {guide.experience} years experience
                        </div>
                      </div>
                      
                      {guide.bio && (
                        <p className="text-sm text-gray-600 mt-3 line-clamp-2">{guide.bio}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {guide.specializations?.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Destinations Tab */}
          <TabsContent value="destinations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Destinations</h2>
              <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Destination
              </Button>
            </div>

            {showForm && (
              <DestinationForm
                destination={editingItem}
                onSave={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  loadData();
                }}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((destination) => (
                  <Card key={destination._id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{destination.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {destination.difficulty}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem(destination);
                              setShowForm(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete('destination', destination._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {destination.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm mb-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-500" />
                          {destination.duration}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          {destination.location?.city || 'Japan'}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {destination.highlights?.slice(0, 3).map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {destination.highlights?.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{destination.highlights.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      {destination.tips && (
                        <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-800">
                          <strong>Tip:</strong> {destination.tips}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Tours</h2>
              <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Tour
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                  <Card key={tour._id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{tour.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{tour.type}</Badge>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm text-gray-600">
                                {tour.rating || 0} ({tour.totalReviews || 0})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem(tour);
                              setShowForm(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete('tour', tour._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {tour.description}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-gray-500" />
                            Max {tour.maxGroupSize} people
                          </div>
                          <div className="font-semibold">
                            ¥{tour.price?.adult || 0}
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          {tour.duration?.days ? `${tour.duration.days} days` : `${tour.duration?.hours || 0} hours`}
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          {tour.destinations?.length || 0} destinations
                        </div>
                      </div>

                      {tour.inclusions && (
                        <div className="mt-3">
                          <div className="text-xs font-semibold text-gray-700 mb-1">Includes:</div>
                          <div className="flex flex-wrap gap-1">
                            {tour.inclusions.slice(0, 2).map((inclusion, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {inclusion}
                              </Badge>
                            ))}
                            {tour.inclusions.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{tour.inclusions.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">FAQs</h2>
              <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </div>

            {showForm && (
              <FAQForm
                faq={editingItem}
                onSave={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  loadData();
                }}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            )}

            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq) => (
                  <Card key={faq._id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {faq.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Order: {faq.order}
                            </span>
                          </div>
                          <CardTitle className="text-base leading-tight">
                            {faq.question}
                          </CardTitle>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem(faq);
                              setShowForm(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete('faq', faq._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Public Tour Guide Component (Updated with API integration)
const PublicTourGuide = () => {
  const [topDestinations, setTopDestinations] = useState([]);
  const [pickupPoints, setPickupPoints] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPublicData();
  }, []);

  const loadPublicData = async () => {
    try {
      const [destinationsRes, toursRes, faqsRes] = await Promise.all([
        api.getDestinations({ limit: 6 }),
        api.getTours({ limit: 1 }),
        api.getFAQs()
      ]);

      setTopDestinations(destinationsRes.destinations || []);
      setTours(toursRes.tours || []);
      setFaqs(faqsRes || []);
      
      // Mock data for pickup points and languages (can be moved to API later)
      setPickupPoints([
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
        }
      ]);

      setLanguages([
        { name: "English", level: "Native/Fluent", guides: 15 },
        { name: "Japanese", level: "Native", guides: 25 },
        { name: "Chinese (Mandarin)", level: "Fluent", guides: 8 },
        { name: "Korean", level: "Fluent", guides: 6 },
        { name: "Urdu", level: "Conversational", guides: 3 },
        { name: "Spanish", level: "Basic", guides: 2 }
      ]);

    } catch (error) {
      console.error('Error loading public data:', error);
    } finally {
      setLoading(false);
    }
  };

  const sampleItinerary = [
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading tour information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
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
                <Card key={destination._id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
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
                        {destination.location?.city || 'Japan'}
                      </div>
                    </div>

                    {destination.highlights && (
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
                    )}

                    {destination.tips && (
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex items-start">
                          <AlertTriangle className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground">{destination.tips}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pt-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Camera className="h-5 w-5 mr-2" />
                Book Your Japan Adventure
              </Button>
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
                {sampleItinerary.map((item, index) => (
                  <Card key={index} className="border-0 shadow-lg">
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
                            {index < sampleItinerary.length - 1 && (
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
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <Car className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Comfortable Transport</h3>
                    <p className="text-sm text-muted-foreground">Air-conditioned vehicles with professional drivers</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <Utensils className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Authentic Meals</h3>
                    <p className="text-sm text-muted-foreground">Traditional Japanese lunch with local specialties</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg">
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
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{point.location}</h3>
                        <p className="text-muted-foreground">{point.landmark}</p>
                      </div>
                      <Badge className="font-bold bg-blue-600">
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
                        <Navigation className="h-4 w-4 mr-1" />
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
          </TabsContent>

          <TabsContent value="guides" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Professional Tour Guides</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Our certified guides bring Japan's culture and history to life with expert knowledge and warm hospitality
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
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

              <Card className="border-0 shadow-lg">
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
                <Card key={faq._id || index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3 flex items-start">
                      <AlertTriangle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    {faq.category && (
                      <Badge variant="outline" className="mt-3 text-xs">
                        {faq.category}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Our travel experts are here to help you plan the perfect Japan experience. Contact us for personalized assistance and recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Our Experts
                  </Button>
                  <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                    <Camera className="h-5 w-5 mr-2" />
                    Browse All Tours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Main App Component
const TourGuideApp = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowAdminLogin(false);
  };

  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  if (showAdminLogin) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-gray-900">Japan Travel Guide</h1>
            <div className="flex gap-4">
              {!isLoggedIn ? (
                <Button 
                  variant="outline" 
                  onClick={() => setShowAdminLogin(true)}
                >
                  Admin Login
                </Button>
              ) : (
                <>
                  <Button 
                    variant={isAdmin ? "default" : "outline"} 
                    onClick={() => setIsAdmin(!isAdmin)}
                  >
                    {isAdmin ? "View Public" : "Admin Panel"}
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      {isLoggedIn && isAdmin ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <PublicTourGuide />
      )}
    </div>
  );
};

export default TourGuideApp;