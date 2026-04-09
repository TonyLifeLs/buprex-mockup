"use client"

import type { ReactNode } from "react"
import { useVitacapStore } from "@/store/vitacap"
import { Navbar } from "@/components/vitacap/Navbar"
import { Hero } from "@/components/vitacap/Hero"
import { CategoryCard } from "@/components/vitacap/CategoryCard"
import { Newsletter } from "@/components/vitacap/Newsletter"
import { Button } from "@/components/vitacap/Button"
import { Carousel } from "@/components/vitacap/Carousel"
import { Footer } from "@/components/vitacap/Footer"
import { BenefitCards } from "@/components/vitacap/BenefitCards"
import { vitacapVars, vitacapFontFamily, vitacapFontAccent } from "@/components/vitacap/theme"

// ── ¿Qué es Vitacap G? — brand pillars (structural, not CMS-editable) ────────
const brandPillars = [
  {
    title: "Energía diaria",
    description: "Apoya tu rendimiento y reduce la sensación de cansancio para que puedas dar lo mejor de ti cada día.",
    href: "#beneficios",
    tone: "gold" as const,
  },
  {
    title: "Estilo de vida activo",
    description: "Formulado para acompañar a personas con alta demanda física o mental que no paran.",
    href: "#para-quien",
    tone: "sand" as const,
  },
  {
    title: "Bienestar integral",
    description: "Contribuye al equilibrio general del organismo con vitaminas, minerales y extractos naturales.",
    href: "#como-usarlo",
    tone: "gold" as const,
  },
  {
    title: "Fórmula confiable",
    description: "Desarrollado bajo estándares de Laboratorios LIFE para ofrecerte la mejor calidad en cada cápsula.",
    href: "#vitacap",
    tone: "sand" as const,
  },
]


