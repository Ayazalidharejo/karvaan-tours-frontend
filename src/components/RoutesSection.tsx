import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Navigation, MapPin } from "lucide-react";

/**
 * RoutesSection.jsx
 * Paste into your project and import where needed.
 */
const STEPS = [
  { num: 1, label: "Pickup" },
  { num: 2, label: "Sightseeing" },
  { num: 3, label: "Main View" },
  { num: 4, label: "Return" },
];

const ROUTES = [
  {
    id: "tokyo",
    title: "Tokyo to Mount Fuji Day Trip",
    meta: "Duration: 10–12 hours | Distance: 120km",
    gradient: "from-blue-600 to-purple-600",
    stops: [
      { time: "06:00", location: "Tokyo (Shibuya/Shinjuku)", action: "Pickup from hotel", icon: "🚌" },
      { time: "08:30", location: "Lake Kawaguchi", action: "Photo stop & breakfast", icon: "📸" },
      { time: "10:00", location: "Mount Fuji 5th Station", action: "Main viewing point", icon: "🗻" },
      { time: "12:00", location: "Oshino Hakkai", action: "Traditional village visit", icon: "🏘️" },
      { time: "14:00", location: "Hakone", action: "Lunch & hot springs", icon: "🍜" },
      { time: "16:00", location: "Gotemba Outlets", action: "Shopping (optional)", icon: "🛍️" },
      { time: "18:00", location: "Return to Tokyo", action: "Drop-off at hotel", icon: "🏨" },
    ],
  },
  {
    id: "kyoto",
    title: "Kyoto Cultural Heritage Tour",
    meta: "Duration: 8–10 hours | Distance: 45km",
    gradient: "from-purple-600 to-pink-600",
    stops: [
      { time: "08:00", location: "Kyoto Station", action: "Meet your guide", icon: "🚅" },
      { time: "09:00", location: "Fushimi Inari Shrine", action: "Torii gates hiking", icon: "⛩️" },
      { time: "11:00", location: "Bamboo Grove", action: "Arashiyama bamboo walk", icon: "🎋" },
      { time: "13:00", location: "Traditional Restaurant", action: "Kaiseki lunch", icon: "🍱" },
      { time: "14:30", location: "Kiyomizu Temple", action: "Temple & city views", icon: "🏯" },
      { time: "16:00", location: "Gion District", action: "Geisha spotting", icon: "👘" },
      { time: "17:30", location: "Kyoto Station", action: "Tour completion", icon: "✅" },
    ],
  },
];

const RoutesSection = () => {
  return (
    <section id="routes" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">🗺️ TRAVEL ROUTES</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Travel Routes & Directions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our recommended routes with detailed stops and directions
          </p>
        </div>

        {/* Horizontal Step / Timeline (matches your image) */}
        <div className="mb-10">
          <div className="relative max-w-4xl mx-auto px-4">
            {/* background connector line */}
            <div className="absolute left-0 right-0 top-6 transform -translate-y-1/2">
              <div className="h-1 bg-gradient-to-r from-blue-200 via-pink-200 to-purple-200 rounded" />
            </div>

            <div className="relative z-10 flex justify-between items-center">
              {STEPS.map((s, i) => (
                <div key={s.num} className="flex flex-col items-center text-center w-1/4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                                  bg-gradient-to-r from-blue-500 to-purple-500 shadow-md">
                    {s.num}
                  </div>
                  <span className="mt-2 text-sm text-gray-600">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards with vertical timelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ROUTES.map((route) => (
            <Card key={route.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className={`text-white bg-gradient-to-r ${route.gradient}`}>
                <div className="flex items-center justify-between w-full">
                  <CardTitle className="flex items-center gap-3">
                    <Navigation className="w-5 h-5" />
                    <span className="text-lg font-semibold">{route.title}</span>
                  </CardTitle>
                  <span className="text-sm text-white/90">{route.meta}</span>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="relative pl-10">
                  {/* vertical line */}
                  <div className="absolute left-6 top-6 bottom-6 w-px bg-gray-200" aria-hidden />
                  <div className="space-y-6">
                    {route.stops.map((stop, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        {/* dot & icon */}
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm">
                            <span className="text-sm">{stop.icon}</span>
                          </div>
                        </div>

                        {/* content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <Badge variant="outline">{stop.time}</Badge>
                            <div className="font-semibold">{stop.location}</div>
                          </div>
                          <p className="text-sm text-gray-600">{stop.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600">
            <MapPin className="w-5 h-5 mr-2" />
            View All Routes & Book Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoutesSection;
