import { CATEGORIAS } from "@/app/constants/categorias";

const PlanPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-9 justify-center">
      <div className="w-80">
        <fieldset className="fieldset">
          <label className="label">Título</label>
          <input type="text" className="input" placeholder="Título del plan" />

          <label className="label">Descripción</label>
          <textarea
            className="textarea"
            placeholder="Cuenta de qué va el plan..."
          />

          <label className="label">Categoría</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.name}
                type="button"
                className={`badge ${cat.badge} badge-outline opacity-60`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <label className="label">Fecha</label>
          <input type="datetime-local" className="input" />

          <label className="label">Ubicación</label>
          <input type="text" className="input" placeholder="¿Dónde?" />

          <label className="label">Aforo máximo</label>
          <input type="number" className="input" placeholder="Plazas" />

          <button
            type="button"
            className="btn btn-success mt-4 w-full max-w-xs"
          >
            Crear plan
          </button>
        </fieldset>
      </div>
      <div className="w-80 relative">
        <img
          src="/images/crear-plan/amigo-lapiz.png"
          alt="Amigo con lápiz"
          className="absolute inset-0 m-auto max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default PlanPage;
