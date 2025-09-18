
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  LogOut, 
  BookOpen, 
  MapPin, 
  Star,
  Calendar,
  Eye,
  Save,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  createdAt: string;
  status: "published" | "draft" | "archived";
  views: number;
  featured: boolean;
  tags: string[];
  slug: string;
}

interface ShortForm {
  _id: string;
  title: string;
  price: string;
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  languages: string[];
  includes: string[];
  status: "active" | "inactive";
}

interface DetailForm {
  _id: string;
  name: string;
  nameJp: string;
  category: "mountain" | "urban" | "cultural" | "nature" | "temple" | "modern";
  prefecture: string;
  image: string;
  rating: number;         // 0-5
  reviews: number;        // >=0
  price: string;
  duration: string;
  description: string;
  highlights: string[];
  bestTime: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  languages: string[];
  nearbyAttractions: string[];
  dining: string[];
  accommodation: string[];
  tips: string[];
  rules: string[];
  explorationWays: string[];
  status: "active" | "inactive";
  createdAt?: string;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"blogs" | "short-forms" | "detail-forms">("blogs");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [shortForms, setShortForms] = useState<ShortForm[]>([]);
  const [detailForms, setDetailForms] = useState<DetailForm[]>([]);
  const [formData, setFormData] = useState<any>({});

  const API_BASE_URL = "https://karvaan-backend.vercel.app/api";

