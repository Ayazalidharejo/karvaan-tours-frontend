
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Users, Camera, Navigation } from "lucide-react";
import VerticalItinerary from "@/components/RoutesSection";
import Footer from "@/components/layout/Footer";

/* ==== BACKEND BASE (no env, no import.meta) ==== */
const API_BASE = "https://karvaan-backend.vercel.app";

/* ==== Types ==== */
type Blog = {
  _id?: string;
  title: string;
  content?: string;
  imageUrl?: string;
  tags?: string[];
  views?: number;
  status?: "draft" | "published" | "archived";
  featured?: boolean;
};
type PagedBlogs = {
  blogs: Blog[];
  totalPages: number;
  currentPage: number;
  total: number;
};

type ShortForm = {
  _id?: string;
  title: string;
  price: string;
  duration: string;
  rating: number;
  reviews: number;
  image?: string; // e.g. "uploads/abc.jpg"
  languages: string[];
  includes: string[];
  status?: "active" | "inactive";
};
type PagedShortForms = {
  shortForms: ShortForm[];
  totalPages: number;
  currentPage: number;
  total: number;
};

/* ==== UI mapped ==== */
type FeaturedDestination = {
  id: string | null;
  name: string;
  image?: string;
  rating: number | string;
  price: string;
  duration: string;
  description: string;
  highlights: string[];
};
type TopTour = {
  id: string | null;
  title: string;
  price: string;
  duration: string;
  rating: number | string;
  reviews: number;
  image?: string;
  languages: string[];
  includes: string[];
};
type PopularDestination = {
  _id?: string;
  name: string;
  image?: string;
  description: string;
  rating: string;
  visitors: string;
};

