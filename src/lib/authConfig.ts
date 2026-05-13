import { type Configuration, LogLevel } from "@azure/msal-browser"

const backendClientId = process.env.NEXT_PUBLIC_AZURE_AD_BACKEND_CLIENT_ID

// ── Diagnóstico de variables de entorno (solo en desarrollo) ─────────────────
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  console.group("[MSAL Config] Variables de entorno cargadas:")
  console.log("NEXT_PUBLIC_AZURE_AD_CLIENT_ID   :", process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID   ?? "❌ NO DEFINIDA")
  console.log("NEXT_PUBLIC_AZURE_AD_TENANT_ID   :", process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID   ?? "❌ NO DEFINIDA")
  console.log("NEXT_PUBLIC_AZURE_AD_BACKEND_CLIENT_ID:", backendClientId ?? "❌ NO DEFINIDA")
  console.log("Authority URL                    :", `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID ?? "⚠️ missing-tenant-id"}`)
  console.log("Scope                            :", `api://${backendClientId ?? "⚠️ missing-backend-client-id"}/access_as_user`)
  console.groupEnd()
}

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
    redirectUri: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
    postLogoutRedirectUri: "/login",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return
        if (process.env.NODE_ENV !== "development") return
        switch (level) {
          case LogLevel.Error:   console.error("[MSAL]", message); break
          case LogLevel.Warning: console.warn("[MSAL]", message);  break
          case LogLevel.Info:    console.info("[MSAL]", message);  break
          case LogLevel.Verbose: console.debug("[MSAL]", message); break
        }
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false,
    },
  },
}

/** Scopes para obtener un access token que el backend .NET acepta */
export const loginRequest = {
  scopes: [`api://${backendClientId}/access_as_user`],
}
