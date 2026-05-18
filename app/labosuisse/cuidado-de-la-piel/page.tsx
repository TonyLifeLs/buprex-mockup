"use client"

import Image from "next/image"
import { useRef, useState, useCallback } from "react"
import { ArrowRight, Sparkles, Droplets, ShieldCheck, Star, ChevronRight, ChevronLeft, FlaskConical } from "lucide-react"
import { LaboHeader, LaboFooter } from "@/components/labosuisse"
import { lsColorsToCSSVars, useLaboSuisseStore } from "@/store/labosuisse"

// ── DATA ────────────────────────────────────────────────────────────────────

const FILLERINA_GRADES = [
  {
    grade: "Grado 1",
    name: "Fillerina 12HA Replenishing Treatment",
    desc: "Para primeros signos de envejecimiento. Rellena líneas finas y aporta luminosidad diaria.",
    tags: ["Líneas finas", "Preventivo", "Luminosidad"],
    accent: "#f9e7f0",
    pill: "#e4a5c4",
  },
  {
    grade: "Grado 2",
    name: "Fillerina 12HA Replenishing Treatment",
    desc: "Arrugas moderadas y pérdida de densidad. Activa el relleno visible en 14 días.",
    tags: ["Arrugas moderadas", "Densidad", "14 días"],
    accent: "#f4dceb",
    pill: "#d98ab8",
  },
  {
    grade: "Grado 3",
    name: "Fillerina 12HA Replenishing Treatment",
    desc: "Pérdida de volumen en pómulos y contorno. Efecto lifting transdérmico visible.",
    tags: ["Volumen pómulos", "Lifting", "Contorno"],
    accent: "#eed1e6",
    pill: "#cc71ab",
  },
  {
    grade: "Grado 4",
    name: "Fillerina 12HA Replenishing Treatment",
    desc: "Arrugas profundas y caída de tejidos. Tratamiento intensivo para restaurar el óvalo.",
    tags: ["Arrugas profundas", "Restauración", "Óvalo facial"],
    accent: "#e8c6e0",
    pill: "#bd5897",
  },
  {
    grade: "Grado 5+",
    name: "Fillerina 12HA Replenishing Treatment",
    desc: "Máxima concentración. Para pieles con marcadas necesidades de relleno y firmeza.",
    tags: ["Máxima eficacia", "Firmeza intensa", "Uso nocturno"],
    accent: "#e2bbda",
    pill: "#ad3f84",
  },
  {
    grade: "Sun Bright",
    name: "Fillerina 12HA Sun Bright",
    desc: "Protección solar con ácido hialurónico. Relleno y defensa simultáneos todo el año.",
    tags: ["SPF 30", "Antioxidante", "Uso diario"],
    accent: "#fff5db",
    pill: "#e8a624",
  },
]

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Aplicación del gel con pipeta",
    body: "Con la pipeta incluida en el kit, aplica el gel Fillerina directamente sobre las zonas a tratar.",
    Icon: Droplets,
  },
  {
    step: "02",
    title: "Penetración transdérmica",
    body: "Las 12 moléculas de HA de distintos pesos moleculares penetran progresivamente hasta dermis profunda.",
    Icon: FlaskConical,
  },
  {
    step: "03",
    title: "Resultados visibles desde semana 2",
    body: "Desde la segunda semana se observan líneas más rellenas, mayor firmeza y luminosidad duradera.",
    Icon: Sparkles,
  },
]

const CLINICAL_STATS = [
  { value: "+21%", label: "Volumen en pómulos", note: "tras 14 días" },
  { value: "+14%", label: "Volumen en labios", note: "aplicación diaria" },
  { value: "12", label: "Moléculas de HA", note: "distintos pesos moleculares" },
  { value: "100%", label: "Tolerancia cutánea", note: "sin irritación" },
]

const TESTIMONIALS = [
  {
    name: "Carolina R.",
    age: "48 años",
    text: "Empecé con el Grado 3 y en la segunda semana ya notaba los pómulos más marcados. Mis amigas me preguntaron si me había hecho algo.",
    grade: "Grado 3",
  },
  {
    name: "Valentina M.",
    age: "41 años",
    text: "Lo que más me gustó es que no hay tiempo de recuperación ni enrojecimiento. Uso Fillerina todas las noches y la piel está más densa.",
    grade: "Grado 2",
  },
  {
    name: "Fernanda C.",
    age: "55 años",
    text: "Tenía escepticismo pero los resultados me convencieron. El Grado 5+ es muy intenso, ideal para arrugas que ya estaban marcadas.",
    grade: "Grado 5+",
  },
]

// ── COMPONENTS ──────────────────────────────────────────────────────────────

