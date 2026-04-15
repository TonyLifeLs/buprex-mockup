/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  AUTH
 *  Gestión de sesión en localStorage.
 *  La autenticación se realiza exclusivamente vía Microsoft (MSAL).
 *  Tipos → @/types/auth
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Session } from "@/types/auth"

// Re-export types for convenience
export type { User, Session } from "@/types/auth"

// ─── Clave del localStorage ───────────────────────────────────────────────────

const SESSION_KEY = "buprex_session"

// ─── Funciones ────────────────────────────────────────────────────────────────

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
