"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ArrowRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"
import type { ArticleItem } from "@/store/cms"

export function Articles() {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null)
  const articles = useCMSStore((s) => s.articles)
  const sectionRef = useScrollReveal(0.15, [articles.length])

  return (
    <section id="articulos" ref={sectionRef} className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="scroll-reveal mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full border border-slate-300 bg-slate-100 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
            Blog
          </span>
          <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl text-balance">
            Artículos de Salud
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Información útil para cuidar tu bienestar y el de tu familia.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {articles.map((article, i) => (
            <article
              key={article.id}
              className="article-card-reveal group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${i * 120}ms` }}
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-slate-200">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {article.category}
                </span>
                <h3 className="mt-3 font-[var(--font-heading)] text-lg font-semibold leading-tight text-slate-900 md:text-xl text-pretty">
                  {article.title}
                  {article.subtitle && (
                    <>
                      <br />
                      <span className="text-base font-medium text-slate-600 md:text-lg">{article.subtitle}</span>
                    </>
                  )}
                </h3>
                <button
                  type="button"
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-800 transition-all hover:gap-3 hover:text-[#0c3d6e]"
                >
                  Leer más
                  <ArrowRight className="h-4 w-4" />
                </button>
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
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header with image */}
            <div className="relative h-56 overflow-hidden rounded-t-3xl border-b border-slate-200 md:h-72">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/35 to-transparent" />

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
                <span className="rounded-full bg-slate-100/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-800">
                  {selectedArticle.category}
                </span>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-6 md:p-10">
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-slate-900 md:text-3xl text-balance">
                {selectedArticle.title}
                {selectedArticle.subtitle && (
                  <span className="block text-xl font-medium text-slate-600 md:text-2xl">
                    {selectedArticle.subtitle}
                  </span>
                )}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {selectedArticle.intro}
              </p>

              {/* Causes */}
              <div className="mt-8">
                <h3 className="font-[var(--font-heading)] text-lg font-bold text-foreground">
                  Causas principales
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {selectedArticle.causes.split("\n").filter(Boolean).map((cause, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-900" />
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
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0c3d6e]" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>

              {/* BUPREX Tip */}
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Consejo BUPREX
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {selectedArticle.tip}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="mt-8 w-full rounded-full bg-slate-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
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
