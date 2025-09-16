import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  LogOut, 
  Users, 
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
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  createdAt: string;
  status: "published" | "draft";
  views: number;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock blog posts data
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Complete Guide to Mount Fuji Climbing",
      content: "Mount Fuji climbing season runs from July to September...",
      imageUrl: "/api/placeholder/400/300",
      author: "Admin User",
      createdAt: "2024-01-15",
      status: "published",
      views: 1520
    },
    {
      id: 2,
      title: "Best Cherry Blossom Spots in Kyoto",
      content: "Kyoto offers some of the most beautiful cherry blossom viewing...",
      imageUrl: "/api/placeholder/400/300",
      author: "Admin User",
      createdAt: "2024-01-10",
      status: "published",
      views: 890
    },
    {
      id: 3,
      title: "Tokyo Food Tour: Hidden Gems",
      content: "Discover the best local food spots that tourists rarely find...",
      imageUrl: "/api/placeholder/400/300",
      author: "Admin User",
      createdAt: "2024-01-08",
      status: "draft",
      views: 0
    }
  ]);

  // Form state for creating/editing posts
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    status: "draft" as "published" | "draft"
  });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");

    if (!token || !userData) {
      navigate("/admin/login");
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login");
  };

  const handleCreatePost = async () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPost: BlogPost = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        imageUrl: formData.imageUrl || "/api/placeholder/400/300",
        author: user?.name || "Admin User",
        createdAt: new Date().toISOString().split('T')[0],
        status: formData.status,
        views: 0
      };

      setBlogPosts([newPost, ...blogPosts]);
      setFormData({ title: "", content: "", imageUrl: "", status: "draft" });
      setIsCreateModalOpen(false);

      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPost = async () => {
    if (!editingPost || !formData.title || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedPosts = blogPosts.map(post => 
        post.id === editingPost.id 
          ? {
              ...post,
              title: formData.title,
              content: formData.content,
              imageUrl: formData.imageUrl || post.imageUrl,
              status: formData.status
            }
          : post
      );

      setBlogPosts(updatedPosts);
      setIsEditModalOpen(false);
      setEditingPost(null);
      setFormData({ title: "", content: "", imageUrl: "", status: "draft" });

      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog post.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setBlogPosts(blogPosts.filter(post => post.id !== id));

      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog post.",
        variant: "destructive"
      });
    }
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
      status: post.status
    });
    setIsEditModalOpen(true);
  };

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalPosts: blogPosts.length,
    publishedPosts: blogPosts.filter(p => p.status === "published").length,
    draftPosts: blogPosts.filter(p => p.status === "draft").length,
    totalViews: blogPosts.reduce((sum, p) => sum + p.views, 0)
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
              <Badge variant="secondary" className="ml-3">Admin Panel</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.name}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold">{stats.totalPosts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold">{stats.publishedPosts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Edit className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-bold">{stats.draftPosts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Management */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Blog Posts Management</CardTitle>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="hero">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Blog Post</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Enter blog post title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        placeholder="Enter image URL (optional)"
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        placeholder="Enter blog post content"
                        rows={6}
                      />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <div className="flex gap-4 mt-2">
                        <Button
                          variant={formData.status === "draft" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormData({...formData, status: "draft"})}
                        >
                          Draft
                        </Button>
                        <Button
                          variant={formData.status === "published" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormData({...formData, status: "published"})}
                        >
                          Published
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleCreatePost} disabled={isLoading} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? "Creating..." : "Create Post"}
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
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
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Blog Posts List */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No blog posts found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? "Try adjusting your search terms" : "Create your first blog post to get started"}
                  </p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <Card key={post.id} className="border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <Badge variant={post.status === "published" ? "default" : "secondary"}>
                              {post.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {post.content.substring(0, 100)}...
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {post.createdAt}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {post.views} views
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {post.author}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                          >
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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Blog Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter blog post title"
                />
              </div>
              <div>
                <Label htmlFor="edit-imageUrl">Image URL</Label>
                <Input
                  id="edit-imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="Enter image URL (optional)"
                />
              </div>
              <div>
                <Label htmlFor="edit-content">Content *</Label>
                <Textarea
                  id="edit-content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Enter blog post content"
                  rows={6}
                />
              </div>
              <div>
                <Label>Status</Label>
                <div className="flex gap-4 mt-2">
                  <Button
                    variant={formData.status === "draft" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({...formData, status: "draft"})}
                  >
                    Draft
                  </Button>
                  <Button
                    variant={formData.status === "published" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFormData({...formData, status: "published"})}
                  >
                    Published
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleEditPost} disabled={isLoading} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Updating..." : "Update Post"}
                </Button>
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
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