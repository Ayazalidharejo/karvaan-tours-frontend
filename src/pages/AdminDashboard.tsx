
// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { 
//   Plus, 
//   Edit, 
//   Trash2, 
//   Search, 
//   LogOut, 
//   BookOpen, 
//   MapPin, 
//   Star,
//   Calendar,
//   Eye,
//   Save,
//   X,
//   Upload
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface Post {
//   _id: string;
//   title: string;
//   content: string;
//   imageUrl?: string;
//   images?: string[];
//   author: string;
//   createdAt: string;
//   updatedAt: string;
//   status: "draft" | "published" | "archived" | "active" | "inactive";
//   views: number;
//   featured: boolean;
//   tags: string[];
//   slug: string;
//   category: string;
//   price: string;
//   duration: string;
//   prefecture?: string;
//   nameJp?: string;
//   about?: string;
//   details?: string;
//   description?: string;
//   fullDescription?: string;
//   highlights?: string[];
//   includes?: string[];
//   notSuitableFor?: string[];
//   rules?: string[];
//   guides?: string[];
//   explorationWays?: string[];
//   bestTime?: string;
//   difficulty?: "Easy" | "Moderate" | "Challenging";
//   meetingPoint?: string;
//   importantInformation?: string[];
//   nearbyAttractions?: string[];
//   dining?: string[];
//   accommodation?: string[];
//   tips?: string[];
//   languages?: string[];
//   freeCancellation?: {
//     available: boolean;
//     deadlineHours: number;
//     note: string;
//   };
//   reserveNowPayLater?: {
//     available: boolean;
//     note: string;
//   };
//   liveTourGuide?: {
//     available: boolean;
//     languages: string[];
//   };
//   rating?: {
//     average: number;
//     count: number;
//   };
//   reviews?: Array<{
//     name: string;
//     rating: number;
//     comment: string;
//     createdAt: string;
//   }>;
//   durationHours?: number;
// }

// const AdminDashboard = () => {
//   const [user, setUser] = useState<any>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState<Post | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [imageFiles, setImageFiles] = useState<FileList | null>(null);
//   const [singleImageFile, setSingleImageFile] = useState<File | null>(null);

//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [posts, setPosts] = useState<Post[]>([]);
//   const [formData, setFormData] = useState<any>({});
//   const [stats, setStats] = useState({
//     total: 0,
//     published: 0,
//     featured: 0,
//     draft: 0,
//     totalViews: 0
//   });

//   const API_BASE_URL = "http://localhost:5000/api";

//   const getAuthToken = () => localStorage.getItem("adminToken");
//   const getAuthHeaders = () => ({ 
//     Authorization: `Bearer ${getAuthToken()}`,
//     'Content-Type': 'application/json'
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     const userData = localStorage.getItem("adminUser");
//     if (!token || !userData) {
//       navigate("/admin/login");
//       return;
//     }
//     setUser(JSON.parse(userData));
//     loadAllData();
//   }, [navigate]);

//   const loadAllData = async () => {
//     await Promise.all([loadPosts(), loadStats()]);
//   };

//   // Check if we need different endpoints based on your backend structure
//   const checkBackendEndpoints = async () => {
//     try {
//       // Try posts endpoint first
//       const postsResponse = await fetch(`${API_BASE_URL}/posts`);
//       if (postsResponse.ok) {
//         console.log("Using /posts endpoint");
//         return "posts";
//       }
      
//       // Try blogs endpoint as fallback
//       const blogsResponse = await fetch(`${API_BASE_URL}/blogs`);
//       if (blogsResponse.ok) {
//         console.log("Using /blogs endpoint");
//         return "blogs";
//       }
      
//       throw new Error("No valid endpoint found");
//     } catch (error) {
//       console.error("Error checking endpoints:", error);
//       return "posts"; // default
//     }
//   };

//   const [activeEndpoint, setActiveEndpoint] = useState("posts");

//   useEffect(() => {
//     const initializeEndpoint = async () => {
//       const endpoint = await checkBackendEndpoints();
//       setActiveEndpoint(endpoint);
//     };
//     initializeEndpoint();
//   }, []);

//   const loadPosts = async () => {
//     try {
//       console.log("Loading posts from:", `${API_BASE_URL}/${activeEndpoint}`);
      
//       // Try different query parameters based on your backend
//       let url = `${API_BASE_URL}/${activeEndpoint}`;
//       const params = new URLSearchParams();
      
//       // Add query parameters that your backend supports
//       params.append('limit', '100');
      
//       // Check if your backend supports 'all' status or remove status filter
//       if (activeEndpoint === 'posts') {
//         // For posts endpoint, try different approaches
//         params.append('status', 'all');
//       }
      
//       const fullUrl = `${url}?${params.toString()}`;
//       console.log("Making request to:", fullUrl);
      
//       const response = await fetch(fullUrl);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log("Data received:", data);
      
//       // Handle different response structures
//       let postsArray = [];
//       if (data.posts) {
//         postsArray = data.posts;
//       } else if (data.blogs) {
//         postsArray = data.blogs;
//       } else if (Array.isArray(data)) {
//         postsArray = data;
//       }
      
//       setPosts(postsArray);
//     } catch (error) {
//       console.error("Error loading posts:", error);
//       toast({ 
//         title: "Error", 
//         description: `Failed to load posts: ${error.message}`, 
//         variant: "destructive" 
//       });
//     }
//   };

//   const loadStats = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/posts/stats/overview`, {
//         headers: {
//           Authorization: `Bearer ${getAuthToken()}`,
//         }
//       });
      
//       if (!response.ok) {
//         console.log("Stats endpoint not available, calculating manually");
//         return;
//       }
      
//       const data = await response.json();
//       setStats(data.overview || {});
//     } catch (error) {
//       console.error("Error loading stats:", error);
//       // Don't show error toast for stats, just continue without them
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("adminUser");
//     toast({ title: "Logged Out", description: "You have been successfully logged out." });
//     navigate("/admin/login");
//   };

//   // Helper functions
//   const toNum = (v: any, d = 0) => {
//     if (v === "" || v === undefined || v === null) return d;
//     const n = Number(v);
//     return Number.isFinite(n) ? n : d;
//   };

//   const toArr = (v: any) => {
//     if (Array.isArray(v)) return v;
//     if (typeof v === "string") {
//       if (v.trim() === "") return [];
//       try {
//         const p = JSON.parse(v);
//         if (Array.isArray(p)) return p;
//       } catch {}
//       return v.split(",").map((s) => s.trim()).filter(Boolean);
//     }
//     return [];
//   };

//   const toBool = (v: any, defaultValue = false) => {
//     if (typeof v === 'boolean') return v;
//     if (typeof v === 'string') {
//       const s = v.toLowerCase();
//       if (['true', '1', 'yes', 'y', 'on'].includes(s)) return true;
//       if (['false', '0', 'no', 'n', 'off'].includes(s)) return false;
//     }
//     return defaultValue;
//   };

//   // Create new post
//   const handleCreate = async () => {
//     if (!validateForm(true)) return;
//     setIsLoading(true);
//     try {
//       const formDataObj = new FormData();
      
//       // Add basic fields
//       Object.keys(formData).forEach((key) => {
//         if (formData[key] !== undefined && formData[key] !== null) {
//           if (Array.isArray(formData[key])) {
//             formDataObj.append(key, JSON.stringify(formData[key]));
//           } else if (typeof formData[key] === 'object') {
//             formDataObj.append(key, JSON.stringify(formData[key]));
//           } else {
//             formDataObj.append(key, formData[key].toString());
//           }
//         }
//       });

//       // Add single image if provided
//       if (singleImageFile) {
//         formDataObj.append("image", singleImageFile);
//       }

//       // Add multiple images if provided
//       if (imageFiles && imageFiles.length > 0) {
//         for (let i = 0; i < imageFiles.length; i++) {
//           formDataObj.append("images", imageFiles[i]);
//         }
//       }

//       const response = await fetch(`${API_BASE_URL}/${activeEndpoint}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${getAuthToken()}`,
//         },
//         body: formDataObj,
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
//       }

//       const newPost = await response.json();
//       setPosts((prev) => [newPost, ...prev]);
//       resetForm();
//       setIsCreateModalOpen(false);
//       toast({ title: "Success", description: "Post created successfully!" });
//       loadStats(); // Refresh stats
//     } catch (error) {
//       console.error("Error creating post:", error);
//       toast({ title: "Error", description: error.message || "Failed to create post", variant: "destructive" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Update existing post
//   const handleUpdate = async () => {
//     if (!editingItem || !validateForm(false)) return;
//     setIsLoading(true);
//     try {
//       const formDataObj = new FormData();
      
//       // Add basic fields
//       Object.keys(formData).forEach((key) => {
//         if (formData[key] !== undefined && formData[key] !== null) {
//           if (Array.isArray(formData[key])) {
//             formDataObj.append(key, JSON.stringify(formData[key]));
//           } else if (typeof formData[key] === 'object') {
//             formDataObj.append(key, JSON.stringify(formData[key]));
//           } else {
//             formDataObj.append(key, formData[key].toString());
//           }
//         }
//       });

//       // Add images if provided
//       if (singleImageFile) {
//         formDataObj.append("image", singleImageFile);
//       }
//       if (imageFiles && imageFiles.length > 0) {
//         for (let i = 0; i < imageFiles.length; i++) {
//           formDataObj.append("images", imageFiles[i]);
//         }
//       }

//       const response = await fetch(`${API_BASE_URL}/${activeEndpoint}/${editingItem._id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${getAuthToken()}`,
//         },
//         body: formDataObj,
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
//       }

//       const updatedPost = await response.json();
//       setPosts((prev) => prev.map((post) => (post._id === editingItem._id ? updatedPost : post)));
//       resetForm();
//       setIsEditModalOpen(false);
//       setEditingItem(null);
//       toast({ title: "Success", description: "Post updated successfully!" });
//     } catch (error) {
//       console.error("Error updating post:", error);
//       toast({ title: "Error", description: error.message || "Failed to update post", variant: "destructive" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this post?")) return;
//     try {
//       const response = await fetch(`${API_BASE_URL}/${activeEndpoint}/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${getAuthToken()}`,
//         },
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       setPosts((prev) => prev.filter((post) => post._id !== id));
//       toast({ title: "Success", description: "Post deleted successfully!" });
//       loadStats(); // Refresh stats
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       toast({ title: "Error", description: error.message || "Failed to delete post", variant: "destructive" });
//     }
//   };

//   const toggleFeatured = async (id: string) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/${activeEndpoint}/${id}/toggle-featured`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${getAuthToken()}`,
//         },
//       });
      
//       if (!response.ok) {
//         // If toggle-featured endpoint doesn't exist, try updating the post directly
//         const post = posts.find(p => p._id === id);
//         if (post) {
//           const updateResponse = await fetch(`${API_BASE_URL}/${activeEndpoint}/${id}`, {
//             method: "PUT",
//             headers: {
//               Authorization: `Bearer ${getAuthToken()}`,
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ featured: !post.featured }),
//           });
          
