/* Añade el campo userId al objeto req.session de express-session.
   Sin esto, TypeScript se queja al leer req.session.userId en los
   controladores. Se importa desde index.ts para que se aplique. */

import "express-session";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}
