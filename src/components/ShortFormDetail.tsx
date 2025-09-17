// src/pages/ShortFormDetail.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Star, Globe, CheckCircle2 } from "lucide-react";
import Footer from "@/components/layout/Footer";

const API_BASE = "http://localhost:5000";

type ShortForm = {
  _id?: string;
  title: string;
  price: string;
  duration: string;
  rating: number;
  reviews: number;
  image?: string;         // "uploads/abc.jpg" or full URL
  languages: string[];
  includes: string[];
  status?: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
};

const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id.trim());

const ShortFormDetail: React.FC = () => {
  const { id = "" } = useParams();
  const [data, setData] = useState<ShortForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const cleanedId = useMemo(() => decodeURIComponent(id).trim(), [id]);

  const imageUrl = useMemo(() => {
    if (!data?.image) return "";
    return data.image.startsWith("http")
      ? data.image
      : `${API_BASE}/${data.image.replace(/\\/g, "/")}`;
  }, [data]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!isValidObjectId(cleanedId)) {
          throw new Error("Invalid id format");
        }
        const res = await fetch(`${API_BASE}/api/short-forms/${cleanedId}`);
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
        }
        const json = (await res.json()) as ShortForm;
        if (!cancelled) setData(json);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [cleanedId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <Card className="overflow-hidden">
            <div className="w-full h-64 bg-gray-200 animate-pulse" />
            <CardContent className="p-6 space-y-3">
              <div className="h-7 bg-gray-200 rounded w-1/2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
            </CardContent>
          </Card>
        )}

        {/* Error */}
        {!loading && err && (
          <Card className="border-red-200">
            <CardContent className="p-6">
              <p className="text-red-600 font-medium mb-2">Error</p>
              <p className="text-gray-700">{err}</p>
              {!isValidObjectId(cleanedId) && (
                <p className="text-gray-500 mt-2">
                  Tip: URL me 24-hex MongoDB id honi chahiye, e.g.
                  <code className="ml-1 bg-gray-100 px-1 py-0.5 rounded">68ca581e08df99c69a3ab5f5</code>
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Content */}
        {!loading && !err && data && (
          <Card className="overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={data.title}
                className="w-full h-72 object-cover"
              />
            ) : (
              <div className="w-full h-72 bg-gray-200" />
            )}

            <CardHeader className="pb-0">
              <CardTitle className="text-2xl md:text-3xl">{data.title}</CardTitle>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-3">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {data.duration}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                  {data.rating} ({data.reviews})
                </div>
                <Badge variant="secondary">
                  {data.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-8">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">{data.price}</span>
                <span className="text-gray-500">per person</span>
              </div>

              {/* Languages */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Globe className="w-4 h-4 mr-2" /> Languages
                </h3>
                {data.languages?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {data.languages.map((l, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {l}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No languages listed.</p>
                )}
              </div>

              {/* Includes */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Included
                </h3>
                {data.includes?.length ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                    {data.includes.map((inc, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No inclusions listed.</p>
                )}
              </div>

              <div className="pt-2">
                <Button className="w-full sm:w-auto">Proceed to Booking</Button>
              </div>

              <div className="text-xs text-gray-500">
                <div>Created: {data.createdAt ? new Date(data.createdAt).toLocaleString() : "—"}</div>
                <div>Updated: {data.updatedAt ? new Date(data.updatedAt).toLocaleString() : "—"}</div>
                {data._id && <div>ID: {data._id}</div>}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ShortFormDetail;
