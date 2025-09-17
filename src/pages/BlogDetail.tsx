import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = "http://localhost:5000";

type Blog = {
  _id: string;
  title: string;
  content?: string;
  imageUrl?: string;
  author?: string;
  views?: number;
};

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE}/api/blogs/${id}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setBlog)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="p-6 text-red-600">Error: {String(error)}</div>;
  if (!blog) return <div className="p-6">Loading…</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {blog.imageUrl && (
        <img src={blog.imageUrl} alt={blog.title} className="mb-4 max-w-full rounded" />
      )}
      <div className="prose max-w-none whitespace-pre-line">
        {blog.content || "No content"}
      </div>
      <div className="mt-6 text-sm text-gray-500">
        Author: {blog.author || "Admin"} • Views: {blog.views ?? 0}
      </div>
    </div>
  );
}
