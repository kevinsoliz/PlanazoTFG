import DeleteBtn from "@/app/components/features/DeleteBtn";
import EditBtn from "@/app/components/features/EditBtn";
import PlanCard from "@/app/components/features/PlanCard";
import UnJoinBtn from "@/app/components/features/UnJoinBtn";
import EstrellasValoracion from "@/app/components/features/Valoracion";
import { getPlanesApuntados, getPlanesCreados } from "@/app/services/planes.server";

const MisPlanes = async () => {
  const creados = await getPlanesCreados();
  const apuntados = await getPlanesApuntados();

  // Obtenemos la fecha actual en el servidor para comparar
  const ahora = new Date();

  return (
    <>
      <div className="flex">
        <div className="flex-1 ">
          <h1>Planes creados:</h1>
          {creados.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <DeleteBtn plan_id={plan.id} />
              <EditBtn plan={plan} />
            </PlanCard>
          ))}
        </div>

        <div className="flex-1 ">
          <h1>Planes apuntados:</h1>
          {apuntados.map((plan) => {
            // const planTerminado = new Date(plan.fecha) < ahora; 
            const planTerminado = true; 

            return (
              <PlanCard key={plan.id} plan={plan}>
                {planTerminado ? (
                  <EstrellasValoracion 
                    planId={plan.id} 
                    votoInicial={plan.mi_voto ? Number(plan.mi_voto) : 0} 
                    notaMedia={plan.nota_media ? Number(plan.nota_media) : 0}
                  />
                ) : (
                  <UnJoinBtn plan_id={plan.id} />
                )}
              </PlanCard>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MisPlanes;