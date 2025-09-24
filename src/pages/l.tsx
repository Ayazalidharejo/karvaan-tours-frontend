"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Heart, Users, ArrowLeft, Calendar, Shield } from "lucide-react"
import axios from "axios"

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
  nameJp?: string
  content?: string
  description?: string
  shortDescription?: string
  fullDescription?: string
  about?: string
  details?: string
  imageUrl?: string
  images?: string[]
  rating?: { average: number; count: number }
  price?: string
  duration?: string
  durationHours?: number
  author?: string
  category?: string
  featured?: boolean
  status?: string
  views?: number
  slug?: string
  tags?: string[]
  createdAt?: string
  updatedAt?: string
  reviews?: Review[]
  highlights?: string[]
  includes?: string[]
  meetingPoint?: string
  difficulty?: string
  prefecture?: string
  nearbyAttractions?: string[]
  dining?: string[]
  accommodation?: string[]
  tips?: string[]
  languages?: string[]
  importantInformation?: string[]
  notSuitableFor?: string[]
  rules?: string[]
  guides?: string[]
  explorationWays?: string[]
  bestTime?: string
  freeCancellation?: {
    available: boolean
    deadlineHours: number
    note: string
  }
  reserveNowPayLater?: {
    available: boolean
    note: string
  }
  liveTourGuide?: {
    available: boolean
    languages: string[]
  }
}

interface Review {
  _id?: string
  name: string
  rating: number
  comment: string
  createdAt?: string
}

interface NewReview {
  name: string
  rating: number
  comment: string
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [post, setPost] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [retryCount, setRetryCount] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState<NewReview>({
    name: "",
    rating: 5,
    comment: "",
  })
  const [submittingReview, setSubmittingReview] = useState(false)
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState(false)
  const [isAnimationPaused, setIsAnimationPaused] = useState(false)

