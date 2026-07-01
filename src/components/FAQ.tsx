"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CircleHelp, ShieldCheck } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"

export function FAQ() {
  const sectionRef = useScrollReveal()
  const faqs = useCMSStore((s) => s.faqs)

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#4DA6FF]/16 blur-3xl" />

      <div className="buprex-container relative">
        <div className="scroll-reveal">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_minmax(0,1fr)] lg:items-start">
            <div className="rounded-[2rem] bg-[linear-gradient(180deg,#082f73_0%,#041538_100%)] p-8 text-white shadow-[0_26px_70px_rgba(6,37,94,0.22)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/88">
                <CircleHelp className="h-4 w-4" />
                Dudas frecuentes
              </span>
              <h2 className="mt-6 font-[var(--font-heading)] text-3xl font-extrabold tracking-[-0.03em] md:text-4xl text-balance">
                Preguntas frecuentes con lectura simple
              </h2>
              <p className="mt-4 text-base leading-8 text-white/76">
                Respuestas claras para mantener una experiencia confiable, ordenada y fácil de consultar.
              </p>
              <div className="mt-8 rounded-[1.5rem] border border-white/12 bg-white/8 p-5">
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/82">
                  <ShieldCheck className="h-4 w-4" />
                  Información responsable
                </div>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Consulta siempre con tu médico o farmacéutico si necesitas una recomendación personalizada.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={`faq-${faq.id}`}
                    className="rounded-[1.5rem] border border-[#dbe5f0] bg-white px-6 shadow-[0_18px_45px_rgba(10,47,115,0.06)] transition-all data-[state=open]:border-[#c6d7eb] data-[state=open]:shadow-[0_22px_50px_rgba(10,47,115,0.1)]"
                  >
                    <AccordionTrigger className="py-5 text-left font-[var(--font-heading)] text-sm font-semibold text-[#133161] hover:no-underline md:text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-7 text-[#5f6f85]">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
