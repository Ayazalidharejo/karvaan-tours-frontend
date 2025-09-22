
"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Heart, Users } from "lucide-react"
import axios from "axios"
import Footer from "@/components/layout/Footer"
import VerticalItinerary from "@/components/RoutesSection"

/* ===== Backend BASE ===== */
const API_BASE = "http://localhost:5000"

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  (response) => {
    console.log("[v0] API Response:", response.config.url, response.status)
    return response
  },
  async (error) => {
    console.error("[v0] API Error:", error.response?.data || error.message)

    if (error.code === "ECONNABORTED" || error.code === "NETWORK_ERROR") {
      console.log("[v0] Retrying request due to network error...")
      return api.request(error.config)
    }

    return Promise.reject(error)
  },
)

/* ===== Types ===== */
interface Blog {
  _id?: string
  title: string
  content?: string
  imageUrl?: string
  images?: string[]
  rating?: { average: number; count: number }
  price?: string
  duration?: string
  tags?: string[]
  status?: string
  createdAt?: string
  updatedAt?: string
  reviews?: Review[]
}

interface Review {
  _id?: string
  name: string
  rating: number
  comment: string
  createdAt?: string
}

interface PagedBlogs {
  posts: Blog[]
  totalPosts: number
  totalPages: number
  currentPage: number
}

interface FeaturedDestination {
  id: string | null
  name: string
  image: string
  rating: number
  price: string
  duration: string
  description: string
  highlights: string[]
}

interface TopTour {
  id: string | null
  name: string
  image: string
  rating: number
  price: string
  duration: string
  groupSize: string
}

interface PopularDestination {
  id: string | null
  name: string
  image: string
  toursCount: number
}

