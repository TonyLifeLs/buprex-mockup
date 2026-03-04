"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User, ShieldCheck, AlertCircle } from "lucide-react"
import { validateCredentials, saveSession, getSession } from "@/lib/auth"

export function LoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (getSession()) {
      router.replace("/dashboard")
    }
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    const user = validateCredentials(username.trim(), password)
    if (!user) {
      setError("Usuario o contraseña incorrectos. Verifica tus credenciales.")
      setLoading(false)
      return
    }
    saveSession({ username: user.username, role: user.role, name: user.name })
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Panel izquierdo – marca ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0c3d6e] relative overflow-hidden px-14 py-12">
        {/* Círculos decorativos */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#0099d6]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#0099d6]/15 blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-60 h-60 rounded-full bg-white/5 blur-2xl" />

        {/* Logo */}
        <div className="relative z-10">
          <Image
            src="/images/buprex-logo.png"
            alt="Buprex"
            width={220}
            height={60}
            className="h-14 w-auto object-contain"
            priority
          />
        </div>

        {/* Centro */}
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0099d6]/20 border border-[#0099d6]/40">
              <ShieldCheck className="h-5 w-5 text-[#0099d6]" />
            </span>
            <span className="text-sm font-semibold text-[#0099d6] tracking-widest uppercase">
              Portal Administrativo
            </span>
          </div>

          <h1
            className="text-4xl xl:text-5xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Gestiona
            <br />
            <span className="text-[#0099d6]">Buprex</span>
            <br />
            360°
          </h1>

          <p className="text-white/60 text-base leading-relaxed max-w-xs">
            Acceso exclusivo para administradores. Controla productos, contenidos y métricas desde un solo lugar.
          </p>

          <ul className="mt-2 space-y-3">
            {[
              "Gestión de productos y catálogo",
              "Control de contenidos web",
              "Reportes y métricas en tiempo real",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/75 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0099d6]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer del panel */}
        <p className="relative z-10 text-white/30 text-xs">
          © 2026 Buprex · Todos los derechos reservados
        </p>
      </div>

      {/* ── Panel derecho – formulario ── */}
      <div className="flex flex-1 flex-col justify-center items-center bg-[#f0f6fb] px-4 sm:px-6 py-10 sm:py-12 min-h-screen lg:min-h-0">
        {/* Logo mobile */}
        <div className="mb-8 flex justify-center lg:hidden">
          <Image
            src="/images/buprex-logo.png"
            alt="Buprex"
            width={160}
            height={44}
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 px-6 sm:px-8 py-8 sm:py-10">
            {/* Encabezado */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0c3d6e]">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h2
                className="text-2xl font-bold text-[#0c3d6e]"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Iniciar sesión
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Ingresa tus credenciales de administrador
              </p>
            </div>

            {/* Alerta de error */}
            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
              {/* Usuario */}
              <div className="space-y-1.5">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                  Usuario
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nombre de usuario"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#0099d6] focus:bg-white focus:ring-2 focus:ring-[#0099d6]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    tabIndex={-1}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-[#0c3d6e] py-3 text-sm font-bold text-white transition hover:bg-[#0099d6] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Verificando...
                  </span>
                ) : (
                  "Ingresar"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">Acceso restringido</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <p className="mt-4 text-center text-xs text-gray-400">
              Solo usuarios autorizados pueden iniciar sesión.
              <br />
              Si no tienes acceso, contacta al administrador del sistema.
            </p>
          </div>

          {/* Back to site */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-[#0c3d6e] font-semibold underline-offset-4 hover:underline hover:text-[#0099d6] transition"
            >
              ← Volver al sitio web
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
