"use client"

import Image from "next/image"
import { ArrowRight, Users, Droplets, Home } from "lucide-react"
import { LaboHeader, LaboFooter } from "@/components/labosuisse"
import { lsColorsToCSSVars, useLaboSuisseStore } from "@/store/labosuisse"

const pillars = [
  {
    title: "Fórmulas específicas para hombre y mujer",
    body: "Tratamientos desarrollados según las necesidades capilares de cada persona, con presentaciones adaptadas al grado de adelgazamiento del cabello.",
    accent: "var(--brand-crescina)",
    Icon: Users,
  },
  {
    title: "No inyectable, no invasivo",
    body: "Una alternativa dermocosmética de uso tópico que no requiere procedimientos médicos, pensada para actuar de forma progresiva y respetuosa con el cuero cabelludo.",
    accent: "var(--brand-cadu-crex)",
    Icon: Droplets,
  },
  {
    title: "Uso en casa",
    body: "Un tratamiento práctico y fácil de integrar en la rutina diaria, que permite cuidar y estimular el cabello desde casa, con acompañamiento constante durante cada ciclo.",
    accent: "var(--brand-rinfoltina)",
    Icon: Home,
  },
]

const protocol = [
  "Aplicar sobre el cuero cabelludo limpio y seco",
  "Por 5 días consecutivos y se descansan 2",
  "Completar las 4 semanas",
]

const stats = [
  { value: "100%", label: "Eficacia comprobada" },
  { value: "6300", label: "Nuevos cabellos" },
  { value: "8", label: "Patentes suizas y europeas" },
]

