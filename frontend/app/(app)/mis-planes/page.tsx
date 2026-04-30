import AnularBtn from "@/app/components/features/planes/AnularBtn";
import DeleteBtn from "@/app/components/features/planes/DeleteBtn";
import EditBtn from "@/app/components/features/planes/EditBtn";
import MisPlanesToggle from "@/app/components/features/planes/MisPlanesToggle";
import PlanCard from "@/app/components/features/planes/PlanCard";
import ChatModalBtn from "@/app/components/features/planes/ChatModalBtn"; // Importar nuevo botón
import CounterBadge from "@/app/components/ui/CounterBadge";
import PageHeader from "@/app/components/ui/PageHeader";
import { getPlanesApuntados, getPlanesCreados } from "@/app/services/planes";
import  AuthService  from "@/app/services/auth-service"; // Importar para el nombre de usuario

const MisPlanes = async () => {
  const creados = await getPlanesCreados();
  const apuntados = await getPlanesApuntados();

// Llamada al método me() definido en tu AuthService
  const response = await AuthService.me(); 
  const userName = response.data.user?.nombre || "Usuario"; // Accede a la propiedad nombre

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
          <header className="flex items-center justify-between border-b-2 border-dashed border-neutral/30 pb-2 sticky top-47 z-5 backdrop-blur-md bg-base-100/40  mx-3">
            <h2 className="font-(family-name:--font-bagel-fat-one) text-2xl">
              Has creado
            </h2>
            <CounterBadge value={creados.length} accent="#F87A36" />
          </header>
          {creados.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <DeleteBtn plan_id={plan.id} />
              <EditBtn plan={plan} />
              <ChatModalBtn planId={plan.id} userName={userName} planTitulo={plan.titulo} /> {/* Botón de chat */}
            </PlanCard>
          ))}
        </section>
        <div className="divider divider-horizontal"></div>
        <section className="flex-1 flex flex-col gap-4">
          <header className="flex items-center justify-between border-b-2 border-dashed border-neutral/30 pb-2 sticky top-47 z-5 backdrop-blur-md bg-base-100/40 mx-3">
            <h2 className="font-(family-name:--font-bagel-fat-one) text-2xl">
              Te has apuntado a
            </h2>
            <CounterBadge value={apuntados.length} accent="#FCCE09" />
          </header>
          {apuntados.map((plan) => (
            <PlanCard key={plan.id} plan={plan}>
              <AnularBtn plan_id={plan.id} />
              <ChatModalBtn planId={plan.id} userName={userName} planTitulo={plan.titulo} /> {/* Botón de chat */}
            </PlanCard>
          ))}
        </section>
      </div>
    </div>
  );
};

export default MisPlanes;
