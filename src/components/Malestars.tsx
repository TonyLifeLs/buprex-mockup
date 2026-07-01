"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"

export function Malestars() {
  const sectionRef = useScrollReveal()
  const malestars = useCMSStore((s) => s.malestars)

  return (
    <section
      id="malestars"
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(145deg,#0f172a_0%,#12243b_45%,#1f3b5a_100%)] py-20 md:py-24"
    >
      <div className="pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="scroll-reveal mx-auto max-w-3xl text-center">
          <Image
            src={malestars.logoImage || "/images/malestars-logo.png"}
            alt="Malestars logo"
            width={340}
            height={96}
            className="mx-auto w-[220px] sm:w-[280px] md:w-[320px]"
            priority
          />
          <p className="mt-6 text-base leading-relaxed text-slate-200/95">{malestars.tagline}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300/75">{malestars.subtitle}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {malestars.items.map((item, i) => (
            <article
              key={item.id}
              className="scroll-reveal rounded-2xl border border-white/15 bg-white/8 p-6 text-center shadow-[0_16px_36px_rgba(2,6,23,0.35)] backdrop-blur-sm"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="mx-auto mb-5 flex h-48 items-center justify-center rounded-2xl bg-white/6 p-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={190}
                  height={190}
                  className="max-h-40 w-auto object-contain"
                />
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-semibold text-white">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-200/80">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
