/**
 * Esta ruta ya no se usa.
 * La autenticación se hace completamente en el browser con @azure/msal-react (PKCE).
 * No se necesita client_secret ni server-side auth.
 */
export async function GET() {
  return new Response("Not used", { status: 404 })
}

export const POST = GET
