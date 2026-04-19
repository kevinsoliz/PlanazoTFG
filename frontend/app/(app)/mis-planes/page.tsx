import AnularBtn from "@/app/components/features/AnularBtn";
import DeleteBtn from "@/app/components/features/DeleteBtn";
import EditBtn from "@/app/components/features/EditBtn";
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
            <EditBtn plan={plan}></EditBtn>
          </PlanCard>
        ))}
        </div>
        <div className="flex-1 ">
          <h1>Planes apuntados:</h1>
         {apuntados.map((plan) => (
          <PlanCard key={plan.id} plan={plan} >
           <AnularBtn plan_id={plan.id}/>
          </PlanCard>))}
        </div>
      </div>
    </>
  );
};

export default MisPlanes;
