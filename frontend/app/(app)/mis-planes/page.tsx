import DeleteBtn from "@/app/components/features/DeleteBtn";
import PlanCard from "@/app/components/features/PlanCard";
import { getPlanesApuntados, getPlanesCreados } from "@/app/services/planes.server";


const MisPlanes = async () => {
const creados = await getPlanesCreados();
const apuntados = await getPlanesApuntados();

  return (
    <>
      <div className="flex">
        <div className="flex-1 ">
          <h1>Planes creados:</h1>
          {creados.map((plan) => (
          <PlanCard key={plan.id} plan={plan} >
            <DeleteBtn plan_id={plan.id}/>
            <button className="btn btn-success btn-outline btn-sm">Editar</button>
          </PlanCard>
        ))}
        </div>
        <div className="flex-1 ">
          <h1>Planes apuntados:</h1>
         {apuntados.map((plan) => (
          <PlanCard key={plan.id} plan={plan} >
            <button className="btn btn-secondary btn-outline btn-sm">Anular</button>
          </PlanCard>))}
        </div>
      </div>
    </>
  );
};

export default MisPlanes;
