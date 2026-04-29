import AnularBtn from "@/app/components/features/planes/AnularBtn";
import DeleteBtn from "@/app/components/features/planes/DeleteBtn";
import EditBtn from "@/app/components/features/planes/EditBtn";
import PlanCard from "@/app/components/features/planes/PlanCard";
import PageHeader from "@/app/components/ui/PageHeader";
import { getPlanesApuntados, getPlanesCreados } from "@/app/services/planes";


const MisPlanes = async () => {
const creados = await getPlanesCreados();
const apuntados = await getPlanesApuntados();

  return (
    <>
      <PageHeader
        title="Mis planes"
        subtitle="Aquí ves lo que has organizado y a lo que te has apuntado."
      />
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
