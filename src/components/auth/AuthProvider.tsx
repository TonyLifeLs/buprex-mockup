"use client"

// ── MsalProvider (comentado hasta tener Azure AD configurado) ───────────────
// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { MsalProvider, useMsal } from "@azure/msal-react"
// import { PublicClientApplication, EventType } from "@azure/msal-browser"
// import { msalConfig } from "@/lib/authConfig"
// const msalInstance = new PublicClientApplication(msalConfig)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