//           if (!updateResponse.ok) {
//             throw new Error("Failed to toggle featured status");
//           }
          
//           const updatedPost = await updateResponse.json();
//           setPosts((prev) => prev.map((p) => (p._id === id ? updatedPost : p)));
//           toast({ title: "Success", description: `Post ${updatedPost.featured ? 'featured' : 'unfeatured'} successfully!` });
//           return;
//         }
//         throw new Error("Failed to toggle featured status");
//       }
      
//       const { post } = await response.json();
//       setPosts((prev) => prev.map((p) => (p._id === id ? { ...p, featured: post.featured } : p)));
//       toast({ title: "Success", description: `Post ${post.featured ? 'featured' : 'unfeatured'} successfully!` });
//     } catch (error) {
//       console.error("Error toggling featured:", error);
//       toast({ title: "Error", description: error.message || "Failed to update featured status", variant: "destructive" });
//     }
//   };

//   const openEditModal = (post: Post) => {
//     setEditingItem(post);
//     setFormData({
//       ...post,
//       tags: post.tags || [],
//       highlights: post.highlights || [],
//       includes: post.includes || [],
//       notSuitableFor: post.notSuitableFor || [],
//       rules: post.rules || [],
//       guides: post.guides || [],
//       explorationWays: post.explorationWays || [],
//       importantInformation: post.importantInformation || [],
//       nearbyAttractions: post.nearbyAttractions || [],
//       dining: post.dining || [],
//       accommodation: post.accommodation || [],
//       tips: post.tips || [],
//       languages: post.languages || [],
//     });
//     setIsEditModalOpen(true);
//     setSingleImageFile(null);
//     setImageFiles(null);
//   };

//   const resetForm = () => {
//     setFormData({
//       status: "published",
//       featured: false,
//       difficulty: "Easy",
//       category: "tour",
//       freeCancellation: { available: true, deadlineHours: 24, note: "" },
//       reserveNowPayLater: { available: true, note: "" },
//       liveTourGuide: { available: true, languages: [] },
//       rating: { average: 0, count: 0 },
//       durationHours: 8
//     });
//     setSingleImageFile(null);
//     setImageFiles(null);
//   };

