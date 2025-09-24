interface Destination {
  name: string;
  description: string;
  duration: string;
  difficulty?: 'Easy' | 'Moderate' | 'Hard';
  highlights?: string[];
  tips?: string;
  bestTimeToVisit?: string;
  localAttractions?: string[];
  nearbyPlaces?: string[];
  entryFee?: string;
  location?: { address: string };
}

interface ItineraryItem {
  time: string;
  activity: string;
  description: string;
  duration?: string;
  location?: string;
}

interface PickupPoint {
  location: string;
  time: string;
  landmark: string;
  instructions?: string;
}

interface Language {
  name: string;
  level: 'Native' | 'Fluent' | 'Conversational' | 'Basic';
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
  image?: string;
  isVeg: boolean;
  recommended: boolean;
  priceRange: string;
}

interface Activity {
  title: string;
  description: string;
  duration: string;
  category: 'Adventure' | 'Cultural' | 'Relaxation' | 'Food' | 'Shopping';
  image?: string;
  cost: number;
  ageLimit?: string;
  safetyNotes?: string;
}

interface Event {
  title: string;
  description: string;
  date: string;
  location: string;
}

interface Accommodation {
  name: string;
  type: 'Hotel' | 'Hostel' | 'Resort' | 'Homestay' | 'Camping';
  address: string;
  priceRange: string;
  amenities: string[];
  rating: number;
  checkInTime: string;
  checkOutTime: string;
}

interface Transport {
  type: 'Bus' | 'Car' | 'Train' | 'Flight' | 'Boat' | 'Bicycle' | 'Walking';
  description: string;
  included: boolean;
  cost: number;
  duration: string;
}

interface SafetyInfo {
  tip: string;
  emergencyNumber: string;
}

interface Shopping {
  item: string;
  market: string;
  priceRange: string;
  description: string;
}

interface LocalGuide {
  name: string;
  experienceYears: number;
  languages: string[];
  specialties: string[];
  rating: number;
  photo?: string;
}

interface PhotoSpot {
  location: string;
  description: string;
  bestTime: string;
  tip: string;
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

interface Packing {
  item: string;
  required: boolean;
  notes: string;
}

interface Tour {
  _id: string;
  title: string;
  description: string;
  summary?: string;
  coverImage?: string;
  price: number;
  pricePerPerson?: number;
  currency: string;
  duration: string;
  availableDates?: string[];
  groupSize: { min: number; max: number };
  tourType: 'Group' | 'Private' | 'Premium';
  destinations?: Destination[];
  itinerary?: ItineraryItem[];
  pickupPoints?: PickupPoint[];
  languages?: Language[];
  faqs?: FAQ[];
  reviews?: Review[];
  foods?: Food[];
  activities?: Activity[];
  events?: Event[];
  accommodations?: Accommodation[];
  transport?: Transport[];
  safetyInfo?: SafetyInfo[];
  shopping?: Shopping[];
  localGuides?: LocalGuide[];
  photoSpots?: PhotoSpot[];
  culture?: Culture[];
  medical?: Medical[];
  insurance?: Insurance[];
  packingList?: Packing[];
  features: {
    comfortableTransport: boolean;
    authenticMeals: boolean;
    expertGuides: boolean;
    photoOpportunities: boolean;
    culturalExperience: boolean;
  };
  bookingStatus: 'Available' | 'Limited' | 'Sold Out' | 'Suspended';
  minAge: number;
  maxAge: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert';
  category: 'Cultural' | 'Nature' | 'Adventure' | 'Food' | 'Shopping' | 'Historical' | 'Spiritual';
  tags?: string[];
  averageRating: number;
  totalReviews: number;
  bestSeasons?: string[];
  weatherConsiderations?: string;
  physicalRequirements?: string;
  equipmentProvided?: string[];
  equipmentRequired?: string[];
  emergencyContact?: { name: string; phone: string; email: string };
  cancellationPolicy: string;
  refundPolicy: string;
  isActive: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  priority: number;
}