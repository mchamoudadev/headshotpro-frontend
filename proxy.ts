import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function proxy(request: NextRequest) {
  // current page
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  const isAuthenticated = !!(accessToken || refreshToken);

  const isAuthPage = pathname.startsWith("/auth");
  const isDashboard = pathname.startsWith("/dashboard");

  // Redirect authenticated users away from auth pages

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // handle dashbaord layout

  if (isDashboard) {
    // No token provided
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Has access token access

    if (accessToken) {
      return NextResponse.next();
    }

    // Try refresh

    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${API_URL}/auth/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `refreshToken=${refreshToken.value}`,
          },
        });

        if (refreshResponse.ok) {
          const setCookie = refreshResponse.headers.get("set-cookie");

          if (setCookie) {
            const response = NextResponse.next();

            setCookie.split(",").forEach((cookie) => {
              const [nameValue] = cookie.trim().split(";");
              const [name, value] = nameValue.split("=");
              if (name && value) {
                response.cookies.set(name.trim(), value.trim(), {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
                  path: "/",
                  maxAge:
                    name.trim() === "accessToken" ? 15 * 60 : 7 * 24 * 60 * 60,
                });
              }
            });
            return response;
          }
        }
      } catch (error) {
        console.error("Token refresh failed", error);
      }
    }

    // Refresh failed - redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path", "/auth/:path*"],
};
