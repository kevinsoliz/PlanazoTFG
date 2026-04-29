import MisPlanesToggle from "@/app/components/features/planes/MisPlanesToggle";
import type { Plan } from "@/app/types/plan";

const mockPlan = (id: number, titulo: string): Plan => ({
  id,
  creator_id: 1,
  titulo,
  categoria: "Música",
  descripcion: "Descripción de prueba para el playground.",
  fecha: "2026-05-15T18:00:00.000Z",
  ubicacion: "Sitio mock",
  aforo_max: 10,
  participants: 3,
  created_at: "2026-04-29T12:00:00.000Z",
  creador_nombre: "Kevin",
  creador_username: "kevin",
  creador_avatar_url: null,
});

const Page = () => {
  const creados: Plan[] = [
    mockPlan(1, "Plan creado 1"),
    mockPlan(2, "Plan creado 2"),
  ];
  const apuntados: Plan[] = [
    mockPlan(3, "Plan apuntado 1"),
    mockPlan(4, "Plan apuntado 2"),
    mockPlan(5, "Plan apuntado 3"),
  ];

  return (
    <div className="p-6">
      <MisPlanesToggle creados={creados} apuntados={apuntados} />
    </div>
  );
};

export default Page;
