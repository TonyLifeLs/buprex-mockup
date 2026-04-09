import type { CSSProperties } from "react"

export type VitacapTokens = {
  brand900: string
  brand800: string
  brandAccent: string
  surfaceGold: string
  surfaceSand: string
  lineSoft: string
  neutral100: string
  neutral900: string
  success: string
  warning: string
  danger: string
}

// Colors follow the official Vitacap G brand manual
export const vitacapTokens: VitacapTokens = {
  brand900: "#C3311D",   // Rojo vivo — primary brand red
  brand800: "#922216",   // Rojo medio — secondary red
  brandAccent: "#F1DF00", // Amarillo brillante — primary accent
  surfaceGold: "#ECC057", // Sunrise — warm complementary
  surfaceSand: "#DA814C", // Durazno — complementary
  lineSoft: "#671225",    // Vino — complementary dark
  neutral100: "#FFFFFF",
  neutral900: "#030100",
  success: "#2DCB48",
  warning: "#D0810B",
  danger: "#DB0045",
}

// Primary: Montserrat (via --font-vitacap CSS variable, loaded by next/font)
// Secondary/Accent: Nairi Amber (via --font-vitacap-accent, falls back to Montserrat)
export const vitacapFontFamily = "var(--font-vitacap, var(--font-montserrat), 'Montserrat', system-ui, sans-serif)"
export const vitacapFontAccent = "var(--font-vitacap-accent, var(--font-montserrat), 'Montserrat', sans-serif)"

export function vitacapVars(tokens: VitacapTokens = vitacapTokens): CSSProperties {
  return {
    "--brand-900": tokens.brand900,
    "--brand-800": tokens.brand800,
    "--brand-accent": tokens.brandAccent,
    "--surface-gold": tokens.surfaceGold,
    "--surface-sand": tokens.surfaceSand,
    "--line-soft": tokens.lineSoft,
    "--neutral-100": tokens.neutral100,
    "--neutral-900": tokens.neutral900,
    "--success": tokens.success,
    "--warning": tokens.warning,
    "--danger": tokens.danger,
    "--font-vitacap": `var(--font-montserrat), 'Montserrat', system-ui, -apple-system, sans-serif`,
    "--font-vitacap-accent": `var(--font-montserrat), 'Montserrat', sans-serif`,
  } as CSSProperties
}