function GradeCard({ grade, name, desc, tags, accent, pill }: typeof FILLERINA_GRADES[number]) {
  return (
    <div
      className="group rounded-2xl p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-1 flex flex-col gap-3"
      style={{ background: accent, border: `1px solid ${pill}22` }}
    >
      <div className="flex items-center justify-between">
        <span
          className="ls-p-sm rounded-full px-3 py-1 font-semibold"
          style={{ background: pill, color: "#fff" }}
        >
          {grade}
        </span>
        <ChevronRight className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: pill }} />
      </div>
      <h3 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
        {name}
      </h3>
      <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
        {desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto pt-1">
        {tags.map((t) => (
          <span
            key={t}
            className="ls-p-sm rounded-full px-2 py-0.5"
            style={{ background: "#fff", color: "var(--ls-gray-700)", border: `1px solid ${pill}44` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function GradeCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const VISIBLE = 3 // cards visible on desktop
  const total = FILLERINA_GRADES.length
  const maxIndex = total - 1

  const scrollTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex))
    setActive(clamped)
    const track = trackRef.current
    if (!track) return
    const card = track.children[clamped] as HTMLElement
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft - 16, behavior: "smooth" })
    }
  }, [maxIndex])

  return (
    <div className="relative">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={() => {
          const track = trackRef.current
          if (!track) return
          let closestIdx = 0
          let closestDist = Infinity
          Array.from(track.children).forEach((child, i) => {
            const el = child as HTMLElement
            const dist = Math.abs(el.offsetLeft - track.scrollLeft - track.offsetLeft)
            if (dist < closestDist) { closestDist = dist; closestIdx = i }
          })
          setActive(closestIdx)
        }}
      >
        {FILLERINA_GRADES.map((g, i) => (
          <div
            key={g.grade}
            className="shrink-0"
            style={{ width: `calc(${100 / VISIBLE}% - ${((VISIBLE - 1) * 20) / VISIBLE}px)`, minWidth: "260px" }}
          >
            <GradeCard {...g} />
          </div>
        ))}
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={() => scrollTo(active - 1)}
        disabled={active === 0}
        aria-label="Anterior"
        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all disabled:opacity-30"
        style={{ background: "#fff", border: "1px solid #e8c6e0" }}
      >
        <ChevronLeft className="h-5 w-5" style={{ color: "#ad3f84" }} />
      </button>
      <button
        onClick={() => scrollTo(active + 1)}
        disabled={active >= maxIndex}
        aria-label="Siguiente"
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all disabled:opacity-30"
        style={{ background: "#fff", border: "1px solid #e8c6e0" }}
      >
        <ChevronRight className="h-5 w-5" style={{ color: "#ad3f84" }} />
      </button>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Selector de grado">
        {FILLERINA_GRADES.map((g, i) => (
          <button
            key={g.grade}
            role="tab"
            aria-selected={active === i}
            aria-label={g.grade}
            onClick={() => scrollTo(i)}
            className="transition-all duration-200"
            style={{
              height: "8px",
              width: active === i ? "24px" : "8px",
              borderRadius: "99px",
              background: active === i ? "#ad3f84" : "#e8c6e0",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  )
}

function StepCard({ step, title, body, Icon }: typeof HOW_IT_WORKS[number]) {
  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-bold"
          style={{ background: "var(--ls-gray-900)", color: "#fff" }}
        >
          {step}
        </span>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ background: "#fdf3f7", border: "1px solid #e8c6e0" }}
        >
          <Icon className="h-5 w-5" style={{ color: "var(--ls-red-700)" }} />
        </div>
      </div>
      <div>
        <h4 className="ls-h4" style={{ color: "var(--ls-gray-900)" }}>
          {title}
        </h4>
        <p className="ls-p mt-2" style={{ color: "var(--ls-gray-700)" }}>
          {body}
        </p>
      </div>
    </div>
  )
}

function StatCard({ value, label, note }: typeof CLINICAL_STATS[number]) {
  return (
    <div
      className="rounded-2xl p-6 text-center"
      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <p className="font-bold" style={{ fontSize: "2.5rem", color: "#fff", lineHeight: 1 }}>
        {value}
      </p>
      <p className="ls-p mt-1 font-semibold" style={{ color: "#fff" }}>
        {label}
      </p>
      <p className="ls-p-sm mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
        {note}
      </p>
    </div>
  )
}

function TestimonialCard({ name, age, text, grade }: typeof TESTIMONIALS[number]) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-3"
      style={{ background: "#fff", border: "1px solid var(--ls-gray-100)" }}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" style={{ color: "#f0a84b" }} />
        ))}
      </div>
      <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
        &ldquo;{text}&rdquo;
      </p>
      <div className="mt-auto pt-2 flex items-center justify-between border-t" style={{ borderColor: "var(--ls-gray-100)" }}>
        <div>
          <p className="ls-p font-semibold" style={{ color: "var(--ls-gray-900)" }}>
            {name}
          </p>
          <p className="ls-p-sm" style={{ color: "var(--ls-gray-500)" }}>
            {age}
          </p>
        </div>
        <span
          className="ls-p-sm rounded-full px-2 py-0.5"
          style={{ background: "#fdf3f7", color: "#ad3f84", border: "1px solid #e8c6e0" }}
        >
          {grade}
        </span>
      </div>
    </div>
  )
}