//   const validateForm = (isCreate: boolean) => {
//     const requiredFields = ["title", "content", "price", "duration", "category"];
    
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         toast({ 
//           title: "Error", 
//           description: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`, 
//           variant: "destructive" 
//         });
//         return false;
//       }
//     }

//     if (isCreate && !singleImageFile && (!imageFiles || imageFiles.length === 0)) {
//       toast({ 
//         title: "Error", 
//         description: "At least one image is required for new posts", 
//         variant: "destructive" 
//       });
//       return false;
//     }

//     return true;
//   };

//   const getFilteredPosts = () => {
//     return posts.filter((post) => {
//       const matchesSearch = 
//         post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
//       const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
//       const matchesStatus = statusFilter === "all" || post.status === statusFilter;
      
//       return matchesSearch && matchesCategory && matchesStatus;
//     });
//   };

//   const categories = ["tour", "mountain", "urban", "cultural", "nature", "temple", "modern", "adventure", "food", "accommodation", "blog"];
//   const statuses = ["published", "draft", "archived", "active", "inactive"];
//   const difficulties = ["Easy", "Moderate", "Challenging"];

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//           <p>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   const filteredPosts = getFilteredPosts();

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="bg-white border-b shadow-sm">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Carwan Tours
//               </Link>
//               <Badge variant="secondary" className="ml-3">
//                 Admin Panel
//               </Badge>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
//               <Button variant="outline" onClick={handleLogout}>
//                 <LogOut className="h-4 w-4 mr-2" />
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
//           <Card className="border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center">
//                 <BookOpen className="h-8 w-8 text-blue-500" />
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
//                   <p className="text-2xl font-bold">{stats.total || posts.length}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center">
//                 <Eye className="h-8 w-8 text-green-500" />
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-muted-foreground">Published</p>
//                   <p className="text-2xl font-bold">{stats.published || posts.filter(p => p.status === 'published').length}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center">
//                 <Star className="h-8 w-8 text-yellow-500" />
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-muted-foreground">Featured</p>
//                   <p className="text-2xl font-bold">{stats.featured || posts.filter(p => p.featured).length}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center">
//                 <Edit className="h-8 w-8 text-orange-500" />
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-muted-foreground">Draft</p>
//                   <p className="text-2xl font-bold">{stats.draft || posts.filter(p => p.status === 'draft').length}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center">
//                 <Eye className="h-8 w-8 text-purple-500" />
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-muted-foreground">Total Views</p>
//                   <p className="text-2xl font-bold">{(stats.totalViews || posts.reduce((sum, p) => sum + (p.views || 0), 0)).toLocaleString()}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Content Management */}
//         <Card className="border-0 shadow-lg">
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-2xl">Posts Management</CardTitle>
//               <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
//                 <DialogTrigger asChild>
//                   <Button
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//                     onClick={resetForm}
//                   >
//                     <Plus className="h-4 w-4 mr-2" />
//                     Create New Post
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//                   <DialogHeader>
//                     <DialogTitle>Create New Post</DialogTitle>
//                   </DialogHeader>
                  
//                   <div className="space-y-4">
//                     {/* Image Upload */}
//                     <div className="space-y-4">
//                       <div>
//                         <Label>Single Image Upload *</Label>
//                         <Input
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => setSingleImageFile(e.target.files?.[0] || null)}
//                           className="mt-1"
//                         />
//                       </div>
//                       <div>
//                         <Label>Multiple Images Upload (Optional)</Label>
//                         <Input
//                           type="file"
//                           accept="image/*"
//                           multiple
//                           onChange={(e) => setImageFiles(e.target.files)}
//                           className="mt-1"
//                         />
//                       </div>
//                     </div>

//                     {/* Basic Information */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="title">Title *</Label>
//                         <Input
//                           id="title"
//                           value={formData.title || ""}
//                           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                           placeholder="Enter post title"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="author">Author</Label>
//                         <Input
//                           id="author"
//                           value={formData.author || "Admin"}
//                           onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//                           placeholder="Author name"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <Label htmlFor="content">Content *</Label>
//                       <Textarea
//                         id="content"
//                         value={formData.content || ""}
//                         onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                         placeholder="Enter post content"
//                         rows={6}
//                       />
//                     </div>

//                     {/* Category and Status */}
//                     <div className="grid grid-cols-3 gap-4">
//                       <div>
//                         <Label htmlFor="category">Category *</Label>
//                         <select
//                           id="category"
//                           value={formData.category || ""}
//                           onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                         >
//                           <option value="">Select Category</option>
//                           {categories.map((cat) => (
//                             <option key={cat} value={cat}>{cat}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <Label htmlFor="status">Status</Label>
//                         <select
//                           id="status"
//                           value={formData.status || "published"}
//                           onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                         >
//                           {statuses.map((status) => (
//                             <option key={status} value={status}>{status}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <Label htmlFor="difficulty">Difficulty</Label>
//                         <select
//                           id="difficulty"
//                           value={formData.difficulty || "Easy"}
//                           onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                         >
//                           {difficulties.map((diff) => (
//                             <option key={diff} value={diff}>{diff}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* Price and Duration */}
//                     <div className="grid grid-cols-3 gap-4">
//                       <div>
//                         <Label htmlFor="price">Price *</Label>
//                         <Input
//                           id="price"
//                           value={formData.price || ""}
//                           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                           placeholder="¥15,000"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="duration">Duration *</Label>
//                         <Input
//                           id="duration"
//                           value={formData.duration || ""}
//                           onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//                           placeholder="4 Hours"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="durationHours">Duration Hours</Label>
//                         <Input
//                           id="durationHours"
//                           type="number"
//                           min="1"
//                           value={formData.durationHours || 8}
//                           onChange={(e) => setFormData({ ...formData, durationHours: parseInt(e.target.value) || 8 })}
//                         />
//                       </div>
//                     </div>

//                     {/* Location Info */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="prefecture">Prefecture</Label>
//                         <Input
//                           id="prefecture"
//                           value={formData.prefecture || ""}
//                           onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
//                           placeholder="Tokyo"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="nameJp">Japanese Name</Label>
//                         <Input
//                           id="nameJp"
//                           value={formData.nameJp || ""}
//                           onChange={(e) => setFormData({ ...formData, nameJp: e.target.value })}
//                           placeholder="日本語名"
//                         />
//                       </div>
//                     </div>

//                     {/* Descriptions */}
//                     <div>
//                       <Label htmlFor="description">Description</Label>
//                       <Textarea
//                         id="description"
//                         value={formData.description || ""}
//                         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                         placeholder="Short description"
//                         rows={2}
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="fullDescription">Full Description</Label>
//                       <Textarea
//                         id="fullDescription"
//                         value={formData.fullDescription || ""}
//                         onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
//                         placeholder="Detailed description"
//                         rows={3}
//                       />
//                     </div>

//                     {/* Array Fields */}
//                     {[
//                       { key: "tags", label: "Tags" },
//                       { key: "highlights", label: "Highlights" },
//                       { key: "includes", label: "Includes" },
//                       { key: "languages", label: "Languages" },
//                       { key: "nearbyAttractions", label: "Nearby Attractions" },
//                     ].map(({ key, label }) => (
//                       <div key={key}>
//                         <Label htmlFor={key}>{label} (comma separated)</Label>
//                         <Input
//                           id={key}
//                           value={Array.isArray(formData[key]) ? formData[key].join(", ") : ""}
//                           onChange={(e) =>
//                             setFormData({
//                               ...formData,
//                               [key]: toArr(e.target.value),
//                             })
//                           }
//                           placeholder={`Enter ${label.toLowerCase()}`}
//                         />
//                       </div>
//                     ))}

//                     {/* Additional Fields */}
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="bestTime">Best Time to Visit</Label>
//                         <Input
//                           id="bestTime"
//                           value={formData.bestTime || ""}
//                           onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
//                           placeholder="Spring and Autumn"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="meetingPoint">Meeting Point</Label>
//                         <Input
//                           id="meetingPoint"
//                           value={formData.meetingPoint || ""}
//                           onChange={(e) => setFormData({ ...formData, meetingPoint: e.target.value })}
//                           placeholder="Meeting location"
//                         />
//                       </div>
//                     </div>

//                     {/* Toggle Options */}
//                     <div className="flex items-center space-x-6">
//                       <label className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={toBool(formData.featured, false)}
//                           onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
//                         />
//                         <span>Featured Post</span>
//                       </label>
//                     </div>

//                     <div className="flex gap-2 pt-4">
//                       <Button onClick={handleCreate} disabled={isLoading} className="flex-1">
//                         <Save className="h-4 w-4 mr-2" />
//                         {isLoading ? "Creating..." : "Create Post"}
//                       </Button>
//                       <Button
//                         variant="outline"
//                         onClick={() => {
//                           setIsCreateModalOpen(false);
//                           resetForm();
//                         }}
//                       >
//                         <X className="h-4 w-4 mr-2" />
//                         Cancel
//                       </Button>
//                     </div>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </CardHeader>

//           <CardContent>
//             {/* Filters */}
//             <div className="mb-6 space-y-4">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Search posts..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//                 <div className="flex gap-2">
//                   <select
//                     value={categoryFilter}
//                     onChange={(e) => setCategoryFilter(e.target.value)}
//                     className="px-3 py-2 border border-gray-300 rounded-md"
//                   >
//                     <option value="all">All Categories</option>
//                     {categories.map((cat) => (
//                       <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                   </select>
//                   <select
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                     className="px-3 py-2 border border-gray-300 rounded-md"
//                   >
//                     <option value="all">All Status</option>
//                     {statuses.map((status) => (
//                       <option key={status} value={status}>{status}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Posts List */}
//             <div className="space-y-4">
//               {filteredPosts.length === 0 ? (
//                 <div className="text-center py-12">
//                   <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                   <h3 className="text-lg font-semibold mb-2">No posts found</h3>
//                   <p className="text-muted-foreground">
//                     {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
//                       ? "Try adjusting your search terms or filters"
//                       : "Create your first post to get started"}
//                   </p>
//                 </div>
//               ) : (
//                 filteredPosts.map((post) => (
//                   <Card key={post._id} className="border hover:shadow-md transition-shadow">
//                     <CardContent className="p-6">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-2">
//                             <h3 className="text-lg font-semibold">{post.title}</h3>
//                             <Badge
//                               variant={
//                                 post.status === "published" || post.status === "active"
//                                   ? "default"
//                                   : "secondary"
//                               }
//                             >
//                               {post.status}
//                             </Badge>
//                             {post.featured && (
//                               <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
//                                 <Star className="h-3 w-3 mr-1" />
//                                 Featured
//                               </Badge>
//                             )}
//                           </div>

//                           <p className="text-muted-foreground mb-3 line-clamp-2">
//                             {post.content?.substring(0, 150)}...
//                           </p>

//                           <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
//                             <div className="flex items-center">
//                               <Calendar className="h-4 w-4 mr-1" />
//                               {new Date(post.createdAt).toLocaleDateString()}
//                             </div>
//                             <div className="flex items-center">
//                               <Eye className="h-4 w-4 mr-1" />
//                               {post.views || 0} views
//                             </div>
//                             <div className="flex items-center">
//                               <MapPin className="h-4 w-4 mr-1" />
//                               {post.category}
//                             </div>
//                             {post.price && (
//                               <div className="flex items-center">
//                                 <span className="font-medium">{post.price}</span>
//                               </div>
//                             )}
//                           </div>

//                           {post.tags && post.tags.length > 0 && (
//                             <div className="flex flex-wrap gap-1">
//                               {post.tags.slice(0, 3).map((tag, index) => (
//                                 <Badge key={index} variant="outline" className="text-xs">
//                                   {tag}
//                                 </Badge>
//                               ))}
//                               {post.tags.length > 3 && (
//                                 <Badge variant="outline" className="text-xs">
//                                   +{post.tags.length - 3} more
//                                 </Badge>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         <div className="flex items-center gap-2 ml-4">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => toggleFeatured(post._id)}
//                             className={post.featured ? "bg-yellow-50 border-yellow-200" : ""}
//                           >
//                             <Star className={`h-4 w-4 ${post.featured ? "fill-yellow-400 text-yellow-400" : ""}`} />
//                           </Button>
//                           <Button variant="outline" size="sm" onClick={() => openEditModal(post)}>
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                           <Button variant="outline" size="sm" onClick={() => handleDelete(post._id)}>
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Edit Modal */}
//         <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//           <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>Edit Post</DialogTitle>
//             </DialogHeader>
            
