"use client"

import Image from "next/image"
import { ArrowRight, Sparkles, Droplets, ShieldCheck } from "lucide-react"
import { LaboHeader, LaboFooter } from "@/components/labosuisse"
import { lsColorsToCSSVars, useLaboSuisseStore } from "@/store/labosuisse"

const highlights = [
  {
    title: "Relleno visible sin agujas",
    body: "12 tipos de ácido hialurónico y péptidos que penetran por tecnología transdérmica.",
    accent: "var(--brand-fillerina-12sp)",
    Icon: Sparkles,
  },
  {
    title: "Protocolos de 14 días",
    body: "Rutinas guiadas con dosis exactas para volumen en pómulos, labios y contorno.",
    accent: "var(--brand-fillerina-color)",
    Icon: Droplets,
  },
  {
    title: "Dermotolerancia probada",
    body: "Fórmulas sin agujas, sin parabenos y testeadas dermatológicamente para uso en casa.",
    accent: "var(--ls-gray-100)",
    Icon: ShieldCheck,
  },
]

const routines = [
  {
    title: "Hidratación profunda",
    steps: ["Limpieza suave", "Dosis de Fillerina 12HA", "Sellado con crema nutritiva"],
    accent: "var(--brand-fillerina-12sp)",
  },
  {
    title: "Rejuvenecimiento nocturno",
    steps: ["Serum transdérmico", "Máscara retexturizante", "Puntos de luz en contorno"],
    accent: "var(--brand-fillerina-color)",
  },
  {
    title: "Luminosidad inmediata",
    steps: ["Peeling suave", "Fillerina Sun Bright", "Mist antioxidante"],
    accent: "var(--brand-fillerina-sun)",
  },
]

function FeatureCard({ title, body, accent, Icon }: typeof highlights[number]) {
  return (
    <div
      className="rounded-2xl p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1"
      style={{ background: "#ffffff", border: "1px solid var(--ls-gray-100)" }}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: accent }}>
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
          {title}
        </h3>
      </div>
      <p className="ls-p mt-3" style={{ color: "var(--ls-gray-700)" }}>
        {body}
      </p>
    </div>
  )
}