  const getAuthToken = () => localStorage.getItem("adminToken");
  const getAuthHeaders = () => ({ Authorization: `Bearer ${getAuthToken()}` });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");
    if (!token || !userData) {
      navigate("/admin/login");
      return;
    }
    setUser(JSON.parse(userData));
    loadAllData();
  }, [navigate]);

  const loadAllData = async () => {
    await Promise.all([loadBlogs(), loadShortForms(), loadDetailForms()]);
  };

  const loadBlogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs?status=all`);
      const data = await response.json();
      setBlogPosts(data.blogs || []);
    } catch (error) {
      console.error("Error loading blogs:", error);
      toast({ title: "Error", description: "Failed to load blogs", variant: "destructive" });
    }
  };

  const loadShortForms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/short-forms?status=all`);
      const data = await response.json();
      setShortForms(data.shortForms || []);
    } catch (error) {
      console.error("Error loading short forms:", error);
      toast({ title: "Error", description: "Failed to load short forms", variant: "destructive" });
    }
  };

  const loadDetailForms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/detail-forms?status=all`);
      const data = await response.json();
      setDetailForms(data.detailForms || []);
    } catch (error) {
      console.error("Error loading detail forms:", error);
      toast({ title: "Error", description: "Failed to load detail forms", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    navigate("/admin/login");
  };

  // ---------- helpers ----------
  const toNum = (v: any, d = 0) => {
    if (v === "" || v === undefined || v === null) return d;
    const n = Number(v);
    return Number.isFinite(n) ? n : d;
  };
  const toArr = (v: any) => {
    if (Array.isArray(v)) return v;
    if (typeof v === "string") {
      try {
        const p = JSON.parse(v);
        if (Array.isArray(p)) return p;
      } catch {}
      return v.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
  };

  // ---------- Create ----------
  const handleCreate = async () => {
    if (!validateForm(true)) return;
    setIsLoading(true);
    try {
      // sanitize strictly to match schema
      const clean: any = { ...formData };
      if (activeTab === "detail-forms") {
        clean.rating = toNum(clean.rating, 0);
        clean.reviews = toNum(clean.reviews, 0);
        clean.highlights = toArr(clean.highlights);
        clean.languages = toArr(clean.languages);
        clean.nearbyAttractions = toArr(clean.nearbyAttractions);
        clean.dining = toArr(clean.dining);
        clean.accommodation = toArr(clean.accommodation);
        clean.tips = toArr(clean.tips);
        clean.rules = toArr(clean.rules);
        clean.explorationWays = toArr(clean.explorationWays);
        clean.difficulty = clean.difficulty || "Easy";
      }

      const formDataObj = new FormData();
      Object.keys(clean).forEach((key) => {
        if (Array.isArray(clean[key])) {
          formDataObj.append(key, JSON.stringify(clean[key]));
        } else {
          formDataObj.append(key, clean[key] ?? "");
        }
      });

      // image REQUIRED by schema → must attach on create
      if (imageFile) {
        formDataObj.append("image", imageFile);
      }

      const endpoint = activeTab === "blogs" ? "blogs" : activeTab;
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: formDataObj,
      });

      if (!response.ok) throw new Error("Failed to create item");
      const newItem = await response.json();

      if (activeTab === "blogs") setBlogPosts((p) => [newItem, ...p]);
      else if (activeTab === "short-forms") setShortForms((p) => [newItem, ...p]);
      else if (activeTab === "detail-forms") setDetailForms((p) => [newItem, ...p]);

      resetForm();
      setIsCreateModalOpen(false);
      toast({ title: "Success", description: `${activeTab.replace("-", " ")} created successfully!` });
    } catch (error) {
      console.error("Error creating item:", error);
      toast({ title: "Error", description: `Failed to create ${activeTab.replace("-", " ")}`, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- Update ----------
  const handleUpdate = async () => {
    if (!editingItem || !validateForm(false)) return;
    setIsLoading(true);
    try {
      const clean: any = { ...formData };
      if (activeTab === "detail-forms") {
        clean.rating = toNum(clean.rating, 0);
        clean.reviews = toNum(clean.reviews, 0);
        clean.highlights = toArr(clean.highlights);
        clean.languages = toArr(clean.languages);
        clean.nearbyAttractions = toArr(clean.nearbyAttractions);
        clean.dining = toArr(clean.dining);
        clean.accommodation = toArr(clean.accommodation);
        clean.tips = toArr(clean.tips);
        clean.rules = toArr(clean.rules);
        clean.explorationWays = toArr(clean.explorationWays);
        clean.difficulty = clean.difficulty || "Easy";
      }

      const formDataObj = new FormData();
      Object.keys(clean).forEach((key) => {
        if (Array.isArray(clean[key])) {
          formDataObj.append(key, JSON.stringify(clean[key]));
        } else {
          formDataObj.append(key, clean[key] ?? "");
        }
      });
      if (imageFile) formDataObj.append("image", imageFile); // optional on edit

      const endpoint = activeTab === "blogs" ? "blogs" : activeTab;
      const response = await fetch(`${API_BASE_URL}/${endpoint}/${editingItem._id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: formDataObj,
      });

      if (!response.ok) throw new Error("Failed to update item");
      const updatedItem = await response.json();

      if (activeTab === "blogs") {
        setBlogPosts((p) => p.map((i) => (i._id === editingItem._id ? updatedItem : i)));
      } else if (activeTab === "short-forms") {
        setShortForms((p) => p.map((i) => (i._id === editingItem._id ? updatedItem : i)));
      } else if (activeTab === "detail-forms") {
        setDetailForms((p) => p.map((i) => (i._id === editingItem._id ? updatedItem : i)));
      }

      resetForm();
      setIsEditModalOpen(false);
      setEditingItem(null);
      toast({ title: "Success", description: `${activeTab.replace("-", " ")} updated successfully!` });
    } catch (error) {
      console.error("Error updating item:", error);
      toast({ title: "Error", description: `Failed to update ${activeTab.replace("-", " ")}`, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this ${activeTab.replace("-", " ")}?`)) return;
    try {
      const endpoint = activeTab === "blogs" ? "blogs" : activeTab;
      const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to delete item");

      if (activeTab === "blogs") setBlogPosts((p) => p.filter((i) => i._id !== id));
      else if (activeTab === "short-forms") setShortForms((p) => p.filter((i) => i._id !== id));
      else if (activeTab === "detail-forms") setDetailForms((p) => p.filter((i) => i._id !== id));

      toast({ title: "Success", description: `${activeTab.replace("-", " ")} deleted successfully!` });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({ title: "Error", description: `Failed to delete ${activeTab.replace("-", " ")}`, variant: "destructive" });
    }
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsEditModalOpen(true);
    setImageFile(null);
  };

  const resetForm = () => {
    setFormData({});
    setImageFile(null);
  };

  // create = true → image required; edit = false → image optional
  const validateForm = (isCreate: boolean) => {
    if (activeTab === "blogs") {
      if (!formData.title || !formData.content) {
        toast({ title: "Error", description: "Please fill in title and content", variant: "destructive" });
        return false;
      }
      return true;
    }

    if (activeTab === "short-forms") {
      if (!formData.title || !formData.price || !formData.duration) {
        toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
        return false;
      }
      return true;
    }

    if (activeTab === "detail-forms") {
      // match schema: required fields
      const requiredMsg = (m: string) => toast({ title: "Error", description: m, variant: "destructive" });

      if (!formData.name) return requiredMsg("Name is required"), false;
      if (!formData.nameJp) return requiredMsg("Japanese Name is required"), false;
      if (!formData.category) return requiredMsg("Category is required"), false;
      if (!formData.prefecture) return requiredMsg("Prefecture is required"), false;
      if (isCreate && !imageFile) return requiredMsg("Image is required (upload an image)"), false;
      if (!formData.price) return requiredMsg("Price is required"), false;
      if (!formData.duration) return requiredMsg("Duration is required"), false;
      if (!formData.description) return requiredMsg("Description is required"), false;
      if (!formData.bestTime) return requiredMsg("Best Time is required"), false;
      if (!formData.difficulty) return requiredMsg("Difficulty is required"), false;

      // rating/reviews numeric + bounds (schema)
      const r = toNum(formData.rating, 0);
      if (!(r >= 0 && r <= 5)) return requiredMsg("Rating must be between 0 and 5"), false;
      const rv = toNum(formData.reviews, 0);
      if (!(rv >= 0 && Number.isFinite(rv))) return requiredMsg("Reviews must be a non-negative number"), false;

      // arrays required by schema → at least 1 item each
      const mustHaveOne = [
        { key: "highlights", label: "Highlights" },
        { key: "languages", label: "Languages" },
        { key: "nearbyAttractions", label: "Nearby Attractions" },
        { key: "dining", label: "Dining Options" },
        { key: "accommodation", label: "Accommodation" },
        { key: "tips", label: "Tips" },
        { key: "rules", label: "Rules" },
        { key: "explorationWays", label: "Exploration Ways" },
      ];
      for (const { key, label } of mustHaveOne) {
        const arr = toArr(formData[key]);
        if (!arr.length) return requiredMsg(`${label} must have at least one item`), false;
      }
      return true;
    }

    return true;
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case "blogs":
        return blogPosts.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case "short-forms":
        return shortForms.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
      case "detail-forms":
        return detailForms.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      default:
        return [];
    }
  };

  const stats = {
    totalBlogs: blogPosts.length,
    totalShortForms: shortForms.length,
    totalDetailForms: detailForms.length,
    totalViews: blogPosts.reduce((sum, p) => sum + (p.views || 0), 0),
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const currentData = getCurrentData();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Carwan Tours
              </Link>
              <Badge variant="secondary" className="ml-3">
                Admin Panel
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Blogs</p>
                  <p className="text-2xl font-bold">{stats.totalBlogs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Short Forms</p>
                  <p className="text-2xl font-bold">{stats.totalShortForms}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Detail Forms</p>
                  <p className="text-2xl font-bold">{stats.totalDetailForms}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
          {[
            { key: "blogs", label: "Blogs", icon: BookOpen },
            { key: "short-forms", label: "Short Forms", icon: Star },
            { key: "detail-forms", label: "Detail Forms", icon: MapPin },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={activeTab === (key as any) ? "default" : "ghost"}
              onClick={() => setActiveTab(key as any)}
              className="flex-1"
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">
                {activeTab === "blogs" && "Blog Posts Management"}
                {activeTab === "short-forms" && "Short Forms Management"}
                {activeTab === "detail-forms" && "Detail Forms Management"}
              </CardTitle>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="hero"
                    onClick={() => {
                      resetForm();
                      if (activeTab === "detail-forms") {
                        // helpful defaults
                        setFormData({
                          status: "active",
                          rating: 0,
                          reviews: 0,
                          difficulty: "Easy",
                          highlights: [],
                          languages: [],
                          nearbyAttractions: [],
                          dining: [],
                          accommodation: [],
                          tips: [],
                          rules: [],
                          explorationWays: []
                        });
                      }
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New {activeTab.replace("-", " ")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New {activeTab.replace("-", " ")}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Common Image Upload */}
                    <div>
                      <Label>Image Upload {activeTab === "detail-forms" && <span className="text-red-500">*</span>}</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="mt-1"
                      />
                    </div>

                    {/* Blog Form */}
                    {activeTab === "blogs" && (
                      <>
                        <div>
                          <Label htmlFor="title">Title *</Label>
                          <Input
                            id="title"
                            value={formData.title || ""}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter blog post title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="content">Content *</Label>
                          <Textarea
                            id="content"
                            value={formData.content || ""}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Enter blog post content"
                            rows={6}
                          />
                        </div>
                        <div>
                          <Label htmlFor="tags">Tags (comma separated)</Label>
                          <Input
                            id="tags"
                            value={Array.isArray(formData.tags) ? formData.tags.join(", ") : ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                tags: e.target.value.split(",").map((tag) => tag.trim()),
                              })
                            }
                            placeholder="travel, japan, tourism"
                          />
                        </div>
                        <div>
                          <Label>Status</Label>
                          <div className="flex gap-4 mt-2">
                            {["draft", "published", "archived"].map((status) => (
                              <Button
                                key={status}
                                variant={formData.status === status ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFormData({ ...formData, status })}
                              >
                                {status}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Short Form */}
                    {activeTab === "short-forms" && (
                      <>
                        <div>
                          <Label htmlFor="title">Title *</Label>
                          <Input
                            id="title"
                            value={formData.title || ""}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter tour title"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price">Price *</Label>
                            <Input
                              id="price"
                              value={formData.price || ""}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                              placeholder="¥15,000"
                            />
                          </div>
                          <div>
                            <Label htmlFor="duration">Duration *</Label>
                            <Input
                              id="duration"
                              value={formData.duration || ""}
                              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                              placeholder="4 Hours"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="rating">Rating (0-5)</Label>
                            <Input
                              id="rating"
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              value={formData.rating ?? ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  rating: e.target.value === "" ? "" : parseFloat(e.target.value),
                                })
                              }
                              placeholder="4.5"
                            />
                          </div>
                          <div>
                            <Label htmlFor="reviews">Number of Reviews</Label>
                            <Input
                              id="reviews"
                              type="number"
                              min="0"
                              value={formData.reviews ?? ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  reviews: e.target.value === "" ? "" : parseInt(e.target.value),
                                })
                              }
                              placeholder="150"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="languages">Languages (comma separated)</Label>
                          <Input
                            id="languages"
                            value={Array.isArray(formData.languages) ? formData.languages.join(", ") : ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                languages: e.target.value.split(",").map((lang) => lang.trim()),
                              })
                            }
                            placeholder="English, Japanese, Urdu"
                          />
                        </div>
                        <div>
                          <Label htmlFor="includes">Includes (comma separated)</Label>
                          <Input
                            id="includes"
                            value={Array.isArray(formData.includes) ? formData.includes.join(", ") : ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                includes: e.target.value.split(",").map((item) => item.trim()),
                              })
                            }
                            placeholder="Private Guide, Transportation, Lunch"
                          />
                        </div>
                      </>
                    )}

                    {/* Detail Form — FULL schema */}
                    {activeTab === "detail-forms" && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Name *</Label>
                            <Input
                              id="name"
                              value={formData.name || ""}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Mount Fuji"
                            />
                          </div>
                          <div>
                            <Label htmlFor="nameJp">Japanese Name *</Label>
                            <Input
                              id="nameJp"
                              value={formData.nameJp || ""}
                              onChange={(e) => setFormData({ ...formData, nameJp: e.target.value })}
                              placeholder="富士山"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="category">Category *</Label>
                            <select
                              id="category"
                              value={formData.category || ""}
                              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              <option value="">Select Category</option>
                              <option value="mountain">Mountain</option>
                              <option value="urban">Urban</option>
                              <option value="cultural">Cultural</option>
                              <option value="nature">Nature</option>
                              <option value="temple">Temple</option>
                              <option value="modern">Modern</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="prefecture">Prefecture *</Label>
                            <Input
                              id="prefecture"
                              value={formData.prefecture || ""}
                              onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                              placeholder="Tokyo"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price">Price *</Label>
                            <Input
                              id="price"
                              value={formData.price || ""}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                              placeholder="¥5,000"
                            />
                          </div>
                          <div>
                            <Label htmlFor="duration">Duration *</Label>
                            <Input
                              id="duration"
                              value={formData.duration || ""}
                              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                              placeholder="2 Hours"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="description">Description *</Label>
                          <Textarea
                            id="description"
                            value={formData.description || ""}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter detailed description"
                            rows={4}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="bestTime">Best Time *</Label>
                            <Input
                              id="bestTime"
                              value={formData.bestTime || ""}
                              onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                              placeholder="Spring and Autumn"
                            />
                          </div>
                          <div>
                            <Label htmlFor="difficulty">Difficulty *</Label>
                            <select
                              id="difficulty"
                              value={formData.difficulty || ""}
                              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              <option value="">Select Difficulty</option>
                              <option value="Easy">Easy</option>
                              <option value="Moderate">Moderate</option>
                              <option value="Challenging">Challenging</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="rating">Rating (0–5) *</Label>
                            <Input
                              id="rating"
                              type="number"
                              min="0"
                              max="5"
                              step="0.1"
                              value={formData.rating ?? ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  rating: e.target.value === "" ? "" : parseFloat(e.target.value),
                                })
                              }
                              placeholder="4.5"
                            />
                          </div>
                          <div>
                            <Label htmlFor="reviews">Reviews (count) *</Label>
                            <Input
                              id="reviews"
                              type="number"
                              min="0"
                              step="1"
                              value={formData.reviews ?? ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  reviews: e.target.value === "" ? "" : parseInt(e.target.value),
                                })
                              }
                              placeholder="150"
                            />
                          </div>
                        </div>

                        {/* Array fields (all required by schema: at least 1 item) */}
                        {[
                          { key: "highlights", label: "Highlights" },
                          { key: "languages", label: "Languages" },
                          { key: "nearbyAttractions", label: "Nearby Attractions" },
                          { key: "dining", label: "Dining Options" },
                          { key: "accommodation", label: "Accommodation" },
                          { key: "tips", label: "Tips" },
                          { key: "rules", label: "Rules" },
                          { key: "explorationWays", label: "Exploration Ways" },
                        ].map(({ key, label }) => (
                          <div key={key}>
                            <Label htmlFor={key}>{label} (comma separated) *</Label>
                            <Textarea
                              id={key}
                              value={Array.isArray(formData[key]) ? formData[key].join(", ") : ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [key]: e.target.value.split(",").map((item) => item.trim()),
                                })
                              }
                              placeholder={`Enter ${label.toLowerCase()}`}
                              rows={2}
                            />
                          </div>
                        ))}
                      </>
                    )}

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleCreate} disabled={isLoading} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? "Creating..." : "Create"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsCreateModalOpen(false);
                          resetForm();
                        }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search ${activeTab.replace("-", " ")}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              {currentData.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No {activeTab.replace("-", " ")} found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : `Create your first ${activeTab.replace("-", " ")} to get started`}
                  </p>
                </div>
              ) : (
                currentData.map((item: any) => (
                  <Card key={item._id} className="border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">
                              {activeTab === "blogs" && item.title}
                              {activeTab === "short-forms" && item.title}
                              {activeTab === "detail-forms" && item.name}
                            </h3>
                            <Badge
                              variant={
                                (activeTab === "blogs" && item.status === "published") ||
                                (activeTab !== "blogs" && item.status === "active")
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {item.status}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {activeTab === "blogs" && item.content?.substring(0, 100)}
                            {activeTab === "short-forms" &&
                              `${item.price} • ${item.duration} • Rating: ${item.rating}`}
                            {activeTab === "detail-forms" &&
                              `${item.category} • ${item.prefecture} • ${item.description?.substring(0, 100)}`}
                            ...
                          </p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                            </div>
                            {activeTab === "blogs" && (
                              <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                {item.views || 0} views
                              </div>
                            )}
                            {(activeTab === "short-forms" || activeTab === "detail-forms") && (
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1" />
                                {(Number(item.rating) || 0)} ({Number(item.reviews) || 0} reviews)
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="outline" size="sm" onClick={() => openEditModal(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(item._id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit {activeTab.replace("-", " ")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Image optional on edit */}
              <div>
                <Label>Image Upload (Optional - leave empty to keep current image)</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="mt-1"
                />
              </div>

              {/* Blog Edit */}
              {activeTab === "blogs" && (
                <>
                  <div>
                    <Label htmlFor="edit-title">Title *</Label>
                    <Input
                      id="edit-title"
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter blog post title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-content">Content *</Label>
                    <Textarea
                      id="edit-content"
                      value={formData.content || ""}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Enter blog post content"
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                    <Input
                      id="edit-tags"
                      value={Array.isArray(formData.tags) ? formData.tags.join(", ") : ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tags: e.target.value.split(",").map((tag) => tag.trim()),
                        })
                      }
                      placeholder="travel, japan, tourism"
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="flex gap-4 mt-2">
                      {["draft", "published", "archived"].map((status) => (
                        <Button
                          key={status}
                          variant={formData.status === status ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormData({ ...formData, status })}
                        >
                          {status}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Short Form Edit */}
              {activeTab === "short-forms" && (
                <>
                  <div>
                    <Label htmlFor="edit-title">Title *</Label>
                    <Input
                      id="edit-title"
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter tour title"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-price">Price *</Label>
                      <Input
                        id="edit-price"
                        value={formData.price || ""}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="¥15,000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-duration">Duration *</Label>
                      <Input
                        id="edit-duration"
                        value={formData.duration || ""}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="4 Hours"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-rating">Rating (0-5)</Label>
                      <Input
                        id="edit-rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating ?? ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rating: e.target.value === "" ? "" : parseFloat(e.target.value),
                          })
                        }
                        placeholder="4.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-reviews">Number of Reviews</Label>
                      <Input
                        id="edit-reviews"
                        type="number"
                        min="0"
                        value={formData.reviews ?? ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reviews: e.target.value === "" ? "" : parseInt(e.target.value),
                          })
                        }
                        placeholder="150"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="edit-languages">Languages (comma separated)</Label>
                    <Input
                      id="edit-languages"
                      value={Array.isArray(formData.languages) ? formData.languages.join(", ") : ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          languages: e.target.value.split(",").map((lang) => lang.trim()),
                        })
                      }
                      placeholder="English, Japanese, Urdu"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-includes">Includes (comma separated)</Label>
                    <Input
                      id="edit-includes"
                      value={Array.isArray(formData.includes) ? formData.includes.join(", ") : ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          includes: e.target.value.split(",").map((item) => item.trim()),
                        })
                      }
                      placeholder="Private Guide, Transportation, Lunch"
                    />
                  </div>
                </>
              )}

              {/* Detail Form Edit — FULL schema */}
              {activeTab === "detail-forms" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-name">Name *</Label>
                      <Input
                        id="edit-name"
                        value={formData.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Mount Fuji"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-nameJp">Japanese Name *</Label>
                      <Input
                        id="edit-nameJp"
                        value={formData.nameJp || ""}
                        onChange={(e) => setFormData({ ...formData, nameJp: e.target.value })}
                        placeholder="富士山"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-category">Category *</Label>
                      <select
                        id="edit-category"
                        value={formData.category || ""}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Category</option>
                        <option value="mountain">Mountain</option>
                        <option value="urban">Urban</option>
                        <option value="cultural">Cultural</option>
                        <option value="nature">Nature</option>
                        <option value="temple">Temple</option>
                        <option value="modern">Modern</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="edit-prefecture">Prefecture *</Label>
                      <Input
                        id="edit-prefecture"
                        value={formData.prefecture || ""}
                        onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                        placeholder="Tokyo"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-price">Price *</Label>
                      <Input
                        id="edit-price"
                        value={formData.price || ""}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="¥5,000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-duration">Duration *</Label>
                      <Input
                        id="edit-duration"
                        value={formData.duration || ""}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="2 Hours"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="edit-description">Description *</Label>
                    <Textarea
                      id="edit-description"
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter detailed description"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-bestTime">Best Time *</Label>
                      <Input
                        id="edit-bestTime"
                        value={formData.bestTime || ""}
                        onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                        placeholder="Spring and Autumn"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-difficulty">Difficulty *</Label>
                      <select
                        id="edit-difficulty"
                        value={formData.difficulty || ""}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Challenging">Challenging</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-rating">Rating (0–5) *</Label>
                      <Input
                        id="edit-rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating ?? ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rating: e.target.value === "" ? "" : parseFloat(e.target.value),
                          })
                        }
                        placeholder="4.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-reviews">Reviews (count) *</Label>
                      <Input
                        id="edit-reviews"
                        type="number"
                        min="0"
                        step="1"
                        value={formData.reviews ?? ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reviews: e.target.value === "" ? "" : parseInt(e.target.value),
                          })
                        }
                        placeholder="150"
                      />
                    </div>
                  </div>

                  {[
                    { key: "highlights", label: "Highlights" },
                    { key: "languages", label: "Languages" },
                    { key: "nearbyAttractions", label: "Nearby Attractions" },
                    { key: "dining", label: "Dining Options" },
                    { key: "accommodation", label: "Accommodation" },
                    { key: "tips", label: "Tips" },
                    { key: "rules", label: "Rules" },
                    { key: "explorationWays", label: "Exploration Ways" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <Label htmlFor={`edit-${key}`}>{label} (comma separated) *</Label>
                      <Textarea
                        id={`edit-${key}`}
                        value={Array.isArray(formData[key]) ? formData[key].join(", ") : ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [key]: e.target.value.split(",").map((item) => item.trim()),
                          })
                        }
                        placeholder={`Enter ${label.toLowerCase()}`}
                        rows={2}
                      />
                    </div>
                  ))}
                </>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpdate} disabled={isLoading} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Updating..." : "Update"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
