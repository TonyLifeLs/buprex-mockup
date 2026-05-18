"use client"

import Image from "next/image"
import { ArrowRight, Eye, Sparkles, Shield, Leaf, Check, Star } from "lucide-react"
import { LaboHeader, LaboFooter } from "@/components/labosuisse"
import { lsColorsToCSSVars, useLaboSuisseStore } from "@/store/labosuisse"

// ── DATA ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    name: "Fillerina Eyebrow Filler",
    desc: "Suero de relleno para cejas con ácido hialurónico y extractos botánicos. Redensifica y da volumen a cejas poco pobladas.",
    tags: ["Densifica", "Rellena", "Uso diario"],
    bg: "#f9f3fb",
    pill: "#ad3f84",
  },
  {
    name: "Fillerina Lash Filler",
    desc: "Sérum intensivo para pestañas que alarga, fortalece y da brillo. Estimula el crecimiento desde la raíz de la pestaña.",
    tags: ["Alarga", "Fortalece", "Sin irritación"],
    bg: "#f4dceb",
    pill: "#cc71ab",
  },
  {
    name: "Crescina Brow Re-Growth",
    desc: "Tecnología HFSC adaptada para la reactivación del folículo de la ceja. Para pérdida moderada-avanzada.",
    tags: ["Re-Growth", "HFSC", "Clínicamente probado"],
    bg: "#fffbeb",
    pill: "#d4a017",
  },
  {
    name: "Crescina Lash Re-Growth",
    desc: "Estimula el ciclo de crecimiento natural de las pestañas con activos de célula madre folicular. Sin toxinas.",
    tags: ["Re-Growth", "HFSC", "Sin procedimientos"],
    bg: "#fff4d6",
    pill: "#c08e0e",
  },
]

const PILLARS = [
  {
    title: "Formulación 100% libre de procedimientos",
    body: "Ninguno de nuestros tratamientos requiere micropigmentación, extensiones ni inyecciones. Resultados naturales en casa.",
    Icon: Shield,
    accent: "#ad3f84",
  },
  {
    title: "Activos de origen botánico",
    body: "Extractos de biotina, pantenol y péptidos capilares diseñados para la delicada piel periocular.",
    Icon: Leaf,
    accent: "#7ab87a",
  },
  {
    title: "Compatibles con maquillaje",
    body: "Todos los tratamientos están formulados para usarse antes del maquillaje sin interferir con los productos de color.",
    Icon: Sparkles,
    accent: "#d4a017",
  },
  {
    title: "Tecnología HFSC en cejas",
    body: "La misma tecnología de células madre foliculares de Crescina capilar, ahora adaptada para el folículo de ceja.",
    Icon: Eye,
    accent: "#c08e0e",
  },
]

const PROTOCOL_STEPS = [
  {
    num: "01",
    title: "Limpieza de la zona",
    detail: "Limpia y seca la zona de ceja y pestaña antes de aplicar el tratamiento. Sin restos de maquillaje.",
  },
  {
    num: "02",
    title: "Aplicación de sérum",
    detail: "Aplica el sérum con el aplicador de precisión a lo largo de la ceja o la línea de pestañas.",
  },
  {
    num: "03",
    title: "Constancia diaria",
    detail: "Aplica cada noche antes de dormir. Los resultados se consolidan con el ciclo completo de 4–8 semanas.",
  },
]

// ── PAGE ────────────────────────────────────────────────────────────────────

