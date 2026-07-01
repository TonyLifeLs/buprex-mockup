"use client"

import type { LucideIcon } from "lucide-react"
import { Activity, Brain, Pill, Thermometer, Wind, Waves, ShieldCheck } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"

const symptomIcons: Array<{ match: RegExp; icon: LucideIcon }> = [
  { match: /muscular|espalda/i, icon: Activity },
  { match: /cabeza|migra/i, icon: Brain },
  { match: /garganta/i, icon: Pill },
  { match: /fiebre/i, icon: Thermometer },
  { match: /gripal|gripe/i, icon: Wind },
]

export function Symptoms() {
  const sectionRef = useScrollReveal()
  const symptoms = useCMSStore((s) => s.symptoms)

  return (
    <section id="para-que-sirve" ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(77,166,255,0.12),transparent)]" />
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#4DA6FF]/16 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#0057B8]/8 blur-3xl" />

      <div className="buprex-container relative">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start">
          <div className="scroll-reveal buprex-card rounded-[2rem] p-8">
            <span className="buprex-section-label">
              <ShieldCheck className="h-4 w-4" />
              Uso frecuente
            </span>
            <h2 className="mt-6 font-[var(--font-heading)] text-3xl font-extrabold tracking-[-0.03em] text-[#133161] md:text-4xl text-balance">
              ¿Para qué sirve BUPREX?
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5f6f85]">
              BUPREX acompaña el alivio del dolor y la fiebre con una experiencia clara, confiable y fácil de consultar.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                "Acción analgésica de rápida respuesta",
                "Apoyo antipirético para cuadros febriles",
                "Presentaciones pensadas para adultos y niños",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.25rem] border border-[#dbe5f0] bg-[#f7fbff] px-4 py-4"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0057B8]/10 text-[#0057B8]">
                    <Waves className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-6 text-[#45607f]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {symptoms.map((symptom, i) => {
              const Icon = symptomIcons.find(({ match }) => match.test(symptom.title))?.icon || Activity

              return (
                <article
                  key={symptom.id}
                  className="scroll-reveal group rounded-[1.75rem] border border-[#dbe5f0] bg-white/96 p-6 shadow-[0_20px_50px_rgba(10,47,115,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(10,47,115,0.12)]"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] transition-transform group-hover:scale-105"
                    style={{
                      color: symptom.accentColor,
                      backgroundColor: symptom.accentColor + "14",
                    }}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-[var(--font-heading)] text-xl font-semibold text-[#133161]">
                    {symptom.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5f6f85]">
                    {symptom.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