//             <div className="space-y-4">
//               {/* Image Upload */}
//               <div className="space-y-4">
//                 <div>
//                   <Label>Single Image Upload (Optional - leave empty to keep current image)</Label>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setSingleImageFile(e.target.files?.[0] || null)}
//                     className="mt-1"
//                   />
//                 </div>
//                 <div>
//                   <Label>Multiple Images Upload (Optional)</Label>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     onChange={(e) => setImageFiles(e.target.files)}
//                     className="mt-1"
//                   />
//                 </div>
//               </div>

//               {/* Basic Information */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="edit-title">Title *</Label>
//                   <Input
//                     id="edit-title"
//                     value={formData.title || ""}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     placeholder="Enter post title"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="edit-author">Author</Label>
//                   <Input
//                     id="edit-author"
//                     value={formData.author || "Admin"}
//                     onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//                     placeholder="Author name"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="edit-content">Content *</Label>
//                 <Textarea
//                   id="edit-content"
//                   value={formData.content || ""}
//                   onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                   placeholder="Enter post content"
//                   rows={6}
//                 />
//               </div>

//               {/* Category and Status */}
//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <Label htmlFor="edit-category">Category *</Label>
//                   <select
//                     id="edit-category"
//                     value={formData.category || ""}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => (
//                       <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <Label htmlFor="edit-status">Status</Label>
//                   <select
//                     id="edit-status"
//                     value={formData.status || "published"}
//                     onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   >
//                     {statuses.map((status) => (
//                       <option key={status} value={status}>{status}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <Label htmlFor="edit-difficulty">Difficulty</Label>
//                   <select
//                     id="edit-difficulty"
//                     value={formData.difficulty || "Easy"}
//                     onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   >
//                     {difficulties.map((diff) => (
//                       <option key={diff} value={diff}>{diff}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Price and Duration */}
//               <div className="grid grid-cols-3 gap-4">
//                 <div>
//                   <Label htmlFor="edit-price">Price *</Label>
//                   <Input
//                     id="edit-price"
//                     value={formData.price || ""}
//                     onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                     placeholder="¥15,000"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="edit-duration">Duration *</Label>
//                   <Input
//                     id="edit-duration"
//                     value={formData.duration || ""}
//                     onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//                     placeholder="4 Hours"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="edit-durationHours">Duration Hours</Label>
//                   <Input
//                     id="edit-durationHours"
//                     type="number"
//                     min="1"
//                     value={formData.durationHours || 8}
//                     onChange={(e) => setFormData({ ...formData, durationHours: parseInt(e.target.value) || 8 })}
//                   />
//                 </div>
//               </div>

