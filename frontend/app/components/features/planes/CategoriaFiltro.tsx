"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { CATEGORIAS } from "@/app/constants/categorias";
import { FiChevronDown } from "react-icons/fi";

// Desplegable para filtrar planes por categoría. Pone la elección en la URL como ?categoria=...
const CategoriaFiltro = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoriaActual = searchParams.get("categoria") ?? "";
  /* Ref al <details> para poder cerrarlo a mano tras seleccionar una categoría.
     El <details> nativo se queda abierto hasta que se vuelve a clicar el summary;
     con removeAttribute("open") forzamos el cierre tipo dropdown. */
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const labelActual = categoriaActual || "Todas las categorías";

  const seleccionar = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") {
      params.delete("categoria");
    } else {
      params.set("categoria", value);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    detailsRef.current?.removeAttribute("open");
  };

  return (
    <div className="lg:sticky lg:top-56 z-10 flex justify-end -mt-7">
      <details ref={detailsRef} className="dropdown dropdown-end">
        <summary className="btn bg-primary text-primary-content border-none hover:bg-primary/90 list-none flex items-center gap-2">
          {labelActual}
          <FiChevronDown />
        </summary>
        <ul className="dropdown-content menu bg-primary text-primary-content rounded-box mt-1 w-52 p-2 shadow-md">
          <li>
            <button onClick={() => seleccionar("")}>
              Todas las categorías
            </button>
          </li>
          {CATEGORIAS.map((cat) => (
            <li key={cat.name}>
              <button onClick={() => seleccionar(cat.name)}>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default CategoriaFiltro;
