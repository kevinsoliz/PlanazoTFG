import AnularBtn from "@/app/components/features/planes/AnularBtn";
import JoinBtn from "@/app/components/features/planes/JoinBtn";
import PlanCard from "@/app/components/features/planes/PlanCard";
import { getPlanes } from "@/app/services/planes";
import styles from "./page.module.css";

// server component, los datos se obtienen antes de renderizar, el servidor de next.js renderiza el html antes de enviarlo al navegador

const Planes = async () => {
  const planes = await getPlanes();

  return (
    
    <div className="flex flex-col lg:flex-row p-4 gap-4">
      <section className="flex-1 flex flex-col gap-6">
        <header className="flex flex-col gap-2 border-2 rounded-md px-3 py-2 sticky top-21 z-10 backdrop-blur-md bg-base-100/40">
          <h1 className="font-(family-name:--font-bagel-fat-one) text-4xl md:text-5xl text-neutral leading-none">
            ¿Qué se cuece hoy?
          </h1>
          <p className="text-neutral/70 text-base md:text-lg">
            Descubre planes a los que apuntarte. Hay sitio para tu energía.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {planes.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <JoinBtn plan_id={plan.id} />
            </PlanCard>
          ))}
        </div>
      </section>

      <aside className={`w-87.5 hidden lg:block shrink-0`}>
        <div className="sticky top-24  rounded-md border-2 overflow-hidden">
          <header className="px-4 py-3 border-b-2">
            <h3 className="font-(family-name:--font-bagel-fat-one) text-lg text-neutral">
              Tus próximos planes
            </h3>
          </header>
          <ul className="list shadow-md">
            {Array.from({ length: 4}, (_, i) => (
              <li key={i} className="list-row">
                <div>
                  <img
                    className="size-10 rounded-box"
                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                  />
                </div>
                <div className="list-col-grow">
                  <div>Dio Lupa</div>
                  <div className="text-xs font-semibold opacity-60">
                    Sabado 25 de Abril a las 10:00 en tal sitio bien largo
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Planes;
