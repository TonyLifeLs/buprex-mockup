"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { useLaboSuisseStore } from "@/store/labosuisse"

export function LaboClub() {
  const { newsletter } = useLaboSuisseStore()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [emailError, setEmailError] = useState("")

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailError("Por favor ingresa un correo electrónico válido.")
      return
    }
    if (!consent) return
    setEmailError("")
    setSubmitted(true)
  }

  return (
    <section
      id="club"
      style={{ backgroundColor: "var(--brand-transdermic)" }}
      aria-label="Newsletter Labo Club"
    >
      <div className="ls-container py-20">
        <div className="mx-auto max-w-xl">
          <div className="text-center mb-10">
            <span
              className="ls-p-sm mb-3 inline-block font-bold tracking-[0.3em] uppercase"
              style={{ color: "var(--ls-red-700)" }}
            >
              {newsletter.superlabel}
            </span>
            <h2 className="ls-h2 mb-4" style={{ color: "var(--ls-black, #000)" }}>
              {newsletter.title}
            </h2>
            <p
              className="ls-p-sm mb-1 font-bold tracking-[0.25em] uppercase"
              style={{ color: "var(--ls-gray-700)" }}
            >
              {newsletter.tagline}
            </p>
            <p className="ls-p" style={{ color: "var(--ls-gray-700)" }}>
              {newsletter.description}
            </p>
          </div>

          {submitted ? (
            <div
              className="border px-8 py-8 text-center"
              style={{ borderColor: "var(--ls-success, #2DCB48)", backgroundColor: "rgba(45,203,72,0.07)" }}
              role="alert"
              aria-live="polite"
            >
              <p className="ls-h5" style={{ color: "var(--ls-success, #2DCB48)" }}>
                {newsletter.successTitle}
              </p>
              <p className="ls-p-sm mt-2" style={{ color: "var(--ls-gray-700)" }}>
                {newsletter.successDescription}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate aria-label="Formulario de suscripción">
              <div className="ls-field">
                <label htmlFor="ls-name" className="ls-label">Nombre</label>
                <input
                  id="ls-name"
                  type="text"
                  placeholder={newsletter.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ls-input"
                  autoComplete="given-name"
                />
              </div>

              <div className="ls-field">
                <label htmlFor="ls-email" className="ls-label">
                  Correo electrónico{" "}
                  <span style={{ color: "var(--ls-danger, #DB0045)" }} aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                    style={{ color: "var(--ls-gray-500)" }}
                    aria-hidden="true"
                  />
                  <input
                    id="ls-email"
                    type="email"
                    placeholder={newsletter.emailPlaceholder}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError("") }}
                    className={`ls-input pl-11${emailError ? " error" : ""}`}
                    required
                    aria-required="true"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "ls-email-error" : undefined}
                    autoComplete="email"
                  />
                </div>
                {emailError && (
                  <span id="ls-email-error" className="ls-hint error" role="alert">
                    {emailError}
                  </span>
                )}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    aria-label={newsletter.consentText}
                  />
                  <div
                    className="flex h-4 w-4 items-center justify-center border transition-all"
                    style={{
                      borderColor: consent ? "var(--ls-black, #000)" : "var(--ls-gray-300)",
                      backgroundColor: consent ? "var(--ls-black, #000)" : "transparent",
                    }}
                    aria-hidden="true"
                  >
                    {consent && (
                      <span style={{ color: "var(--ls-white, #fff)", fontSize: "10px", lineHeight: 1 }}>✓</span>
                    )}
                  </div>
                </div>
                <span className="ls-p-sm" style={{ color: "var(--ls-gray-700)" }}>
                  {newsletter.consentText}
                </span>
              </label>

              <button
                type="submit"
                className="ls-btn ls-btn-primary w-full justify-center"
                disabled={!consent}
                aria-disabled={!consent}
              >
                {newsletter.ctaLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
