"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCMSStore } from "@/store/cms"

export function FAQ() {
  const sectionRef = useScrollReveal()
  const faqs = useCMSStore((s) => s.faqs)

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-slate-50 py-20 md:py-28">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-slate-200/80 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="scroll-reveal">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full border border-slate-300 bg-white px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              Dudas frecuentes
            </span>
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl text-balance">
              Preguntas Frecuentes
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Resolvemos tus dudas más comunes sobre BUPREX e Ibuprofeno.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`faq-${faq.id}`}
                className="rounded-xl border border-slate-200 bg-white px-6 shadow-sm transition-all data-[state=open]:border-slate-300 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="py-5 text-left font-[var(--font-heading)] text-sm font-semibold text-slate-900 hover:no-underline md:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
