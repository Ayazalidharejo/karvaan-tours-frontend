// utils/formUtils.js
export const toNum = (v, d = 0) => {
  if (v === "" || v === undefined || v === null) return d;
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};

export const toArr = (v) => {
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

export const validateForm = (activeTab, formData, isCreate, imageFile, toast) => {
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
    const requiredMsg = (m) => toast({ title: "Error", description: m, variant: "destructive" });

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

    const r = toNum(formData.rating, 0);
    if (!(r >= 0 && r <= 5)) return requiredMsg("Rating must be between 0 and 5"), false;
    const rv = toNum(formData.reviews, 0);
    if (!(rv >= 0 && Number.isFinite(rv))) return requiredMsg("Reviews must be a non-negative number"), false;

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
