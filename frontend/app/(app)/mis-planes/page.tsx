import AbandonarBtn from "@/app/components/features/planes/AbandonarBtn";
import DeleteBtn from "@/app/components/features/planes/DeleteBtn";
import EditBtn from "@/app/components/features/planes/EditBtn";
import MisPlanesToggle from "@/app/components/features/planes/MisPlanesToggle";
import PlanCard from "@/app/components/features/planes/PlanCard";
import CounterBadge from "@/app/components/ui/CounterBadge";
import PageHeader from "@/app/components/ui/PageHeader";
import MediaPlan from "@/app/components/features/valoraciones/media-plan"; 
import { getPlanesApuntados, getPlanesCreados } from "@/app/services/planes";

const MisPlanes = async () => {
  const creados = await getPlanesCreados();
  const apuntados = await getPlanesApuntados();
  const ahora = new Date();

  return (
    <div className="flex flex-col gap-9">
      <PageHeader
        title="Mis planes"
        subtitle="Aquí ves lo que has organizado y a lo que te has apuntado."
      />

      <div className="lg:hidden">
        <MisPlanesToggle creados={creados} apuntados={apuntados} />
      </div>

      <div className="hidden lg:flex gap-6">
        <section className="flex-1 flex flex-col gap-4">
          <header className="flex items-center justify-between border-b-2 border-dashed border-neutral/30 pb-2 mx-3 lg:sticky lg:top-56 lg:z-10 lg:backdrop-blur-md lg:bg-base-100/40">
            <h2 className="font-(family-name:--font-bagel-fat-one) text-2xl">
              Has creado
            </h2>
            <CounterBadge value={creados.length} accent="#F87A36" />
          </header>
          {creados.map((plan) => {
            const planTerminado = new Date(plan.fecha) < ahora; 

            return (
              <PlanCard key={plan.id} plan={plan}>
                <div className="relative w-full h-full">
                  {planTerminado && (
                    <div className="absolute -top-16 right-0"> 
                      <MediaPlan notaMedia={plan.nota_media ? Number(plan.nota_media) : 0} />
                    </div>
                  )}

                  <div className="flex justify-between items-center w-full mt-4">
                    <div className="flex gap-2">
                      <DeleteBtn plan_id={plan.id} />
                      <EditBtn plan={plan} />
                    </div>
                    {planTerminado && (
                      <span className="text-xs italic opacity-50">Plan finalizado</span>
                    )}
                  </div>
                </div>
              </PlanCard>
            );
          })}
        </section>

        <div className="divider divider-horizontal"></div>

        <section className="flex-1 flex flex-col gap-4">
          <header className="flex items-center justify-between border-b-2 border-dashed border-neutral/30 pb-2 mx-3 lg:sticky lg:top-56 lg:z-10 lg:backdrop-blur-md lg:bg-base-100/40">
            <h2 className="font-(family-name:--font-bagel-fat-one) text-2xl">
              Te has apuntado a
            </h2>
            <CounterBadge value={apuntados.length} accent="#FCCE09" />
          </header>
          
          {apuntados.map((plan) => {
            const planTerminado = new Date(plan.fecha) < ahora;

            return (
              <PlanCard key={plan.id} plan={plan}>
                <div className="relative w-full h-full">
                  {planTerminado && (
                    <div className="absolute -top-16 right-0"> 
                      <MediaPlan notaMedia={plan.nota_media ? Number(plan.nota_media) : 0} />
                    </div>
                  )}

                  <div className="flex justify-between items-center w-full mt-4">
                    {planTerminado ? (
                      <span className="text-xs italic opacity-50 ml-auto">Plan finalizado</span>
                    ) : (
                      <AbandonarBtn plan_id={plan.id} />
                    )}
                  </div>
                </div>
              </PlanCard>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default MisPlanes;