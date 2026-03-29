const Registro = () => {
  return (
    <div className="card bg-base-100 shadow-xl w-full max-w-md p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Crear cuenta</h1>

      <form className="flex flex-col gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            placeholder="Tu nombre"
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="tu@email.com"
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Contraseña</span>
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="input input-bordered"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          Registrarse
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="link link-primary">
          Inicia sesión
        </a>
      </p>
    </div>
  );
};

export default Registro;
