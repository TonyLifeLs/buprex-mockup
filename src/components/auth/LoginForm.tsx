"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Lock, ShieldCheck } from "lucide-react"
import { validateCredentials, saveSession } from "@/lib/auth"

// ── Microsoft / MSAL login (comentado hasta tener Azure AD configurado) ───────
// import { useMsal } from "@azure/msal-react"
// import { loginRequest } from "@/lib/authConfig"

export function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // ── Microsoft login (comentado) ──────────────────────────────────────────
  // const { instance } = useMsal()
  // function handleMicrosoftSignIn() {
  //   setLoading(true)
  //   instance.loginRedirect(loginRequest).catch(() => setLoading(false))
  // }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const user = validateCredentials(username, password)
    if (!user) {
      setError("Usuario o contraseña incorrectos")
      setLoading(false)
      return
    }
    saveSession({ username: user.username, role: user.role, name: user.name })
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Panel izquierdo – marca ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden px-14 py-12" style={{ background: "linear-gradient(160deg, #C0392B 0%, #922B21 50%, #7B0D0D 100%)" }}>
        {/* Círculos decorativos */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-60 h-60 rounded-full bg-black/10 blur-2xl" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="bg-white rounded-2xl px-4 py-3 inline-block shadow-lg">
            <Image
              src="/images/laboratorios-life.png"
              alt="Laboratorios Life"
              width={180}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Centro */}
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 border border-white/40">
              <ShieldCheck className="h-5 w-5 text-white" />
            </span>
            <span className="text-sm font-semibold text-white/80 tracking-widest uppercase">
              Portal Administrativo
            </span>
          </div>

          <h1
            className="text-4xl xl:text-5xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Gestiona
            <br />
            <span className="text-white drop-shadow">tus sitios web</span>
            <br />
            360°
          </h1>

          <p className="text-white/70 text-base leading-relaxed max-w-xs">
            Acceso exclusivo para administradores. Controla productos, contenidos y métricas de todos tus sitios desde un solo lugar.
          </p>

          <ul className="mt-2 space-y-3">
            {[
              "Buprex · Derma · Labo Suisse",
              "Control de contenidos web",
              "Reportes y métricas en tiempo real",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer del panel */}
        <p className="relative z-10 text-white/40 text-xs">
          © 2026 Laboratorios Life · Todos los derechos reservados
        </p>
      </div>

      {/* ── Panel derecho – inicio de sesión ── */}
      <div className="flex flex-1 flex-col justify-center items-center bg-[#f8f8f8] px-4 sm:px-6 py-10 sm:py-12 min-h-screen lg:min-h-0">
        {/* Logo mobile */}
        <div className="mb-8 flex justify-center lg:hidden">
          <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-gray-100">
            <Image
              src="/images/laboratorios-life.png"
              alt="Laboratorios Life"
              width={160}
              height={44}
              className="h-11 w-auto object-contain"
            />
          </div>
        </div>

        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 px-6 sm:px-8 py-8 sm:py-10">
            {/* Encabezado */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg, #C0392B, #7B0D0D)" }}>
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Iniciar sesión
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Ingresa tus credenciales de acceso
              </p>
            </div>

            {/* Formulario usuario / contraseña */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="username" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Usuario
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition"
                  placeholder="admin"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <p className="text-xs text-red-600 font-medium text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C0392B] via-[#9F2B21] to-[#7B0D0D] py-3 px-4 text-sm font-semibold text-white shadow-lg shadow-red-200/60 transition hover:brightness-105 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Ingresando...
                  </>
                ) : "Iniciar sesión"}
              </button>
            </form>

            {/* ── Microsoft login (comentado hasta tener Azure AD) ──────────────
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">o</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <button
              onClick={handleMicrosoftSignIn}
              disabled={loading}
              className="mt-4 w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" className="h-5 w-5">
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
              Continuar con Microsoft
            </button>
            ─────────────────────────────────────────────────────────────── */}

            <p className="mt-6 text-center text-xs text-gray-400">
              Solo usuarios autorizados pueden iniciar sesión.
              <br />
              Si no tienes acceso, contacta al administrador del sistema.
            </p>
          </div>

          {/* Back to site */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-red-700 font-semibold underline-offset-4 hover:underline hover:text-red-500 transition"
            >
              ← Volver al sitio web
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