/* ===== Enhanced API Functions with better error handling ===== */
const toAbs = (url?: string): string => {
  if (!url) return ""
  if (url.startsWith("http")) return url
  return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`
}

const getFeaturedBlogs = async (limit = 6) => {
  try {
    console.log("[v0] Fetching featured blogs...")
    const response = await api.get<PagedBlogs>("/api/posts", {
      params: { featured: true, limit, page: 1, status: "published" },
    })

    if (!response.data || !Array.isArray(response.data.posts)) {
      console.warn("[v0] Invalid response structure for featured blogs")
      return { posts: [], totalPosts: 0, totalPages: 0, currentPage: 1 }
    }

    console.log("[v0] Featured blogs fetched:", response.data.posts.length)
    return response.data
  } catch (error) {
    console.error("[v0] Error fetching featured blogs:", error)
    throw error
  }
}

const getBlogs = async (params: Record<string, string | number | boolean | undefined>) => {
  try {
    console.log("[v0] Fetching blogs with params:", params)
    const response = await api.get<PagedBlogs>("/api/posts", { params })

    if (!response.data || !Array.isArray(response.data.posts)) {
      console.warn("[v0] Invalid response structure for blogs")
      return { posts: [], totalPosts: 0, totalPages: 0, currentPage: 1 }
    }

    console.log("[v0] Blogs fetched:", response.data.posts.length)
    return response.data
  } catch (error) {
    console.error("[v0] Error fetching blogs:", error)
    throw error
  }
}

const Home: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<string>("")

  const [loadingFeatured, setLoadingFeatured] = useState(true)
  const [loadingTop, setLoadingTop] = useState(true)
  const [loadingPopular, setLoadingPopular] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")

  const [featuredDestinations, setFeaturedDestinations] = useState<FeaturedDestination[]>([])
  const [topTours, setTopTours] = useState<TopTour[]>([])
  const [popularDestinations, setPopularDestinations] = useState<PopularDestination[]>([])

  const heroImage = useMemo(
    () => "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1600&h=900&fit=crop&crop=center",
    [],
  )
  const fallbackTourImage = useMemo(
    () => "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&h=800&fit=crop&crop=center",
    [],
  )

  /* ----- Enhanced mapping helpers with null safety ----- */
  const blogToFeaturedDestination = useCallback((b: Blog): FeaturedDestination => {
    const imageUrl = b.imageUrl || (b.images && b.images.length > 0 ? b.images[0] : "") || ""
    const safeTitle = b.title || "Untitled Tour"
    const safePrice = b.price || "¥0"
    const safeDuration = b.duration || "Duration not specified"
    const safeContent = b.content || "No description available"
    const safeRating = b.rating?.average || 4.0
    const safeTags = Array.isArray(b.tags) ? b.tags : []

    return {
      id: b._id ?? null,
      name: safeTitle,
      image: toAbs(imageUrl),
      rating: safeRating,
      price: safePrice,
      duration: safeDuration,
      description: safeContent.slice(0, 120) + (safeContent.length > 120 ? "…" : ""),
      highlights: safeTags.slice(0, 3),
    }
  }, [])

  const blogToTopTour = useCallback(
    (b: Blog): TopTour => {
      const imageUrl = b.imageUrl || (b.images && b.images.length > 0 ? b.images[0] : "") || ""
      const safeTitle = b.title || "Untitled Tour"
      const safePrice = b.price || "¥0"
      const safeDuration = b.duration || "Duration not specified"
      const safeRating = b.rating?.average || 4.0

      return {
        id: b._id ?? null,
        name: safeTitle,
        image: toAbs(imageUrl) || fallbackTourImage,
        rating: safeRating,
        price: safePrice,
        duration: safeDuration,
        groupSize: "Max 12",
      }
    },
    [fallbackTourImage],
  )

  const blogToPopularDestination = useCallback(
    (b: Blog): PopularDestination => {
      const imageUrl = b.imageUrl || (b.images && b.images.length > 0 ? b.images[0] : "") || ""
      const safeTitle = b.title || "Untitled Destination"

      return {
        id: b._id ?? null,
        name: safeTitle,
        image: toAbs(imageUrl) || fallbackTourImage,
        toursCount: Math.floor(Math.random() * 20) + 5,
      }
    },
    [fallbackTourImage],
  )

  /* ----- Enhanced data loading with better error recovery ----- */
  useEffect(() => {
    const loadData = async () => {
      setErrorMsg("")
      setLoadingFeatured(true)
      setLoadingTop(true)
      setLoadingPopular(true)

      try {
        try {
          console.log("[v0] Loading featured posts...")
          const featuredData = await getFeaturedBlogs(6)

          let featuredList = featuredData.posts || []

          if (featuredList.length === 0) {
            console.log("[v0] No featured posts found, loading any published posts...")
            const publishedData = await getBlogs({
              status: "published",
              limit: 6,
              page: 1,
            })
            featuredList = publishedData.posts || []
          }

          if (featuredList.length === 0) {
            console.log("[v0] No published posts found, loading any posts...")
            const anyData = await getBlogs({
              limit: 6,
              page: 1,
            })
            featuredList = anyData.posts || []
          }

          console.log("[v0] Featured posts loaded:", featuredList.length)
          setFeaturedDestinations(featuredList.map(blogToFeaturedDestination))
        } catch (error) {
          console.error("[v0] Error loading featured destinations:", error)
          setErrorMsg((prev) => prev || "Failed to load featured destinations.")
          setFeaturedDestinations([])
        } finally {
          setLoadingFeatured(false)
        }

        try {
          console.log("[v0] Loading top tours...")
          const topData = await getBlogs({
            status: "published",
            limit: 4,
            page: 1,
          })

          const topList = topData.posts || []
          console.log("[v0] Top tours loaded:", topList.length)
          setTopTours(topList.map(blogToTopTour))
        } catch (error) {
          console.error("[v0] Error loading top tours:", error)
          setErrorMsg((prev) => prev || "Failed to load top tours.")
          setTopTours([])
        } finally {
          setLoadingTop(false)
        }

        try {
          console.log("[v0] Loading popular destinations...")
          const popularData = await getBlogs({
            status: "published",
            limit: 8,
            page: 1,
          })

          const popularList = popularData.posts || []
          console.log("[v0] Popular destinations loaded:", popularList.length)
          setPopularDestinations(popularList.map(blogToPopularDestination))
        } catch (error) {
          console.error("[v0] Error loading popular destinations:", error)
          setErrorMsg((prev) => prev || "Failed to load popular destinations.")
          setPopularDestinations([])
        } finally {
          setLoadingPopular(false)
        }
      } catch (error) {
        console.error("[v0] General error loading data:", error)
        setErrorMsg("Failed to load page data. Please check your connection and try again.")
      }
    }

    loadData()
  }, [blogToFeaturedDestination, blogToTopTour, blogToPopularDestination])

  const handleViewDetails = (postId: string) => {
    if (postId && postId !== "null") {
      console.log("[v0] Navigating to detail page:", postId)
      window.location.href = `/detail/${postId}`
    } else {
      console.warn("[v0] Invalid post ID for navigation:", postId)
      setErrorMsg("Unable to view details for this item.")
    }
  }

  // Show home view
  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white ">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${heroImage})`,marginTop:"20px" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Discover Japan's Hidden Gems</h1>
          <p className="text-xl md:text-2xl mb-8 text-pretty">
            Experience authentic Japanese culture through carefully curated tours and adventures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Explore Tours
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mx-4 my-4">
          <p>{errorMsg}</p>
        </div>
      )}

      {/* Featured Destinations */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most breathtaking locations Japan has to offer
            </p>
          </div>

          {loadingFeatured ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-300" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2" />
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-64">
                    <img
                      src={destination.image || fallbackTourImage}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">{destination.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{destination.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {destination.duration}
                      </div>
                      <div className="text-lg font-semibold text-blue-600">{destination.price}</div>
                    </div>
                    {destination.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {destination.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleViewDetails(destination.id || "")}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Tours */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Tours</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience Japan like never before with our most popular tours
            </p>
          </div>

          {loadingTop ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-300 rounded mb-2" />
                    <div className="h-4 bg-gray-300 rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topTours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-48">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-green-500 text-white">Popular</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{tour.name}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {tour.rating}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {tour.groupSize}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {tour.duration}
                      </div>
                      <div className="font-semibold text-blue-600">{tour.price}</div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleViewDetails(tour.id || "")}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the most loved destinations by our travelers
            </p>
          </div>

          {loadingPopular ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-32 bg-gray-300" />
                  <CardContent className="p-3">
                    <div className="h-3 bg-gray-300 rounded mb-1" />
                    <div className="h-3 bg-gray-300 rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {popularDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-32">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <div className="text-xs font-medium">{destination.toursCount} tours</div>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{destination.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
<VerticalItinerary/>
      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">Get the latest travel tips and exclusive offers delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
     
      <Footer/>
    </div>
  )
}

export default Home
