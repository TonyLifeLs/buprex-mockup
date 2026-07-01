"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ArrowRight, Newspaper } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"
import type { ArticleItem } from "@/store/cms"

export function Articles() {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null)
  const articles = useCMSStore((s) => s.articles)
  const sectionRef = useScrollReveal(0.15, [articles.length])

  return (
    <section id="articulos" ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute left-0 top-10 h-72 w-72 rounded-full bg-[#0057B8]/8 blur-3xl" />
      <div className="buprex-container relative">
        <div className="scroll-reveal mx-auto max-w-2xl text-center">
          <span className="buprex-section-label">
            <Newspaper className="h-4 w-4" />
            Lectura recomendada
          </span>
          <h2 className="mt-5 buprex-section-title text-balance">Artículos destacados con enfoque médico</h2>
          <p className="mt-4 buprex-section-copy">
            Un bloque editorial con diseño sobrio, visual limpio y acceso rápido al contenido completo.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {articles.map((article, i) => (
            <article
              key={article.id}
              className="article-card-reveal group relative cursor-pointer overflow-hidden rounded-[1.85rem] border border-[#dbe5f0] bg-white shadow-[0_22px_55px_rgba(10,47,115,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(10,47,115,0.12)]"
              style={{ animationDelay: `${i * 120}ms` }}
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-[#dbe5f0]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041538]/35 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <span className="inline-flex rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-semibold text-[#0057B8]">
                  {article.category}
                </span>
                <h3 className="mt-4 font-[var(--font-heading)] text-lg font-semibold leading-tight text-[#133161] md:text-xl text-pretty">
                  {article.title}
                  {article.subtitle && (
                    <>
                      <br />
                      <span className="text-base font-medium text-[#5f6f85] md:text-lg">{article.subtitle}</span>
                    </>
                  )}
                </h3>
                <button
                  type="button"
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#0057B8] transition-all hover:gap-3"
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
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-[#dbe5f0] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 overflow-hidden rounded-t-[2rem] border-b border-[#dbe5f0] md:h-72">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041538]/82 via-[#082f73]/38 to-transparent" />

              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute bottom-4 left-6">
                <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#133161]">
                  {selectedArticle.category}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-[#133161] md:text-3xl text-balance">
                {selectedArticle.title}
                {selectedArticle.subtitle && (
                  <span className="block text-xl font-medium text-[#5f6f85] md:text-2xl">
                    {selectedArticle.subtitle}
                  </span>
                )}
              </h2>

              <p className="mt-4 text-base leading-8 text-[#5f6f85]">
                {selectedArticle.intro}
              </p>

              <div className="mt-8">
                <h3 className="font-[var(--font-heading)] text-lg font-bold text-[#133161]">
                  Causas principales
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {selectedArticle.causes.split("\n").filter(Boolean).map((cause, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-7 text-[#5f6f85]">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#0057B8]" />
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="font-[var(--font-heading)] text-lg font-bold text-[#133161]">
                  Soluciones y recomendaciones
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {selectedArticle.solutions.split("\n").filter(Boolean).map((solution, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-7 text-[#5f6f85]">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#4DA6FF]" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-[#dbe5f0] bg-[#f7fbff] p-5">
                <p className="text-sm font-semibold text-[#133161]">
                  Consejo BUPREX
                </p>
                <p className="mt-2 text-sm leading-7 text-[#5f6f85]">
                  {selectedArticle.tip}
                </p>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="mt-8 w-full rounded-full bg-[#0057B8] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0a2f73]"
              >
                Cerrar artículo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