//               {/* Location Info */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="edit-prefecture">Prefecture</Label>
//                   <Input
//                     id="edit-prefecture"
//                     value={formData.prefecture || ""}
//                     onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
//                     placeholder="Tokyo"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="edit-nameJp">Japanese Name</Label>
//                   <Input
//                     id="edit-nameJp"
//                     value={formData.nameJp || ""}
//                     onChange={(e) => setFormData({ ...formData, nameJp: e.target.value })}
//                     placeholder="日本語名"
//                   />
//                 </div>
//               </div>

//               {/* Descriptions */}
//               <div>
//                 <Label htmlFor="edit-description">Description</Label>
//                 <Textarea
//                   id="edit-description"
//                   value={formData.description || ""}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   placeholder="Short description"
//                   rows={2}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="edit-fullDescription">Full Description</Label>
//                 <Textarea
//                   id="edit-fullDescription"
//                   value={formData.fullDescription || ""}
//                   onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
//                   placeholder="Detailed description"
//                   rows={3}
//                 />
//               </div>

//               {/* Array Fields */}
//               {[
//                 { key: "tags", label: "Tags" },
//                 { key: "highlights", label: "Highlights" },
//                 { key: "includes", label: "Includes" },
//                 { key: "languages", label: "Languages" },
//                 { key: "nearbyAttractions", label: "Nearby Attractions" },
//               ].map(({ key, label }) => (
//                 <div key={key}>
//                   <Label htmlFor={`edit-${key}`}>{label} (comma separated)</Label>
//                   <Input
//                     id={`edit-${key}`}
//                     value={Array.isArray(formData[key]) ? formData[key].join(", ") : ""}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         [key]: toArr(e.target.value),
//                       })
//                     }
//                     placeholder={`Enter ${label.toLowerCase()}`}
//                   />
//                 </div>
//               ))}

//               {/* Additional Fields */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="edit-bestTime">Best Time to Visit</Label>
//                   <Input
//                     id="edit-bestTime"
//                     value={formData.bestTime || ""}
//                     onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
//                     placeholder="Spring and Autumn"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="edit-meetingPoint">Meeting Point</Label>
//                   <Input
//                     id="edit-meetingPoint"
//                     value={formData.meetingPoint || ""}
//                     onChange={(e) => setFormData({ ...formData, meetingPoint: e.target.value })}
//                     placeholder="Meeting location"
//                   />
//                 </div>
//               </div>

//               {/* Toggle Options */}
//               <div className="flex items-center space-x-6">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     checked={toBool(formData.featured, false)}
//                     onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
//                   />
//                   <span>Featured Post</span>
//                 </label>
//               </div>

