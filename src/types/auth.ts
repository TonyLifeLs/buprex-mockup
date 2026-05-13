/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  AUTH TYPES
 *  Definición de tipos relacionados con autenticación y sesión.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type UserRole = "admin" | "editor" | "viewer"

export type User = {
  username: string
  role: UserRole
  name: string
}

export type Session = {
  username: string
  role: UserRole
  name: string
}
