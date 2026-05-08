// Module augmentation: amplía SessionData de express-session para añadir
// los campos propios de nuestra app (userId).
// Tiene extensión .ts (no .d.ts) para que se pueda importar por side effect
// desde index.ts y así garantizar que ts-node procesa el augmentation.
// El fichero compila a JS vacío en runtime — solo aporta tipos.

import "express-session";
// Al extender SessionData, añadimos el campo userId a req.session.userId
// en todo el proyecto. Esto es crucial para que TypeScript no dé errores
// al acceder a req.session.userId en nuestros controladores y middleware.
declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}
