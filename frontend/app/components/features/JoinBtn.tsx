"use client";

import { unirseAPlan } from "@/app/actions/planes";

const JoinBtn = ({ plan_id }: { plan_id: number }) => {
  const handleClick = () => {
    console.log("Este es el id del plan: ", plan_id);
    unirseAPlan(plan_id);
  };
  return (
    <>
    <button
      onClick={handleClick}
      className="btn btn-primary btn-outline btn-sm"
    >
      Unirme
    </button>
    
    </>
  );
};

export default JoinBtn;
