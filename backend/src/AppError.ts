// Error de negocio con un status HTTP asociado.
// Lo lanzan los services cuando una regla del dominio no se cumple
// (un email ya registrado, credenciales incorrectas).
// El controller lo captura y devuelve la response con ese status.

export class AppError extends Error {
  // status: el código HTTP que el controller usará al responder
  constructor(public status: number, message: string) {
    super(message); // pasa el mensaje a la clase Error nativa
    this.name = "AppError"; // nombre del error, útil para loggear la fuente que captura el error y debuggear el problema
  }
}
