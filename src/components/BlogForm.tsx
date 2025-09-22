// // components/admin/forms/BlogForm.jsx
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// const BlogForm = ({ formData, setFormData, isEdit = false }) => {
//   return (
//     <>
//       <div>
//         <Label htmlFor={isEdit ? "edit-title" : "title"}>Title *</Label>
//         <Input
//           id={isEdit ? "edit-title" : "title"}
//           value={formData.title || ""}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           placeholder="Enter blog post title"
//         />
//       </div>
//       <div>
//         <Label htmlFor={isEdit ? "edit-content" : "content"}>Content *</Label>
//         <Textarea
//           id={isEdit ? "edit-content" : "content"}
//           value={formData.content || ""}
//           onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//           placeholder="Enter blog post content"
//           rows={6}
//         />
//       </div>
//       <div>
//         <Label htmlFor={isEdit ? "edit-tags" : "tags"}>Tags (comma separated)</Label>
//         <Input
//           id={isEdit ? "edit-tags" : "tags"}
//           value={Array.isArray(formData.tags) ? formData.tags.join(", ") : ""}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               tags: e.target.value.split(",").map((tag) => tag.trim()),
//             })
//           }
//           placeholder="travel, japan, tourism"
//         />
//       </div>
//       <div>
//         <Label>Status</Label>
//         <div className="flex gap-4 mt-2">
//           {["draft", "published", "archived"].map((status) => (
//             <Button
//               key={status}
//               variant={formData.status === status ? "default" : "outline"}
//               size="sm"
//               onClick={() => setFormData({ ...formData, status })}
//             >
//               {status}
//             </Button>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogForm;

// components/admin/forms/BlogForm.jsx
import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const slugify = (str = "") =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const SectionTitle = ({ children }) => (
  <h4 className="text-sm font-semibold mt-6 mb-2 text-muted-foreground">{children}</h4>
);

