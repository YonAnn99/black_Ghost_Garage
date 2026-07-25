"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

type PortfolioItem = {
  id: string;
  unit_id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  tags: string[];
  sort_order: number;
};

export default function DashboardPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    newCategory: "",
    description: "",
    tags: [] as string[],
    tagInput: "",
    imagePreview: "",
    imageUrl: "",
  });

  const defaultCategories = ["Estético", "Carro", "Motocicletas"];
const categories = [...new Set([...defaultCategories, ...items.map((i) => i.category)])];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      setItems(data);
    } catch {
      setMessage({ type: "error", text: "Error al cargar los trabajos." });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "La imagen no puede superar 5MB." });
      return;
    }

    const validTypes = ["image/webp", "image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setMessage({ type: "error", text: "Formato no válido. Usa WebP, JPG o PNG." });
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((prev) => ({ ...prev, imagePreview: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (): Promise<string | null> => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return form.imageUrl || null;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/portfolio/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      return data.url;
    } catch {
      setMessage({ type: "error", text: "Error al subir la imagen." });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!form.title || !form.description) {
      setMessage({ type: "error", text: "Título y descripción son requeridos." });
      return;
    }

    const category = form.category === "__new__" ? form.newCategory : form.category;
    if (!category) {
      setMessage({ type: "error", text: "Selecciona o crea una categoría." });
      return;
    }

    setSaving(true);

    const imageUrl = await uploadImage();
    if (!imageUrl && !form.imageUrl) {
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          category,
          description: form.description,
          tags: form.tags,
          image_url: imageUrl || form.imageUrl,
          sort_order: items.length + 1,
        }),
      });

      if (!res.ok) throw new Error("Error al guardar");

      setMessage({ type: "success", text: "Trabajo guardado correctamente." });
      setForm({
        title: "",
        category: "",
        newCategory: "",
        description: "",
        tags: [],
        tagInput: "",
        imagePreview: "",
        imageUrl: "",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchItems();
    } catch {
      setMessage({ type: "error", text: "Error al guardar el trabajo." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (unitId: string) => {
    try {
      const res = await fetch(`/api/portfolio?id=${unitId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setMessage({ type: "success", text: "Trabajo eliminado." });
      setDeleteConfirm(null);
      fetchItems();
    } catch {
      setMessage({ type: "error", text: "Error al eliminar el trabajo." });
    }
  };

  const addTag = () => {
    const tag = form.tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag], tagInput: "" }));
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  return (
    <div className="min-h-screen bg-void">
      <div className="absolute inset-0 bg-grid-noir opacity-[0.08]" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-6 py-10 md:px-8">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="text-data-wide text-[10px] uppercase text-ghost-red tracking-[0.15em]">
              ◆ Administración
            </span>
            <h1 className="text-display mt-2 text-[clamp(1.5rem,3vw,2rem)] text-bone">
              Panel de Control
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="btn-press border border-line px-4 py-2 text-[10px] uppercase text-bone-faint tracking-[0.12em] transition-colors duration-200 hover:border-ghost-red hover:text-ghost-red"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 border px-4 py-3 text-[12px] ${
              message.type === "error"
                ? "border-ghost-red/30 bg-ghost-red/5 text-ghost-red"
                : "border-green-500/30 bg-green-500/5 text-green-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 border border-line bg-panel p-6">
          <div className="pointer-events-none absolute inset-[2px] border border-line-soft" aria-hidden="true" />

          <h2 className="text-display text-lg text-bone">Nuevo Trabajo</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Title */}
            <div className="sm:col-span-2">
              <label htmlFor="title" className="text-data-wide mb-1.5 block text-[10px] uppercase text-bone-faint tracking-[0.12em]">
                Título
              </label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full border border-line bg-void px-4 py-3 text-[13px] text-bone outline-none transition-colors duration-200 focus:border-ghost-red"
                placeholder="Mustang GT — Full Carbono"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="text-data-wide mb-1.5 block text-[10px] uppercase text-bone-faint tracking-[0.12em]">
                Categoría
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full border border-line bg-void px-4 py-3 text-[13px] text-bone outline-none transition-colors duration-200 focus:border-ghost-red"
              >
                <option value="">Seleccionar...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="__new__">+ Nueva categoría</option>
              </select>
            </div>

            {/* New Category */}
            {form.category === "__new__" && (
              <div>
                <label htmlFor="newCategory" className="text-data-wide mb-1.5 block text-[10px] uppercase text-bone-faint tracking-[0.12em]">
                  Nueva Categoría
                </label>
                <input
                  id="newCategory"
                  type="text"
                  value={form.newCategory}
                  onChange={(e) => setForm((prev) => ({ ...prev, newCategory: e.target.value }))}
                  className="w-full border border-line bg-void px-4 py-3 text-[13px] text-bone outline-none transition-colors duration-200 focus:border-ghost-red"
                  placeholder="Ej: Eléctrico"
                />
              </div>
            )}

            {/* Description */}
            <div className="sm:col-span-2">
              <label htmlFor="description" className="text-data-wide mb-1.5 block text-[10px] uppercase text-bone-faint tracking-[0.12em]">
                Descripción
              </label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full border border-line bg-void px-4 py-3 text-[13px] text-bone outline-none transition-colors duration-200 focus:border-ghost-red resize-none"
                placeholder="Describe el trabajo realizado..."
              />
            </div>

            {/* Tags */}
            <div className="sm:col-span-2">
              <label htmlFor="tags" className="text-data-wide mb-1.5 block text-[10px] uppercase text-bone-faint tracking-[0.12em]">
                Tags
              </label>
              <div className="flex gap-2">
                <input
                  id="tags"
                  type="text"
                  value={form.tagInput}
                  onChange={(e) => setForm((prev) => ({ ...prev, tagInput: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="flex-1 border border-line bg-void px-4 py-3 text-[13px] text-bone outline-none transition-colors duration-200 focus:border-ghost-red"
                  placeholder="Escribe y presiona Enter"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="border border-line px-4 py-3 text-[11px] uppercase text-bone-faint transition-colors duration-200 hover:border-ghost-red hover:text-ghost-red"
                >
                  +
                </button>
              </div>
              {form.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 border border-line-soft px-2 py-0.5 text-[9px] uppercase text-bone-faint tracking-[0.08em]"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-ghost-red/50 hover:text-ghost-red"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Image */}
            <div className="sm:col-span-2">
              <label className="text-data-wide mb-1.5 block text-[10px] uppercase text-bone-faint tracking-[0.12em]">
                Imagen
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/webp,image/jpeg,image/png"
                    onChange={handleImageSelect}
                    className="w-full border border-line bg-void px-4 py-3 text-[13px] text-bone file:mr-4 file:border-0 file:bg-ghost-red file:px-3 file:py-1 file:text-[10px] file:uppercase file:text-void"
                  />
                  <p className="mt-1 text-[10px] text-bone-faint">WebP, JPG o PNG. Máximo 5MB.</p>
                </div>
                {(form.imagePreview || form.imageUrl) && (
                  <div className="relative size-20 overflow-hidden border border-line">
                    <img
                      src={form.imagePreview || form.imageUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || uploading}
            className="btn-press border border-ghost-red bg-ghost-red px-6 py-3 text-[11px] uppercase text-void tracking-[0.12em] transition-all duration-200 hover:bg-ghost-red/90 disabled:opacity-50"
          >
            {uploading ? "Subiendo imagen..." : saving ? "Guardando..." : "Guardar Trabajo"}
          </button>
        </form>

        {/* Existing Items */}
        <div className="mt-10 border border-line bg-panel p-6">
          <h2 className="text-display mb-6 text-lg text-bone">
            Trabajos Existentes ({items.length})
          </h2>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 animate-pulse bg-panel-raised" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="text-[13px] text-bone-faint">No hay trabajos registrados.</p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.unit_id}
                  className="flex items-center gap-4 border border-line-soft bg-void p-3 transition-colors duration-200 hover:border-line"
                >
                  {/* Image preview */}
                  <div className="size-12 shrink-0 overflow-hidden bg-panel">
                    {item.image_url && !item.image_url.includes("placeholder") ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-[8px] text-bone-faint">
                       Sin img
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-bone truncate">{item.title}</p>
                    <p className="text-[10px] uppercase text-bone-faint">
                      {item.unit_id} · {item.category}
                    </p>
                  </div>

                  {/* Delete */}
                  {deleteConfirm === item.unit_id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-ghost-red">¿Eliminar?</span>
                      <button
                        onClick={() => handleDelete(item.unit_id)}
                        className="border border-ghost-red px-2 py-1 text-[9px] uppercase text-ghost-red transition-colors duration-200 hover:bg-ghost-red hover:text-void"
                      >
                        Sí
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="border border-line px-2 py-1 text-[9px] uppercase text-bone-faint transition-colors duration-200 hover:border-bone-faint"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(item.unit_id)}
                      className="shrink-0 border border-line p-2 text-bone-faint transition-colors duration-200 hover:border-ghost-red hover:text-ghost-red"
                      title="Eliminar"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
