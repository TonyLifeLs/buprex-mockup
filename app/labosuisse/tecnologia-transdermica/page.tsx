"use client"

import Image from "next/image"
import { ArrowRight, Layers, Waypoints, ShieldCheck, Atom } from "lucide-react"
import { LaboHeader, LaboFooter } from "@/components/labosuisse"
import { lsColorsToCSSVars, useLaboSuisseStore } from "@/store/labosuisse"

const pillars = [
  {
    title: "Penetración secuencial",
    body: "Múltiples pesos moleculares para llegar a epidermis, dermis y tejido subcutáneo de forma gradual.",
    accent: "var(--brand-transdermic)",
    Icon: Layers,
  },
  {
    title: "Vectores patentados",
    body: "Sistemas de transporte que reducen el tamaño molecular sin alterar la integridad del activo.",
    accent: "var(--brand-oxytreat)",
    Icon: Waypoints,
  },
  {
    title: "Seguridad clínica",
    body: "Sin agujas, sin trauma y con tolerancia testada en protocolos domiciliarios y profesionales.",
    accent: "var(--ls-gray-100)",
    Icon: ShieldCheck,
  },
]

const milestones = [
  { year: "1986", text: "Nace Labo en Basilea con foco en dermocosmética de alta eficacia." },
  { year: "2002", text: "Primera patente de transporte transdérmico para ácido hialurónico." },
  { year: "2013", text: "Lanzamiento de Fillerina: relleno visible sin agujas para uso en casa." },
  { year: "2020", text: "Actualización multi-ácido con 12 HA y péptidos biomiméticos." },
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

export default function TecnologiaTransdermicaPage() {
  const { colors } = useLaboSuisseStore()

  return (
    <div style={lsColorsToCSSVars(colors)}>
      <main style={{ fontFamily: "var(--font-sans)", background: "#fff" }}>
        <LaboHeader />

        <section
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #f7f7db 0%, #ffffff 60%)",
            paddingTop: "140px",
            paddingBottom: "96px",
          }}
        >
          <div className="ls-container grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="space-y-5">
              <span
                className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.18em]"
                style={{ background: "var(--ls-gray-900)", color: "var(--ls-white)" }}
              >
                Tecnología transdérmica
              </span>
              <h1 className="ls-h1" style={{ color: "var(--ls-gray-900)" }}>
                Activos que viajan sin agujas hasta las capas profundas de la piel.
              </h1>
              <p className="ls-p-lg" style={{ color: "var(--ls-gray-700)" }}>
                Microvectores, pesos moleculares escalonados y sistemas de liberación lenta aseguran eficacia en rostro
                y cuero cabelludo con protocolos seguros para casa.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/labosuisse/tecnologia-transdermica#laboratorio" className="ls-btn ls-btn-primary gap-2">
                  Ver cómo funciona
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/labosuisse" className="ls-btn ls-btn-tertiary" style={{ color: "var(--ls-gray-900)" }}>
                  Volver a Labo
                </a>
              </div>
              <div className="flex flex-wrap gap-3 pt-3">
                {["Sin dolor ni agujas", "Transporte secuencial", "Protocolos clínicos"].map((pill) => (
                  <span
                    key={pill}
                    className="ls-p-sm inline-flex items-center gap-2 rounded-full bg-white px-3 py-2"
                    style={{ color: "var(--ls-gray-700)", border: "1px solid var(--ls-gray-200)" }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: "var(--brand-oxytreat)" }} />
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-[32px] blur-3xl"
                style={{ background: "radial-gradient(circle at 25% 25%, #eef1d2, transparent 55%)" }}
              />
              <div className="relative flex justify-center rounded-[32px] bg-white/80 p-8 shadow-lg backdrop-blur">
                <Image
                  src="/images/mejillas.webp"
                  alt="Tecnología transdérmica"
                  width={520}
                  height={520}
                  className="h-auto w-full max-w-[380px] object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20" style={{ background: "#fff" }}>
          <div className="ls-container space-y-8">
            <div className="space-y-2">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Pilar científico
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                Tres mecanismos que permiten resultados visibles sin inyecciones.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {pillars.map((pillar) => (
                <PillarCard key={pillar.title} {...pillar} />
              ))}
            </div>
          </div>
        </section>

        <section id="laboratorio" className="py-16" style={{ background: "var(--ls-gray-100)" }}>
          <div className="ls-container grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="space-y-4">
              <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                Investigación
              </p>
              <h3 className="ls-h3" style={{ color: "var(--ls-gray-900)" }}>
                Laboratorios en Basilea con bioquímicos, farmacéuticos y dermatólogos diseñando fórmulas transdérmicas.
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {["Múltiples pesos moleculares", "Absorción secuencial", "Liberación lenta", "Compatibles con uso doméstico"].map(
                  (item) => (
                    <div key={item} className="rounded-2xl bg-white px-4 py-3 shadow-sm" style={{ border: "1px solid var(--ls-gray-200)" }}>
                      <p className="ls-p" style={{ color: "var(--ls-gray-800, #333)" }}>
                        {item}
                      </p>
                    </div>
                  )
                )}
              </div>
              <a href="/labosuisse/descubre-labo" className="ls-btn ls-btn-primary mt-2 w-fit">
                Conoce el laboratorio
              </a>
            </div>

            <div className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-lg">
              <div className="absolute -right-12 -top-10 h-48 w-48 rounded-full" style={{ background: "#dfe4b8" }} />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-700)" }}>
                    Línea temporal
                  </span>
                  <span className="h-2 w-10 rounded-full" style={{ background: "var(--brand-oxytreat)" }} />
                </div>
                <div className="space-y-4">
                  {milestones.map((item) => (
                    <div key={item.year} className="flex gap-3">
                      <div className="ls-p-sm mt-1 h-6 w-16 rounded-full text-center" style={{ background: "var(--brand-transdermic)" }}>
                        {item.year}
                      </div>
                      <p className="ls-p" style={{ color: "var(--ls-gray-800, #333)" }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20" style={{ background: "#0f0f0f", color: "#fff" }}>
          <div className="ls-container grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="space-y-4">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.7)" }}>
                Garantía Labo
              </p>
              <h3 className="ls-h2" style={{ color: "#fff" }}>
                Cada activo está respaldado por estudios in vitro, in vivo y test dermatológicos.
              </h3>
              <p className="ls-p" style={{ color: "rgba(255,255,255,0.75)" }}>
                La tecnología transdérmica evita microagujas y mantiene la barrera cutánea intacta, asegurando
                tratamientos eficaces y seguros para el rostro y el cabello.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="ls-p-sm rounded-full bg-white/10 px-3 py-2">Sin agujas</span>
                <span className="ls-p-sm rounded-full bg-white/10 px-3 py-2">Test dermatológico</span>
                <span className="ls-p-sm rounded-full bg-white/10 px-3 py-2">Uso profesional y doméstico</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Activos estrella
                  </span>
                  <Atom className="h-5 w-5" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {["12 HA de distinto peso", "Péptidos biomiméticos", "Aminoácidos queratínicos", "Extractos botánicos"].map(
                    (item) => (
                      <div key={item} className="rounded-2xl bg-white/10 px-4 py-3">
                        <p className="ls-p" style={{ color: "#fff" }}>
                          {item}
                        </p>
                      </div>
                    )
                  )}
                </div>
                <p className="ls-p-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Formulaciones diseñadas para penetrar secuencialmente y liberar activos donde más se necesitan.
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
