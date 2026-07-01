"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"

export function Products() {
  const sectionRef = useScrollReveal()
  const allProducts = useCMSStore((s) => s.products)
  const adultProducts = allProducts.filter((p) => p.isAdult)
  const pediatricProducts = allProducts.filter((p) => !p.isAdult)

  return (
    <section id="productos" ref={sectionRef} className="bg-slate-100 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="scroll-reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
            Nuestra línea
          </span>
          <h2 className="mt-5 font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Portafolio BUPREX
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Presentaciones para adultos y pediatría con formulaciones orientadas al alivio rápido y confiable.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Línea adultos
          </h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {adultProducts.map((product, i) => (
              <article
                key={product.id}
                className="scroll-reveal grid items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:grid-cols-[220px_1fr]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex h-48 items-center justify-center rounded-xl bg-slate-50 p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="max-h-44 w-auto object-contain"
                  />
                </div>
                <div>
                  {(product.variant || product.subtitle) && (
                    <span
                      className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: product.accentColor || "#0f172a" }}
                    >
                      {product.variant || product.subtitle}
                    </span>
                  )}
                  <h4 className="mt-3 font-[var(--font-heading)] text-2xl font-semibold text-slate-900">
                    {product.name}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-slate-300 pt-10">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Línea pediátrica
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pediatricProducts.map((product, i) => (
              <article
                key={product.id}
                className="scroll-reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex h-40 items-center justify-center rounded-xl bg-slate-50 p-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={170}
                    height={170}
                    className="max-h-36 w-auto object-contain"
                  />
                </div>
                <h4
                  className="mt-4 font-[var(--font-heading)] text-xl font-semibold"
                  style={{ color: product.accentColor }}
                >
                  {product.name}
                </h4>
                {product.subtitle && (
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {product.subtitle}
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{product.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
