import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth")
  const { pathname } = request.nextUrl

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register", "/forgot-password", "/"]
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith("/api/"))

  // If no auth cookie and trying to access protected route, redirect to login
  if (!authCookie && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If has auth cookie and trying to access login/register, redirect to dashboard
  if (authCookie && (pathname === "/login" || pathname === "/register")) {
    try {
      const user = JSON.parse(authCookie.value)

      if (user.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      } else if (user.role === "teacher") {
        return NextResponse.redirect(new URL("/teacher/dashboard", request.url))
      } else if (user.role === "student") {
        return NextResponse.redirect(new URL("/student/dashboard", request.url))
      }
    } catch (error) {
      // If there's an error parsing the cookie, continue with the request
      console.error("Error parsing auth cookie:", error)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
