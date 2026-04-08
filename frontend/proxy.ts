import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/home", "/perfil"]; //rutas que requieren login

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const sessionCookie = req.cookies.get("session_id");

    // si la ruta es protegida y no hay cooki de sesión redirige a /login
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtected && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // para que ejecute en todas las rutas execepto: api, archivos estáticos, imágenes y favicon
        "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ]
};