const BlogForm = ({
  formData,
  setFormData,
  isEdit = false,
  // primary cover image (same as before)
  imageFile,
  setImageFile,
  // NEW: multiple gallery file uploads (optional; parent can collect & upload)
  galleryFiles,
  setGalleryFiles,
}) => {
  // ------------- helpers -------------
  const setDetails = (patch) =>
    setFormData({ ...formData, details: { ...(formData.details || {}), ...patch } });

  const pushTo = (arr, emptyObj) => [ ...(arr || []), emptyObj ];
  const removeAt = (arr, idx) => (arr || []).filter((_, i) => i !== idx);
  const updateAt = (arr, idx, key, val) =>
    (arr || []).map((it, i) => (i === idx ? { ...it, [key]: val } : it));

  // cover image (preview)
  const [preview, setPreview] = useState(null);
  const onPickCover = (f) => {
    setImageFile?.(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  // gallery files (previews)
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const onPickGallery = (fileList) => {
    const files = Array.from(fileList || []);
    setGalleryFiles?.(files);
    setGalleryPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  // computed
  const computedSlug = useMemo(
    () => formData.slug || slugify(formData.title || ""),
    [formData.slug, formData.title]
  );
  const readTimePreview = formData.readTimeMinutes || 1;

  // csv helpers
  const onCSV = (key, str) =>
    setFormData({ ...formData, [key]: str.split(",").map((s) => s.trim()).filter(Boolean) });

  const onTagsChange = (val) => {
    const arr = val.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 20);
    setFormData({ ...formData, tags: arr });
  };
  const onHighlightsChange = (val) => {
    const arr = val.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 10);
    setDetails({ highlights: arr });
  };

  // gallery (URLs + alt) unlimited now
  const images = formData.images || [];
  const setImages = (arr) => setFormData({ ...formData, images: arr });

  // nearby places helpers
  const nearby = formData.nearbyPlaces || [];
  const setNearby = (arr) => setFormData({ ...formData, nearbyPlaces: arr });

  // favorite places helpers
  const favorite = formData.favoritePlaces || [];
  const setFavorite = (arr) => setFormData({ ...formData, favoritePlaces: arr });

  return (
    <>
      {/* Cover Image (required on create) */}
      <div>
        <Label htmlFor={isEdit ? "edit-image" : "image"}>
          Cover Image {!isEdit && <span className="text-red-500">*</span>}
        </Label>
        <Input
          id={isEdit ? "edit-image" : "image"}
          type="file"
          accept="image/*"
          onChange={(e) => onPickCover(e.target.files?.[0] || null)}
          className="mt-1"
        />
        {preview && (
          <div className="mt-3">
            <img src={preview} alt="preview" className="h-28 rounded border object-cover" />
          </div>
        )}
        {isEdit && <p className="text-xs text-muted-foreground mt-1">Empty = keep current cover.</p>}
      </div>

      {/* Title */}
      <div>
        <Label htmlFor={isEdit ? "edit-title" : "title"}>Title *</Label>
        <Input
          id={isEdit ? "edit-title" : "title"}
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter blog post title"
        />
      </div>

      {/* Slug + Readtime (readonly previews) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Slug (auto)</Label>
          <div className="flex items-center gap-2">
            <Input value={computedSlug} readOnly />
            <Badge variant="secondary">Preview</Badge>
          </div>
        </div>
        <div>
          <Label>Read Time (min)</Label>
          <Input value={readTimePreview} readOnly />
        </div>
      </div>

      {/* Author / AuthorId */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={isEdit ? "edit-author" : "author"}>Author</Label>
          <Input
            id={isEdit ? "edit-author" : "author"}
            value={formData.author || ""}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Admin"
          />
        </div>
        <div>
          <Label htmlFor="authorId">Author ID (optional)</Label>
          <Input
            id="authorId"
            value={formData.authorId || ""}
            onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
            placeholder="Mongo ObjectId"
          />
        </div>
      </div>

      {/* Content */}
      <div>
        <Label htmlFor={isEdit ? "edit-content" : "content"}>Content *</Label>
        <Textarea
          id={isEdit ? "edit-content" : "content"}
          value={formData.content || ""}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Write your article..."
          rows={8}
        />
      </div>

      {/* About */}
      <div>
        <Label htmlFor="about">About</Label>
        <Textarea
          id="about"
          value={formData.about || ""}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          placeholder="Short about section"
          rows={3}
        />
      </div>

      {/* DETAILS */}
      <SectionTitle>Details</SectionTitle>

      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={formData.details?.summary || ""}
          onChange={(e) => setDetails({ summary: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="highlights">Highlights (comma separated, max 10)</Label>
        <Input
          id="highlights"
          value={(formData.details?.highlights || []).join(", ")}
          onChange={(e) => onHighlightsChange(e.target.value)}
          placeholder="scenic views, family friendly, ..."
        />
      </div>

      {/* FAQ */}
      <div>
        <Label>FAQ</Label>
        <div className="space-y-3">
          {(formData.details?.faq || []).map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border rounded">
              <Input
                placeholder="Question"
                value={item.q || ""}
                onChange={(e) =>
                  setDetails({ faq: updateAt(formData.details.faq, idx, "q", e.target.value) })
                }
              />
              <Input
                placeholder="Answer"
                value={item.a || ""}
                onChange={(e) =>
                  setDetails({ faq: updateAt(formData.details.faq, idx, "a", e.target.value) })
                }
              />
              <div className="flex justify-end md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDetails({ faq: removeAt(formData.details.faq, idx) })}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setDetails({ faq: pushTo(formData.details?.faq, { q: "", a: "" }) })}
          >
            + Add FAQ
          </Button>
        </div>
      </div>

      {/* Resources */}
      <div>
        <Label>Resources</Label>
        <div className="space-y-3">
          {(formData.details?.resources || []).map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border rounded">
              <Input
                placeholder="Label"
                value={item.label || ""}
                onChange={(e) =>
                  setDetails({
                    resources: updateAt(formData.details.resources, idx, "label", e.target.value),
                  })
                }
              />
              <Input
                placeholder="URL"
                value={item.url || ""}
                onChange={(e) =>
                  setDetails({
                    resources: updateAt(formData.details.resources, idx, "url", e.target.value),
                  })
                }
              />
              <div className="flex justify-end md:col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDetails({ resources: removeAt(formData.details.resources, idx) })}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setDetails({ resources: pushTo(formData.details?.resources, { label: "", url: "" }) })
            }
          >
            + Add Resource
          </Button>
        </div>
      </div>

      {/* Custom Sections */}
      <div>
        <Label>Custom Sections</Label>
        <div className="space-y-3">
          {(formData.details?.sections || []).map((item, idx) => (
            <div key={idx} className="space-y-2 p-3 border rounded">
              <Input
                placeholder="Heading"
                value={item.heading || ""}
                onChange={(e) =>
                  setDetails({
                    sections: updateAt(formData.details.sections, idx, "heading", e.target.value),
                  })
                }
              />
              <Textarea
                placeholder="Body"
                rows={3}
                value={item.body || ""}
                onChange={(e) =>
                  setDetails({
                    sections: updateAt(formData.details.sections, idx, "body", e.target.value),
                  })
                }
              />
              <Input
                placeholder="Image URL (optional)"
                value={item.imageUrl || ""}
                onChange={(e) =>
                  setDetails({
                    sections: updateAt(formData.details.sections, idx, "imageUrl", e.target.value),
                  })
                }
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setDetails({ sections: removeAt(formData.details.sections, idx) })}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setDetails({
                sections: pushTo(formData.details?.sections, { heading: "", body: "", imageUrl: "" }),
              })
            }
          >
            + Add Section
          </Button>
        </div>
      </div>

      {/* Gallery (URLs + alt) — unlimited */}
      <SectionTitle>Gallery (URLs) — unlimited</SectionTitle>
      <div className="space-y-3">
        {images.map((img, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border rounded">
            <Input
              placeholder="Image URL"
              value={img.url || ""}
              onChange={(e) => setImages(updateAt(images, idx, "url", e.target.value))}
            />
            <Input
              placeholder="Alt text"
              value={img.alt || ""}
              onChange={(e) => setImages(updateAt(images, idx, "alt", e.target.value))}
            />
            <div className="flex justify-end md:col-span-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setImages(removeAt(images, idx))}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setImages(pushTo(images, { url: "", alt: "" }))}
        >
          + Add Image
        </Button>
      </div>

      {/* (Optional) Multiple file uploads for gallery (frontend only; parent can upload) */}
      <div className="mt-3">
        <Label htmlFor="galleryFiles">Upload Gallery Files (multiple, optional)</Label>
        <Input
          id="galleryFiles"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => onPickGallery(e.target.files)}
          className="mt-1"
        />
        {galleryPreviews?.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {galleryPreviews.map((src, i) => (
              <img key={i} src={src} alt={`g-${i}`} className="h-24 w-full object-cover rounded border" />
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Note: Files ko parent FormData me append karna hoga (e.g. <code>gallery[]</code>). URLs upar wale gallery
          fields se bhej do.
        </p>
      </div>

      {/* Tags / Category */}
      <SectionTitle>Meta</SectionTitle>
      <div>
        <Label htmlFor="tags">Tags (comma separated, max 20)</Label>
        <Input
          id="tags"
          value={(formData.tags || []).join(", ")}
          onChange={(e) => onTagsChange(e.target.value)}
          placeholder="travel, japan, tourism"
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={formData.category || "other"}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
        >
          {["tech","travel","lifestyle","food","business","education","news","other"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Status / Scheduling */}
      <SectionTitle>Status & Scheduling</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Status</Label>
          <div className="flex gap-2 mt-2">
            {["draft","scheduled","published","archived"].map((s) => (
              <Button
                key={s}
                type="button"
                variant={formData.status === s ? "default" : "outline"}
                size="sm"
                onClick={() => setFormData({ ...formData, status: s })}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="publishAt">Publish At</Label>
          <Input
            id="publishAt"
            type="datetime-local"
            value={formData.publishAt ? new Date(formData.publishAt).toISOString().slice(0,16) : ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                publishAt: e.target.value ? new Date(e.target.value).toISOString() : "",
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="unpublishAt">Unpublish At</Label>
          <Input
            id="unpublishAt"
            type="datetime-local"
            value={formData.unpublishAt ? new Date(formData.unpublishAt).toISOString().slice(0,16) : ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                unpublishAt: e.target.value ? new Date(e.target.value).toISOString() : "",
              })
            }
          />
        </div>
      </div>

      {/* Featured / Pin / Visibility */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div>
          <Label>Featured</Label>
          <div className="mt-2">
            <Button
              type="button"
              variant={formData.featured ? "default" : "outline"}
              size="sm"
              onClick={() => setFormData({ ...formData, featured: !formData.featured })}
            >
              {formData.featured ? "Featured ✓" : "Not Featured"}
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="featuredOrder">Featured Order</Label>
          <Input
            id="featuredOrder"
            type="number"
            value={formData.featuredOrder ?? 0}
            onChange={(e) => setFormData({ ...formData, featuredOrder: Number(e.target.value || 0) })}
          />
        </div>
        <div>
          <Label>Pin</Label>
          <div className="mt-2">
            <Button
              type="button"
              variant={formData.isPinned ? "default" : "outline"}
              size="sm"
              onClick={() => setFormData({ ...formData, isPinned: !formData.isPinned })}
            >
              {formData.isPinned ? "Pinned ✓" : "Not Pinned"}
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="visibility">Visibility</Label>
        <select
          id="visibility"
          value={formData.visibility || "public"}
          onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
        >
          {["public","private","unlisted"].map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Nearby Places */}
      <SectionTitle>Nearby Places</SectionTitle>
      <div className="space-y-3">
        {nearby.map((p, idx) => (
          <div key={idx} className="space-y-2 p-3 border rounded">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                placeholder="Name"
                value={p.name || ""}
                onChange={(e) => setNearby(updateAt(nearby, idx, "name", e.target.value))}
              />
              <select
                value={p.type || "other"}
                onChange={(e) => setNearby(updateAt(nearby, idx, "type", e.target.value))}
                className="px-3 py-2 border rounded-md"
              >
                {["restaurant","cafe","park","museum","shop","landmark","other"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <Input
                type="number"
                step="0.1"
                placeholder="Distance (km)"
                value={p.distanceKm ?? ""}
                onChange={(e) =>
                  setNearby(updateAt(nearby, idx, "distanceKm", e.target.value === "" ? "" : Number(e.target.value)))
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                placeholder="Longitude"
                value={p.location?.coordinates?.[0] ?? ""}
                onChange={(e) => {
                  const lng = e.target.value === "" ? "" : Number(e.target.value);
                  const lat = p.location?.coordinates?.[1] ?? "";
                  setNearby(updateAt(nearby, idx, "location", { type: "Point", coordinates: [lng, lat] }));
                }}
              />
              <Input
                placeholder="Latitude"
                value={p.location?.coordinates?.[1] ?? ""}
                onChange={(e) => {
                  const lat = e.target.value === "" ? "" : Number(e.target.value);
                  const lng = p.location?.coordinates?.[0] ?? "";
                  setNearby(updateAt(nearby, idx, "location", { type: "Point", coordinates: [lng, lat] }));
                }}
              />
              <Input
                placeholder="Map URL"
                value={p.mapUrl || ""}
                onChange={(e) => setNearby(updateAt(nearby, idx, "mapUrl", e.target.value))}
              />
            </div>
            <div className="flex justify-end">
              <Button type="button" variant="outline" size="sm" onClick={() => setNearby(removeAt(nearby, idx))}>
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            setNearby(
              pushTo(nearby, {
                name: "",
                type: "other",
                distanceKm: "",
                location: { type: "Point", coordinates: ["", ""] },
                mapUrl: "",
              })
            )
          }
        >
          + Add Nearby Place
        </Button>
      </div>

      {/* Favorite Places (richer) */}
      <SectionTitle>Favorite Places</SectionTitle>
      <div className="space-y-3">
        {favorite.map((f, idx) => (
          <div key={idx} className="space-y-2 p-3 border rounded">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                placeholder="Name *"
                value={f.name || ""}
                onChange={(e) => setFavorite(updateAt(favorite, idx, "name", e.target.value))}
              />
              <Input
                placeholder="Best Season (e.g., Spring)"
                value={f.bestSeason || ""}
                onChange={(e) => setFavorite(updateAt(favorite, idx, "bestSeason", e.target.value))}
              />
              <Input
                placeholder="Best Time (e.g., Evening)"
                value={f.bestTime || ""}
                onChange={(e) => setFavorite(updateAt(favorite, idx, "bestTime", e.target.value))}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Textarea
                rows={2}
                placeholder="Why is it a favorite? (reason)"
                value={f.reason || ""}
                onChange={(e) => setFavorite(updateAt(favorite, idx, "reason", e.target.value))}
              />
              <Textarea
                rows={2}
                placeholder="Description"
                value={f.description || ""}
                onChange={(e) => setFavorite(updateAt(favorite, idx, "description", e.target.value))}
              />
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="Rating (0–5)"
                value={f.rating ?? ""}
                onChange={(e) =>
                  setFavorite(updateAt(favorite, idx, "rating", e.target.value === "" ? "" : Number(e.target.value)))
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                placeholder="Longitude"
                value={f.location?.coordinates?.[0] ?? ""}
                onChange={(e) => {
                  const lng = e.target.value === "" ? "" : Number(e.target.value);
                  const lat = f.location?.coordinates?.[1] ?? "";
                  setFavorite(updateAt(favorite, idx, "location", { type: "Point", coordinates: [lng, lat] }));
                }}
              />
              <Input
                placeholder="Latitude"
                value={f.location?.coordinates?.[1] ?? ""}
                onChange={(e) => {
                  const lat = e.target.value === "" ? "" : Number(e.target.value);
                  const lng = f.location?.coordinates?.[0] ?? "";
                  setFavorite(updateAt(favorite, idx, "location", { type: "Point", coordinates: [lng, lat] }));
                }}
              />
              <Input
                placeholder="Map URL"
                value={f.mapUrl || ""}
                onChange={(e) => setFavorite(updateAt(favorite, idx, "mapUrl", e.target.value))}
              />
            </div>

            {/* Favorite place images (URLs) */}
            <div>
              <Label>Images (URLs)</Label>
              <div className="space-y-2">
                {(f.images || []).map((img, i2) => (
                  <div key={i2} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      placeholder="Image URL"
                      value={img.url || ""}
                      onChange={(e) => {
                        const imgs = updateAt(f.images || [], i2, "url", e.target.value);
                        setFavorite(updateAt(favorite, idx, "images", imgs));
                      }}
                    />
                    <Input
                      placeholder="Alt text"
                      value={img.alt || ""}
                      onChange={(e) => {
                        const imgs = updateAt(f.images || [], i2, "alt", e.target.value);
                        setFavorite(updateAt(favorite, idx, "images", imgs));
                      }}
                    />
                  </div>
                ))}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFavorite(
                        updateAt(favorite, idx, "images", pushTo(f.images || [], { url: "", alt: "" }))
                      )
                    }
                  >
                    + Add Image
                  </Button>
                  {(f.images || []).length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFavorite(updateAt(favorite, idx, "images", []))}
                    >
                      Clear Images
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Input
                placeholder="Tags (comma separated)"
                value={(f.tags || []).join(", ")}
                onChange={(e) =>
                  setFavorite(
                    updateAt(
                      favorite,
                      idx,
                      "tags",
                      e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  )
                }
              />
              <div className="flex-1 text-right">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFavorite(removeAt(favorite, idx))}
                >
                  Remove Favorite
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            setFavorite(
              pushTo(favorite, {
                name: "",
                description: "",
                reason: "",
                bestSeason: "",
                bestTime: "",
                rating: "",
                tags: [],
                location: { type: "Point", coordinates: ["", ""] },
                mapUrl: "",
                images: [],
              })
            )
          }
        >
          + Add Favorite Place
        </Button>
      </div>

      {/* Tips & Rules */}
      <SectionTitle>Tips & Rules</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="tips">Tips (comma separated)</Label>
          <Textarea
            id="tips"
            rows={2}
            value={(formData.tips || []).join(", ")}
            onChange={(e) => onCSV("tips", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="rules">Rules (comma separated)</Label>
          <Textarea
            id="rules"
            rows={2}
            value={(formData.rules || []).join(", ")}
            onChange={(e) => onCSV("rules", e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default BlogForm;