export default function VitacapPage() {
  const { tokens, content, vitacapSections } = useVitacapStore()

  // ── Section map: id → JSX ──────────────────────────────────────────────────
  const sectionMap: Record<string, ReactNode> = {

    navbar: <Navbar />,

    hero: (
      <Hero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        ctaLabel={content.heroCtaLabel}
        ctaHref="#que-es"
        support={content.heroSupport}
      />
    ),

    "que-es": (
      <section id="que-es" className="py-20" style={{ backgroundColor: "#fff" }}>
        <div className="ls-container space-y-10">
          <div className="max-w-[700px] space-y-3">
            <p className="text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--brand-900)" }}>
              {content.queEsLabel}
            </p>
            <h2
              className="text-[32px] leading-[40px] font-bold md:text-[42px] md:leading-[50px]"
              style={{ color: "var(--neutral-900)", fontFamily: vitacapFontAccent }}
            >
              {content.queEsTitle}
            </h2>
            <p className="text-[17px] leading-[27px]" style={{ color: "var(--neutral-900)", opacity: 0.75 }}>
              {content.queEsDesc}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {brandPillars.map((pillar) => (
              <CategoryCard key={pillar.title} {...pillar} />
            ))}
          </div>
        </div>
      </section>
    ),

    beneficios: (
      <section id="beneficios" className="py-20" style={{ backgroundColor: "#fafafa" }}>
        <div className="ls-container space-y-10">
          <div className="max-w-[640px] space-y-3">
            <p className="text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--brand-900)" }}>
              {content.beneficiosLabel}
            </p>
            <h2
              className="text-[32px] leading-[40px] font-bold md:text-[42px] md:leading-[50px]"
              style={{ color: "var(--neutral-900)", fontFamily: vitacapFontAccent }}
            >
              {content.beneficiosTitle}
            </h2>
          </div>
          <BenefitCards cards={content.benefits} />
        </div>
      </section>
    ),

    carousel1: (
      <section className="py-20" style={{ backgroundColor: "var(--brand-900)" }}>
        <div className="ls-container space-y-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--brand-accent)" }}>
                {content.carousel1Label}
              </p>
              <h3
                className="mt-1 text-[26px] leading-[34px] font-bold md:text-[32px] md:leading-[40px]"
                style={{ color: "#fff", fontFamily: vitacapFontAccent }}
              >
                {content.carousel1Title}
              </h3>
            </div>
            <p className="text-[14px] leading-[20px] md:max-w-[260px] md:text-right" style={{ color: "rgba(255,255,255,0.7)" }}>
              Desliza para descubrir cómo Vitacap G acompaña cada momento de tu día.
            </p>
          </div>
          <Carousel items={content.slidesActivaTuDia} />
        </div>
      </section>
    ),

    "para-quien": (
      <section id="para-quien" className="py-20" style={{ backgroundColor: "#fff" }}>
        <div className="ls-container grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-5">
            <p className="text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--brand-900)" }}>
              {content.paraQuienLabel}
            </p>
            <h2
              className="text-[32px] leading-[40px] font-bold md:text-[40px] md:leading-[48px]"
              style={{ color: "var(--neutral-900)", fontFamily: vitacapFontAccent }}
            >
              {content.paraQuienTitle}
            </h2>
            <p className="text-[17px] leading-[27px]" style={{ color: "var(--neutral-900)", opacity: 0.75 }}>
              {content.paraQuienDesc}
            </p>
            <Button variant="primary" size="lg">Quiero Vitacap G</Button>
          </div>
          <div className="grid gap-4">
            {content.profiles.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl px-5 py-4"
                style={{ backgroundColor: "#fafafa", border: "1.5px solid #ede8e7" }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[20px]"
                  style={{ backgroundColor: "rgba(195,49,29,0.09)" }}
                >
                  {item.icon}
                </span>
                <div>
                  <p className="text-[16px] font-bold" style={{ color: "var(--neutral-900)" }}>{item.label}</p>
                  <p className="text-[14px]" style={{ color: "var(--neutral-900)", opacity: 0.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),

    carousel2: (
      <section className="py-20" style={{ backgroundColor: "var(--brand-800)" }}>
        <div className="ls-container space-y-8">
          <div className="max-w-[600px] space-y-2">
            <p className="text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--brand-accent)" }}>
              {content.carousel2Label}
            </p>
            <h3
              className="text-[26px] leading-[34px] font-bold md:text-[32px] md:leading-[40px]"
              style={{ color: "#fff", fontFamily: vitacapFontAccent }}
            >
              {content.carousel2Title}
            </h3>
          </div>
          <Carousel items={content.slidesPorQueElegir} />
        </div>
      </section>
    ),

    "como-usarlo": (
      <section id="como-usarlo" className="py-20" style={{ backgroundColor: "#fff" }}>
        <div className="ls-container space-y-10">
          <div className="max-w-[600px] space-y-3">
            <p className="text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--brand-900)" }}>
              {content.comoUsarloLabel}
            </p>
            <h2
              className="text-[32px] leading-[40px] font-bold md:text-[42px] md:leading-[50px]"
              style={{ color: "var(--neutral-900)", fontFamily: vitacapFontAccent }}
            >
              {content.comoUsarloTitle}
            </h2>
            <p className="text-[17px] leading-[27px]" style={{ color: "var(--neutral-900)", opacity: 0.75 }}>
              {content.comoUsarloDesc}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {content.steps.map((s) => (
              <div
                key={s.step}
                className="relative overflow-hidden rounded-2xl p-7"
                style={{ border: `2px solid ${s.accent}22`, backgroundColor: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
              >
                <span className="mb-4 block text-[48px] font-black leading-none" style={{ color: s.accent + "22" }}>
                  {s.step}
                </span>
                <h4 className="text-[20px] font-bold leading-[26px]" style={{ color: s.accent }}>
                  {s.title}
                </h4>
                <p className="mt-2 text-[15px] leading-[23px]" style={{ color: "var(--neutral-900)", opacity: 0.75 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl px-6 py-5" style={{ backgroundColor: "#fafafa", border: "1.5px solid #ede8e7" }}>
            <p className="text-[14px] leading-[21px]" style={{ color: "var(--neutral-900)", opacity: 0.65 }}>
              <strong>Nota:</strong> {content.highlightNote}
            </p>
          </div>
        </div>
      </section>
    ),

    destacado: (
      <section className="py-20" style={{ backgroundColor: "var(--brand-800)" }}>
        <div className="ls-container grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div className="space-y-6">
            <p className="text-[13px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--brand-accent)" }}>
              {content.highlightLabel}
            </p>
            <h3
              className="text-[28px] leading-[36px] font-bold md:text-[36px] md:leading-[44px]"
              style={{ color: "#fff", fontFamily: vitacapFontAccent }}
            >
              {content.highlightTitle}
            </h3>
            <p className="text-[16px] leading-[24px]" style={{ color: "rgba(255,255,255,0.8)" }}>
              {content.highlightDesc}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {content.highlightTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-[13px] font-bold"
                  style={{ backgroundColor: "var(--brand-accent)", color: "var(--neutral-900)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {[
              { label: "1 cápsula al día",    sub: "Dosis diaria simple, sin preparación adicional" },
              { label: "Para estilos activos", sub: "Diseñado para personas con alta demanda física o mental" },
              { label: "Fórmula completa",     sub: "Vitaminas, minerales y extractos naturales en cada dosis" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl px-5 py-4"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <p className="text-[16px] font-bold" style={{ color: "#fff" }}>{item.label}</p>
                <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.7)" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),

    newsletter: <Newsletter />,

    footer: <Footer />,
  }

  return (
    <div style={vitacapVars(tokens)}>
      <main style={{ fontFamily: vitacapFontFamily, backgroundColor: "#fff" }}>
        {vitacapSections
          .filter((s) => s.enabled)
          .map((s) => {
            const node = sectionMap[s.id]
            if (!node) return null
            return <div key={s.id}>{node}</div>
          })}
      </main>
    </div>
  )
}
