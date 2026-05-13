import { Request, Response, NextFunction } from "express";

// Protege las rutas que requieren login. Si no hay sesión, devuelve 401.
export function requireAuth( req: Request, res: Response, next: NextFunction ) {

    if (req.session && req.session.userId)
        next();
    else
        res.status(401).json( { error: "No autenticado."});
}