function PillarCard({ title, body, accent, Icon }: typeof pillars[number]) {
  return (
    <div
      className="rounded-2xl p-6 shadow-sm"
      style={{ background: "#fff", border: "1px solid var(--ls-gray-200, #e5e5e5)" }}
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

export default function CuidadoCapilarPage() {
  const { colors } = useLaboSuisseStore()

  return (
    <div style={lsColorsToCSSVars(colors)}>
      <main style={{ fontFamily: "var(--font-sans)", background: "#fff" }}>
        <LaboHeader />

        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #fff9eb 0%, #ffffff 60%)",
            paddingTop: "140px",
            paddingBottom: "90px",
          }}
        >
          <div className="ls-container grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-5">
              <span
                className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.18em]"
                style={{ background: "var(--ls-gray-900)", color: "var(--ls-white)" }}
              >
                Cuidado capilar
              </span>
              <h1 className="ls-h1" style={{ color: "var(--ls-gray-900)" }}>
                Tratamiento de Recrecimiento y <span style={{ color: "var(--brand-crescina)" }}>Anticaída capilar</span>
              </h1>
              <p className="ls-p-lg" style={{ color: "var(--ls-gray-700)" }}>
                Este producto dermocosmético ha sido desarrollado para contrarrestar el adelgazamiento y caída del
                cabello, estimulando el recrecimiento fisiológico del cabello.
              </p>
              <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
                Existen muchos productos para la caída del cabello, pero pocos ayudan a reactivar el recrecimiento
                capilar y a fortalecer el folículo desde la raíz como Crescina.{" "}
                <span className="font-semibold" style={{ color: "var(--brand-crescina)" }}>
                  ¡Crescina es la solución!
                </span>
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/labosuisse/cuidado-capilar#protocolos" className="ls-btn ls-btn-primary gap-2">
                  Ver protocolo completo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/labosuisse/tecnologia-transdermica" className="ls-btn ls-btn-tertiary" style={{ color: "var(--ls-gray-900)" }}>
                  Ver tecnología transdérmica
                </a>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-4 text-center"
                    style={{ background: "var(--ls-gray-100)", border: "1px solid var(--ls-gray-300)" }}
                  >
                    <p className="ls-h3 font-bold" style={{ color: "var(--brand-crescina)" }}>
                      {s.value}
                    </p>
                    <p className="ls-p-sm" style={{ color: "var(--ls-gray-700)" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-[32px] blur-3xl"
                style={{ background: "radial-gradient(circle at 70% 20%, #f9e7bf, transparent 55%)" }}
              />
              <div className="relative flex justify-center rounded-[32px] bg-white/70 p-10 shadow-lg backdrop-blur">
                <Image
                  src="/images/derma/crescina1-foto.png"
                  alt="Tratamiento Crescina"
                  width={1000}
                  height={1000}
                  className="h-auto w-full max-w-[360px] object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── TRANSDERMIC BANNER ── */}
        <div
          className="py-3 text-center ls-p-sm font-semibold tracking-[0.18em] uppercase"
          style={{ background: "var(--ls-gray-900)", color: "var(--ls-white)" }}
        >
          NO INJECTIONS, YES TRANSDERMIC TECHNOLOGY
        </div>

        {/* ── PILLARS ── */}
        <section className="py-16 md:py-20" style={{ background: "#fff" }}>
          <div className="ls-container space-y-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                  Ciencia capilar
                </p>
                <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                  Una solución capilar pensada para acompañarte día a día.
                </h2>
              </div>
              <a href="/labosuisse/tecnologia-transdermica" className="ls-btn ls-btn-link">
                Ver tecnología transdérmica
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {pillars.map((pillar) => (
                <PillarCard key={pillar.title} {...pillar} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CRESCINA PHOTO + INTRO ── */}
        <section className="py-16" style={{ background: "var(--ls-gray-100)" }}>
          <div className="ls-container grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative overflow-hidden rounded-[28px] shadow-lg">
              <Image
                src="/images/derma/crescina2-foto.png"
                alt="Crescina tratamiento"
                width={1000}
                height={1000}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                Crescina HFSC 100%
              </p>
              <h3 className="ls-h3" style={{ color: "var(--ls-gray-900)" }}>
                Tratamiento capilar no inyectable de uso en casa
              </h3>
              <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
                Mantener el mismo texto y estructura del tratamiento diario para obtener resultados visibles desde
                las primeras semanas de aplicación continuada.
              </p>
              <a href="#protocolos" className="ls-btn ls-btn-primary w-fit gap-2">
                Ver protocolo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── PROTOCOL ── */}
        <section id="protocolos" className="py-16 md:py-20" style={{ background: "#fff" }}>
          <div className="ls-container grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                Protocolo Crescina
              </p>
              <h3 className="ls-h3" style={{ color: "var(--ls-gray-900)" }}>
                Tratamiento capilar no inyectable de uso en casa.
              </h3>
              <ul className="space-y-3">
                {protocol.map((step) => (
                  <li key={step} className="ls-p flex gap-3" style={{ color: "var(--ls-gray-700)" }}>
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--brand-crescina)" }} />
                    {step}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="ls-p-sm rounded-full bg-white px-3 py-2" style={{ color: "var(--ls-gray-900)", border: "1px solid var(--ls-gray-300)" }}>
                  Protocolos 500 / 1300
                </span>
                <span className="ls-p-sm rounded-full bg-white px-3 py-2" style={{ color: "var(--ls-gray-900)", border: "1px solid var(--ls-gray-300)" }}>
                  Para adelgazamiento moderado o severo
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-lg">
              <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full" style={{ background: "#f9e7bf" }} />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-700)" }}>
                    Datos clínicos
                  </span>
                  <span className="h-2 w-10 rounded-full" style={{ background: "var(--brand-crescina)" }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {["100% eficacia comprobada", "6300 nuevos cabellos", "8 patentes activas", "0% procedimientos invasivos"].map(
                    (stat) => (
                      <div
                        key={stat}
                        className="rounded-2xl bg-white px-4 py-3 shadow-sm"
                        style={{ border: "1px solid var(--ls-gray-200, #e5e5e5)" }}
                      >
                        <p className="ls-p" style={{ color: "var(--ls-gray-900)" }}>
                          {stat}
                        </p>
                      </div>
                    )
                  )}
                </div>
                <p className="ls-p-sm" style={{ color: "var(--ls-gray-600)" }}>
                  Fuente: evaluaciones clínicas internas, Crescina HFSC 100% con seguimiento semanal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA DARK ── */}
        <section className="py-16 md:py-20" style={{ background: "#0f0f0f", color: "#fff" }}>
          <div className="ls-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.7)" }}>
                Pide tu diagnóstico
              </p>
              <h3 className="ls-h2" style={{ color: "#fff" }}>
                Un experto Labo te guía en el protocolo y combina productos Crescina según tu grado de caída.
              </h3>
              <p className="ls-p" style={{ color: "rgba(255,255,255,0.75)" }}>
                Agenda online, recibe instrucciones de aplicación y seguimiento quincenal sin salir de casa.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/labosuisse/cuidado-capilar#agenda" className="ls-btn ls-btn-primary">
                Agendar diagnóstico
              </a>
              <a href="mailto:contacto@labosuisse.cl" className="ls-btn ls-btn-tertiary" style={{ color: "#fff" }}>
                Escribir al equipo
              </a>
            </div>
          </div>
        </section>

        <LaboFooter />
      </main>
    </div>
  )
}

