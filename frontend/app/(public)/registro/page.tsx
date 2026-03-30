const Registro = () => {
  return (
    <>
      <fieldset className="fieldset w-3/5">
        <div className="pb-10">
          <legend className="text-4xl pb-2">Bienvenido</legend>
          <p>Registrate para empezar</p>
        </div>

        <label className="label">Email</label>
        <input
          type="email"
          className="input w-full"
          placeholder="tu@email.com"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input w-full"
          placeholder="••••••••"
        />

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </>
  );
};

export default Registro;
