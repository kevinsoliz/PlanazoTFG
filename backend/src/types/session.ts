// Module augmentation: amplía SessionData de express-session para añadir
// los campos propios de nuestra app (userId).
// Tiene extensión .ts (no .d.ts) para que se pueda importar por side effect
// desde index.ts y así garantizar que ts-node procesa el augmentation.
// El fichero compila a JS vacío en runtime — solo aporta tipos.

import "express-session";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}
