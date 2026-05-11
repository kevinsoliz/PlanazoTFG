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

  const handleVote = async (nuevoVoto: number) => {
    if (loading) return;
    setLoading(true);
    setRating(nuevoVoto);
    try {
      await valorarPlan(planId, nuevoVoto);
    } catch (error) {
      console.error("Error al votar:", error);
    } finally {
      setLoading(false);
    }
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
    </div>
  );
}