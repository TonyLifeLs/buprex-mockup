"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"

export function Symptoms() {
  const sectionRef = useScrollReveal()
  const symptoms = useCMSStore((s) => s.symptoms)

  return (
    <section id="para-que-sirve" ref={sectionRef} className="relative overflow-hidden bg-slate-50 py-20 md:py-28">
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-slate-200/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
          <div className="scroll-reveal rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mx-auto w-fit rounded-2xl bg-slate-100 p-4">
              <Image
                src="/images/malestars.all.png"
                alt="Mascota BUPREX"
                width={220}
                height={220}
                className="mx-auto w-[180px] sm:w-[200px]"
              />
            </div>
            <h2 className="mt-6 text-center font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl text-balance">
              {"¿Para qué sirve?"}
            </h2>
            <p className="mt-3 text-center text-base leading-relaxed text-slate-600">
              BUPREX posee propiedades analgésicas y antipiréticas, efectivo en múltiples tipos de dolor.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {symptoms.map((symptom, i) => (
              <div
                key={symptom.id}
                className="scroll-reveal group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="relative mx-auto h-20 w-20 shrink-0 overflow-hidden rounded-2xl border p-2 transition-transform group-hover:scale-105"
                  style={{
                    borderColor: symptom.accentColor + "40",
                    backgroundColor: symptom.accentColor + "12",
                  }}
                >
                  <Image
                    src={symptom.image}
                    alt={symptom.title}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <h3 className="mt-4 font-[var(--font-heading)] text-base font-semibold text-slate-900">
                  {symptom.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {symptom.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
