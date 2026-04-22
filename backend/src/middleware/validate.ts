import {Request, Response, NextFunction} from 'express';
import { ZodObject, ZodError } from 'zod';

export const validateRequest = (schema: ZodObject<any>) => 
    (req: Request, res: Response, next: NextFunction) => {
        try {
            //parse() valida y aplica transformaciones como .trim() o .toLowerCase()
            req.body = schema.parse(req.body); // This will throw if validation fails
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    error: "Datos de entrada inválidos",
                    details: error.issues.map((e: any) => e.message)
                });
            }
            next(error); // Para errores inesperados, pasamos al siguiente middleware de error
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    };

