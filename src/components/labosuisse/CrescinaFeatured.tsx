"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useLaboSuisseStore } from "@/store/labosuisse"

export function CrescinaFeatured() {
  const { crescinaFeatured } = useLaboSuisseStore()

  return (
    <section id="capilar" style={{ backgroundColor: "var(--ls-gray-100)" }}>
      <div className="ls-container py-20">
        {/* Section header */}
        <div className="mb-12 text-center">
          <span
            className="ls-p-sm mb-2 inline-block font-bold tracking-[0.3em] uppercase"
            style={{ color: "var(--ls-red-700)" }}
          >
            {crescinaFeatured.superlabel}
          </span>
          <h2 className="ls-h2" style={{ color: "var(--ls-black, #000)" }}>
            {crescinaFeatured.sectionTitle}
          </h2>
        </div>

        {/* Two-card layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Main featured card */}
          <article
            className="group relative overflow-hidden flex flex-col justify-end min-h-[380px] transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--brand-crescina)" }}
            aria-label={crescinaFeatured.mainTitle}
          >
            <div className="absolute inset-0">
              <Image
                src={crescinaFeatured.mainImage}
                alt={crescinaFeatured.mainImageAlt}
                fill
                className="object-cover opacity-40 transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width:768px) 100vw, 50vw"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0" }}
              />
            </div>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)" }}
            />
            <div className="relative z-10 p-8">
              <span
                className="mb-2 inline-block px-2 py-0.5 text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{ backgroundColor: "var(--brand-crescina)", color: "var(--ls-gray-900)" }}
              >
                {crescinaFeatured.mainSubtitle}
              </span>
              <h3 className="ls-h3 mb-3" style={{ color: "var(--ls-white, #fff)" }}>
                {crescinaFeatured.mainTitle}
              </h3>
              <p className="ls-p-sm mb-6 max-w-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                {crescinaFeatured.mainDescription}
              </p>
              <a href={crescinaFeatured.mainCtaHref} className="ls-btn ls-btn-primary gap-2">
                {crescinaFeatured.mainCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </article>

          {/* Supporting cards */}
          <div className="flex flex-col gap-6">
            {crescinaFeatured.supportingCards.map((card) => (
              <article
                key={card.id}
                className="group flex overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
                style={{ backgroundColor: "var(--ls-white, #fff)" }}
              >
                <div
                  className="w-2 shrink-0 transition-all duration-300 group-hover:w-3"
                  style={{ backgroundColor: card.accentBg }}
                />
                <div className="flex flex-1 flex-col justify-center p-6">
                  <span
                    className="ls-p-sm mb-1 font-bold tracking-[0.15em] uppercase"
                    style={{ color: "var(--ls-gray-500)" }}
                  >
                    {card.subtitle}
                  </span>
                  <h4 className="ls-h5 mb-2" style={{ color: "var(--ls-black, #000)" }}>{card.title}</h4>
                  <p className="ls-p-sm mb-4" style={{ color: "var(--ls-gray-700)" }}>{card.description}</p>
                  <a href="#capilar" className="ls-btn-link self-start text-[13px]">
                    Ver producto <ArrowRight className="inline h-3.5 w-3.5 ml-0.5" />
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
