"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { MsalProvider } from "@azure/msal-react"
import { PublicClientApplication, EventType } from "@azure/msal-browser"
import { msalConfig } from "@/lib/authConfig"

// Shared context so child components can know when MSAL is fully initialized.
// While msalReady is false, useMsal() returns a stub and loginRedirect must not be called.
const MsalReadyContext = createContext(false)
export const useMsalReady = () => useContext(MsalReadyContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null)

  useEffect(() => {
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
      setMsalInstance(instance)
    })
  }, [])

  return (
    <MsalReadyContext.Provider value={!!msalInstance}>
      {msalInstance ? (
        <MsalProvider instance={msalInstance}>{children}</MsalProvider>
      ) : (
        children
      )}
    </MsalReadyContext.Provider>
  )
}
