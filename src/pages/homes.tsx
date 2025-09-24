"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Settings, MapPin, Star } from "lucide-react"
import { Link } from "react-router-dom"

const Homes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Carwan Tours
              </h1>
              <Badge variant="secondary" className="ml-3">
                Tour Management System
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">Welcome to Carwan Tours</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
            Discover amazing tours and experiences across Japan. Manage your tour content with our comprehensive admin
            system.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Admin Dashboard Card */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-blue-900">Admin Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-6 text-lg">
                Manage your tours, create new posts, and handle all administrative tasks with our comprehensive
                dashboard.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create & Edit Tours
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Star className="h-4 w-4 mr-2" />
                  Manage Featured Content
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  Location & Category Management
                </div>
              </div>
              <Link to="/admin">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg font-semibold shadow-lg">
                  Access Admin Panel
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Blog/Tours Card */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-purple-900">Tour Catalog</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-6 text-lg">
                Browse our collection of amazing tours and experiences. View detailed information about each
                destination.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  Explore Destinations
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Star className="h-4 w-4 mr-2" />
                  Read Reviews & Ratings
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Detailed Tour Information
                </div>
              </div>
              <Link to="/tours">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 text-lg font-semibold shadow-lg">
                  Browse Tours
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">System Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Complete Content Management</h4>
              <p className="text-gray-600">
                Manage all tour fields including descriptions, pricing, policies, and multimedia content.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Review & Rating System</h4>
              <p className="text-gray-600">
                Built-in customer review system with ratings and detailed feedback management.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Location & Category Support</h4>
              <p className="text-gray-600">
                Organize tours by location, category, difficulty level, and other comprehensive filters.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Carwan Tours</h3>
            <p className="text-gray-400 mb-4">Your comprehensive tour management and booking system</p>
            <div className="flex justify-center space-x-6">
              <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
                Admin Panel
              </Link>
              <Link to="/tours" className="text-gray-400 hover:text-white transition-colors">
                Browse Tours
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Homes