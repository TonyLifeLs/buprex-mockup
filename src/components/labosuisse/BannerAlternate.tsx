"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useLaboSuisseStore } from "@/store/labosuisse"

export function BannerAlternate() {
  const { banner } = useLaboSuisseStore()

  return (
    <section id="descubre" className="overflow-hidden" style={{ backgroundColor: "var(--ls-gray-100)" }}>
      <div className="ls-container">
        <div className="flex flex-col md:flex-row min-h-[400px]">
          {/* Image panel */}
          <div className="group relative w-full md:w-[570px] md:shrink-0 min-h-[300px] md:min-h-[400px] overflow-hidden">
            <Image
              src={banner.image}
              alt={banner.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width:768px) 100vw, 570px"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(120deg, rgba(0,0,0,0.18) 0%, transparent 55%)" }}
            />
          </div>

          {/* Infobox */}
          <div
            className="flex flex-1 flex-col justify-center px-8 py-14 md:px-16"
            style={{ backgroundColor: "var(--ls-white, #fff)" }}
          >
            <span
              className="ls-p-sm mb-3 font-bold tracking-[0.25em] uppercase"
              style={{ color: "var(--ls-red-700)" }}
            >
              {banner.superlabel}
            </span>
            <h2 className="ls-h2 mb-5" style={{ color: "var(--ls-black, #000)" }}>
              {banner.title}
              <br />
              <em className="not-italic" style={{ color: "var(--ls-red-700)" }}>
                {banner.titleAccent}
              </em>
            </h2>
            <p className="ls-p mb-8 max-w-md" style={{ color: "var(--ls-gray-700)" }}>
              {banner.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={banner.cta1Href}
                className="ls-btn group gap-2"
                style={{
                  backgroundColor: "var(--ls-red-700)",
                  borderColor: "var(--ls-red-700)",
                  color: "var(--ls-white)",
                  padding: "14px 26px",
                }}
              >
                {banner.cta1Label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={banner.cta2Href} className="ls-btn ls-btn-secondary">
                {banner.cta2Label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
