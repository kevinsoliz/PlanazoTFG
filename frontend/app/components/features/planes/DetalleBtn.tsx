import Link from "next/link";

type Props = {
  plan_id: number;
};

const DetalleBtn = ({ plan_id }: Props) => {
  return (
    <Link href={`/home/${plan_id}`} className="btn btn-outline btn-accent btn-sm">
      Detalle
    </Link>
  );
};

export default DetalleBtn;
