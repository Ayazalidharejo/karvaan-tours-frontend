// hooks/useAdminData.js
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useAdminData = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [shortForms, setShortForms] = useState([]);
  const [detailForms, setDetailForms] = useState([]);
  const { toast } = useToast();
  
  const API_BASE_URL = "http://localhost:5000/api";
  
  const getAuthHeaders = () => ({ 
    Authorization: `Bearer ${localStorage.getItem("adminToken")}` 
  });

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

  const loadAllData = async () => {
    await Promise.all([loadBlogs(), loadShortForms(), loadDetailForms()]);
  };

  return {
    blogPosts,
    setBlogPosts,
    shortForms,
    setShortForms,
    detailForms,
    setDetailForms,
    loadAllData,
    getAuthHeaders,
    API_BASE_URL
  };
};
