"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { MsalProvider } from "@azure/msal-react"
import { PublicClientApplication, EventType } from "@azure/msal-browser"
import { msalConfig } from "@/lib/authConfig"

interface MsalReadyState {
  ready: boolean
  error: string | null
}

// Shared context so child components can know when MSAL is fully initialized.
// While ready is false, useMsal() returns a stub and loginRedirect must not be called.
const MsalReadyContext = createContext<MsalReadyState>({ ready: false, error: null })
export const useMsalReady = () => useContext(MsalReadyContext)

/** Returns the required env var names that are missing at runtime. */
function getMissingEnvVars(): string[] {
  const required: { name: string; value: string | undefined }[] = [
    { name: "NEXT_PUBLIC_AZURE_AD_CLIENT_ID",        value: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID },
    { name: "NEXT_PUBLIC_AZURE_AD_TENANT_ID",        value: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID },
    { name: "NEXT_PUBLIC_AZURE_AD_BACKEND_CLIENT_ID", value: process.env.NEXT_PUBLIC_AZURE_AD_BACKEND_CLIENT_ID },
  ]
  return required.filter((v) => !v.value).map((v) => v.name)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null)
  const [initError, setInitError] = useState<string | null>(null)

  useEffect(() => {
    // Always log env var status to the browser console (helps diagnose in production).
    const clientId  = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID
    const tenantId  = process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID
    const backendId = process.env.NEXT_PUBLIC_AZURE_AD_BACKEND_CLIENT_ID

    console.group("[MSAL] Estado de variables de entorno:")
    console.log("NEXT_PUBLIC_AZURE_AD_CLIENT_ID        :", clientId  ? `✅ ${clientId}`  : "❌ NO DEFINIDA")
    console.log("NEXT_PUBLIC_AZURE_AD_TENANT_ID        :", tenantId  ? `✅ ${tenantId}`  : "❌ NO DEFINIDA")
    console.log("NEXT_PUBLIC_AZURE_AD_BACKEND_CLIENT_ID:", backendId ? `✅ ${backendId}` : "❌ NO DEFINIDA")
    console.groupEnd()

    const missing = getMissingEnvVars()
    if (missing.length > 0) {
      const msg = `Variables de entorno faltantes: ${missing.join(", ")}. Agrega estas variables a tu .env.local (desarrollo) o a las variables de entorno de tu plataforma de deploy (producción).`
      console.error("[MSAL]", msg)
      setInitError(msg)
      return
    }

    // PublicClientApplication must only be created in the browser.
    // Creating it at module level causes MSAL to return a stub during SSR (Next.js),
    // which throws "stubbed_public_client_application_called" on any method call.
    const instance = new PublicClientApplication(msalConfig)
    instance.initialize().then(() => {
      instance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
          const payload = event.payload as { account?: { homeAccountId: string } }
          if (payload.account) {
            instance.setActiveAccount(
              instance.getAccountByHomeId(payload.account.homeAccountId)
            )
          }
        }
      })
      console.log("[MSAL] ✅ Inicialización completada. El botón de Microsoft está listo.")
      setMsalInstance(instance)
    }).catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err)
      console.error("[MSAL] Error durante la inicialización:", msg)
      setInitError(`Error al inicializar MSAL: ${msg}`)
    })
  }, [])

  return (
    <MsalReadyContext.Provider value={{ ready: !!msalInstance, error: initError }}>
      {msalInstance ? (
        <MsalProvider instance={msalInstance}>{children}</MsalProvider>
      ) : (
        children
      )}
    </MsalReadyContext.Provider>
  )
}
