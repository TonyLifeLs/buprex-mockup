"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useLaboSuisseStore } from "@/store/labosuisse"

export function CategoriesGrid() {
  const { categories } = useLaboSuisseStore()

  return (
    <section id="productos" style={{ backgroundColor: "var(--ls-white, #fff)" }}>
      <span id="piel" aria-hidden="true" style={{ position: "absolute", visibility: "hidden" }} />
      <div className="ls-container py-20">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span
            className="ls-p-sm mb-2 inline-block font-bold tracking-[0.3em] uppercase"
            style={{ color: "var(--ls-red-700)" }}
          >
            {categories.superlabel}
          </span>
          <h2 className="ls-h2 mb-4" style={{ color: "var(--ls-black, #000)" }}>
            {categories.sectionTitle}
          </h2>
          <div
            className="mx-auto"
            style={{ width: "48px", height: "2px", backgroundColor: "var(--ls-red-700)" }}
          />
        </div>

        {/* Categories grid */}
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
          role="list"
          aria-label="Categorías de productos"
        >
          {categories.categories.map((card) => (
            <article
              key={card.id}
              role="listitem"
              className="group relative overflow-hidden flex flex-col justify-end min-h-[320px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-[3px]"
              style={{ backgroundColor: card.bg }}
            >
              <div className="absolute inset-0">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0" }}
                />
              </div>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.05) 60%)" }}
              />
              <div className="relative z-10 p-6">
                <h3 className="ls-h5 mb-2" style={{ color: "var(--ls-white, #fff)" }}>{card.label}</h3>
                <p
                  className="ls-p-sm mb-4"
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {card.description}
                </p>
                <a
                  href={card.href}
                  className="inline-flex items-center gap-2 text-[13px] font-bold tracking-wide uppercase transition-all duration-200"
                  style={{
                    backgroundColor: "var(--ls-red-700)",
                    color: "var(--ls-white, #fff)",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.16)",
                  }}
                  aria-label={`Ir a ${card.label}`}
                >
                  Ver más
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Brands subsection */}
        <div className="mt-16 pt-12" style={{ borderTop: "1px solid var(--ls-gray-100)" }}>
          <div className="mb-10 text-center">
            <span
              className="ls-p-sm mb-2 inline-block font-bold tracking-[0.3em] uppercase"
              style={{ color: "var(--ls-red-700)" }}
            >
              {categories.brandsSuperlabel}
            </span>
            <h3 id="marcas" className="ls-h3" style={{ color: "var(--ls-black, #000)" }}>
              {categories.brandsSectionTitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {categories.brands.map((c) => (
              <article
                key={c.id}
                className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
              >
                <div
                  className="h-44 w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ backgroundColor: c.bg }}
                >
                  <span
                    className="ls-h3 font-black uppercase tracking-widest opacity-25 select-none"
                    style={{ color: "var(--ls-black, #000)" }}
                  >
                    {c.brand}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6" style={{ backgroundColor: "var(--ls-gray-100)" }}>
                  <h4 className="ls-h5 mb-2" style={{ color: "var(--ls-black, #000)" }}>{c.brand}</h4>
                  <p className="ls-p-sm mb-4 flex-1" style={{ color: "var(--ls-gray-700)" }}>{c.description}</p>
                  <a href={c.href} className="ls-btn ls-btn-primary self-start" style={{ padding: "10px 20px" }}>
                    Explorar
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
