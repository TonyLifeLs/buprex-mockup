/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  API CLIENT
 *  Wrapper para llamar al backend .NET con el Bearer token de Azure AD.
 *
 *  Uso en un Server Component o Route Handler:
 *    import { apiServer } from "@/lib/api"
 *    const data = await apiServer<MiTipo>("/products")
 *
 *  Uso en un Client Component (necesitas pasar el token):
 *    import { apiClient } from "@/lib/api"
 *    const data = await apiClient<MiTipo>("/products", session.accessToken)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://localhost:7182"

// ─── Tipos ────────────────────────────────────────────────────────────────────

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

interface RequestOptions<TBody = unknown> {
  method?: HttpMethod
  body?: TBody
  /** Headers adicionales (se mezclan con los por defecto) */
  headers?: Record<string, string>
}

// ─── Helper interno ───────────────────────────────────────────────────────────

async function request<TResponse, TBody = unknown>(
  path: string,
  token: string | undefined,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", body, headers = {} } = options

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    // Necesario en dev para aceptar el cert self-signed de localhost:7182
    // En producción quitar esto (o usar un cert válido en el backend)
    ...(process.env.NODE_ENV === "development"
      ? { agent: await getDevHttpsAgent() }
      : {}),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`[API] ${method} ${path} → ${res.status}: ${text}`)
  }

  // 204 No Content — devuelve undefined
  if (res.status === 204) return undefined as TResponse

  return res.json() as Promise<TResponse>
}

/**
 * Agente HTTPS que acepta certificados self-signed en desarrollo.
 * Solo se importa en Node.js (no en el browser).
 */
async function getDevHttpsAgent() {
  if (typeof window !== "undefined") return undefined
  const { Agent } = await import("https")
  return new Agent({ rejectUnauthorized: false })
}

// ─── API para Client Components ───────────────────────────────────────────────

/**
 * Llama al backend .NET desde el cliente.
 * Pasa el `accessToken` obtenido con `useMsal()` → `acquireTokenSilent`.
 *
 * @example
 *   const { instance, accounts } = useMsal()
 *   const { accessToken } = await instance.acquireTokenSilent({ scopes: loginRequest.scopes, account: accounts[0] })
 *   const result = await apiClient<Producto[]>("/api/products", accessToken)
 */
export async function apiClient<TResponse, TBody = unknown>(
  path: string,
  accessToken: string | undefined,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  return request<TResponse, TBody>(path, accessToken, options)
}
