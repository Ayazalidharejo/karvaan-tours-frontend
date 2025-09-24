export interface Tour {
  id: string;
  title: string;
  description: string;
  summary?: string;
  price: number;
  currency: string;
  duration: string;
  category: string;
  tourType: string;
  difficulty: string;
  groupSize: {
    min: number;
    max: number;
  };
  minAge: number;
  maxAge: number;
  bookingStatus: string;
  isActive: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  priority: number;
  coverImage: string;
  averageRating?: number;
  totalReviews?: number;
  features: {
    comfortableTransport?: boolean;
    authenticMeals?: boolean;
    expertGuides?: boolean;
    photoOpportunities?: boolean;
    culturalExperience?: boolean;
  };
  tags: string[];
  physicalRequirements?: string;
  weatherConsiderations?: string;
  cancellationPolicy?: string;
  refundPolicy?: string;
  equipmentProvided: string[];
  equipmentRequired: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Destination {
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

export interface ItineraryItem {
  time: string;
  activity: string;
  description: string;
  duration: string;
  location: string;
}

export interface PickupPoint {
  location: string;
  time: string;
  landmark: string;
  instructions: string;
}

export interface Language {
  name: string;
  level: string;
  guides: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Review {
  name: string;
  country: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TourDetails extends Tour {
  destinations: Destination[];
  itinerary: ItineraryItem[];
  pickupPoints: PickupPoint[];
  languages: Language[];
  faqs: FAQ[];
  reviews: Review[];
  availableDates: string[];
  equipmentProvided: string[];
  equipmentRequired: string[];
  cancellationPolicy: string;
  refundPolicy: string;
  bestSeasons: string[];
  weatherConsiderations: string;
}