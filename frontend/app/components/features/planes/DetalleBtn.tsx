import Link from "next/link";

type Props = {
  plan_id: number;
};

// Enlace al detalle del plan.
const DetalleBtn = ({ plan_id }: Props) => {
  return (
    <Link href={`/home/${plan_id}`} className="btn btn-outline btn-warning btn-xs">
      Detalle
    </Link>
  );
};

export default DetalleBtn;
