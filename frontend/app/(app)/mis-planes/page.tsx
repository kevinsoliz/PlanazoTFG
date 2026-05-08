import AbandonarBtn from "@/app/components/features/planes/AbandonarBtn";
import DeleteBtn from "@/app/components/features/planes/DeleteBtn";
import EditBtn from "@/app/components/features/planes/EditBtn";
import MisPlanesToggle from "@/app/components/features/planes/MisPlanesToggle";
import PlanCard from "@/app/components/features/planes/PlanCard";
import CounterBadge from "@/app/components/ui/CounterBadge";
import PageHeader from "@/app/components/ui/PageHeader";
import EstrellasValoracion from "@/app/components/features/Valoracion";
import { getPlanesApuntados, getPlanesCreados } from "@/app/services/planes";

const MisPlanes = async () => {
  const creados = await getPlanesCreados();
  const apuntados = await getPlanesApuntados();

  return (
    <div className="flex flex-col gap-9">
      <PageHeader
        title="Mis planes"
        subtitle="Aquí ves lo que has organizado y a lo que te has apuntado."
      />

      {/* VISTA MÓVIL (Ojo: Tendrás que pasarle la lógica de valoración también a este componente si quieres que funcione en móvil) */}
      <div className="lg:hidden">
        <MisPlanesToggle creados={creados} apuntados={apuntados} />
      </div>

      {/* VISTA DESKTOP */}
      <div className="hidden lg:flex gap-6">
        {/* SECCIÓN: CREADOS */}
        <section className="flex-1 flex flex-col gap-4">
          <header className="flex items-center justify-between border-b-2 border-dashed border-neutral/30 pb-2 mx-3 lg:sticky lg:top-56 lg:z-10 lg:backdrop-blur-md lg:bg-base-100/40">
            <h2 className="font-(family-name:--font-bagel-fat-one) text-2xl">
              Has creado
            </h2>
            <CounterBadge value={creados.length} accent="#F87A36" />
          </header>
          {creados.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <DeleteBtn plan_id={plan.id} />
              <EditBtn plan={plan} />
            </PlanCard>
          ))}
        </section>

        <div className="divider divider-horizontal"></div>

        {/* SECCIÓN: APUNTADOS */}
        <section className="flex-1 flex flex-col gap-4">
          <header className="flex items-center justify-between border-b-2 border-dashed border-neutral/30 pb-2 mx-3 lg:sticky lg:top-56 lg:z-10 lg:backdrop-blur-md lg:bg-base-100/40">
            <h2 className="font-(family-name:--font-bagel-fat-one) text-2xl">
              Te has apuntado a
            </h2>
            <CounterBadge value={apuntados.length} accent="#FCCE09" />
          </header>
          
          {apuntados.map((plan) => {
            // --- LÓGICA DE VALORACIÓN ---
            const planTerminado = true; // MODO PRUEBAS: Cámbialo por la lógica de fecha cuando termines

            return (
              <PlanCard key={plan.id} plan={plan}>
                {planTerminado ? (
                  <div className="flex flex-col gap-4 w-full">
                    {/* El componente EstrellasValoracion ya incluye la "Media Global" arriba,
                        cumpliendo con lo que pedías de que la valoración esté antes que el voto.
                    */}
                    <EstrellasValoracion 
                      planId={plan.id} 
                      votoInicial={plan.mi_voto ? Number(plan.mi_voto) : 0} 
                      notaMedia={plan.nota_media ? Number(plan.nota_media) : 0}
                    />
                  </div>
                ) : (
                  <AbandonarBtn plan_id={plan.id} />
                )}
              </PlanCard>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default MisPlanes;