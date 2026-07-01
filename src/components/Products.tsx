"use client"

import Image from "next/image"
import { ArrowRight, ShieldPlus } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"

export function Products() {
  const sectionRef = useScrollReveal()
  const allProducts = useCMSStore((s) => s.products)
  const adultProducts = allProducts.filter((p) => p.isAdult)
  const pediatricProducts = allProducts.filter((p) => !p.isAdult)

  return (
    <section id="productos" ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#4DA6FF]/14 blur-3xl" />
      <div className="buprex-container relative">
        <div className="scroll-reveal mx-auto max-w-3xl text-center">
          <span className="buprex-section-label">
            <ShieldPlus className="h-4 w-4" />
            Portafolio farmacéutico
          </span>
          <h2 className="mt-5 buprex-section-title">Presentaciones pensadas para cada necesidad</h2>
          <p className="mt-4 buprex-section-copy">
            Catálogo con lectura rápida, imágenes destacadas y una organización sobria para adultos y pediatría.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#4b6686]">
            Línea adultos
          </h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {adultProducts.map((product, i) => (
              <article
                key={product.id}
                className="scroll-reveal grid items-center gap-6 rounded-[1.9rem] border border-[#dbe5f0] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_22px_55px_rgba(10,47,115,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(10,47,115,0.12)] md:grid-cols-[240px_1fr]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex h-52 items-center justify-center rounded-[1.5rem] bg-[#eef5ff] p-5">
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
                  <h4 className="mt-4 font-[var(--font-heading)] text-2xl font-semibold text-[#133161]">
                    {product.name}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-[#5f6f85]">{product.description}</p>
                  <a
                    href="#informacion"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0057B8] transition-all hover:gap-3"
                  >
                    Ver más
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-[#dbe5f0] pt-10">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#4b6686]">
            Línea pediátrica
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pediatricProducts.map((product, i) => (
              <article
                key={product.id}
                className="scroll-reveal rounded-[1.8rem] border border-[#dbe5f0] bg-white p-6 shadow-[0_22px_55px_rgba(10,47,115,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(10,47,115,0.12)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex h-44 items-center justify-center rounded-[1.5rem] bg-[#eef5ff] p-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={170}
                    height={170}
                    className="max-h-36 w-auto object-contain"
                  />
                </div>
                <h4
                  className="mt-5 font-[var(--font-heading)] text-xl font-semibold text-[#133161]"
                >
                  {product.name}
                </h4>
                {product.subtitle && (
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#5f6f85]">
                    {product.subtitle}
                  </p>
                )}
                <p className="mt-3 text-sm leading-7 text-[#5f6f85]">{product.description}</p>
                <a
                  href="#informacion"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0057B8] transition-all hover:gap-3"
                >
                  Ver más
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
