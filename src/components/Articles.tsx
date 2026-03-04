"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ArrowRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"
import type { ArticleItem } from "@/store/cms"

export function Articles() {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null)
  const sectionRef = useScrollReveal()
  const articles = useCMSStore((s) => s.articles)

  return (
    <section id="articulos" ref={sectionRef} className="bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="scroll-reveal mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-[#0099d6] px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            Blog
          </span>
          <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Artículos de Salud
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Información útil para cuidar tu bienestar y el de tu familia.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="mt-14 grid grid-cols-1 gap-1 sm:grid-cols-2">
          {articles.map((article, i) => (
            <article
              key={article.id}
              className="scroll-reveal-scale group relative cursor-pointer overflow-hidden"
              style={{ transitionDelay: `${i * 120}ms` }}
              onClick={() => setSelectedArticle(article)}
            >
              {/* Full bleed image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Content overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 md:p-8">
                  <h3 className="font-[var(--font-heading)] text-lg font-bold uppercase leading-tight text-white md:text-xl text-pretty">
                    {article.title}
                    {article.subtitle && (
                      <>
                        <br />
                        <span className="text-base font-semibold text-white/90 md:text-lg">
                          {article.subtitle}
                        </span>
                      </>
                    )}
                  </h3>
                  <button
                    type="button"
                    className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#e31e24] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#c4191e] hover:gap-3"
                  >
                    Leer mas
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal/Panel */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header with image */}
            <div className="relative h-56 overflow-hidden rounded-t-3xl md:h-72">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Close button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Category badge */}
              <div className="absolute bottom-4 left-6">
                <span className="rounded-full bg-[#0099d6] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  {selectedArticle.category}
                </span>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-6 md:p-10">
              <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground md:text-3xl text-balance">
                {selectedArticle.title}
                {selectedArticle.subtitle && (
                  <span className="block text-xl font-semibold text-muted-foreground md:text-2xl">
                    {selectedArticle.subtitle}
                  </span>
                )}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {selectedArticle.intro}
              </p>

              {/* Causes */}
              <div className="mt-8">
                <h3 className="font-[var(--font-heading)] text-lg font-bold text-foreground">
                  Causas principales
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {selectedArticle.causes.split("\n").filter(Boolean).map((cause, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#e31e24]" />
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="mt-8">
                <h3 className="font-[var(--font-heading)] text-lg font-bold text-foreground">
                  Soluciones y recomendaciones
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {selectedArticle.solutions.split("\n").filter(Boolean).map((solution, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0099d6]" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>

              {/* BUPREX Tip */}
              <div className="mt-8 rounded-2xl border border-[#0099d6]/20 bg-[#0099d6]/5 p-5">
                <p className="text-sm font-semibold text-[#0c3d6e]">
                  Consejo BUPREX
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {selectedArticle.tip}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="mt-8 w-full rounded-full bg-[#0c3d6e] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#0b2a4a]"
              >
                Cerrar articulo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
