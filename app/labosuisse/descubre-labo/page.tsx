"use client"

import Image from "next/image"
import { ArrowRight, Sparkles, Compass, FlaskConical, Globe2 } from "lucide-react"
import { LaboHeader, LaboFooter } from "@/components/labosuisse"
import { lsColorsToCSSVars, useLaboSuisseStore } from "@/store/labosuisse"

const values = [
  {
    title: "Innovación sin agujas",
    body: "Desarrollamos soluciones transdérmicas que reemplazan procedimientos invasivos con resultados visibles.",
    accent: "var(--ls-red-700)",
    Icon: Sparkles,
  },
  {
    title: "Ciencia aplicada",
    body: "Bioquímicos, farmacéuticos y dermatólogos trabajan juntos en Basilea para cada fórmula.",
    accent: "var(--ls-gray-900)",
    Icon: FlaskConical,
  },
  {
    title: "Confianza global",
    body: "Presencia en más de 45 países con protocolos validados por estudios clínicos internos y externos.",
    accent: "var(--ls-gray-300)",
    Icon: Globe2,
  },
]

const chapters = [
  {
    title: "De Suiza al mundo",
    text: "Desde 1986 llevamos innovación dermocosmética a clínicas y hogares, con procesos de fabricación suizos y control de calidad estricto.",
  },
  {
    title: "Ciencia propietaria",
    text: "Patentes de transporte transdérmico, complejos HFSC para folículos capilares y 12 pesos moleculares de HA para relleno visible.",
  },
  {
    title: "Experiencia guiada",
    text: "Protocols claros, tutoriales y asesoría para que cada tratamiento se aplique de forma segura y eficaz en casa.",
  },
]

function ValueCard({ title, body, accent, Icon }: typeof values[number]) {
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

export default function DescubreLaboPage() {
  const { colors } = useLaboSuisseStore()

  return (
    <div style={lsColorsToCSSVars(colors)}>
      <main style={{ fontFamily: "var(--font-sans)", background: "#fff" }}>
        <LaboHeader />

        <section
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f0f0f 0%, #1b1b1b 60%)",
            paddingTop: "140px",
            paddingBottom: "96px",
            color: "#fff",
          }}
        >
          <div className="ls-container grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="space-y-5">
              <span
                className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.18em]"
                style={{ background: "#fff", color: "var(--ls-gray-900)" }}
              >
                Descubre Labo
              </span>
              <h1 className="ls-h1" style={{ color: "#fff" }}>
                Labo Suisse: ciencia dermocosmética desde Basilea, inspirada en resultados visibles.
              </h1>
              <p className="ls-p-lg" style={{ color: "rgba(255,255,255,0.75)" }}>
                Tratamientos de piel y cabello con tecnología transdérmica patentada, listos para usar en casa o en
                cabina profesional, siempre sin agujas.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/labosuisse/cuidado-de-la-piel" className="ls-btn ls-btn-primary gap-2">
                  Ver línea de piel
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="/labosuisse/cuidado-capilar" className="ls-btn ls-btn-tertiary" style={{ color: "#fff" }}>
                  Ver línea capilar
                </a>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-[32px] blur-3xl"
                style={{ background: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08), transparent 55%)" }}
              />
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-xl">
                <Image
                  src="/images/crescina-product.webp"
                  alt="Laboratorio Labo"
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
                Filosofía
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                Tres valores que definen el ADN de Labo Suisse.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <ValueCard key={value.title} {...value} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16" style={{ background: "var(--ls-gray-100)" }}>
          <div className="ls-container grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                Historia
              </p>
              <h3 className="ls-h3" style={{ color: "var(--ls-gray-900)" }}>
                Investigación, patentes y expansión global.
              </h3>
              <div className="space-y-4">
                {chapters.map((chapter) => (
                  <div key={chapter.title} className="rounded-2xl bg-white p-4 shadow-sm" style={{ border: "1px solid var(--ls-gray-200)" }}>
                    <h4 className="ls-h5" style={{ color: "var(--ls-gray-900)" }}>
                      {chapter.title}
                    </h4>
                    <p className="ls-p mt-2" style={{ color: "var(--ls-gray-700)" }}>
                      {chapter.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-lg">
              <div className="absolute -right-12 -top-10 h-48 w-48 rounded-full" style={{ background: "#f1f1f1" }} />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-700)" }}>
                    Cultura
                  </span>
                  <Compass className="h-5 w-5" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {["Hecho en Suiza", "Patentes activas", "Laboratorio propio", "Red global"].map((item) => (
                    <div key={item} className="rounded-2xl bg-white px-4 py-3" style={{ border: "1px solid var(--ls-gray-200)" }}>
                      <p className="ls-p" style={{ color: "var(--ls-gray-800, #333)" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="ls-p-sm" style={{ color: "var(--ls-gray-600)" }}>
                  Labo produce en Suiza con controles de calidad estrictos y protocolos transparentes para profesionales y
                  consumidores.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20" style={{ background: "#0f0f0f", color: "#fff" }}>
          <div className="ls-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.7)" }}>
                Únete al club
              </p>
              <h3 className="ls-h2" style={{ color: "#fff" }}>
                Recibe lanzamientos, protocolos guiados y eventos exclusivos de Labo Suisse.
              </h3>
              <p className="ls-p" style={{ color: "rgba(255,255,255,0.75)" }}>
                Suscríbete para acceder a contenidos educativos y consultas con especialistas.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="/labosuisse#club" className="ls-btn ls-btn-primary">
                Suscribirme
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
