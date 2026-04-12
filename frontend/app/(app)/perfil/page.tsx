import { CATEGORIAS } from "@/app/constants/categorias";
import { UserProfile } from "@/app/types/user";


const Perfil = ( { perfil }: { perfil: UserProfile}) => {
  const userCategorias = perfil.categorias ? perfil.categorias.split(",") : [];
  return (
    <>
      <div className=" flex flex-col bg-base-100 shadow-md rounded-lg px-5 pb-5 gap-8">
        <header className=" flex flex-col items-center gap-1">
          <div className="w-20 h-20 rounded-full bg-neutral/80 flex justify-center items-center mt-8 text-neutral-content">
            K
          </div>
          <span>
            <p className="text-md text-center font-bold">{perfil.nombre}</p>
            <p className="text-xs text-center text-neutral/50">{`@${perfil.username}`}</p>
          </span>
        </header>
        <article className=" flex flex-wrap justify-center w-full gap-3">
          {CATEGORIAS.filter((cat) => userCategorias.includes(cat.name)).map(
            (cat) => (
              <span key={cat.name} className={`badge badge-sm ${cat.badge}`}>
                {cat.name}
              </span>
            ),
          )}
        </article>
        <article className="flex w-full border rounded-md p-4">
          <p className="text-sm">{perfil.descripcion}</p>
        </article>
      </div>
    </>
  );
};

export default Perfil;
