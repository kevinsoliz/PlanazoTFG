"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CATEGORIAS } from "@/app/constants/categorias";

const CategoriaFiltro = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoriaActual = searchParams.get("categoria") ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") {
      params.delete("categoria");
    } else {
      params.set("categoria", value);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="lg:sticky lg:top-56 z-10 flex justify-end -mt-7">
      <select
        value={categoriaActual}
        onChange={handleChange}
        className="select select-ghost bg-primary text-white focus-within:outline-none focus:outline-none"
      >
        <option value="" className="bg-primary text-white">
          Todas las categorías
        </option>
        {CATEGORIAS.map((cat) => (
          <option
            key={cat.name}
            value={cat.name}
            className="bg-primary text-white"
          >
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoriaFiltro;
