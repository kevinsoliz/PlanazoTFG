"use client";
import PlanCard from "@/app/components/features/PlanCard";
import apiClient from "@/app/services/api-client";
import { Plan } from "@/app/types/plan";
import axios from "axios";
import { useEffect, useState } from "react";

const MisPlanes = () => {
  const [creados, setCreados] = useState<Plan[]>([]);
  const [apuntados, setApuntados] = useState<Plan[]>([]);
  const [errCreados, setErrCreados] = useState("");
  const [errApuntados, setErrApuntados] = useState("");

  useEffect(() => {
    apiClient
      .get("/planes/creados")
      .then((res) => setCreados(res.data.planes))
      .catch((err) => {
        if (axios.isAxiosError(err))
          setErrCreados(err.response?.data?.error ?? "Error desconocido");
        else setErrCreados("Error de conexión con el servidor");
      });

    apiClient
      .get("/planes/apuntado")
      .then((res) => setApuntados(res.data.planes))
      .catch((err) => {
        if (axios.isAxiosError(err))
          setErrApuntados(err.response?.data?.error ?? "Error desconocido");
        else setErrApuntados("Error de conexión con el servidor");
      });
  });

  return (
    <>
      <div className="flex">
        <div className="flex-1 ">
          <h1>Planes creados:</h1>
          {creados.map((plan) => (
          <PlanCard key={plan.id} plan={plan} >
            <button className="btn btn-error btn-outline btn-sm">Borrar</button>
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