/* ==== Small helpers ==== */
async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} :: ${txt}`);
  }
  return res.json();
}
const qsOf = (obj: Record<string, string | number | boolean>) => {
  const qs = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => qs.set(k, String(v)));
  return qs.toString();
};
const getBlogs = (params: Record<string, string | number | boolean>) =>
  fetchJSON<PagedBlogs>(`${API_BASE}/api/blogs?${qsOf(params)}`);
const getShortForms = (params: Record<string, string | number | boolean>) =>
  fetchJSON<PagedShortForms>(`${API_BASE}/api/short-forms?${qsOf(params)}`);

/* ==== Component ==== */
const Home: React.FC = () => {
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingTop, setLoadingTop] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [featuredDestinations, setFeaturedDestinations] = useState<FeaturedDestination[]>([]);
  const [topTours, setTopTours] = useState<TopTour[]>([]);
  const [popularDestinations, setPopularDestinations] = useState<PopularDestination[]>([]);

  const heroImage =
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&h=900&fit=crop&crop=center";
  const fallbackTourImage =
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&h=800&fit=crop&crop=center";

  /* Mappers */
  const blogToFeaturedDestination = (b: Blog): FeaturedDestination => ({
    id: b._id ?? null,
    name: b.title,
    image: b.imageUrl,
    rating: 4.8,
    price: "¥8,000",
    duration: "Half Day",
    description: (b.content || "").slice(0, 120) + ((b.content || "").length > 120 ? "…" : ""),
    highlights: Array.isArray(b.tags) && b.tags.length ? b.tags.slice(0, 3) : [],
  });

  const sfToTopTour = (s: ShortForm): TopTour => ({
    id: s._id ?? null,
    title: s.title,
    price: s.price || "—",
    duration: s.duration || "—",
    rating: s.rating ?? 0,
    reviews: s.reviews ?? 0,
    image: s.image
      ? s.image.startsWith("http")
        ? s.image
        : `${API_BASE}/${s.image.replace(/\\/g, "/")}`
      : fallbackTourImage,
    languages: Array.isArray(s.languages) ? s.languages : [],
    includes: Array.isArray(s.includes) ? s.includes : [],
  });

  const blogToPopularDestination = (b: Blog): PopularDestination => ({
    _id: b._id,
    name: b.title,
    image: b.imageUrl,
    description: (b.content || "").slice(0, 90) + ((b.content || "").length > 90 ? "…" : ""),
    rating: "4.6/5",
    visitors: `${b.views ?? 0}+ visitors`,
  });

  /* Data load */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Featured (blogs - try featured first, else fallback to published)
      try {
        const fea = await getBlogs({ status: "published", featured: true, limit: 6, page: 1 });
        let list = fea.blogs || [];
        if (!list.length) {
          const pub = await getBlogs({ status: "published", limit: 6, page: 1 });
          list = pub.blogs || [];
        }
        if (!cancelled) setFeaturedDestinations(list.map(blogToFeaturedDestination));
      } catch {
        if (!cancelled) setErrorMsg((p) => p || "Failed to load featured destinations.");
      } finally {
        if (!cancelled) setLoadingFeatured(false);
      }

      // Top tours (short-forms)
      try {
        const sf = await getShortForms({ status: "active", limit: 3, page: 1 });
        const list = (sf.shortForms || []).slice(0, 3).map(sfToTopTour);
        if (!cancelled) setTopTours(list);
      } catch {
        if (!cancelled) setErrorMsg((p) => p || "Failed to load tours.");
      } finally {
        if (!cancelled) setLoadingTop(false);
      }

      // Popular (blogs)
      try {
        const pop = await getBlogs({ status: "published", limit: 6, page: 1 });
        const list = (pop.blogs || []).slice(0, 6).map(blogToPopularDestination);
        if (!cancelled) setPopularDestinations(list);
      } catch {
        if (!cancelled) setErrorMsg((p) => p || "Failed to load popular places.");
      } finally {
        if (!cancelled) setLoadingPopular(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /* UI helpers */
  const GridSkeleton: React.FC<{ rows?: number }> = ({ rows = 6 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: rows }).map((_, i) => (
        <Card key={i} className="overflow-hidden border-0 shadow animate-pulse">
          <div className="w-full h-48 bg-gray-200" />
          <CardContent className="p-6">
            <div className="h-6 bg-gray-200 rounded mb-3" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const EmptyState: React.FC<{ label?: string }> = ({ label }) => (
    <div className="text-center text-gray-500 py-10">{label || "No items found."}</div>
  );

  const handleNavClick = (section: string) => {
    if (section === "home") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover object-fit-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover the Magic of
            <span className="block bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
              Mount Fuji
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Experience Japan's most sacred mountain with expert guides and unforgettable memories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700"
              onClick={() => handleNavClick("tours")}
            >
              <Camera className="mr-2 h-5 w-5" />
              Explore Tours
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-white/20 border-white text-white hover:bg-white/30"
              onClick={() => handleNavClick("routes")}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Plan Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Destinations (blogs) */}
      <section id="destinations" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Famous Japanese Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most beautiful and culturally significant places across Japan
            </p>
          </div>

          {loadingFeatured ? (
            <GridSkeleton />
          ) : featuredDestinations.length === 0 ? (
            <EmptyState label="No featured destinations found." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations.map((d, idx) => (
                <Card
                  key={d.id ?? `f-${idx}`}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    {d.image ? (
                      <img
                        src={d.image}
                        alt={d.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200" />
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-blue-600">
                        <Star className="h-3 w-3 mr-1 fill-current" /> {d.rating}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="text-white text-xl font-bold mb-1">{d.name}</h3>
                          <div className="flex items-center text-white/80 text-sm">
                            <Clock className="h-4 w-4 mr-1" /> {d.duration}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white text-lg font-bold">{d.price}</div>
                          <div className="text-white/80 text-sm">per person</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">{d.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(d.highlights || []).map((h, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          {h}
                        </Badge>
                      ))}
                    </div>

                    {d.id ? (
                      <Link to={`/blog/${d.id}`}>
                        <Button className="w-full" variant="outline">
                          <MapPin className="h-4 w-4 mr-2" />
                          Explore Destination
                        </Button>
                      </Link>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        <MapPin className="h-4 w-4 mr-2" />
                        Explore Destination
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Tours (short-forms) */}
      <section id="tours" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Popular Tours</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied travelers on our most beloved Japanese adventures
            </p>
          </div>

          {loadingTop ? (
            <GridSkeleton rows={3} />
          ) : topTours.length === 0 ? (
            <EmptyState label="No tours found." />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {topTours.map((t, idx) => (
                <Card
                  key={t.id ?? `t-${idx}`}
                  className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative">
                    {t.image ? (
                      <img src={t.image} alt={t.title} className="w-full h-48 object-cover" />
                    ) : (
                      <div className="w-full h-48 bg-gray-200" />
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white">Best Seller</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur rounded-full px-3 py-1 text-sm font-semibold">
                        {t.price}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{t.title}</h3>
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> {t.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" /> {t.rating} ({t.reviews})
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Languages Available:</h4>
                      <div className="flex flex-wrap gap-2">
                        {(t.languages || []).map((lang, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Includes:</h4>
                      <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                        {(t.includes || []).map((item, i) => (
                          <div key={i} className="flex items-center">
                            <div className="w-1 h-1 bg-blue-600 rounded-full mr-2" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* {t.id ? (
                      <Link to={`/short-form/${t.id}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <Users className="h-4 w-4 mr-2" />
                          Book This Tour
                        </Button>
                      </Link>
                    ) : (
                      <Button className="w-full" disabled>
                        <Users className="h-4 w-4 mr-2" />
                        Book This Tour
                      </Button>
                    )} */}
                    {t.id ? (
  <Link to={`/short-form/${t.id}`}>
    <Button className="w-full bg-blue-600 hover:bg-blue-700">
      Book This Tour
    </Button>
  </Link>
) : (
  <Button className="w-full" disabled>Book This Tour</Button>
)}

                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Places (blogs) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">⭐ FEATURED DESTINATIONS</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Most Popular Places to Visit
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore Japan's most iconic landmarks and hidden gems - our top recommended destinations
            </p>
          </div>

          {loadingPopular ? (
            <GridSkeleton />
          ) : popularDestinations.length === 0 ? (
            <EmptyState label="No popular places found." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularDestinations.map((d, idx) => (
                <Card
                  key={d._id ?? `p-${idx}`}
                  className="group hover:shadow-xl transition-all duration-500 overflow-hidden border-2 hover:border-blue-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    {d.image ? (
                      <img
                        src={d.image}
                        alt={d.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-black hover:bg-white">
                      {d.rating}
                    </Badge>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{d.name}</h3>
                      <p className="text-sm opacity-90">{d.visitors}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 text-sm mb-4">{d.description}</p>
                    {d._id ? (
                      <Link to={`/blog/${d._id}`}>
                        <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <MapPin className="w-4 h-4 mr-2" /> View Details
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        <MapPin className="w-4 h-4 mr-2" /> View Details
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

   
      <VerticalItinerary />




       {/* Languages */}
       <section id="languages" className="py-20 bg-white">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <Badge variant="outline" className="mb-4">🌐 MULTILINGUAL SUPPORT</Badge>
             <h2 className="text-4xl md:text-5xl font-bold mb-6">Guides Available in Multiple Languages</h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our professional guides speak your language for the best experience</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
             {[
               { lang: "English", flag: "🇺🇸", level: "Native" },
               { lang: "Japanese", flag: "🇯🇵", level: "Native" },
               { lang: "Chinese", flag: "🇨🇳", level: "Fluent" },
               { lang: "Korean", flag: "🇰🇷", level: "Fluent" },
               { lang: "Urdu", flag: "🇵🇰", level: "Fluent" }
             ].map((language) => (
               <Card key={language.lang} className="text-center p-6 hover:shadow-lg transition-shadow">
                 <div className="text-4xl mb-3">{language.flag}</div>
                 <h3 className="font-semibold mb-1">{language.lang}</h3>
                 <Badge variant="secondary" className="text-xs">{language.level}</Badge>
               </Card>
             ))}
           </div>
         </div>
      </section>


      {/* Stats + Footer */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50,000+</div>
              <div className="text-blue-200">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-blue-200">Tour Packages</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
              <div className="text-blue-200">Average Rating</div>
            </div>
          </div>
          {errorMsg && <p className="text-center mt-6 text-blue-100">{errorMsg}</p>}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
