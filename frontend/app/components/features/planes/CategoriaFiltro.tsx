"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CATEGORIAS } from "@/app/constants/categorias";

const CategoriaFiltro = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoriaActual = searchParams.get("categoria");

  const handleClick = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoriaActual === cat) {
      params.delete("categoria");
    } else {
      params.set("categoria", cat);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleTodos = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categoria");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="sticky top-48 z-10 backdrop-blur-md bg-base-100/40 py-3 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={handleTodos}
        className={`badge ${
          !categoriaActual ? "" : "badge-outline opacity-60"
        }`}
      >
        Todos
      </button>
      {CATEGORIAS.map((cat) => {
        const seleccionada = categoriaActual === cat.name;
        return (
          <button
            key={cat.name}
            type="button"
            onClick={() => handleClick(cat.name)}
            className={`badge ${cat.badge} ${
              seleccionada ? "" : "badge-outline opacity-60"
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoriaFiltro;