export default function CejasYPestanasPage() {
  const { colors } = useLaboSuisseStore()

  return (
    <div style={lsColorsToCSSVars(colors)}>
      <main style={{ fontFamily: "var(--font-sans)", background: "#fff" }}>
        <LaboHeader />

        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #fdf3f7 0%, #fff8fc 50%, #ffffff 80%)",
            paddingTop: "140px",
            paddingBottom: "90px",
          }}
        >
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, #e8c6e0, transparent 70%)" }}
          />

          <div className="ls-container grid gap-20 md:grid-cols-[0.85fr_1.15fr] md:items-center">
            {/* ── IMAGE (left) ── */}
            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-[40px] blur-3xl"
                style={{ background: "radial-gradient(circle at 40% 30%, #e8c6e0, transparent 60%)" }}
              />
              <div
                className="relative flex items-center justify-center rounded-[40px] p-10 min-h-[320px]"
                style={{ background: "rgba(255,255,255,0.8)", border: "1px solid #e8c6e0", boxShadow: "0 16px 48px rgba(173,63,132,0.12)" }}
              >
                <Eye className="h-32 w-32 opacity-20" style={{ color: "var(--ls-red-700)" }} />
                <span
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--ls-gray-500)" }}
                >
                  Foto producto próximamente
                </span>
              </div>
              <div
                className="absolute -bottom-4 right-6 rounded-xl px-4 py-3 shadow-lg"
                style={{ background: "#ad3f84", color: "#fff" }}
              >
                <p className="ls-p-sm font-semibold">Cejas & Pestañas</p>
                <p className="ls-p-sm opacity-90">Fillerina · Crescina</p>
              </div>
            </div>

            {/* ── TEXT (right) ── */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span
                  className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.18em]"
                  style={{ background: "var(--ls-gray-900)", color: "var(--ls-white)" }}
                >
                  Cejas y Pestañas · Labo Suisse
                </span>
                <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                  Densidad · Crecimiento · Re-Growth
                </p>
              </div>

              <div className="space-y-4">
                <h1 className="ls-h1" style={{ color: "var(--ls-gray-900)", lineHeight: 1.1 }}>
                  Cejas y pestañas{" "}
                  <em style={{ color: "#ad3f84", fontStyle: "normal" }}>
                    más densas y largas
                  </em>{" "}
                  sin procedimientos
                </h1>
                <p className="ls-p-lg" style={{ color: "var(--ls-gray-700)" }}>
                  Combina la tecnología de relleno de Fillerina con el Re-Growth HFSC de Crescina para devolver
                  densidad, largo y definición natural a cejas y pestañas. Sin extensiones, sin micropigmentación.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#productos" className="ls-btn ls-btn-primary gap-2">
                  Ver productos
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/labosuisse/cuidado-de-la-piel"
                  className="ls-btn ls-btn-tertiary"
                  style={{ color: "var(--ls-gray-900)" }}
                >
                  Ver Fillerina Cuidado de la Piel
                </a>
              </div>

              {/* chips */}
              <div className="flex flex-wrap gap-2">
                {["Sin procedimientos", "Uso en casa", "Clinicamente probado", "Fillerina & Crescina"].map((c) => (
                  <span
                    key={c}
                    className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{ background: "#fff", color: "var(--ls-gray-700)", border: "1px solid #e8c6e0" }}
                  >
                    <Check className="h-3 w-3" style={{ color: "#ad3f84" }} />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── BANNER ── */}
        <div
          className="py-4 text-center ls-p-sm font-semibold tracking-[0.2em] uppercase"
          style={{ background: "var(--ls-gray-900)", color: "#fff" }}
        >
          SIN EXTENSIONES · SIN MICROPIGMENTACIÓN · RESULTADOS NATURALES
        </div>

        {/* ── PRODUCTS ── */}
        <section id="productos" className="py-20" style={{ background: "#fff" }}>
          <div className="ls-container space-y-10">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Productos Cejas & Pestañas
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)", maxWidth: "540px" }}>
                Fillerina para relleno y Crescina Re-Growth para reactivación folicular.
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCTS.map((p) => (
                <div
                  key={p.name}
                  className="rounded-2xl p-5 flex flex-col gap-3"
                  style={{ background: p.bg, border: `1px solid ${p.pill}33` }}
                >
                  <h3 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
                    {p.name}
                  </h3>
                  <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="ls-p-sm rounded-full px-2 py-0.5"
                        style={{ background: "#fff", color: "var(--ls-gray-700)", border: `1px solid ${p.pill}44` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PILLARS ── */}
        <section className="py-20" style={{ background: "var(--ls-gray-100)" }}>
          <div className="ls-container space-y-10">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Por qué Labo Suisse para cejas y pestañas
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                Cuatro razones para elegir la tecnología Labo.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl p-5 shadow-sm"
                  style={{ background: "#fff", border: "1px solid var(--ls-gray-200, #e5e5e5)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ background: p.accent + "22" }}
                    >
                      <p.Icon className="h-5 w-5" style={{ color: p.accent }} />
                    </span>
                    <h3 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
                      {p.title}
                    </h3>
                  </div>
                  <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROTOCOL ── */}
        <section className="py-20" style={{ background: "#fff" }}>
          <div className="ls-container space-y-10">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Protocolo de aplicación
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)", maxWidth: "500px" }}>
                Tres pasos simples cada noche para resultados en 4–8 semanas.
              </h2>
            </div>

            <div
              className="rounded-[28px] p-8 grid gap-8 md:grid-cols-3"
              style={{ background: "var(--ls-gray-100)" }}
            >
              {PROTOCOL_STEPS.map(({ num, title, detail }) => (
                <div key={num} className="flex gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm"
                    style={{ background: "#ad3f84", color: "#fff" }}
                  >
                    {num}
                  </div>
                  <div>
                    <h4 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
                      {title}
                    </h4>
                    <p className="ls-p mt-1" style={{ color: "var(--ls-gray-600)" }}>
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DARK CTA ── */}
        <section className="py-20" style={{ background: "#0f0f0f" }}>
          <div className="ls-container flex flex-col items-center gap-8 text-center">
            <div className="space-y-4 max-w-2xl">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Consulta personalizada
              </p>
              <h2 className="ls-h2" style={{ color: "#fff" }}>
                ¿Cejas ralas, pestañas débiles o caída post-tratamiento? Un experto Labo te orienta.
              </h2>
              <p className="ls-p" style={{ color: "rgba(255,255,255,0.7)" }}>
                Agenda una consulta online y recibe el protocolo adecuado para tu tipo de pérdida, con seguimiento
                quincenal sin necesidad de desplazarte.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a href="/labosuisse/descubre-labo" className="ls-btn ls-btn-primary gap-2">
                  Agendar consulta
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="mailto:contacto@labosuisse.cl"
                  className="ls-btn ls-btn-tertiary"
                  style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  Escribir al equipo
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
              {[
                { icon: Star, label: "Fillerina", sub: "Relleno & Densidad" },
                { icon: Eye,  label: "Crescina",  sub: "Re-Growth HFSC" },
                { icon: Leaf, label: "Botánico",  sub: "Sin procedimientos" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="rounded-2xl p-5 text-center"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <Icon className="h-8 w-8 mx-auto mb-2 opacity-60" style={{ color: "#ad3f84" }} />
                  <p className="font-bold" style={{ color: "#fff" }}>{label}</p>
                  <p className="ls-p-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIFE LOGO STRIP ── */}
        <div className="py-8" style={{ background: "var(--ls-gray-100)", borderTop: "1px solid var(--ls-gray-200)" }}>
          <div className="ls-container flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
              Distribuido por
            </p>
            <Image
              src="/images/laboratorios-life.png"
              alt="Laboratorios Life"
              width={180}
              height={50}
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        <LaboFooter />
      </main>
    </div>
  )
}
