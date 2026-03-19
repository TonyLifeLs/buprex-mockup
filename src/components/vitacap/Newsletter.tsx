"use client"

import { useState } from "react"
import { Button } from "./Button"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const emailValid = /.+@.+\..+/.test(email)
    if (!emailValid || !consent) {
      setStatus("error")
      setMessage(!emailValid ? "Ingresa un correo válido" : "Acepta el consentimiento")
      return
    }
    setStatus("success")
    setMessage("Te suscribiste correctamente a Vitacap G")
  }

  const statusColor = status === "success" ? "var(--success)" : status === "error" ? "var(--danger)" : undefined

  return (
    <section
      id="compra"
      className="py-14"
      style={{ backgroundColor: "var(--neutral-100)" }}
      aria-labelledby="newsletter-heading"
    >
      <div className="ls-container grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-3">
          <p className="text-[14px] leading-[19px] uppercase tracking-[0.18em]" style={{ color: "var(--line-soft)" }}>
            Club Vitacap G
          </p>
          <h2
            id="newsletter-heading"
            className="text-[30px] leading-[38px] font-semibold md:text-[38px] md:leading-[44px]"
            style={{ color: "var(--neutral-900)" }}
          >
            Recibe lanzamientos, guías y protocolos transdérmicos.
          </h2>
          <p className="text-[16px] leading-[24px]" style={{ color: "var(--neutral-900)" }}>
            Suscríbete para obtener asesoría y ofertas exclusivas. Todo con el tono cálido de Vitacap G.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl p-6 shadow-lg"
          style={{
            backgroundColor: "var(--neutral-100)",
            border: "1px solid var(--line-soft)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
          }}
        >
          <label className="block space-y-2">
            <span className="text-[15px] font-medium text-[var(--neutral-900)]">Correo electrónico</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-full px-4 py-3 text-[15px] text-[var(--neutral-900)] outline-none"
              style={{
                border: `1px solid ${statusColor ?? "var(--line-soft)"}`,
                backgroundColor: "#fff",
              }}
            />
          </label>

          <label className="flex items-start gap-3 text-[14px] leading-[19px] text-[var(--neutral-900)]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border"
              style={{ borderColor: "var(--line-soft)" }}
            />
            Acepto recibir comunicaciones sobre Vitacap G y confirmo que he leído la política de privacidad.
          </label>

          <Button variant="primary" size="lg" type="submit">
            Suscribirme
          </Button>

          {status !== "idle" && (
            <p className="text-[14px] font-medium" style={{ color: statusColor }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
