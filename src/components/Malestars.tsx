"use client"

import type { LucideIcon } from "lucide-react"
import { Flame, ShieldAlert, Sparkles, Thermometer, Waves } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"

const malestarIcons: Array<{ match: RegExp; icon: LucideIcon }> = [
  { match: /fieb/i, icon: Thermometer },
  { match: /inflam/i, icon: Flame },
  { match: /dolor/i, icon: Waves },
]

export function Malestars() {
  const sectionRef = useScrollReveal()
  const malestars = useCMSStore((s) => s.malestars)

  return (
    <section
      id="malestars"
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_100%)] py-20 md:py-24"
    >
      <div className="pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full bg-[#4DA6FF]/14 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-[#0057B8]/10 blur-3xl" />

      <div className="buprex-container relative z-10">
        <div className="scroll-reveal mx-auto max-w-3xl text-center">
          <span className="buprex-section-label">
            <Sparkles className="h-4 w-4" />
            Malestares frecuentes
          </span>
          <h2 className="mt-6 font-[var(--font-heading)] text-3xl font-extrabold tracking-[-0.03em] text-[#133161] md:text-5xl">
            Categorías de malestares con lectura clara y profesional
          </h2>
          <p className="mt-5 text-base leading-8 text-[#5f6f85]">{malestars.tagline}</p>
          <p className="mt-3 text-sm leading-7 text-[#6b7d95]">{malestars.subtitle}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {malestars.items.map((item, i) => {
            const Icon = malestarIcons.find(({ match }) => match.test(item.name))?.icon || ShieldAlert

            return (
              <article
                key={item.id}
                className="scroll-reveal rounded-[1.9rem] border border-[#dbe5f0] bg-white p-7 shadow-[0_22px_55px_rgba(10,47,115,0.08)]"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.35rem] bg-[linear-gradient(135deg,#0057B8_0%,#4DA6FF_100%)] text-white shadow-[0_20px_40px_rgba(0,87,184,0.22)]">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-[var(--font-heading)] text-2xl font-semibold text-[#133161]">{item.name}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f6f85]">{item.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
