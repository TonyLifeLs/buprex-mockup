"use client"

import { ArrowRight } from "lucide-react"
import { useLaboSuisseStore } from "@/store/labosuisse"

export function BrandIntro() {
  const { brandIntro } = useLaboSuisseStore()

  return (
    <section
      id="tecnologia"
      style={{ backgroundColor: "var(--ls-white, #fff)", borderBottom: "1px solid var(--ls-gray-100)" }}
    >
      <div className="ls-container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="ls-p-sm mb-4 inline-block font-bold tracking-[0.3em] uppercase"
            style={{ color: "var(--ls-red-700)" }}
          >
            {brandIntro.superlabel}
          </span>
          <h2 className="ls-h2 mb-6" style={{ color: "var(--ls-black, #000)" }}>
            {brandIntro.title}
            <br />
            <em className="not-italic" style={{ color: "var(--ls-red-700)" }}>
              {brandIntro.titleAccent}
            </em>
          </h2>
          <p className="ls-p-lg mx-auto mb-8 max-w-2xl" style={{ color: "var(--ls-gray-700)" }}>
            {brandIntro.description}
          </p>
          <a href={brandIntro.ctaHref} className="ls-btn-link text-base">
            {brandIntro.ctaLabel} <ArrowRight className="inline h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