function RoutineCard({ title, steps, accent }: (typeof routines)[number]) {
  return (
    <div
      className="rounded-2xl p-6 h-full"
      style={{ background: "var(--ls-gray-100)", border: "1px solid var(--ls-gray-300)" }}
    >
      <div className="flex items-center justify-between">
        <h4 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
          {title}
        </h4>
        <span className="h-2 w-10 rounded-full" style={{ background: accent }} aria-hidden="true" />
      </div>
      <ul className="mt-4 space-y-2">
        {steps.map((step) => (
          <li
            key={step}
            className="ls-p flex items-center gap-2"
            style={{ color: "var(--ls-gray-700)" }}
          >
            <span
              className="h-1.5 w-4 rounded-full"
              style={{ background: accent, display: "inline-block" }}
              aria-hidden="true"
            />
            {step}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CuidadoDeLaPielPage() {
  const { colors } = useLaboSuisseStore()

  return (
    <div style={lsColorsToCSSVars(colors)}>
      <main style={{ fontFamily: "var(--font-sans)", background: "#fff" }}>
        <LaboHeader />

        <section
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #fdf3f7 0%, #ffffff 55%)",
            paddingTop: "140px",
            paddingBottom: "96px",
          }}
        >
          <div className="ls-container grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-5">
              <span
                className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.18em]"
                style={{ background: "var(--ls-gray-900)", color: "var(--ls-white)" }}
              >
                Cuidado de la piel
              </span>
              <div className="space-y-3">
                <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                  Relleno · Luminosidad · Firmeza
                </p>
                <h1 className="ls-h1" style={{ color: "var(--ls-gray-900)" }}>
                  Laboratorio facial con la estética <span style={{ color: "var(--ls-red-700)" }}>sin agujas</span>
                </h1>
                <p className="ls-p-lg" style={{ color: "var(--ls-gray-700)" }}>
                  Protocolos inspirados en la cabina profesional: más volumen en pómulos y labios, piel luminosa y
                  firme, todo con tecnología transdérmica patentada.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/labosuisse/descubre-labo" className="ls-btn ls-btn-primary gap-2">
                  Explorar rituales
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/labosuisse"
                  className="ls-btn ls-btn-tertiary"
                  style={{ color: "var(--ls-gray-900)" }}
                >
                  Ver línea completa
                </a>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                {[
                  "12 moléculas de HA", "Efecto volumen pómulos/labios", "Test clínicos en uso doméstico",
                ].map((item) => (
                  <span
                    key={item}
                    className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-2"
                    style={{ background: "var(--ls-gray-100)", color: "var(--ls-gray-700)" }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: "var(--ls-red-700)" }} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-[32px] blur-3xl"
                style={{ background: "radial-gradient(circle at 30% 30%, #f8dce8, transparent 55%)" }}
              />
              <div className="relative flex justify-center rounded-[32px] bg-white/60 p-8 shadow-lg backdrop-blur">
                <Image
                  src="/images/fillerina-product.webp"
                  alt="Tratamiento Fillerina"
                  width={480}
                  height={520}
                  className="h-auto w-full max-w-[360px] object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20" style={{ background: "#fff" }}>
          <div className="ls-container space-y-10">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Resultados clínicos
              </p>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                  Fórmulas dermocosméticas listas para cabina… y para casa.
                </h2>
                <a href="/labosuisse/tecnologia-transdermica" className="ls-btn ls-btn-link">
                  Cómo penetra la fórmula
                </a>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {highlights.map((item) => (
                <FeatureCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16" style={{ background: "var(--ls-gray-100)" }}>
          <div className="ls-container space-y-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                  Protocolos guiados
                </p>
                <h3 className="ls-h3" style={{ color: "var(--ls-gray-900)" }}>
                  Tres rutinas diseñadas por Labo para una piel con volumen y luz.
                </h3>
              </div>
              <a href="/labosuisse/cuidado-de-la-piel#shop" className="ls-btn ls-btn-primary">
                Comprar kits
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {routines.map((routine) => (
                <RoutineCard key={routine.title} {...routine} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20" style={{ background: "#0f0f0f", color: "#fff" }}>
          <div className="ls-container grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-4">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.7)" }}>
                Test de eficacia
              </p>
              <h3 className="ls-h2" style={{ color: "#fff" }}>
                +21% de volumen en pómulos y +14% en labios después de 14 días de aplicación controlada.
              </h3>
              <p className="ls-p" style={{ color: "rgba(255,255,255,0.75)" }}>
                Estudios clínicos internos con voluntarias de 35 a 55 años. Aplicación diaria siguiendo el protocolo
                Fillerina 12HA. Resultados visibles desde las primeras semanas.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="ls-p-sm rounded-full bg-white/10 px-3 py-2">Sin agujas</span>
                <span className="ls-p-sm rounded-full bg-white/10 px-3 py-2">Dermatológicamente testeado</span>
                <span className="ls-p-sm rounded-full bg-white/10 px-3 py-2">Uso doméstico seguro</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Ensayo clínico
                  </span>
                  <span className="h-2 w-10 rounded-full" style={{ background: "var(--ls-red-700)" }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {["+21% volumen pómulos", "+14% volumen labios", "100% tolerancia", "Sin downtime"].map(
                    (stat) => (
                      <div key={stat} className="rounded-2xl bg-white/5 px-4 py-3">
                        <p className="ls-p" style={{ color: "#fff" }}>
                          {stat}
                        </p>
                      </div>
                    )
                  )}
                </div>
                <p className="ls-p-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Fuente: estudios internos Labo Suisse con protocolo de 14 días, aplicación diaria en rostro y cuello.
                </p>
              </div>
            </div>
          </div>
        </section>

        <LaboFooter />
      </main>
    </div>
  )
}