  const toAbs = (url?: string): string => {
    if (!url) return ""
    if (url.startsWith("http")) return url
    return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`
  }

  const fetchPostById = async (postId: string, attempt = 1): Promise<Blog | null> => {
    try {
      console.log(`[v0] Fetching post ${postId}, attempt ${attempt}`)
      const response = await api.get<Blog>(`/api/posts/${postId}`)

      if (!response.data) {
        throw new Error("No data received from server")
      }

      console.log("[v0] Post fetched successfully:", response.data.title)
      return response.data
    } catch (error: any) {
      console.error(`[v0] Error fetching post (attempt ${attempt}):`, error)

      if (attempt < 3 && (error.code === "ECONNABORTED" || error.code === "NETWORK_ERROR")) {
        console.log(`[v0] Retrying fetch in 2 seconds...`)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return fetchPostById(postId, attempt + 1)
      }

      throw error
    }
  }

  useEffect(() => {
    const loadPost = async () => {
      if (!id) {
        setError("No post ID provided")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError("")

        const postData = await fetchPostById(id)

        if (!postData) {
          setError("Post not found or no data available")
          return
        }

        setPost(postData)
      } catch (error: any) {
        console.error("[v0] Failed to load post:", error)

        if (error.response?.status === 404) {
          setError("Post not found. It may have been removed or the ID is incorrect.")
        } else if (error.code === "ECONNABORTED") {
          setError("Request timed out. Please check your connection and try again.")
        } else if (error.code === "NETWORK_ERROR") {
          setError("Network error. Please check your internet connection.")
        } else {
          setError("Failed to load post details. Please try again later.")
        }
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [id])

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
    if (id) {
      const loadPost = async () => {
        try {
          setLoading(true)
          setError("")
          const postData = await fetchPostById(id)
          setPost(postData)
        } catch (error) {
          setError("Failed to load post details. Please try again later.")
        } finally {
          setLoading(false)
        }
      }
      loadPost()
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  const getFullContent = (post: Blog): string => {
    const contents = [post.fullDescription, post.description, post.about, post.content, post.shortDescription].filter(
      Boolean,
    )

    return contents.join("\n\n") || "No description available"
  }

  // Fixed submitReview function
  const submitReview = useCallback(async () => {
    if (!newReview.name.trim() || !newReview.comment.trim() || !id || submittingReview) {
      return
    }

    try {
      setSubmittingReview(true)
      
      // Optimistic update - immediately show the review
      const optimisticReview: Review = {
        _id: `temp-${Date.now()}`,
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: new Date().toISOString()
      }

      // Update UI immediately
      setPost((prevPost) => {
        if (!prevPost) return prevPost
        
        const updatedReviews = [...(prevPost.reviews || []), optimisticReview]
        const newAverage = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length

        return {
          ...prevPost,
          reviews: updatedReviews,
          rating: {
            average: Math.round(newAverage * 10) / 10,
            count: updatedReviews.length,
          },
        }
      })

      // Pause animation temporarily
      setIsAnimationPaused(true)

      // Make API call
      const response = await api.post(`/api/posts/${id}/reviews`, newReview)

      if (response.data) {
        // Replace optimistic review with real data
        setPost((prevPost) => {
          if (!prevPost) return prevPost
          
          const realReview = {
            ...response.data,
            createdAt: response.data.createdAt || new Date().toISOString()
          }
          
          // Replace the optimistic review with real one
          const updatedReviews = prevPost.reviews?.map(review => 
            review._id === optimisticReview._id ? realReview : review
          ) || [realReview]
          
          const newAverage = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length

          return {
            ...prevPost,
            reviews: updatedReviews,
            rating: {
              average: Math.round(newAverage * 10) / 10,
              count: updatedReviews.length,
            },
          }
        })

        // Show success message
        setReviewSubmitSuccess(true)

        // Reset form with smooth transition
        setTimeout(() => {
          setNewReview({ name: "", rating: 5, comment: "" })
          setShowReviewForm(false)
          setReviewSubmitSuccess(false)
          setIsAnimationPaused(false)
        }, 1500)

      } else {
        // If API fails, remove optimistic review
        setPost((prevPost) => {
          if (!prevPost) return prevPost
          
          const filteredReviews = prevPost.reviews?.filter(review => review._id !== optimisticReview._id) || []
          const newAverage = filteredReviews.length > 0 
            ? filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length
            : (prevPost.rating?.average || 4.0)

          return {
            ...prevPost,
            reviews: filteredReviews,
            rating: {
              average: Math.round(newAverage * 10) / 10,
              count: filteredReviews.length,
            },
          }
        })
        throw new Error("Failed to submit review")
      }

    } catch (error) {
      console.error("[v0] Error submitting review:", error)
      
      // Remove optimistic review on error
      setPost((prevPost) => {
        if (!prevPost) return prevPost
        
        const filteredReviews = prevPost.reviews?.filter(review => !review._id?.startsWith('temp-')) || []
        const newAverage = filteredReviews.length > 0 
          ? filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length
          : (prevPost.rating?.average || 4.0)

        return {
          ...prevPost,
          reviews: filteredReviews,
          rating: {
            average: Math.round(newAverage * 10) / 10,
            count: filteredReviews.length,
          },
        }
      })

      alert("Review submit nahi ho saka. Please try again.")
      setIsAnimationPaused(false)
    } finally {
      setSubmittingReview(false)
    }
  }, [newReview, id, submittingReview])

  // Success Message Component
  const SuccessMessage = () => (
    reviewSubmitSuccess && (
      <div className="fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
        ✅ Review submitted successfully!
      </div>
    )
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="h-96 bg-gray-300 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Button onClick={handleRetry} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Try Again
            </Button>
            <Button onClick={handleBack} variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const safeTitle = post.title || "Untitled Tour"
  const safeContent = getFullContent(post)
  const safePrice = post.price || "Price not available"
  const safeDuration = post.duration || "Duration not specified"
  const safeRating = post.rating?.average || 4.0
  const safeRatingCount = post.rating?.count || 0
  const safeImages = post.images || (post.imageUrl ? [post.imageUrl] : [])
  const safeTags = Array.isArray(post.tags) ? post.tags : []
  const safeHighlights = Array.isArray(post.highlights) ? post.highlights : []
  const safeIncludes = Array.isArray(post.includes) ? post.includes : []
  const safeReviews = Array.isArray(post.reviews) ? post.reviews : []
  const safeNearbyAttractions = Array.isArray(post.nearbyAttractions) ? post.nearbyAttractions : []
  const safeDining = Array.isArray(post.dining) ? post.dining : []
  const safeAccommodation = Array.isArray(post.accommodation) ? post.accommodation : []
  const safeTips = Array.isArray(post.tips) ? post.tips : []
  const safeLanguages = Array.isArray(post.languages) ? post.languages : []
  const safeImportantInfo = Array.isArray(post.importantInformation) ? post.importantInformation : []
  const safeNotSuitableFor = Array.isArray(post.notSuitableFor) ? post.notSuitableFor : []
  const safeRules = Array.isArray(post.rules) ? post.rules : []
  const safeGuides = Array.isArray(post.guides) ? post.guides : []
  const safeExplorationWays = Array.isArray(post.explorationWays) ? post.explorationWays : []
  const safeAuthor = post.author || "Admin"
  const safeCategory = post.category || "tour"
  const safeViews = post.views || 0
  const safeDurationHours = post.durationHours || 8

  const fallbackImage = "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&h=800&fit=crop&crop=center"
  const mainImage = safeImages.length > 0 ? toAbs(safeImages[0]) : fallbackImage

  return (
    <div className="min-h-screen bg-gray-50">
      <SuccessMessage />
      
      {/* Hero Section */}
      <div className="relative h-[100vh] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="grid grid-cols-12 gap-4 h-full">
           
            <div className="col-span-12 md:col-span-7 relative rounded-2xl overflow-hidden shadow-2xl h-full">
              <img
                src={
                  mainImage ||
                  "/placeholder.svg?height=800&width=1200&query=serene lake surrounded by autumn trees with wooden dock" ||
                  "/placeholder.svg" ||
                  "/placeholder.svg"
                }
                alt={safeTitle}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  if (target.src !== fallbackImage) {
                    target.src = "/peaceful-nature-landscape-with-lake-and-trees.jpg"
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-800/40 to-transparent" />

              {/* Hero content overlay */}
              <div className="absolute inset-0 flex items-end">
                <div className="p-8 w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-emerald-600/90 backdrop-blur-sm text-white text-sm px-3 py-1.5 font-medium">
                      🌿 {safeCategory.toUpperCase()}
                    </Badge>
                    {post.featured && (
                      <Badge className="bg-amber-500/90 backdrop-blur-sm text-black text-sm px-3 py-1.5 font-medium">
                        ⭐ FEATURED
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white text-balance leading-tight">
                    {safeTitle}
                  </h1>
                  {post.nameJp && <p className="text-lg md:text-2xl mb-4 text-emerald-100 font-light">{post.nameJp}</p>}
                </div>
              </div>
            </div>

            {/* Side images - 5 columns total, stacked */}
            <div className="col-span-12 md:col-span-5 flex flex-col gap-4 h-full">
              <div className="flex-1 relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  style={{height:"320px"}}
                  src={
                    safeImages[1]
                      ? toAbs(safeImages[1])
                      : "/placeholder.svg?height=400&width=600&query=beautiful mountain landscape with hiking trail"
                  }
                  alt={`${safeTitle} - View 2`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center text-white">
                    <MapPin className="h-4 w-4 mr-2 text-emerald-300" />
                    <span className="font-medium">{post.prefecture || "Beautiful Location"}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  style={{height:"320px"}}
                  src={
                    safeImages[2]
                      ? toAbs(safeImages[2])
                      : "/placeholder.svg?height=400&width=600&query=cozy mountain cabin with warm lighting"
                  }
                  alt={`${safeTitle} - View 3`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-2" />
                      <span className="font-bold">{safeRating}</span>
                    </div>
                    <div className="text-sm bg-black/30 px-2 py-1 rounded">{safeViews.toLocaleString()} views</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">About This Tour</h2>
                  <div className="text-sm text-gray-500">By {safeAuthor}</div>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">{safeContent}</p>
                </div>
                {post.details && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-3">Additional Details</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.details}</p>
                  </div>
                )}
                {post.about && post.about !== safeContent && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-3">More About This Experience</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.about}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {safeImages.length > 1 && (
              <Card className="shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Complete Photo Gallery ({safeImages.length} photos)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {safeImages.map((image, index) => (
                      <div key={index} className="relative h-32 rounded-lg overflow-hidden group">
                        <img
                          src={toAbs(image) || "/placeholder.svg"}
                          alt={`${safeTitle} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {index + 1}/{safeImages.length}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Fixed Reviews Section */}
            {safeReviews.length > 0 ? (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-amber-50 to-orange-50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-bold text-gray-800 flex items-center">
                      <span className="text-amber-600 mr-3">⭐</span>
                      Customer Reviews & Ratings
                    </h3>
                    <div className="flex items-center bg-amber-100 px-6 py-3 rounded-full shadow-sm">
                      <Star className="h-6 w-6 fill-amber-500 text-amber-500 mr-2" />
                      <span className="font-bold text-2xl text-amber-700">{safeRating}</span>
                      <span className="text-amber-600 ml-2 font-medium">({safeRatingCount} reviews)</span>
                    </div>
                  </div>

                  {/* Rating breakdown */}
                  <div className="mb-8 bg-white/60 p-6 rounded-xl">
                    <h4 className="font-semibold text-lg mb-4">Rating Breakdown</h4>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-4">
                          <span className="text-sm font-medium w-8">{rating}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : rating === 2 ? 2 : 0}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {rating === 5 ? "70%" : rating === 4 ? "20%" : rating === 3 ? "8%" : rating === 2 ? "2%" : "0%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <Button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 text-lg font-medium shadow-lg transition-all duration-200"
                    >
                      {showReviewForm ? "Cancel Review" : "✍️ Write a Review"}
                    </Button>
                  </div>

                  {/* Review Form with smooth transitions */}
                  <div className={`transition-all duration-300 ease-in-out ${showReviewForm ? 'opacity-100 max-h-none' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                    {showReviewForm && (
                      <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
                        <CardContent className="p-6">
                          <h4 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                            <span className="text-blue-600 mr-3">💭</span>
                            Share Your Experience
                          </h4>
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-semibold mb-3 text-gray-700">Your Name</label>
                              <input
                                type="text"
                                value={newReview.name}
                                onChange={(e) => setNewReview((prev) => ({ ...prev, name: e.target.value }))}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                placeholder="Enter your name"
                                disabled={submittingReview}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold mb-3 text-gray-700">Rating</label>
                              <div className="flex items-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => !submittingReview && setNewReview((prev) => ({ ...prev, rating: star }))}
                                    className="focus:outline-none transform hover:scale-110 transition-transform duration-200 disabled:cursor-not-allowed"
                                    disabled={submittingReview}
                                  >
                                    <Star
                                      className={`h-8 w-8 ${
                                        star <= newReview.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                      }`}
                                    />
                                  </button>
                                ))}
                                <span className="ml-4 text-lg font-medium text-gray-700 bg-white/60 px-3 py-1 rounded-full">
                                  {newReview.rating} out of 5 stars
                                </span>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold mb-3 text-gray-700">Your Review</label>
                              <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                                rows={5}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                placeholder="Share your experience with this tour..."
                                disabled={submittingReview}
                              />
                            </div>

                            <div className="flex space-x-4">
                              <Button
                                onClick={submitReview}
                                disabled={submittingReview || !newReview.name.trim() || !newReview.comment.trim()}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                              >
                                {submittingReview ? "Submitting..." : "🚀 Submit Review"}
                              </Button>
                              <Button
                                onClick={() => setShowReviewForm(false)}
                                variant="outline"
                                className="border-2 border-gray-300 hover:border-gray-400 px-8 py-3"
                                disabled={submittingReview}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Reviews Slider with controlled animation */}
                  <div className="relative overflow-hidden min-h-[200px]">
                    <style jsx>{`
                      @keyframes slideRightToLeft {
                        0% {
                          transform: translateX(0);
                        }
                        100% {
                          transform: translateX(-100%);
                        }
                      }
                      .reviews-slider {
                        animation: slideRightToLeft 40s linear infinite;
                        animation-play-state: ${isAnimationPaused ? 'paused' : 'running'};
                        display: flex;
                        gap: 24px;
                        width: calc(100% * 2);
                        transition: all 0.3s ease;
                      }
                      .reviews-slider:hover {
                        animation-play-state: paused;
                      }
                      .review-card {
                        flex: 0 0 400px;
                        min-width: 400px;
                      }
                    `}</style>
                    
                    <div className="reviews-slider">
                      {/* First set of reviews */}
                      {safeReviews.map((review, index) => (
                        <div
                          key={`first-${review._id || index}`}
                          className="review-card bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-amber-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {review.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-gray-900 text-lg">{review.name}</div>
                                {review.createdAt && (
                                  <div className="text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center bg-amber-100 px-3 py-1 rounded-full">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                                />
                              ))}
                              <span className="ml-2 font-bold text-amber-700">{review.rating}/5</span>
                            </div>
                          </div>
                          <p className="text-gray-700 text-base leading-relaxed italic">"{review.comment}"</p>
                        </div>
                      ))}
                      
                      {/* Duplicate set for infinite scroll */}
                      {safeReviews.map((review, index) => (
                        <div
                          key={`second-${review._id || index}`}
                          className="review-card bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-amber-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {review.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-gray-900 text-lg">{review.name}</div>
                                {review.createdAt && (
                                  <div className="text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center bg-amber-100 px-3 py-1 rounded-full">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                                />
                              ))}
                              <span className="ml-2 font-bold text-amber-700">{review.rating}/5</span>
                            </div>
                          </div>
                          <p className="text-gray-700 text-base leading-relaxed italic">"{review.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-md border-l-4 border-l-yellow-400">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Customer Reviews</h3>
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-bold text-lg">{safeRating}</span>
                      <span className="text-gray-600 ml-1">(No reviews yet)</span>
                    </div>
                  </div>

                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Be the first to review this tour!</p>
                    <Button
                      onClick={() => setShowReviewForm(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Write the First Review
                    </Button>
                  </div>

                  {/* Review Form for no reviews case */}
                  <div className={`transition-all duration-300 ease-in-out ${showReviewForm ? 'opacity-100 max-h-none' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                    {showReviewForm && (
                      <Card className="mt-6 bg-blue-50 border-2 border-blue-200">
                        <CardContent className="p-4">
                          <h4 className="text-lg font-semibold mb-4">Share Your Experience</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Your Name</label>
                              <input
                                type="text"
                                value={newReview.name}
                                onChange={(e) => setNewReview((prev) => ({ ...prev, name: e.target.value }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your name"
                                disabled={submittingReview}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">Rating</label>
                              <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => !submittingReview && setNewReview((prev) => ({ ...prev, rating: star }))}
                                    className="focus:outline-none"
                                    disabled={submittingReview}
                                  >
                                    <Star
                                      className={`h-6 w-6 ${
                                        star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  </button>
                                ))}
                                <span className="ml-2 text-sm text-gray-600">{newReview.rating} out of 5 stars</span>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium mb-2">Your Review</label>
                              <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="Share your experience with this tour..."
                                disabled={submittingReview}
                              />
                            </div>

                            <div className="flex space-x-3">
                              <Button
                                onClick={submitReview}
                                disabled={submittingReview || !newReview.name.trim() || !newReview.comment.trim()}
                                className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {submittingReview ? "Submitting..." : "Submit Review"}
                              </Button>
                              <Button 
                                onClick={() => setShowReviewForm(false)} 
                                variant="outline"
                                disabled={submittingReview}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Rest of the sections remain the same */}
            {safeHighlights.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Tour Highlights</h3>
                  <ul className="space-y-2">
                    {safeHighlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {safeIncludes.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {safeIncludes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {safeNearbyAttractions.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Nearby Attractions</h3>
                  <ul className="space-y-2">
                    {safeNearbyAttractions.map((attraction, index) => (
                      <li key={index} className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                        <span className="text-gray-700">{attraction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {safeLanguages.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Language Support</h3>
                  <div className="flex flex-wrap gap-2">
                    {safeLanguages.map((language, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        🌐 {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {safeNotSuitableFor.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Not Suitable For</h3>
                  <ul className="space-y-2">
                    {safeNotSuitableFor.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {safeRules.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Rules & Guidelines</h3>
                  <ul className="space-y-2">
                    {safeRules.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">⚠</span>
                        <span className="text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {safeGuides.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Available Guides</h3>
                  <ul className="space-y-2">
                    {safeGuides.map((guide, index) => (
                      <li key={index} className="flex items-start">
                        <Users className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                        <span className="text-gray-700">{guide}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {safeExplorationWays.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Ways to Explore</h3>
                  <ul className="space-y-2">
                    {safeExplorationWays.map((way, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">🗺️</span>
                        <span className="text-gray-700">{way}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {safeDining.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Dining Options</h3>
                  <ul className="space-y-2">
                    {safeDining.map((dining, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">🍽️</span>
                        <span className="text-gray-700">{dining}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {safeAccommodation.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Accommodation Options</h3>
                  <ul className="space-y-2">
                    {safeAccommodation.map((accommodation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-500 mr-2">🏨</span>
                        <span className="text-gray-700">{accommodation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {safeTips.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Helpful Tips</h3>
                  <ul className="space-y-2">
                    {safeTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2">💡</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {safeImportantInfo.length > 0 && (
              <Card className="border-l-4 border-l-red-400">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-700">📋 Important Information - Essential Tour Details</h3>
                  <ul className="space-y-2">
                    {safeImportantInfo.map((info, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">❗</span>
                        <span className="text-gray-700">{info}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* FAQ Section */}
            <Card className="shadow-lg border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-blue-700 flex items-center">
                  ❓ Frequently Asked Questions - Common Tour Inquiries
                </h3>
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-lg mb-2 text-gray-800">What should I bring for this tour?</h4>
                    <p className="text-gray-600">We recommend comfortable walking shoes, weather-appropriate clothing, sunscreen, a water bottle, and a camera. Detailed packing list will be provided upon booking confirmation.</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-lg mb-2 text-gray-800">Is this tour suitable for children?</h4>
                    <p className="text-gray-600">This tour is suitable for children aged 8 and above. Children under 18 must be accompanied by an adult. Special arrangements can be made for families with younger children.</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-lg mb-2 text-gray-800">What happens in case of bad weather?</h4>
                    <p className="text-gray-600">Tours operate rain or shine. In case of severe weather conditions, we may reschedule or provide alternative indoor activities. Full refunds are available for weather-related cancellations.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-gray-800">How far in advance should I book?</h4>
                    <p className="text-gray-600">We recommend booking at least 48 hours in advance, especially during peak seasons. Last-minute bookings are subject to availability.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Information */}
            <Card className="shadow-lg border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center">
                  🛡️ Safety Information - Your Wellbeing is Our Priority
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-gray-800">Health & Fitness Requirements</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Moderate fitness level required</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>No serious medical conditions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Inform us of any dietary restrictions</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-gray-800">Safety Measures</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">🚑</span>
                        <span>First aid trained guides</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">📱</span>
                        <span>Emergency contact system</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">🦺</span>
                        <span>Safety equipment provided</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather Guide */}
            <Card className="shadow-lg border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-orange-700 flex items-center">
                  🌤️ Weather Guide - Seasonal Tour Information
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-blue-800">Spring (Mar-May)</h4>
                    <p className="text-sm text-blue-600 mb-2">Mild temperatures, blooming flowers</p>
                    <p className="text-xs text-blue-500">15-25°C | Light jacket recommended</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-green-800">Summer (Jun-Aug)</h4>
                    <p className="text-sm text-green-600 mb-2">Warm weather, peak season</p>
                    <p className="text-xs text-green-500">25-35°C | Sunscreen essential</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-amber-800">Autumn (Sep-Nov)</h4>
                    <p className="text-sm text-amber-600 mb-2">Cool temperatures, beautiful colors</p>
                    <p className="text-xs text-amber-500">10-20°C | Layer clothing</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2 text-slate-800">Winter (Dec-Feb)</h4>
                    <p className="text-sm text-slate-600 mb-2">Cold weather, fewer crowds</p>
                    <p className="text-xs text-slate-500">0-10°C | Warm clothing required</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What to Bring */}
            <Card className="shadow-lg border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 text-purple-700 flex items-center">
                  🎒 What to Bring - Essential Packing Checklist
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-gray-800">Essential Items</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-purple-500 mr-3">👟</span>
                        <span className="text-gray-700">Comfortable walking shoes</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-purple-500 mr-3">🧥</span>
                        <span className="text-gray-700">Weather-appropriate clothing</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-purple-500 mr-3">🕶️</span>
                        <span className="text-gray-700">Sunglasses and sunscreen</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-purple-500 mr-3">💧</span>
                        <span className="text-gray-700">Water bottle</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-gray-800">Recommended Items</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="text-purple-500 mr-3">📸</span>
                        <span className="text-gray-700">Camera or smartphone</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-purple-500 mr-3">🍫</span>
                        <span className="text-gray-700">Light snacks</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-purple-500 mr-3">💊</span>
                        <span className="text-gray-700">Personal medications</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-purple-500 mr-3">🆔</span>
                        <span className="text-gray-700">Valid ID or passport</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transportation & Meeting Point */}
            <Card className="shadow-lg border-l-4 border-l-indigo-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font