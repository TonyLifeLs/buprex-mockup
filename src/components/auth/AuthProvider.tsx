"use client"

import { MsalProvider } from "@azure/msal-react"
import { PublicClientApplication, EventType } from "@azure/msal-browser"
import { msalConfig } from "@/lib/authConfig"

const msalInstance = new PublicClientApplication(msalConfig)

// Set the first account as active after login
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as { account?: { homeAccountId: string } }
    if (payload.account) {
      msalInstance.setActiveAccount(
        msalInstance.getAccountByHomeId(payload.account.homeAccountId)
      )
    }
  }
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>
}
