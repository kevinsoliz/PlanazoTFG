'use client';
import { valorarPlan } from "@/app/actions/planes";
import { useState } from "react";

interface Props {
  planId: number;
  votoInicial: number;
}

export default function VotarPlan({ planId, votoInicial }: Props) {
  const [rating, setRating] = useState(votoInicial);
  const [loading, setLoading] = useState(false);
  // Si la Server Action devuelve { error }, guardamos el mensaje aquí
  // para mostrarlo en pantalla y poder hacer rollback del voto pintado.
  const [error, setError] = useState<string | null>(null);

  const handleVote = async (nuevoVoto: number) => {
    if (loading) return;
    // Guardamos el voto previo ANTES del optimistic update para
    // poder restaurarlo si el backend rechaza la valoracion.
    const votoAnterior = rating;
    setLoading(true);
    setError(null);
    // Optimistic update: pintamos el voto nuevo ya, sin esperar respuesta.
    setRating(nuevoVoto);

    // valorarPlan NO lanza: devuelve { ok: true } o { error: string }.
    // Por eso no usamos try/catch para errores de negocio.
    const res = await valorarPlan(planId, nuevoVoto);

    // 'error' in res es un type guard: dentro del if, TypeScript sabe
    // que la propiedad existe y nos deja leerla sin queja.
    if ("error" in res) {
      // Rollback al voto que habia antes del intento.
      setRating(votoAnterior);
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 p-5 bg-base-100 rounded-2xl border border-base-300 shadow-sm relative w-full max-w-xs">
      <div className="flex flex-col">
        <span className="text-sm font-bold uppercase opacity-60">Tu valoración</span>
        <span className="text-2xl font-black">{rating} estrellas</span>
      </div>

      <div className="rating rating-lg rating-half mt-2">
        <input 
          type="radio" 
          name={`rating-${planId}`} 
          className="rating-hidden" 
          checked={rating === 0} 
          readOnly 
        />
        
        {[...Array(10)].map((_, i) => {
          const valor = (i + 1) / 2;
          return (
            <input
              key={i}
              type="radio"
              name={`rating-${planId}`}
              className={`mask mask-star-2 ${i % 2 === 0 ? 'mask-half-1' : 'mask-half-2'} bg-orange-400`}
              checked={rating === valor}
              onChange={() => handleVote(valor)}
              disabled={loading}
            />
          );
        })}
      </div>

      {loading && (
        <span className="loading loading-spinner loading-xs text-orange-400 absolute bottom-4 right-4"></span>
      )}

      {error && (
        <p className="text-xs text-error">{error}</p>
      )}
    </div>
  );
}