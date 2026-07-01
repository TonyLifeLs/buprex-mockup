"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import {
  ShieldCheck,
  FlaskConical,
  TriangleAlert,
  Stethoscope,
  Pill,
  Thermometer,
  Baby,
  Heart,
} from "lucide-react"

const sections = [
  {
    icon: FlaskConical,
    color: "#00b2ff",
    bg: "bg-[#00b2ff]/10",
    border: "border-[#00b2ff]/30",
    title: "Propiedades",
    content:
      "Posee propiedades analgésicas y antipiréticas, efectivo en caso de dolor de tipo periférico, injurias traumáticas de tejidos blandos, dismenorrea primaria y dolor postquirúrgico en intervenciones menores.",
  },
  {
    icon: Pill,
    color: "#f5a623",
    bg: "bg-[#f5a623]/10",
    border: "border-[#f5a623]/30",
    title: "Dosis y Administración",
    content: null,
    dosis: [
      {
        icon: Baby,
        label: "Niños (general)",
        text: "10 mg/kg/dosis, repetir hasta 3–4 veces al día.",
      },
      {
        icon: Thermometer,
        label: "Fiebre < 39.2 °C",
        text: "Dosis recomendada: 5 mg/kg de peso.",
      },
      {
        icon: Thermometer,
        label: "Fiebre ≥ 39.2 °C",
        text: "Dosis recomendada: 10 mg/kg de peso.",
      },
    ],
    note: "Vía oral. Para niños de 6 meses a 12 años, ajustar según temperatura basal.",
  },
  {
    icon: ShieldCheck,
    color: "#e31e24",
    bg: "bg-[#e31e24]/10",
    border: "border-[#e31e24]/30",
    title: "Contraindicaciones",
    content:
      "No utilizar con antecedentes de hipersensibilidad a la sustancia, pólipos nasales, angioedema o reacción broncoespástica al ácido acetilsalicílico u otros AINEs. Contraindicado en Lupus Eritematoso Sistémico.",
  },
  {
    icon: TriangleAlert,
    color: "#0c3d6e",
    bg: "bg-[#0c3d6e]/10",
    border: "border-[#0c3d6e]/30",
    title: "Advertencias y Precauciones",
    content: null,
    warnings: [
      "Puede provocar trastornos gastrointestinales en pacientes sensibles a los AINEs.",
      "Ante trastornos visuales, descontinuar el tratamiento.",
      "Precaución en descompensación cardiaca, hipertensión, función renal alterada y pacientes con anticoagulantes.",
      "Embarazo: contraindicado en el tercer trimestre.",
      "Lactancia: no se recomienda su uso.",
      "Pediatría: utilizar con precaución.",
      "Geriatría: iniciar con dosis bajas y reajustar si es necesario.",
      "Puede causar somnolencia o mareo; precaución al conducir o usar maquinaria.",
    ],
  },
]

export function PharmaInfo() {
  const sectionRef = useScrollReveal()

  return (
    <section
      ref={sectionRef}
      id="informacion"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#0057B8]/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#4DA6FF]/14 blur-3xl" />

      <div className="buprex-container relative max-w-6xl">
        <div className="scroll-reveal mb-14 text-center">
          <span className="buprex-section-label">
            <Stethoscope size={13} />
            Información Técnica
          </span>
          <h2 className="mt-5 buprex-section-title">Ficha técnica con enfoque profesional</h2>
          <p className="mx-auto mt-4 max-w-2xl buprex-section-copy">
            Información clínica sobre propiedades, dosificación, contraindicaciones y precauciones de uso.
          </p>
          <div className="mx-auto mt-5 h-px w-20 rounded-full bg-gradient-to-r from-transparent via-[#0057B8]/45 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((sec, i) => {
            const Icon = sec.icon
            return (
              <div
                key={sec.title}
                className="scroll-reveal rounded-[1.8rem] border border-[#dbe5f0] bg-white p-6 shadow-[0_22px_55px_rgba(10,47,115,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(10,47,115,0.12)]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: sec.color + "1F" }}
                  >
                    <Icon size={20} color={sec.color} strokeWidth={2.2} />
                  </div>
                  <h3
                    className="font-[var(--font-heading)] text-lg font-semibold text-[#133161]"
                  >
                    {sec.title}
                  </h3>
                </div>

                {sec.content && (
                  <p className="text-sm leading-7 text-[#5f6f85]">{sec.content}</p>
                )}

                {"dosis" in sec && sec.dosis && (
                  <div className="flex flex-col gap-3">
                    {sec.dosis.map((d) => {
                      const DIcon = d.icon
                      return (
                        <div key={d.label} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef5ff]">
                            <DIcon size={14} color="#f5a623" strokeWidth={2.5} />
                          </div>
                          <div>
                            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#133161]">{d.label}</span>
                            <span className="text-sm text-[#5f6f85]">{d.text}</span>
                          </div>
                        </div>
                      )
                    })}
                    {sec.note && (
                      <p className="mt-1 rounded-xl border border-[#dbe5f0] bg-[#f7fbff] px-3 py-2 text-xs leading-6 text-[#5f6f85]">
                        {sec.note}
                      </p>
                    )}
                  </div>
                )}

                {"warnings" in sec && sec.warnings && (
                  <ul className="flex flex-col gap-2">
                    {sec.warnings.map((w, wi) => (
                      <li key={wi} className="flex items-start gap-2 text-sm leading-7 text-[#5f6f85]">
                        <Heart
                          size={13}
                          className="mt-1 shrink-0 fill-[#f3c4c8] text-[#d33f49]"
                        />
                        {w}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>

        <div className="scroll-reveal mt-10 rounded-[1.6rem] border border-[#dbe5f0] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-6 py-5 text-center text-xs leading-7 text-[#5f6f85]">
          <strong className="text-[#133161]">Nota:</strong> Esta información es de carácter referencial.
          Consulte siempre a su médico o farmacéutico antes de iniciar cualquier tratamiento.
          Mantenga fuera del alcance de los niños.
        </div>
      </div>
    </section>
  )
}
