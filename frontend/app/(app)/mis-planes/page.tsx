"use client";
import apiClient from "@/app/services/api-client";
import { Plan } from "@/app/types/plan";
import axios from "axios";
import { useEffect, useState } from "react";

const MisPlanes = () => {
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get("/planes/creados")
      .then((res) => setPlanes(res.data.planes))
      .catch((err) => {
        if (axios.isAxiosError(error))
          setError(err.respose?.data?.error ?? "Error desconocido");
        else setError("Error de conexión con el servidor");
      });
  });

  return (
    <>
      <div className="">
        {planes.map((plan) => (
          <>
          <p>{plan.titulo}</p>
          <p>{plan.aforo_max}</p>
          </>
        ))}
      </div>
      <pre>{JSON.stringify(planes, null, 2)}</pre>
    </>
  );
};

export default MisPlanes;
