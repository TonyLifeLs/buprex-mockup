"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useLaboSuisseStore } from "@/store/labosuisse"

export function NewsCarousel() {
  const { news } = useLaboSuisseStore()
  const [page, setPage] = useState(0)
  const perPage = 2
  const totalPages = Math.ceil(news.items.length / perPage)
  const visible = news.items.slice(page * perPage, page * perPage + perPage)

  return (
    <section id="noticias" style={{ backgroundColor: "var(--ls-gray-100)" }}>
      <div className="ls-container py-20">
        {/* Header + controls */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span
              className="ls-p-sm mb-2 block font-bold tracking-[0.3em] uppercase"
              style={{ color: "var(--ls-red-700)" }}
            >
              {news.superlabel}
            </span>
            <h2 className="ls-h2" style={{ color: "var(--ls-black, #000)" }}>{news.sectionTitle}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
              className="flex h-10 w-10 items-center justify-center border transition-all"
              style={{ borderColor: "var(--ls-gray-300)", color: "var(--ls-gray-700)" }}
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPage((p) => (p + 1) % totalPages)}
              className="flex h-10 w-10 items-center justify-center border transition-all"
              style={{ borderColor: "var(--ls-gray-300)", color: "var(--ls-gray-700)" }}
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 2 cards per slide */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {visible.map((n) => (
            <article
              key={n.id}
              className="group flex flex-col overflow-hidden"
              style={{ backgroundColor: "var(--ls-white, #fff)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={n.image}
                  alt={n.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, 50vw"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
                />
                <span
                  className="absolute top-4 left-4 px-3 py-1 text-[11px] font-bold tracking-[0.12em] uppercase"
                  style={{ backgroundColor: "var(--ls-red-700)", color: "var(--ls-white, #fff)" }}
                >
                  {n.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="ls-p-sm mb-2" style={{ color: "var(--ls-gray-500)" }}>{n.date}</span>
                <h3 className="ls-h5 mb-3 line-clamp-2" style={{ color: "var(--ls-black, #000)" }}>{n.title}</h3>
                <p className="ls-p-sm mb-5 flex-1 line-clamp-3" style={{ color: "var(--ls-gray-700)" }}>{n.excerpt}</p>
                <a
                  href={n.href}
                  className="ls-btn self-start group/link gap-2"
                  style={{
                    padding: "12px 22px",
                    backgroundColor: "var(--ls-red-700)",
                    borderColor: "var(--ls-red-700)",
                    color: "var(--ls-white)",
                  }}
                >
                  Leer artículo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Page indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Página ${i + 1}`}
              style={{
                height: "2px",
                width: i === page ? "32px" : "12px",
                backgroundColor: i === page ? "var(--ls-black, #000)" : "var(--ls-gray-300)",
                transition: "width 0.3s",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
