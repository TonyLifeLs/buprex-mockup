/**
 * Esta ruta ya no se usa.
 * La autenticación se hace completamente en el browser con @azure/msal-react (PKCE).
 * No se necesita client_secret ni server-side auth.
 */
export async function GET() {
  return new Response("Not used", { status: 404 })
}

export const POST = GET

 *
 *  El client secret NUNCA vive en el código ni en .env.local.
 *  Se obtiene en tiempo de ejecución desde Azure Key Vault usando
 *  DefaultAzureCredential, que en Windows usa automáticamente:
 *    · az login  (desarrolladores)
 *    · Managed Identity  (cuando la app corre en Azure)
 *    · VS Code Azure Account extension
 *
 *  Fallback: si defines AZURE_AD_CLIENT_SECRET en .env.local lo usa
 *  directamente (útil para pruebas rápidas locales sin Key Vault).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import NextAuth, { type AuthOptions } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import { DefaultAzureCredential } from "@azure/identity"
import { SecretClient } from "@azure/keyvault-secrets"

// ─── Caché en memoria (el secreto se obtiene solo UNA vez por proceso) ─────────
let _cachedSecret: string | undefined
let _cachedHandler: ReturnType<typeof NextAuth> | undefined

async function getClientSecret(): Promise<string> {
  // 1. Fallback rápido: variable de entorno (solo para dev local sin Key Vault)
  if (process.env.AZURE_AD_CLIENT_SECRET) {
    return process.env.AZURE_AD_CLIENT_SECRET
  }

  // 2. Ya estaba cacheado de una llamada anterior
  if (_cachedSecret) return _cachedSecret

  // 3. Leer desde Azure Key Vault con DefaultAzureCredential
  //    En Windows: usa az login / VS Code / Managed Identity automáticamente
  if (!process.env.AZURE_KEY_VAULT_URL) {
    throw new Error(
      "[Auth] Define AZURE_KEY_VAULT_URL o AZURE_AD_CLIENT_SECRET en .env.local"
    )
  }

  const credential = new DefaultAzureCredential()
  const kvClient = new SecretClient(process.env.AZURE_KEY_VAULT_URL, credential)
  const bundle = await kvClient.getSecret("azure-ad-client-secret")

  if (!bundle.value) {
    throw new Error("[Auth] El secreto 'azure-ad-client-secret' en Key Vault está vacío")
  }

  _cachedSecret = bundle.value
  return _cachedSecret
}

async function getHandler(): Promise<ReturnType<typeof NextAuth>> {
  if (_cachedHandler) return _cachedHandler

  const clientSecret = await getClientSecret()

  const backendClientId = process.env.AZURE_AD_BACKEND_CLIENT_ID!
  const backendScope = `api://${backendClientId}/access_as_user`

  const options: AuthOptions = {
    providers: [
      AzureADProvider({
        clientId: process.env.AZURE_AD_CLIENT_ID!,
        clientSecret,
        tenantId: process.env.AZURE_AD_TENANT_ID!,
        authorization: {
          params: {
            scope: `openid profile email offline_access ${backendScope}`,
          },
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
    callbacks: {
      async jwt({ token, account }) {
        // Primer login: Azure AD devuelve el account con los tokens
        if (account) {
          token.accessToken = account.access_token
          token.refreshToken = account.refresh_token
          token.expiresAt = account.expires_at
        }
        return token
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.name = token.name as string
          session.user.email = token.email as string
        }
        // Pasar el access token al cliente para llamar al backend .NET
        session.accessToken = token.accessToken as string
        return session
      },
    },
  }

  _cachedHandler = NextAuth(options)
  return _cachedHandler
}

// ─── Route handlers ───────────────────────────────────────────────────────────
export async function GET(req: Request) {
  const handler = await getHandler()
  return handler(req as any, {} as any)
}

export async function POST(req: Request) {
  const handler = await getHandler()
  return handler(req as any, {} as any)
}
