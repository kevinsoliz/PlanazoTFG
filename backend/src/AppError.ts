/* Error de negocio con un status HTTP asociado.
   Lo lanzan los services cuando una regla del dominio no se cumple
   (un email ya registrado, credenciales incorrectas).
   El controller lo captura y devuelve la response con ese status. */

export class AppError extends Error {
  constructor(public status: number, message: string) {
    super(message); 
    this.name = "AppError"; // útil para distinguirlo de un Error genérico en los logs
  }
}
