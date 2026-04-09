import { type Configuration, LogLevel } from "@azure/msal-browser"

const backendClientId = process.env.NEXT_PUBLIC_AZURE_AD_BACKEND_CLIENT_ID!

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
          case LogLevel.Error: console.error(message); break
          case LogLevel.Warning: console.warn(message); break
        }
      },
    },
  },
}

/** Scopes para obtener un access token que el backend .NET acepta */
export const loginRequest = {
  scopes: [`api://${backendClientId}/access_as_user`],
}
