"use client";
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
        <div>
          <h1>Planes creados:</h1>
          <pre>{JSON.stringify(creados, null, 2)}</pre>
        </div>
        <div>
          <h1>Planes apuntados:</h1>
          <pre>{JSON.stringify(apuntados, null, 2)}</pre>
        </div>
      </div>
    </>
  );
};

export default MisPlanes;
