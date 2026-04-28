/*
Controller de planes.
Capa intermedia entre la route y el service. Extrae datos del request,
los pasa al service y devuelve la response. Errores los recoge el
errorHandler central via Express 5.
*/

import { Request, Response } from "express";
import * as planesService from "../services/planes.service";
import { AppError } from "../AppError";


// 1. Handler para crear un plan:

// POST /api/planes
// Crea un plan a nombre del usuario logado. requireAuth garantiza la sesión.
// req.body ya viene validado por `validate(planInputSchema)` en la route.
export async function crear(req: Request, res: Response) {
  const plan = await planesService.crear(req.session.userId!, req.body);
  res.status(201).json({ plan });
}


// 2. Handler para listar planes:

// GET /api/planes?categoria=...
// Endpoint público. Si llega categoría en la query, filtra por ella.
export async function listar(req: Request, res: Response) {
  // req.query.categoria puede ser string | string[] | ParsedQs | undefined.
  // Solo aceptamos string. Si llega otra cosa (p. ej. ?categoria=a&categoria=b),
  // la ignoramos para evitar pasar tipos inesperados al service.
  const categoria =
    typeof req.query.categoria === "string" ? req.query.categoria : undefined;

  const planes = await planesService.listar(categoria);

  res.json({ planes });
}


// 3. Handler para listar los planes creados por el usuario logado:

// GET /api/planes/creados
export async function listarCreados(req: Request, res: Response) {
  const planes = await planesService.listarCreadosPor(req.session.userId!);
  res.json({ planes });
}


// 4. Handler para listar los planes a los que el usuario está apuntado:

// GET /api/planes/apuntado
// (Solo planes ajenos en los que es participante; los suyos van en /creados.)
export async function listarApuntado(req: Request, res: Response) {
  const planes = await planesService.listarApuntadosDe(req.session.userId!);
  res.json({ planes });
}


// 5. Handler para obtener el detalle de un plan:

// GET /api/planes/:id
// Endpoint público. Devuelve plan + participantes + plazas disponibles.
export async function obtenerDetalle(req: Request, res: Response) {
  const planId = Number(req.params.id);
  if (Number.isNaN(planId)) {
    throw new AppError(400, "ID de plan inválido");
  }

  const detalle = await planesService.obtenerDetalle(planId);

  // Esparcimos el detalle: { plan, participantes, plazas_disponibles }.
  res.json(detalle);
}


// 6. Handler para unirse a un plan:

// POST /api/planes/:id/join
export async function unirse(req: Request, res: Response) {
  const planId = Number(req.params.id);
  if (Number.isNaN(planId)) {
    throw new AppError(400, "ID de plan inválido");
  }

  await planesService.unirse(planId, req.session.userId!);

  res.json({ message: "Te has unido al plan" });
}


// 7. Handler para salir de un plan:

// DELETE /api/planes/:id/join
export async function salir(req: Request, res: Response) {
  const planId = Number(req.params.id);
  if (Number.isNaN(planId)) {
    throw new AppError(400, "ID de plan inválido");
  }

  await planesService.salir(planId, req.session.userId!);

  res.json({ message: "Has salido del plan" });
}


// 8. Handler para borrar un plan (solo el creador):

// DELETE /api/planes/:id
export async function borrar(req: Request, res: Response) {
  const planId = Number(req.params.id);
  if (Number.isNaN(planId)) {
    throw new AppError(400, "ID de plan inválido");
  }

  await planesService.borrar(planId, req.session.userId!);

  res.json({ message: "Plan eliminado" });
}


// 9. Handler para actualizar un plan (solo el creador):

// PUT /api/planes/:id
// req.body ya viene validado por `validate(planInputSchema)` en la route.
export async function actualizar(req: Request, res: Response) {
  const planId = Number(req.params.id);
  if (Number.isNaN(planId)) {
    throw new AppError(400, "ID de plan inválido");
  }

  const plan = await planesService.actualizar(
    planId,
    req.session.userId!,
    req.body,
  );

  res.json({ plan });
}
