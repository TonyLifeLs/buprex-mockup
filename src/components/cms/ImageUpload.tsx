"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Upload, X, Link, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  previewHeight?: number
  previewWidth?: number
}

/**
 * Reusable image upload field for CMS editors.
 * - Click "Subir" to pick a local file → converts to base64 data URL (stored in Zustand)
 * - Or paste any http/https URL manually
 * - Shows a live preview
 * - "X" clears the image
 */
export function ImageUpload({
  value,
  onChange,
  label,
  previewHeight = 80,
  previewWidth = 80,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<"upload" | "url">("upload")
  const [dragging, setDragging] = useState(false)

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === "string") onChange(result)
    }
    reader.readAsDataURL(file)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    // reset so same file can be re-selected
    e.target.value = ""
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const isDataUrl = value?.startsWith("data:")
  const isHttpUrl = value?.startsWith("http")
  const isLocalPath = value?.startsWith("/")
  const hasImage = !!(isDataUrl || isHttpUrl || isLocalPath)

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {label}
        </label>
      )}

      <div className="flex gap-2">
        {/* Mode toggle */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs font-semibold flex-shrink-0">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`flex items-center gap-1 px-2.5 py-1.5 transition ${
              mode === "upload" ? "bg-[#0099d6] text-white" : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Upload className="h-3 w-3" />
            Subir
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`flex items-center gap-1 px-2.5 py-1.5 transition ${
              mode === "url" ? "bg-[#0099d6] text-white" : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Link className="h-3 w-3" />
            URL
          </button>
        </div>

        {/* Input row */}
        <div className="flex-1 relative">
          {mode === "url" ? (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://... o /images/..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-mono outline-none focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20"
            />
          ) : (
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`flex w-full cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed px-3 py-2 text-sm transition ${
                dragging
                  ? "border-[#0099d6] bg-[#0099d6]/10 text-[#0099d6]"
                  : "border-gray-200 bg-gray-50 text-gray-400 hover:border-[#0099d6]/50 hover:bg-[#0099d6]/5"
              }`}
            >
              <Upload className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">
                {hasImage && !isHttpUrl && !value.startsWith("http")
                  ? isDataUrl ? "Imagen subida ✓" : value
                  : "Clic o arrastra imagen aquí"}
              </span>
            </div>
          )}
        </div>

        {/* Clear */}
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            title="Quitar imagen"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* Preview */}
      {hasImage && (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-2">
          <div
            className="flex-shrink-0 rounded-md overflow-hidden bg-white border border-gray-100"
            style={{ width: previewWidth, height: previewHeight }}
          >
            <Image
              src={value}
              alt="Preview"
              width={previewWidth}
              height={previewHeight}
              className="h-full w-full object-contain"
              unoptimized
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-600">Vista previa</p>
            <p className="text-xs text-gray-400 truncate max-w-[200px]">
              {isDataUrl ? "Archivo local subido" : value}
            </p>
          </div>
        </div>
      )}

      {!hasImage && (
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-3 py-3">
          <ImageIcon className="h-6 w-6 text-gray-200 flex-shrink-0" />
          <p className="text-xs text-gray-300">Sin imagen seleccionada</p>
        </div>
      )}
    </div>
  )
}
