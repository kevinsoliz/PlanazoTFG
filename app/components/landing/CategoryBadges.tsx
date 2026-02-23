const CategoryBadges = () => {
  const categorias = [
    { nombre: "Aventura", bg: "bg-indigo-400", texto: "text-white" },
    { nombre: "Cultura", bg: "bg-amber-400", texto: "text-amber-900" },
    { nombre: "Deporte", bg: "bg-teal-400", texto: "text-teal-900" },
    { nombre: "Música", bg: "bg-red-400", texto: "text-white" },
    { nombre: "Gastronomía", bg: "bg-violet-400", texto: "text-white" },
    { nombre: "Viajes", bg: "bg-yellow-300", texto: "text-yellow-900" },
    { nombre: "Arte", bg: "bg-sky-300", texto: "text-sky-900" },
    { nombre: "Naturaleza", bg: "bg-emerald-400", texto: "text-esmerald-900" },
    { nombre: "Tecnología", bg: "bg-blue-500", texto: "text-white" },
    { nombre: "Cine", bg: "bg-orange-400", texto: "text-orange-900" },
  ];

  return (
    <section className="py-10 bg-base-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {categorias.map((categoria) => (
            <span
              key={categoria.nombre}
              className={`badge badge-lg ${categoria.bg} ${categoria.texto} border-0`}
            >
              {categoria.nombre}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBadges;
