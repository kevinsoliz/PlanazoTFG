import type { Plan } from "@/app/types/plan";
import BaseCard from "../ui/BaseCard";
import { CATEGORIAS } from "../../constants/categorias";

interface Props {
  plan: Plan;
}

const Plan = ({ plan }: Props) => {
  return (
    <div className="card bg-base-100 shadow-sm break-inside-avoid mb-6">
      <BaseCard boxShadow="0">
        <div className="card-body">
          <h2 className="card-title">{plan.titulo}</h2>
          <p className="text-sm text-base-content/70">{plan.descripcion}</p>
          <div className="flex gap-2 mt-2">
            {CATEGORIAS.filter((cat) => plan.categoria === cat.name).map(
              (cat) => (
                <span key={cat.name} className={`badge badge-sm ${cat.badge}`}>
                  {cat.name}
                </span>
              ),
            )}

            <span className="badge badge-outline">4 plazas</span>
          </div>
          <div className="card-actions mt-4">
            <button className="btn btn-primary btn-sm w-full">Unirme</button>
          </div>
        </div>
      </BaseCard>
    </div>
  );
};

export default Plan;
