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

export const vitacapTokens: VitacapTokens = {
  brand900: "#7F1D15",
  brand800: "#A3221C",
  brandAccent: "#BC4935",
  surfaceGold: "#DABF8F",
  surfaceSand: "#C89E68",
  lineSoft: "#9D7650",
  neutral100: "#FEFEFE",
  neutral900: "#030100",
  success: "#2DCB48",
  warning: "#D0810B",
  danger: "#DB0045",
}

export const vitacapFontFamily = "Suisse Intl, system-ui, -apple-system, sans-serif"

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
  } as CSSProperties
}
