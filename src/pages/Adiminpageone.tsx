
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
} from "lucide-react"

const API_BASE = "http://localhost:5000/api" // Change to your backend URL

type Tour = {
  _id?: string
  title?: string
  description?: string
  summary?: string
  coverImage?: string
  price?: number
  currency?: string
  duration?: string
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
  destinations?: Array<{
    name?: string
    description?: string
    duration?: string
    difficulty?: "Easy" | "Moderate" | "Hard"
    tips?: string
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
  faqs?: Array<{
    question?: string
    answer?: string
  }>
  languages?: string[]
  foods?: string[]
  activities?: string[]
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
  const [uiError, setUiError] = useState<string>("") // UI-only error messages
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
    currency: "USD",
    duration: "",
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
    destinations: [],
    itinerary: [],
    pickupPoints: [],
    faqs: [],
    languages: [],
    foods: [],
    activities: [],
  }

  const [formData, setFormData] = useState<Tour>(tour || defaultData)
  const [activeTab, setActiveTab] = useState<"basic" | "details" | "destinations" | "itinerary" | "pickup" | "faqs">(
    "basic",
  )
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
          <div className="flex space-x-4 px-6">
            {[
              { id: "basic", label: "Basic Info" },
              { id: "details", label: "Details" },
              { id: "destinations", label: "Destinations" },
              { id: "itinerary", label: "Itinerary" },
              { id: "pickup", label: "Pickup Points" },
              { id: "faqs", label: "FAQs" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === (tab.id as any)
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
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
                  <div className="grid grid-cols-2 gap-4">
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
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">Features</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
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

              {/* Special Options */}
              <div className="grid grid-cols-2 gap-4">
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
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
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
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Min Group</label>
                      <input
                        type="number"
                        value={formData.groupSize?.min ?? 1}
                        onChange={(e) => handleNestedChange("groupSize", "min", Number(e.target.value))}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Max Group</label>
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

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(formData.tags) ? formData.tags.join(", ") : ""}
                      onChange={(e) =>
                        handleInputChange(
                          "tags",
                          e.target.value
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter(Boolean),
                        )
                      }
                      placeholder="mountain, hiking, adventure, photography"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Tabs for Arrays */}
          {["destinations", "itinerary", "pickup", "faqs"].includes(activeTab) && (
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
  activeTab: "destinations" | "itinerary" | "pickup" | "faqs" | string
  formData: Tour
  newItem: Record<string, any>
  setNewItem: React.Dispatch<React.SetStateAction<Record<string, any>>>
  onAdd: (arrayName: keyof Tour, item: any) => void
  onRemove: (arrayName: keyof Tour, index: number) => void
}) {
  const getArrayConfig = () => {
    switch (activeTab) {
      case "destinations":
        return {
          title: "Destinations",
          arrayName: "destinations" as keyof Tour,
          fields: [
            { key: "name", label: "Name", type: "text", required: true },
            { key: "description", label: "Description", type: "textarea" },
            { key: "duration", label: "Duration", type: "text" },
            {
              key: "difficulty",
              label: "Difficulty",
              type: "select",
              options: ["Easy", "Moderate", "Hard"],
            },
            { key: "tips", label: "Tips", type: "textarea" },
          ],
        }
      case "itinerary":
        return {
          title: "Itinerary",
          arrayName: "itinerary" as keyof Tour,
          fields: [
            { key: "time", label: "Time", type: "text", required: true },
            { key: "activity", label: "Activity", type: "text", required: true },
            { key: "description", label: "Description", type: "textarea" },
            { key: "duration", label: "Duration", type: "text" },
            { key: "location", label: "Location", type: "text" },
          ],
        }
      case "pickup":
        return {
          title: "Pickup Points",
          arrayName: "pickupPoints" as keyof Tour,
          fields: [
            { key: "location", label: "Location", type: "text", required: true },
            { key: "time", label: "Time", type: "text", required: true },
            { key: "landmark", label: "Landmark", type: "text" },
            { key: "instructions", label: "Instructions", type: "textarea" },
          ],
        }
      case "faqs":
        return {
          title: "FAQs",
          arrayName: "faqs" as keyof Tour,
          fields: [
            { key: "question", label: "Question", type: "text", required: true },
            { key: "answer", label: "Answer", type: "textarea", required: true },
          ],
        }
      default:
        return null
    }
  }

  const config = getArrayConfig()
  if (!config) return null

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
    // Show the first few relevant fields for a compact summary
    const keysToShow = config.fields
      .map((f: any) => f.key)
      .filter((k: string) => item[k])
      .slice(0, 3)
    if (keysToShow.length === 0) return <span className="text-gray-500">No details</span>
    return (
      <div className="grid gap-1 text-sm text-gray-700 md:grid-cols-3">
        {keysToShow.map((k: string) => (
          <div key={k}>
            <span className="font-medium">{config.fields.find((f: any) => f.key === k)?.label}:</span>{" "}
            <span className="text-gray-600">{typeof item[k] === "string" ? item[k] : JSON.stringify(item[k])}</span>
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
