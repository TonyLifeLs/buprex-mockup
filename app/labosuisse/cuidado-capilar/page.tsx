"use client"

import Image from "next/image"
import { ArrowRight, Users, Droplets, Home, Check, Microscope, Leaf, Shield } from "lucide-react"
import { LaboHeader, LaboFooter } from "@/components/labosuisse"
import { lsColorsToCSSVars, useLaboSuisseStore } from "@/store/labosuisse"

// ── DATA ────────────────────────────────────────────────────────────────────

const CRESCINA_VARIANTS = [
  {
    for: "Mujer",
    grade: "HFSC 100% 500",
    name: "Crescina Re-Growth 500",
    desc: "Para inicio de adelgazamiento y caída difusa. Primer ciclo de estimulación del folículo capilar.",
    tags: ["Caída inicial", "Preventivo", "Ciclo mensual"],
    indicBg: "#f9e7f0",
    indicPill: "#e4a5c4",
    iconBg: "#f9e7f0",
  },
  {
    for: "Mujer",
    grade: "HFSC 100% 1300",
    name: "Crescina Re-Growth 1300",
    desc: "Para caída avanzada y pérdida significativa. Máxima concentración de activos para la mujer.",
    tags: ["Caída avanzada", "Alta concentración", "Ciclo intensivo"],
    indicBg: "#f4dceb",
    indicPill: "#cc71ab",
    iconBg: "#f4dceb",
  },
  {
    for: "Hombre",
    grade: "HFSC 100% 500",
    name: "Crescina Re-Growth 500",
    desc: "Formulación específica para la estructura capilar masculina. Estimula folículo en caída difusa.",
    tags: ["Caída difusa", "Para hombre", "Fórmula específica"],
    indicBg: "#e8f0fb",
    indicPill: "#7baae4",
    iconBg: "#e8f0fb",
  },
  {
    for: "Hombre",
    grade: "HFSC 100% 1300",
    name: "Crescina Re-Growth 1300",
    desc: "Para alopecia androgénica moderada-severa en hombres. Mayor densidad y recrecimiento en áreas debilitadas.",
    tags: ["Alopecia androgénica", "Alta densidad", "Uso intensivo"],
    indicBg: "#dce8f8",
    indicPill: "#558ad8",
    iconBg: "#dce8f8",
  },
]

const PILLARS = [
  {
    title: "Formulación diferenciada por género",
    body: "Las necesidades del cabello masculino y femenino son distintas. Crescina tiene líneas separadas con activos adaptados a cada estructura capilar.",
    Icon: Users,
    accent: "var(--brand-crescina, #d4a017)",
  },
  {
    title: "No inyectable, 100% tópico",
    body: "Una alternativa dermocosmética que actúa directamente en el cuero cabelludo sin procedimientos médicos ni tiempo de recuperación.",
    Icon: Droplets,
    accent: "var(--brand-cadu-crex, #6b8fa3)",
  },
  {
    title: "Integrable en la rutina diaria",
    body: "El tratamiento se aplica en minutos y se integra naturalmente en la ducha matutina. Sin cambios en el estilo de vida.",
    Icon: Home,
    accent: "var(--brand-rinfoltina, #7ab87a)",
  },
  {
    title: "Respaldado por 8 patentes",
    body: "El sistema HFSC (Human Follicle Stem Cell Technology) está protegido por 8 patentes suizas y europeas activas.",
    Icon: Shield,
    accent: "#c29a4a",
  },
  {
    title: "Base científica en células madre",
    body: "La tecnología HFSC actúa sobre las células madre del folículo capilar para reactivar el ciclo de crecimiento.",
    Icon: Microscope,
    accent: "#5b8a6b",
  },
  {
    title: "Ingredientes naturales activos",
    body: "Combinación de extractos botánicos con aminoácidos queratínicos para nutrir y fortalecer el cabello existente.",
    Icon: Leaf,
    accent: "#7ab87a",
  },
]