// ── PAGE ────────────────────────────────────────────────────────────────────

export default function CuidadoDeLaPielPage() {
  const { colors } = useLaboSuisseStore()

  return (
    <div style={lsColorsToCSSVars(colors)}>
      <main style={{ fontFamily: "var(--font-sans)", background: "#fff" }}>
        <LaboHeader />

        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #fdf0f6 0%, #fff5fb 45%, #ffffff 80%)",
            paddingTop: "140px",
            paddingBottom: "96px",
          }}
        >
          {/* decorative blobs */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, #f5c8e4, transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #fde8f2, transparent 70%)" }}
          />

          <div className="ls-container relative grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <span
                  className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold uppercase tracking-[0.18em]"
                  style={{ background: "var(--ls-gray-900)", color: "var(--ls-white)" }}
                >
                  Cuidado de la piel · Fillerina
                </span>
                <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                  Relleno · Volumen · Luminosidad · Firmeza
                </p>
              </div>

              <div className="space-y-4">
                <h1 className="ls-h1" style={{ color: "var(--ls-gray-900)", lineHeight: 1.1 }}>
                  Fillerina: el relleno que{" "}
                  <em style={{ color: "#ad3f84", fontStyle: "normal" }}>penetra sin agujas</em>
                </h1>
                <p className="ls-p-lg" style={{ color: "var(--ls-gray-700)" }}>
                  12 tipos de ácido hialurónico con distintos pesos moleculares que viajan hasta la dermis profunda.
                  Volumen real en pómulos y labios, firmeza y luminosidad desde las primeras semanas de uso.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#productos" className="ls-btn ls-btn-primary gap-2">
                  Ver todos los grados
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/labosuisse/tecnologia-transdermica"
                  className="ls-btn ls-btn-tertiary"
                  style={{ color: "var(--ls-gray-900)" }}
                >
                  Conocer la tecnología
                </a>
              </div>

              {/* chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["12 moléculas de HA", "Sin agujas · sin parabenos", "Test dermatológico", "Uso doméstico"].map((c) => (
                  <span
                    key={c}
                    className="ls-p-sm inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                    style={{ background: "#fff", color: "var(--ls-gray-700)", border: "1px solid #e8c6e0" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#ad3f84" }} />
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Image block */}
            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-[40px] blur-3xl"
                style={{ background: "radial-gradient(circle at 40% 40%, #f8d0e8 0%, transparent 60%)" }}
              />
              <div
                className="relative flex justify-center rounded-[40px] p-10"
                style={{ background: "rgba(255,255,255,0.75)", border: "1px solid #f0d4e8", boxShadow: "0 16px 48px rgba(173,63,132,0.12)" }}
              >
                <Image
                  src="/images/derma/crescina.png"
                  alt="Tratamiento Fillerina 12HA"
                  width={480}
                  height={520}
                  className="h-auto w-full max-w-[320px] object-contain"
                  priority
                />
              </div>
              {/* floating badge */}
              <div
                className="absolute -bottom-4 left-6 rounded-xl px-4 py-3 shadow-lg"
                style={{ background: "#ad3f84", color: "#fff" }}
              >
                <p className="ls-p-sm font-semibold">5 grados de tratamiento</p>
                <p className="ls-p-sm opacity-80">para cada nivel de envejecimiento</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BRAND STRIPE ── */}
        <div
          className="py-4 text-center ls-p-sm font-semibold tracking-[0.2em] uppercase"
          style={{ background: "var(--ls-gray-900)", color: "#fff" }}
        >
          FILLERINA · 12HA REPLENISHING TREATMENT · LABO SUISSE SINCE 1986
        </div>

        {/* ── PRODUCT LINE ── */}
        <section id="productos" className="py-20" style={{ background: "#fff" }}>
          <div className="ls-container space-y-10">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Línea de productos
              </p>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)", maxWidth: "540px" }}>
                  Elige el grado según tu nivel de envejecimiento.
                </h2>
                <a href="/labosuisse/tecnologia-transdermica" className="ls-btn ls-btn-link">
                  ¿Cómo elegir mi grado? →
                </a>
              </div>
              <p className="ls-p" style={{ color: "var(--ls-gray-600)", maxWidth: "620px" }}>
                Cada grado contiene las mismas 12 moléculas de ácido hialurónico, pero en concentraciones progresivamente
                más altas para adaptarse a distintos estadios de envejecimiento.
              </p>
            </div>

            <div className="relative px-6">
              <GradeCarousel />
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-20" style={{ background: "var(--ls-gray-100)" }}>
          <div className="ls-container space-y-12">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Cómo funciona
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                Tres pasos. Resultados visibles desde la semana dos.
              </h2>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              {HOW_IT_WORKS.map((step) => (
                <StepCard key={step.step} {...step} />
              ))}
            </div>

            {/* image + text */}
            <div
              className="mt-4 grid gap-8 overflow-hidden rounded-[28px] md:grid-cols-[1.1fr_0.9fr] md:items-center"
              style={{ background: "#fff", border: "1px solid var(--ls-gray-200)" }}
            >
              <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
                <Image
                  src="/images/derma/crescina2-foto.png"
                  alt="Protocolo Fillerina"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-8 space-y-4">
                <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                  Protocolo de 14 días
                </p>
                <h3 className="ls-h3" style={{ color: "var(--ls-gray-900)" }}>
                  Un tratamiento completo cada mes. Resultados que se acumulan.
                </h3>
                <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
                  Usa Fillerina cada noche durante 14 días. Descansa y repite. Los niveles de HA en dermis se van
                  incrementando ciclo a ciclo, con resultados cada vez más notorios.
                </p>
                <a href="#resultados" className="ls-btn ls-btn-primary gap-2 w-fit">
                  Ver resultados clínicos
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CLINICAL STATS ── */}
        <section id="resultados" className="py-20" style={{ background: "#0f0f0f" }}>
          <div className="ls-container space-y-12">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Evidencia clínica
              </p>
              <h2 className="ls-h2" style={{ color: "#fff" }}>
                Datos que respaldan cada dosis de Fillerina.
              </h2>
              <p className="ls-p" style={{ color: "rgba(255,255,255,0.7)", maxWidth: "560px" }}>
                Estudios realizados en laboratorios independientes con voluntarias de 35 a 60 años. Protocolo controlado
                de 14 días, aplicación nocturna diaria.
              </p>
            </div>

            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              {CLINICAL_STATS.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {["Sin agujas", "Sin downtime", "Sin parabenos", "Test dermatológico internacional"].map((t) => (
                <span key={t} className="ls-p-sm rounded-full px-3 py-1.5" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-20" style={{ background: "#fff" }}>
          <div className="ls-container space-y-10">
            <div className="space-y-3">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Experiencias reales
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                Lo que dicen quienes lo han probado.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="py-20" style={{ background: "var(--ls-gray-100)" }}>
          <div className="ls-container grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div className="space-y-4">
              <p className="ls-p-sm uppercase tracking-[0.2em]" style={{ color: "var(--ls-gray-500)" }}>
                Encuentra tu grado
              </p>
              <h2 className="ls-h2" style={{ color: "var(--ls-gray-900)" }}>
                ¿No sabes qué grado de Fillerina necesitas?
              </h2>
              <p className="ls-p-lg" style={{ color: "var(--ls-gray-700)" }}>
                Un especialista Labo analiza tus necesidades y te indica el grado ideal para tus zonas de mayor
                prioridad: pómulos, labios, entrecejo o contorno de ojos.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/labosuisse/descubre-labo" className="ls-btn ls-btn-primary gap-2">
                  Agendar asesoría gratuita
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/labosuisse"
                  className="ls-btn ls-btn-tertiary"
                  style={{ color: "var(--ls-gray-900)" }}
                >
                  Ver toda la línea Labo
                </a>
              </div>
            </div>
            <div
              className="rounded-[28px] p-8 space-y-4"
              style={{ background: "#fff", border: "1px solid var(--ls-gray-200)" }}
            >
              <div className="flex items-center justify-between">
                <p className="ls-p-sm uppercase tracking-[0.18em]" style={{ color: "var(--ls-gray-500)" }}>
                  Selector de grado
                </p>
                <ShieldCheck className="h-5 w-5" style={{ color: "#ad3f84" }} />
              </div>
              <ul className="space-y-3">
                {[
                  ["Grado 1–2", "Primeros signos, piel preventiva"],
                  ["Grado 3", "Pérdida de volumen moderada"],
                  ["Grado 4", "Arrugas visibles y tejido caído"],
                  ["Grado 5+", "Necesidades avanzadas, máxima eficacia"],
                ].map(([g, d]) => (
                  <li key={g} className="flex items-start gap-3 rounded-xl px-4 py-3" style={{ background: "var(--ls-gray-100)" }}>
                    <span className="ls-p-sm rounded-full px-2 py-0.5 font-semibold shrink-0" style={{ background: "#ad3f84", color: "#fff" }}>
                      {g}
                    </span>
                    <span className="ls-p" style={{ color: "var(--ls-gray-700)" }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <LaboFooter />
      </main>
    </div>
  )
}
