import { CATEGORIAS } from "@/app/constants/categorias";

// Muestra las 6 primeras categorías como badges. Se usa en la landing como decoración.
const CategoriasRotator = () => {
  return (
    <span className="text-rotate text-7xl leading-loose">
      <span className="justify-items-center">
        {CATEGORIAS.slice(0, 6).map((cat) => (
          <span key={cat.name} className={`badge ${cat.badge} badge-xl`}>
            {cat.name}
          </span>
        ))}
      </span>
    </span>
  );
};

export default CategoriasRotator;