const PROTOCOL_WEEKS = [
  {
    week: "Semana 1–2",
    title: "Fase de activación",
    desc: "Los activos penetran en el folículo y comienzan la fase de estimulación. Menor caída perceptible.",
    bg: "#fff9eb",
    pill: "#d4a017",
  },
  {
    week: "Semana 3–4",
    title: "Fase de consolidación",
    desc: "El cuero cabelludo recibe los activos de forma continua. El folículo reactiva el ciclo de crecimiento anagénico.",
    bg: "#fff3d6",
    pill: "#c08e0e",
  },
  {
    week: "Semana 5–8",
    title: "Primeros resultados visibles",
    desc: "Aparecen pequeños cabellos nuevos en zonas de rarefacción. Mayor densidad percibida al tacto.",
    bg: "#fdedc3",
    pill: "#b07e0c",
  },
  {
    week: "Ciclo 2+",
    title: "Recrecimiento progresivo",
    desc: "Con cada ciclo mensual los resultados se consolidan. Mayor densidad, longitud y fuerza en el cabello nuevo.",
    bg: "#fce7b0",
    pill: "#966d0a",
  },
]

const STATS = [
  { value: "100%", label: "Eficacia comprobada en estudios clínicos", sub: "independientes" },
  { value: "+6300", label: "Nuevos cabellos reactivados", sub: "protocolo intensivo" },
  { value: "8", label: "Patentes suizas y europeas activas", sub: "HFSC technology" },
  { value: "0%", label: "Procedimientos invasivos requeridos", sub: "100% tópico" },
]

// ── COMPONENTS ──────────────────────────────────────────────────────────────

