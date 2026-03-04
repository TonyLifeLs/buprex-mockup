"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useLaboSuisseStore } from "@/store/labosuisse"

export function LaboAccordion() {
  const { faq } = useLaboSuisseStore()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" style={{ backgroundColor: "var(--ls-white, #fff)" }}>
      <div className="ls-container py-20">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span
            className="ls-p-sm mb-3 inline-block font-bold tracking-[0.3em] uppercase"
            style={{ color: "var(--ls-red-700)" }}
          >
            {faq.superlabel}
          </span>
          <h2 className="ls-h2" style={{ color: "var(--ls-black, #000)" }}>{faq.sectionTitle}</h2>
        </div>

        <div className="mx-auto max-w-2xl">
          {faq.items.map((item, i) => (
            <div
              key={item.id}
              className="ls-accordion-item"
              data-open={openIndex === i ? "true" : "false"}
            >
              <button
                className="ls-accordion-trigger"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <span className="ls-accordion-icon">
                  <Plus className="h-5 w-5" />
                </span>
              </button>
              <div className="ls-accordion-content">
                <div className="ls-accordion-inner">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
