"use client"

import Image from "next/image"
import { ArrowRight, Droplets, ActivitySquare, TestTubes } from "lucide-react"
import { LaboHeader, LaboFooter } from "@/components/labosuisse"
import { lsColorsToCSSVars, useLaboSuisseStore } from "@/store/labosuisse"

const pillars = [
  {
    title: "Estimula el recrecimiento",
    body: "Complejo HFSC y factores de crecimiento que activan el folículo en fases inactivas.",
    accent: "var(--brand-crescina)",
    Icon: ActivitySquare,
  },
  {
    title: "Refuerza la fibra",
    body: "Aminoácidos queratínicos y péptidos para densificar y mejorar la estructura capilar.",
    accent: "var(--brand-cadu-crex)",
    Icon: TestTubes,
  },
  {
    title: "Higiene inteligente",
    body: "Limpieza delicada que no altera el cuero cabelludo y acompaña el tratamiento activo.",
    accent: "var(--brand-rinfoltina)",
    Icon: Droplets,
  },
]

const protocol = [
  "Aplicar las ampollas Crescina HFSC 100% en cuero cabelludo seco, 5 días a la semana",
  "Masajear 2 minutos para activar la microcirculación y favorecer la absorción",
  "Lavar con Crescina Shampoo dos veces por semana para mantener el cuero cabelludo equilibrado",
  "Completar un ciclo de 3 meses y repetir en mantenimiento según necesidad",
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
                Recrecimiento capilar clínicamente demostrado con <span style={{ color: "var(--brand-crescina)" }}>Crescina HFSC</span>
              </h1>
              <p className="ls-p-lg" style={{ color: "var(--ls-gray-700)" }}>
                Protocolos domiciliarios que reactivan el folículo, frenan la caída y densifican el cabello sin dejar
                residuo graso.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/labosuisse/cuidado-capilar#protocolos" className="ls-btn ls-btn-primary gap-2">
                  Ver protocolo completo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/labosuisse" className="ls-btn ls-btn-tertiary" style={{ color: "var(--ls-gray-900)" }}>
                  Más líneas Labo
                </a>
              </div>
              <div className="flex flex-wrap gap-4 pt-3">
                {["100% de eficacia testada", "Para hombre y mujer", "Uso diario sin engrase"].map((item) => (
                  <span
                    key={item}
                    className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-2"
                    style={{ background: "var(--ls-gray-100)", color: "var(--ls-gray-700)" }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: "var(--brand-crescina)" }} />
                    {item}
                  </span>
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
                  src="/images/crescina-product.webp"
                  alt="Tratamiento Crescina"
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
          <div className="ls-container space-y-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                  Ciencia capilar
                </p>
                <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                  Tres pilares que trabajan juntos en cada ciclo.
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

        <section id="protocolos" className="py-16" style={{ background: "var(--ls-gray-100)" }}>
          <div className="ls-container grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                Protocolo Crescina
              </p>
              <h3 className="ls-h3" style={{ color: "var(--ls-gray-900)" }}>
                Ciclo de 3 meses con resultados medibles desde la semana 4.
              </h3>
              <ul className="space-y-3">
                {protocol.map((step) => (
                  <li key={step} className="ls-p flex gap-3" style={{ color: "var(--ls-gray-700)" }}>
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: "var(--brand-crescina)" }} />
                    {step}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="ls-p-sm rounded-full bg-white px-3 py-2" style={{ color: "var(--ls-gray-900)" }}>
                  Protocolos 500 / 1300
                </span>
                <span className="ls-p-sm rounded-full bg-white px-3 py-2" style={{ color: "var(--ls-gray-900)" }}>
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
                  {["+44% tallos en fase anágena", "-21% tallos en fase catágena", "+15% densidad", "0% residuo graso"].map(
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
                  Fuente: evaluaciones clínicas internas, 3 meses de protocolo Crescina HFSC 100% con seguimiento semanal.
                </p>
              </div>
            </div>
          </div>
        </section>

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