function VariantCard({ for: forWho, grade, name, desc, tags, indicBg, indicPill }: typeof CRESCINA_VARIANTS[number]) {
  return (
    <div
      className="group rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      style={{ background: indicBg, border: `1px solid ${indicPill}33` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="ls-p-sm rounded-full px-2 py-0.5 font-semibold"
            style={{ background: indicPill, color: "#fff" }}
          >
            {forWho}
          </span>
          <span className="ls-p-sm font-medium" style={{ color: "var(--ls-gray-700)" }}>
            {grade}
          </span>
        </div>
      </div>
      <h3 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
        {name}
      </h3>
      <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
        {desc}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
        {tags.map((t) => (
          <span
            key={t}
            className="ls-p-sm rounded-full px-2 py-0.5"
            style={{ background: "#fff", color: "var(--ls-gray-700)", border: `1px solid ${indicPill}44` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function PillarCard({ title, body, Icon, accent }: typeof PILLARS[number]) {
  return (
    <div
      className="rounded-2xl p-5 shadow-sm"
      style={{ background: "#fff", border: "1px solid var(--ls-gray-200, #e5e5e5)" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: accent + "22" }}>
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </span>
        <h3 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
          {title}
        </h3>
      </div>
      <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
        {body}
      </p>
    </div>
  )
}

function ProtocolStep({ week, title, desc, bg, pill }: typeof PROTOCOL_WEEKS[number]) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-2" style={{ background: bg }}>
      <span
        className="ls-p-sm rounded-full px-3 py-0.5 w-fit font-semibold"
        style={{ background: pill, color: "#fff" }}
      >
        {week}
      </span>
      <h4 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
        {title}
      </h4>
      <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
        {desc}
      </p>
    </div>
  )
}

// ── PAGE ────────────────────────────────────────────────────────────────────

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
            background: "linear-gradient(135deg, #fff8e1 0%, #fffbf0 50%, #ffffff 80%)",
            paddingTop: "140px",
            paddingBottom: "90px",
          }}
        >
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full opacity-50"
            style={{ background: "radial-gradient(circle, #f9e7bf, transparent 70%)" }}
          />

          <div className="ls-container grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <span
                  className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.18em]"
                  style={{ background: "var(--ls-gray-900)", color: "var(--ls-white)" }}
                >
                  Cuidado capilar · Crescina
                </span>
                <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                  Recrecimiento · Anticaída · HFSC Technology
                </p>
              </div>

              <div className="space-y-4">
                <h1 className="ls-h1" style={{ color: "var(--ls-gray-900)", lineHeight: 1.1 }}>
                  Crescina: recrecimiento{" "}
                  <em style={{ color: "var(--brand-crescina, #d4a017)", fontStyle: "normal" }}>
                    sin inyecciones
                  </em>{" "}
                  para hombre y mujer
                </h1>
                <p className="ls-p-lg" style={{ color: "var(--ls-gray-700)" }}>
                  Formulado con la tecnología HFSC (Human Follicle Stem Cell), activa las células madre del folículo
                  capilar para estimular el recrecimiento desde la raíz. Tratamiento tópico de uso en casa, avalado
                  por 8 patentes suizas y europeas.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#productos" className="ls-btn ls-btn-primary gap-2">
                  Ver productos Crescina
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/labosuisse/tecnologia-transdermica"
                  className="ls-btn ls-btn-tertiary"
                  style={{ color: "var(--ls-gray-900)" }}
                >
                  Ver tecnología transdérmica
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {STATS.slice(0, 3).map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-4 text-center"
                    style={{ background: "var(--ls-gray-100)", border: "1px solid var(--ls-gray-200)" }}
                  >
                    <p
                      className="font-bold"
                      style={{ fontSize: "1.75rem", color: "var(--brand-crescina, #d4a017)", lineHeight: 1 }}
                    >
                      {s.value}
                    </p>
                    <p className="ls-p-sm mt-1" style={{ color: "var(--ls-gray-700)" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* chips */}
              <div className="flex flex-wrap gap-2">
                {["HFSC Technology", "No inyectable", "Para hombre y mujer", "8 patentes activas"].map((c) => (
                  <span
                    key={c}
                    className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{ background: "#fff", color: "var(--ls-gray-700)", border: "1px solid #f0dca0" }}
                  >
                    <Check className="h-3 w-3" style={{ color: "var(--brand-crescina, #d4a017)" }} />
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-[40px] blur-3xl"
                style={{ background: "radial-gradient(circle at 60% 30%, #f9e7bf, transparent 60%)" }}
              />
              <div
                className="relative flex justify-center rounded-[40px] p-10"
                style={{ background: "rgba(255,255,255,0.8)", border: "1px solid #f0dca0", boxShadow: "0 16px 48px rgba(212,160,23,0.15)" }}
              >
                <Image
                  src="/images/derma/crescina1-foto.png"
                  alt="Crescina HFSC 100%"
                  width={1000}
                  height={1000}
                  className="h-auto w-full max-w-[300px] object-contain"
                  priority
                />
              </div>
              <div
                className="absolute -bottom-4 right-6 rounded-xl px-4 py-3 shadow-lg"
                style={{ background: "var(--brand-crescina, #d4a017)", color: "#fff" }}
              >
                <p className="ls-p-sm font-semibold">Disponible en</p>
                <p className="ls-p-sm opacity-90">500 y 1300 HFSC</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BANNER ── */}
        <div
          className="py-4 text-center ls-p-sm font-semibold tracking-[0.2em] uppercase"
          style={{ background: "var(--ls-gray-900)", color: "#fff" }}
        >
          NO INJECTIONS · YES HFSC TECHNOLOGY · CRESCINA BY LABO SUISSE
        </div>

        {/* ── PRODUCTS ── */}
        <section id="productos" className="py-20" style={{ background: "#fff" }}>
          <div className="ls-container space-y-10">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Productos Crescina
              </p>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)", maxWidth: "540px" }}>
                  Fórmulas distintas para hombre y mujer, en dos niveles de concentración.
                </h2>
                <a href="#protocolo" className="ls-btn ls-btn-link">
                  Ver protocolo de uso →
                </a>
              </div>
              <p className="ls-p" style={{ color: "var(--ls-gray-600)", maxWidth: "600px" }}>
                Elige según tu género y grado de caída: el 500 para caída inicial-moderada y el 1300 para caída avanzada
                o necesidades de máxima estimulación del folículo.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {CRESCINA_VARIANTS.map((v) => (
                <VariantCard key={`${v.for}-${v.grade}`} {...v} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PHOTO + INTRO ── */}
        <section className="py-16" style={{ background: "var(--ls-gray-100)" }}>
          <div className="ls-container grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative overflow-hidden rounded-[28px] shadow-lg" style={{ minHeight: "380px" }}>
              <Image
                src="/images/derma/crescina2-foto.png"
                alt="Tratamiento Crescina en uso"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="space-y-5">
              <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                Crescina HFSC 100%
              </p>
              <h3 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                La única alternativa no inyectable con tecnología de células madre foliculares.
              </h3>
              <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
                Mientras los tratamientos convencionales solo frenan la caída, Crescina HFSC actúa en el origen:
                reactiva las células madre del folículo para estimular activamente el recrecimiento de nuevos cabellos.
              </p>
              <ul className="space-y-2">
                {[
                  "Estimula el ciclo capilar anagénico",
                  "Fortalece el cabello existente desde la raíz",
                  "Sin efectos secundarios sistémicos",
                  "Compatible con otros tratamientos capilares",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3" style={{ color: "var(--ls-gray-700)" }}>
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "var(--brand-crescina, #d4a017)" }}
                    >
                      <Check className="h-3 w-3 text-white" />
                    </span>
                    <span className="ls-p">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#protocolo" className="ls-btn ls-btn-primary w-fit gap-2">
                Ver protocolo completo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── PROTOCOL TIMELINE ── */}
        <section id="protocolo" className="py-20" style={{ background: "#fff" }}>
          <div className="ls-container space-y-10">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Protocolo de tratamiento
              </p>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)", maxWidth: "500px" }}>
                  5 días de aplicación, 2 de descanso. Resultados mes a mes.
                </h2>
              </div>
              <p className="ls-p" style={{ color: "var(--ls-gray-600)", maxWidth: "600px" }}>
                Aplica Crescina sobre el cuero cabelludo limpio y seco cada día durante 5 días consecutivos, descansa
                2 días y repite hasta completar el ciclo mensual de 4 semanas.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PROTOCOL_WEEKS.map((pw) => (
                <ProtocolStep key={pw.week} {...pw} />
              ))}
            </div>

            {/* application steps */}
            <div
              className="rounded-[28px] p-8 grid gap-8 md:grid-cols-3"
              style={{ background: "var(--ls-gray-100)" }}
            >
              {[
                { num: "01", title: "Cuero cabelludo limpio y seco", detail: "Aplica después del lavado, con el cabello seco o ligeramente húmedo." },
                { num: "02", title: "5 días consecutivos, 2 de descanso", detail: "Respeta la pausa de descanso para optimizar la respuesta folicular." },
                { num: "03", title: "Completar las 4 semanas del ciclo", detail: "La constancia es clave. Cada ciclo suma al anterior para resultados progresivos." },
              ].map(({ num, title, detail }) => (
                <div key={num} className="flex gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm"
                    style={{ background: "var(--brand-crescina, #d4a017)", color: "#fff" }}
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

        {/* ── PILLARS ── */}
        <section className="py-20" style={{ background: "var(--ls-gray-100)" }}>
          <div className="ls-container space-y-10">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Por qué Crescina
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                Seis razones para elegir Crescina HFSC.
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PILLARS.map((p) => (
                <PillarCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── DARK CTA ── */}
        <section className="py-20" style={{ background: "#0f0f0f" }}>
          <div className="ls-container grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-5">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Diagnóstico capilar
              </p>
              <h2 className="ls-h2" style={{ color: "#fff" }}>
                Un experto Labo determina el protocolo Crescina ideal para tu tipo y grado de caída.
              </h2>
              <p className="ls-p" style={{ color: "rgba(255,255,255,0.7)" }}>
                Agenda una consulta online. Recibes instrucciones personalizadas de aplicación y seguimiento quincenal
                sin necesidad de desplazarte.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/labosuisse/descubre-labo" className="ls-btn ls-btn-primary gap-2">
                  Agendar diagnóstico
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

            {/* stats panel */}
            <div
              className="rounded-[28px] p-7 space-y-4"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Datos clínicos Crescina
              </p>
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl px-4 py-4"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <p
                      className="font-bold"
                      style={{ fontSize: "1.6rem", color: "var(--brand-crescina, #d4a017)", lineHeight: 1 }}
                    >
                      {s.value}
                    </p>
                    <p className="ls-p-sm mt-1" style={{ color: "#fff" }}>
                      {s.label}
                    </p>
                    <p className="ls-p-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>
              <p className="ls-p-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Fuente: evaluaciones clínicas internas Crescina HFSC 100% con seguimiento semanal.
              </p>
            </div>
          </div>
        </section>

        <LaboFooter />
      </main>
    </div>
  )
}
