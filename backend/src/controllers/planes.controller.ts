/* Controller de planes. Capa intermedia entre la ruta y el service.
   Extrae datos del request, los pasa al service y devuelve la response.
   Los errores los recoge el errorHandler central. */

import { Request, Response } from "express";
import * as planesService from "../services/planes.service";
import { AppError } from "../AppError";


/* POST /api/planes. Crea un plan a nombre del usuario logueado.
   requireAuth garantiza la sesión; el body ya viene validado por
   validate(planInputSchema) en la ruta. */
export async function crear(req: Request, res: Response) {
  const plan = await planesService.crear(req.session.userId!, req.body);
  res.status(201).json({ plan });
}


/* GET /api/planes?categoria=... Endpoint público. Si llega 'categoria'
   en la query, filtra por ella. */
export async function listar(req: Request, res: Response) {
  /* req.query.categoria puede llegar como string, array o undefined.
     Solo aceptamos string; si llega otra cosa (por ejemplo
     ?categoria=a&categoria=b), la ignoramos. */
  const categoria =
    typeof req.query.categoria === "string" ? req.query.categoria : undefined;

  const planes = await planesService.listar(categoria, req.session.userId);

  res.json({ planes });
}


// GET /api/planes/creados. Planes del usuario logueado.
export async function listarCreados(req: Request, res: Response) {
  const planes = await planesService.listarCreadosPor(req.session.userId!, req.session.userId!);
  res.json({ planes });
}


/* GET /api/planes/apuntado. Solo planes ajenos en los que el usuario
   es participante; los suyos van en /creados. */
export async function listarApuntado(req: Request, res: Response) {
  const planes = await planesService.listarApuntadosDe(req.session.userId!);
  res.json({ planes });
}


/* GET /api/planes/:id. Endpoint público. Devuelve plan + participantes +
   plazas disponibles. */
export async function obtenerDetalle(req: Request, res: Response) {
  const planId = Number(req.params.id);
  if (Number.isNaN(planId)) {
    throw new AppError(400, "ID de plan inválido");
  }

  const detalle = await planesService.obtenerDetalle(planId, req.session.userId);

  res.json(detalle);
}


// POST /api/planes/:id/join. Unirse a un plan.
export async function unirse(req: Request, res: Response) {
  const planId = Number(req.params.id);
  if (Number.isNaN(planId)) {
    throw new AppError(400, "ID de plan inválido");
  }

  await planesService.unirse(planId, req.session.userId!);

  res.json({ message: "Te has unido al plan" });
}


// DELETE /api/planes/:id/join. Salir de un plan.
export async function salir(req: Request, res: Response) {
  const planId = Number(req.params.id);
  if (Number.isNaN(planId)) {
    throw new AppError(400, "ID de plan inválido");
  }

  await planesService.salir(planId, req.session.userId!);

  res.json({ message: "Has salido del plan" });
}


// DELETE /api/planes/:id. Borrar un plan (solo el creador).
export async function borrar(req: Request, res: Response) {
  const planId = Number(req.params.id);
  if (Number.isNaN(planId)) {
    throw new AppError(400, "ID de plan inválido");
  }

  await planesService.borrar(planId, req.session.userId!);

  res.json({ message: "Plan eliminado" });
}


/* PUT /api/planes/:id. Editar un plan (solo el creador). El body ya
   viene validado por validate(planInputSchema) en la ruta. */
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


/* GET /api/planes/usuario/:id. Planes creados por un usuario concreto.
   Reutiliza el mismo service que /creados; la diferencia es de dónde
   sale el userId: aquí del path, allí de la sesión. */
export async function listarCreadosPorUsuario(req: Request, res: Response) {
  const userId = Number(req.params.id);
  if (Number.isNaN(userId)) {
    throw new AppError(400, "ID de usuario inválido");
  }

  const planes = await planesService.listarCreadosPor(userId, req.session.userId);
  res.json({ planes });
}


/* POST /api/planes/:id/rate. Valorar un plan.
   El body es { puntuacion: number }. De momento lo valida el CHECK de
   postgres; cuando añadamos un schema de zod en la ruta, se valida aquí. */
export async function valorar(req: Request, res: Response) {
  const planId = Number(req.params.id);
  if (Number.isNaN(planId)) {
    throw new AppError(400, "ID de plan inválido");
  }

  const { puntuacion } = req.body;

  await planesService.valorar(planId, req.session.userId!, puntuacion);

  res.json({ message: "Valoración guardada" });
}


// POST /api/planes/:id/favorite. Marcar un plan como favorito.
export async function favoritear(req: Request, res: Response) {
  const planId = Number(req.params.id);
  if (Number.isNaN(planId)) {
    throw new AppError(400, "ID de plan inválido");
  }

  await planesService.marcarFavorito(planId, req.session.userId!);

  res.json({ message: "Plan añadido a favoritos" });
}


// DELETE /api/planes/:id/favorite. Quitar un plan de favoritos.
export async function desfavoritear(req: Request, res: Response) {
  const planId = Number(req.params.id);
  if (Number.isNaN(planId)) {
    throw new AppError(400, "ID de plan inválido");
  }

  await planesService.desmarcarFavorito(planId, req.session.userId!);

  res.json({ message: "Plan eliminado de favoritos" });
}


// GET /api/planes/favoritos. Planes que el usuario logueado tiene en favoritos.
export async function listarFavoritos(req: Request, res: Response) {
  const planes = await planesService.listarFavoritosDe(req.session.userId!);
  res.json({ planes });
}