//               <div className="flex gap-2 pt-4">
//                 <Button onClick={handleUpdate} disabled={isLoading} className="flex-1">
//                   <Save className="h-4 w-4 mr-2" />
//                   {isLoading ? "Updating..." : "Update Post"}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     setIsEditModalOpen(false);
//                     setEditingItem(null);
//                     resetForm();
//                   }}
//                 >
//                   <X className="h-4 w-4 mr-2" />
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search, LogOut, BookOpen, MapPin, Star, Calendar, Eye, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Post {
  _id: string
  title: string
  content: string
  imageUrl?: string
  images?: string[]
  author: string
  createdAt: string
  updatedAt: string
  status: "draft" | "published" | "archived" | "active" | "inactive"
  views: number
  featured: boolean
  tags: string[]
  slug: string
  category: string
  price: string
  duration: string
  prefecture?: string
  nameJp?: string
  about?: string
  details?: string
  description?: string
  fullDescription?: string
  highlights?: string[]
  includes?: string[]
  notSuitableFor?: string[]
  rules?: string[]
  guides?: string[]
  explorationWays?: string[]
  bestTime?: string
  difficulty?: "Easy" | "Moderate" | "Challenging"
  meetingPoint?: string
  importantInformation?: string[]
  nearbyAttractions?: string[]
  dining?: string[]
  accommodation?: string[]
  tips?: string[]
  languages?: string[]
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
  rating?: {
    average: number
    count: number
  }
  reviews?: Array<{
    name: string
    rating: number
    comment: string
    createdAt: string
  }>
  durationHours?: number
}

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [imageFiles, setImageFiles] = useState<FileList | null>(null)
  const [singleImageFile, setSingleImageFile] = useState<File | null>(null)

  const navigate = useNavigate()
  const { toast } = useToast()

  const [posts, setPosts] = useState<Post[]>([])
  const [formData, setFormData] = useState<any>({})
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    featured: 0,
    draft: 0,
    totalViews: 0,
  })

  const API_BASE_URL = "http://localhost:5000/api"

  const getAuthToken = () => localStorage.getItem("adminToken")
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${getAuthToken()}`,
    "Content-Type": "application/json",
  })

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    const userData = localStorage.getItem("adminUser")
    if (!token || !userData) {
      navigate("/admin/login")
      return
    }
    setUser(JSON.parse(userData))
    loadAllData()
  }, [navigate])

  const loadAllData = async () => {
    await Promise.all([loadPosts(), loadStats()])
  }

  // Check if we need different endpoints based on your backend structure
  const checkBackendEndpoints = async () => {
    try {
      // Try posts endpoint first
      const postsResponse = await fetch(`${API_BASE_URL}/posts`)
      if (postsResponse.ok) {
        console.log("Using /posts endpoint")
        return "posts"
      }

      // Try blogs endpoint as fallback
      const blogsResponse = await fetch(`${API_BASE_URL}/blogs`)
      if (blogsResponse.ok) {
        console.log("Using /blogs endpoint")
        return "blogs"
      }

      throw new Error("No valid endpoint found")
    } catch (error) {
      console.error("Error checking endpoints:", error)
      return "posts" // default
    }
  }

  const [activeEndpoint, setActiveEndpoint] = useState("posts")

  useEffect(() => {
    const initializeEndpoint = async () => {
      const endpoint = await checkBackendEndpoints()
      setActiveEndpoint(endpoint)
    }
    initializeEndpoint()
  }, [])

  const loadPosts = async () => {
    try {
      console.log("Loading posts from:", `${API_BASE_URL}/${activeEndpoint}`)

      // Try different query parameters based on your backend
      const url = `${API_BASE_URL}/${activeEndpoint}`
      const params = new URLSearchParams()

      // Add query parameters that your backend supports
      params.append("limit", "100")

      // Check if your backend supports 'all' status or remove status filter
      if (activeEndpoint === "posts") {
        // For posts endpoint, try different approaches
        params.append("status", "all")
      }

      const fullUrl = `${url}?${params.toString()}`
      console.log("Making request to:", fullUrl)

      const response = await fetch(fullUrl)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Data received:", data)

      // Handle different response structures
      let postsArray = []
      if (data.posts) {
        postsArray = data.posts
      } else if (data.blogs) {
        postsArray = data.blogs
      } else if (Array.isArray(data)) {
        postsArray = data
      }

      setPosts(postsArray)
    } catch (error) {
      console.error("Error loading posts:", error)
      toast({
        title: "Error",
        description: `Failed to load posts: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  const loadStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/stats/overview`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })

      if (!response.ok) {
        console.log("Stats endpoint not available, calculating manually")
        return
      }

      const data = await response.json()
      setStats(data.overview || {})
    } catch (error) {
      console.error("Error loading stats:", error)
      // Don't show error toast for stats, just continue without them
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    toast({ title: "Logged Out", description: "You have been successfully logged out." })
    navigate("/admin/login")
  }

  // Helper functions
  const toNum = (v: any, d = 0) => {
    if (v === "" || v === undefined || v === null) return d
    const n = Number(v)
    return Number.isFinite(n) ? n : d
  }

  const toArr = (v: any) => {
    if (Array.isArray(v)) return v
    if (typeof v === "string") {
      if (v.trim() === "") return []
      try {
        const p = JSON.parse(v)
        if (Array.isArray(p)) return p
      } catch {}
      return v
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    }
    return []
  }

  const toBool = (v: any, defaultValue = false) => {
    if (typeof v === "boolean") return v
    if (typeof v === "string") {
      const s = v.toLowerCase()
      if (["true", "1", "yes", "y", "on"].includes(s)) return true
      if (["false", "0", "no", "n", "off"].includes(s)) return false
    }
    return defaultValue
  }

  // Create new post
  const handleCreate = async () => {
    if (!validateForm(true)) return
    setIsLoading(true)
    try {
      const formDataObj = new FormData()

      // Add basic fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== undefined && formData[key] !== null) {
          if (Array.isArray(formData[key])) {
            formDataObj.append(key, JSON.stringify(formData[key]))
          } else if (typeof formData[key] === "object") {
            formDataObj.append(key, JSON.stringify(formData[key]))
          } else {
            formDataObj.append(key, formData[key].toString())
          }
        }
      })

      // Add single image if provided
      if (singleImageFile) {
        formDataObj.append("image", singleImageFile)
      }

      // Add multiple images if provided
      if (imageFiles && imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
          formDataObj.append("images", imageFiles[i])
        }
      }

      const response = await fetch(`${API_BASE_URL}/${activeEndpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: formDataObj,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
      }

      const newPost = await response.json()
      setPosts((prev) => [newPost, ...prev])
      resetForm()
      setIsCreateModalOpen(false)
      toast({ title: "Success", description: "Post created successfully!" })
      loadStats() // Refresh stats
    } catch (error) {
      console.error("Error creating post:", error)
      toast({ title: "Error", description: error.message || "Failed to create post", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  // Update existing post
  const handleUpdate = async () => {
    if (!editingItem || !validateForm(false)) return
    setIsLoading(true)
    try {
      const formDataObj = new FormData()

      // Add basic fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== undefined && formData[key] !== null) {
          if (Array.isArray(formData[key])) {
            formDataObj.append(key, JSON.stringify(formData[key]))
          } else if (typeof formData[key] === "object") {
            formDataObj.append(key, JSON.stringify(formData[key]))
          } else {
            formDataObj.append(key, formData[key].toString())
          }
        }
      })

      // Add images if provided
      if (singleImageFile) {
        formDataObj.append("image", singleImageFile)
      }
      if (imageFiles && imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
          formDataObj.append("images", imageFiles[i])
        }
      }

      const response = await fetch(`${API_BASE_URL}/${activeEndpoint}/${editingItem._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: formDataObj,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
      }

      const updatedPost = await response.json()
      setPosts((prev) => prev.map((post) => (post._id === editingItem._id ? updatedPost : post)))
      resetForm()
      setIsEditModalOpen(false)
      setEditingItem(null)
      toast({ title: "Success", description: "Post updated successfully!" })
    } catch (error) {
      console.error("Error updating post:", error)
      toast({ title: "Error", description: error.message || "Failed to update post", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return
    try {
      const response = await fetch(`${API_BASE_URL}/${activeEndpoint}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
      }

      setPosts((prev) => prev.filter((post) => post._id !== id))
      toast({ title: "Success", description: "Post deleted successfully!" })
      loadStats() // Refresh stats
    } catch (error) {
      console.error("Error deleting post:", error)
      toast({ title: "Error", description: error.message || "Failed to delete post", variant: "destructive" })
    }
  }

  const toggleFeatured = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${activeEndpoint}/${id}/toggle-featured`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })

      if (!response.ok) {
        // If toggle-featured endpoint doesn't exist, try updating the post directly
        const post = posts.find((p) => p._id === id)
        if (post) {
          const updateResponse = await fetch(`${API_BASE_URL}/${activeEndpoint}/${id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ featured: !post.featured }),
          })

          if (!updateResponse.ok) {
            throw new Error("Failed to toggle featured status")
          }

          const updatedPost = await updateResponse.json()
          setPosts((prev) => prev.map((p) => (p._id === id ? updatedPost : p)))
          toast({
            title: "Success",
            description: `Post ${updatedPost.featured ? "featured" : "unfeatured"} successfully!`,
          })
          return
        }
        throw new Error("Failed to toggle featured status")
      }

      const { post } = await response.json()
      setPosts((prev) => prev.map((p) => (p._id === id ? { ...p, featured: post.featured } : p)))
      toast({ title: "Success", description: `Post ${post.featured ? "featured" : "unfeatured"} successfully!` })
    } catch (error) {
      console.error("Error toggling featured:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update featured status",
        variant: "destructive",
      })
    }
  }

  const openEditModal = (post: Post) => {
    setEditingItem(post)
    setFormData({
      ...post,
      tags: post.tags || [],
      highlights: post.highlights || [],
      includes: post.includes || [],
      notSuitableFor: post.notSuitableFor || [],
      rules: post.rules || [],
      guides: post.guides || [],
      explorationWays: post.explorationWays || [],
      importantInformation: post.importantInformation || [],
      nearbyAttractions: post.nearbyAttractions || [],
      dining: post.dining || [],
      accommodation: post.accommodation || [],
      tips: post.tips || [],
      languages: post.languages || [],
      freeCancellation: post.freeCancellation || { available: true, deadlineHours: 24, note: "" },
      reserveNowPayLater: post.reserveNowPayLater || { available: true, note: "" },
      liveTourGuide: post.liveTourGuide || { available: true, languages: [] },
      rating: post.rating || { average: 0, count: 0 },
    })
    setIsEditModalOpen(true)
    setSingleImageFile(null)
    setImageFiles(null)
  }

  const resetForm = () => {
    setFormData({
      status: "published",
      featured: false,
      difficulty: "Easy",
      category: "tour",
      freeCancellation: { available: true, deadlineHours: 24, note: "" },
      reserveNowPayLater: { available: true, note: "" },
      liveTourGuide: { available: true, languages: [] },
      rating: { average: 0, count: 0 },
      durationHours: 8,
    })
    setSingleImageFile(null)
    setImageFiles(null)
  }

  const validateForm = (isCreate: boolean) => {
    const requiredFields = ["title", "content", "price", "duration", "category"]

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast({
          title: "Error",
          description: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
          variant: "destructive",
        })
        return false
      }
    }

    if (isCreate && !singleImageFile && (!imageFiles || imageFiles.length === 0)) {
      toast({
        title: "Error",
        description: "At least one image is required for new posts",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const getFilteredPosts = () => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())))

      const matchesCategory = categoryFilter === "all" || post.category === categoryFilter
      const matchesStatus = statusFilter === "all" || post.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }

  const categories = [
    "tour",
    "mountain",
    "urban",
    "cultural",
    "nature",
    "temple",
    "modern",
    "adventure",
    "food",
    "accommodation",
    "blog",
  ]
  const statuses = ["published", "draft", "archived", "active", "inactive"]
  const difficulties = ["Easy", "Moderate", "Challenging"]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const filteredPosts = getFilteredPosts()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold">{stats.total || posts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold">
                    {stats.published || posts.filter((p) => p.status === "published").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Featured</p>
                  <p className="text-2xl font-bold">{stats.featured || posts.filter((p) => p.featured).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Edit className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Draft</p>
                  <p className="text-2xl font-bold">
                    {stats.draft || posts.filter((p) => p.status === "draft").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">
                    {(stats.totalViews || posts.reduce((sum, p) => sum + (p.views || 0), 0)).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Management */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Posts Management</CardTitle>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={resetForm}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    {/* Image Upload */}
                    <div className="space-y-4">
                      <div>
                        <Label>Single Image Upload *</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setSingleImageFile(e.target.files?.[0] || null)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Multiple Images Upload (Optional)</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => setImageFiles(e.target.files)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={formData.title || ""}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Enter post title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          value={formData.author || "Admin"}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          placeholder="Author name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        value={formData.content || ""}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Enter post content"
                        rows={6}
                      />
                    </div>

                    {/* Category and Status */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <select
                          id="category"
                          value={formData.category || ""}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <select
                          id="status"
                          value={formData.status || "published"}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <select
                          id="difficulty"
                          value={formData.difficulty || "Easy"}
                          onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          {difficulties.map((diff) => (
                            <option key={diff} value={diff}>
                              {diff}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Price and Duration */}
                    <div className="grid grid-cols-3 gap-4">
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
                      <div>
                        <Label htmlFor="durationHours">Duration Hours</Label>
                        <Input
                          id="durationHours"
                          type="number"
                          min="1"
                          value={formData.durationHours || 8}
                          onChange={(e) =>
                            setFormData({ ...formData, durationHours: Number.parseInt(e.target.value) || 8 })
                          }
                        />
                      </div>
                    </div>

                    {/* Location Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="prefecture">Prefecture</Label>
                        <Input
                          id="prefecture"
                          value={formData.prefecture || ""}
                          onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                          placeholder="Tokyo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nameJp">Japanese Name</Label>
                        <Input
                          id="nameJp"
                          value={formData.nameJp || ""}
                          onChange={(e) => setFormData({ ...formData, nameJp: e.target.value })}
                          placeholder="日本語名"
                        />
                      </div>
                    </div>

                    {/* Descriptions */}
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Short description"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="fullDescription">Full Description</Label>
                      <Textarea
                        id="fullDescription"
                        value={formData.fullDescription || ""}
                        onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                        placeholder="Detailed description"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="about">About</Label>
                      <Textarea
                        id="about"
                        value={formData.about || ""}
                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                        placeholder="About this tour/post"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="details">Details</Label>
                      <Textarea
                        id="details"
                        value={formData.details || ""}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="Additional details"
                        rows={3}
                      />
                    </div>

                    {/* Array Fields - Extended */}
                    {[
                      { key: "tags", label: "Tags" },
                      { key: "highlights", label: "Highlights" },
                      { key: "includes", label: "Includes" },
                      { key: "notSuitableFor", label: "Not Suitable For" },
                      { key: "rules", label: "Rules" },
                      { key: "guides", label: "Guides" },
                      { key: "explorationWays", label: "Exploration Ways" },
                      { key: "languages", label: "Languages" },
                      { key: "nearbyAttractions", label: "Nearby Attractions" },
                      { key: "dining", label: "Dining Options" },
                      { key: "accommodation", label: "Accommodation" },
                      { key: "tips", label: "Tips" },
                      { key: "importantInformation", label: "Important Information" },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <Label htmlFor={key}>{label} (comma separated)</Label>
                        <Input
                          id={key}
                          value={Array.isArray(formData[key]) ? formData[key].join(", ") : ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [key]: toArr(e.target.value),
                            })
                          }
                          placeholder={`Enter ${label.toLowerCase()}`}
                        />
                      </div>
                    ))}

                    <div className="space-y-4 border-t pt-4">
                      <h3 className="text-lg font-semibold">Booking Policies</h3>

                      {/* Free Cancellation */}
                      <div className="space-y-2">
                        <Label>Free Cancellation</Label>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.freeCancellation?.available || false}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  freeCancellation: {
                                    ...formData.freeCancellation,
                                    available: e.target.checked,
                                    deadlineHours: formData.freeCancellation?.deadlineHours || 24,
                                    note: formData.freeCancellation?.note || "",
                                  },
                                })
                              }
                            />
                            <span>Available</span>
                          </label>
                          <Input
                            type="number"
                            placeholder="Hours before"
                            value={formData.freeCancellation?.deadlineHours || 24}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                freeCancellation: {
                                  ...formData.freeCancellation,
                                  available: formData.freeCancellation?.available || false,
                                  deadlineHours: Number.parseInt(e.target.value) || 24,
                                  note: formData.freeCancellation?.note || "",
                                },
                              })
                            }
                            className="w-32"
                          />
                        </div>
                        <Input
                          placeholder="Cancellation note"
                          value={formData.freeCancellation?.note || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              freeCancellation: {
                                ...formData.freeCancellation,
                                available: formData.freeCancellation?.available || false,
                                deadlineHours: formData.freeCancellation?.deadlineHours || 24,
                                note: e.target.value,
                              },
                            })
                          }
                        />
                      </div>

                      {/* Reserve Now Pay Later */}
                      <div className="space-y-2">
                        <Label>Reserve Now, Pay Later</Label>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.reserveNowPayLater?.available || false}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  reserveNowPayLater: {
                                    available: e.target.checked,
                                    note: formData.reserveNowPayLater?.note || "",
                                  },
                                })
                              }
                            />
                            <span>Available</span>
                          </label>
                        </div>
                        <Input
                          placeholder="Reserve now pay later note"
                          value={formData.reserveNowPayLater?.note || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              reserveNowPayLater: {
                                available: formData.reserveNowPayLater?.available || false,
                                note: e.target.value,
                              },
                            })
                          }
                        />
                      </div>

                      {/* Live Tour Guide */}
                      <div className="space-y-2">
                        <Label>Live Tour Guide</Label>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.liveTourGuide?.available || false}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  liveTourGuide: {
                                    available: e.target.checked,
                                    languages: formData.liveTourGuide?.languages || [],
                                  },
                                })
                              }
                            />
                            <span>Available</span>
                          </label>
                        </div>
                        <Input
                          placeholder="Guide languages (comma separated)"
                          value={
                            Array.isArray(formData.liveTourGuide?.languages)
                              ? formData.liveTourGuide.languages.join(", ")
                              : ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              liveTourGuide: {
                                available: formData.liveTourGuide?.available || false,
                                languages: toArr(e.target.value),
                              },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleUpdate} disabled={isLoading} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? "Updating..." : "Update Post"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditModalOpen(false)
                          setEditingItem(null)
                          resetForm()
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
            {/* Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Status</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No posts found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
                      ? "Try adjusting your search terms or filters"
                      : "Create your first post to get started"}
                  </p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <Card key={post._id} className="border hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <Badge
                              variant={
                                post.status === "published" || post.status === "active" ? "default" : "secondary"
                              }
                            >
                              {post.status}
                            </Badge>
                            {post.featured && (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>

                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {post.content?.substring(0, 150)}...
                          </p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {post.views || 0} views
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {post.category}
                            </div>
                            {post.price && (
                              <div className="flex items-center">
                                <span className="font-medium">{post.price}</span>
                              </div>
                            )}
                          </div>

                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {post.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleFeatured(post._id)}
                            className={post.featured ? "bg-yellow-50 border-yellow-200" : ""}
                          >
                            <Star className={`h-4 w-4 ${post.featured ? "fill-yellow-400 text-yellow-400" : ""}`} />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => openEditModal(post)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(post._id)}>
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
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Post</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-4">
                <div>
                  <Label>Single Image Upload (Optional - leave empty to keep current image)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSingleImageFile(e.target.files?.[0] || null)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Multiple Images Upload (Optional)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImageFiles(e.target.files)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Title *</Label>
                  <Input
                    id="edit-title"
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter post title"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-author">Author</Label>
                  <Input
                    id="edit-author"
                    value={formData.author || "Admin"}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-content">Content *</Label>
                <Textarea
                  id="edit-content"
                  value={formData.content || ""}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter post content"
                  rows={6}
                />
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-category">Category *</Label>
                  <select
                    id="edit-category"
                    value={formData.category || ""}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <select
                    id="edit-status"
                    value={formData.status || "published"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="edit-difficulty">Difficulty</Label>
                  <select
                    id="edit-difficulty"
                    value={formData.difficulty || "Easy"}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {difficulties.map((diff) => (
                      <option key={diff} value={diff}>
                        {diff}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price and Duration */}
              <div className="grid grid-cols-3 gap-4">
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
                <div>
                  <Label htmlFor="edit-durationHours">Duration Hours</Label>
                  <Input
                    id="edit-durationHours"
                    type="number"
                    min="1"
                    value={formData.durationHours || 8}
                    onChange={(e) => setFormData({ ...formData, durationHours: Number.parseInt(e.target.value) || 8 })}
                  />
                </div>
              </div>

              {/* Location Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-prefecture">Prefecture</Label>
                  <Input
                    id="edit-prefecture"
                    value={formData.prefecture || ""}
                    onChange={(e) => setFormData({ ...formData, prefecture: e.target.value })}
                    placeholder="Tokyo"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-nameJp">Japanese Name</Label>
                  <Input
                    id="edit-nameJp"
                    value={formData.nameJp || ""}
                    onChange={(e) => setFormData({ ...formData, nameJp: e.target.value })}
                    placeholder="日本語名"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short description"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="edit-fullDescription">Full Description</Label>
                <Textarea
                  id="edit-fullDescription"
                  value={formData.fullDescription || ""}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="edit-about">About</Label>
                <Textarea
                  id="edit-about"
                  value={formData.about || ""}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  placeholder="About this tour/post"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="edit-details">Details</Label>
                <Textarea
                  id="edit-details"
                  value={formData.details || ""}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Additional details"
                  rows={3}
                />
              </div>

              {/* Array Fields - Extended */}
              {[
                { key: "tags", label: "Tags" },
                { key: "highlights", label: "Highlights" },
                { key: "includes", label: "Includes" },
                { key: "notSuitableFor", label: "Not Suitable For" },
                { key: "rules", label: "Rules" },
                { key: "guides", label: "Guides" },
                { key: "explorationWays", label: "Exploration Ways" },
                { key: "languages", label: "Languages" },
                { key: "nearbyAttractions", label: "Nearby Attractions" },
                { key: "dining", label: "Dining Options" },
                { key: "accommodation", label: "Accommodation" },
                { key: "tips", label: "Tips" },
                { key: "importantInformation", label: "Important Information" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <Label htmlFor={`edit-${key}`}>{label} (comma separated)</Label>
                  <Input
                    id={`edit-${key}`}
                    value={Array.isArray(formData[key]) ? formData[key].join(", ") : ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [key]: toArr(e.target.value),
                      })
                    }
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>
              ))}

              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold">Booking Policies</h3>

                {/* Free Cancellation */}
                <div className="space-y-2">
                  <Label>Free Cancellation</Label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.freeCancellation?.available || false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            freeCancellation: {
                              ...formData.freeCancellation,
                              available: e.target.checked,
                              deadlineHours: formData.freeCancellation?.deadlineHours || 24,
                              note: formData.freeCancellation?.note || "",
                            },
                          })
                        }
                      />
                      <span>Available</span>
                    </label>
                    <Input
                      type="number"
                      placeholder="Hours before"
                      value={formData.freeCancellation?.deadlineHours || 24}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          freeCancellation: {
                            ...formData.freeCancellation,
                            available: formData.freeCancellation?.available || false,
                            deadlineHours: Number.parseInt(e.target.value) || 24,
                            note: formData.freeCancellation?.note || "",
                          },
                        })
                      }
                      className="w-32"
                    />
                  </div>
                  <Input
                    placeholder="Cancellation note"
                    value={formData.freeCancellation?.note || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        freeCancellation: {
                          ...formData.freeCancellation,
                          available: formData.freeCancellation?.available || false,
                          deadlineHours: formData.freeCancellation?.deadlineHours || 24,
                          note: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                {/* Reserve Now Pay Later */}
                <div className="space-y-2">
                  <Label>Reserve Now, Pay Later</Label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.reserveNowPayLater?.available || false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            reserveNowPayLater: {
                              available: e.target.checked,
                              note: formData.reserveNowPayLater?.note || "",
                            },
                          })
                        }
                      />
                      <span>Available</span>
                    </label>
                  </div>
                  <Input
                    placeholder="Reserve now pay later note"
                    value={formData.reserveNowPayLater?.note || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reserveNowPayLater: {
                          available: formData.reserveNowPayLater?.available || false,
                          note: e.target.value,
                        },
                      })
                    }
                  />
                </div>

                {/* Live Tour Guide */}
                <div className="space-y-2">
                  <Label>Live Tour Guide</Label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.liveTourGuide?.available || false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            liveTourGuide: {
                              available: e.target.checked,
                              languages: formData.liveTourGuide?.languages || [],
                            },
                          })
                        }
                      />
                      <span>Available</span>
                    </label>
                  </div>
                  <Input
                    placeholder="Guide languages (comma separated)"
                    value={
                      Array.isArray(formData.liveTourGuide?.languages)
                        ? formData.liveTourGuide.languages.join(", ")
                        : ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        liveTourGuide: {
                          available: formData.liveTourGuide?.available || false,
                          languages: toArr(e.target.value),
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleUpdate} disabled={isLoading} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Updating..." : "Update Post"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditModalOpen(false)
                    setEditingItem(null)
                    resetForm()
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
  )
}

export default AdminDashboard
