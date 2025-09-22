// lib/api.ts
import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// ✅ Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // agar cookies / auth chahiye
})

// ✅ Blog APIs
export async function getBlogs(params?: { status?: string; limit?: number; page?: number }) {
  const res = await api.get("/blogs", { params })
  return res.data as { posts: any[]; total: number }
}

export async function getFeaturedBlogs(limit = 6) {
  const res = await api.get("/blogs/featured", { params: { limit } })
  return res.data as { posts: any[] }
}

export async function getBlogById(id: string) {
  const res = await api.get(`/blogs/${id}`)
  return res.data as any
}

// ✅ ShortForm APIs
export async function getShortForms(params?: { status?: string; limit?: number; page?: number }) {
  const res = await api.get("/shortforms", { params })
  return res.data as { shortForms: any[]; total: number }
}

// ✅ Reviews
export async function addReview(
  postId: string,
  data: { name: string; rating: number; comment: string }
) {
  const res = await api.post(`/blogs/${postId}/reviews`, data)
  return res.data as any
}

// ✅ Utility: convert relative URL → absolute
export function toAbs(url?: string): string | undefined {
  if (!url) return undefined
  if (url.startsWith("http")) return url
  return `${BASE_URL.replace("/api", "")}/${url.replace(/^\/+/, "")}`
}
