/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  AUTH
 *  Validación de credenciales y gestión de sesión en localStorage.
 *  Tipos → @/types/auth
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { User, Session } from "@/types/auth"

// Re-export types for convenience
export type { User, Session } from "@/types/auth"

// ─── Usuarios registrados (mockup, solo cliente) ──────────────────────────────

const USERS: User[] = [
  { username: "admin", password: "123456", role: "admin", name: "Administrador" },
]

// ─── Clave del localStorage ───────────────────────────────────────────────────

const SESSION_KEY = "buprex_session"

// ─── Funciones ────────────────────────────────────────────────────────────────

export function validateCredentials(username: string, password: string): User | null {
  return USERS.find((u) => u.username === username && u.password === password) ?? null
}

export function saveSession(user: Session): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  }
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function clearSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY)
  }
}
