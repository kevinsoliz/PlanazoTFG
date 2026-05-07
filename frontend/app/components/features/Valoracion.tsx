'use client';

import { useState } from 'react';
import { valorarPlan } from '@/app/actions/planes';

export default function EstrellasValoracion({ 
    planId, 
    votoInicial = 0, 
    notaMedia = 0 
}: { 
    planId: number;
    votoInicial?: number;
    notaMedia?: number;
}) {
    // ESTADOS: Controlan la calificación fijada, la previsualización (hover) y el feedback de carga/error.
    const [rating, setRating] = useState(votoInicial); 
    const [hover, setHover] = useState(0);   
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState<{ texto: string; error: boolean } | null>(null);

    // MANEJADOR DE VOTACIÓN: Envía la puntuación al servidor de forma asíncrona.
    const handleVotar = async (puntuacion: number) => {
        setLoading(true);
        setMensaje(null);
        
        const result = await valorarPlan(planId, puntuacion);
        
        // Gestión de respuesta: Si hay error revierte al voto inicial, si no, actualiza la UI.
        if (result?.error) {
            setMensaje({ texto: result.error, error: true });
            setRating(votoInicial);
        } else {
            setRating(puntuacion); 
            setMensaje({ texto: "¡Valoración guardada!", error: false });
        }
        
        setLoading(false);
    };

    // Lógica visual: Determina si mostrar la puntuación guardada o la que el usuario está previsualizando con el ratón.
    const valorActual = hover || rating;

    return (
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm border w-fit">
            <div className="flex items-center justify-between gap-6">
                <p className="font-semibold text-gray-700">Tu valoración</p>
                <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                    Media global: {notaMedia > 0 ? `${notaMedia} ★` : 'N/A'}
                </div>
            </div>
            
            {/* CONTENEDOR DE ESTRELLAS: Gestiona el renderizado y el evento de salida del ratón. */}
            <div 
                className="flex gap-1 w-fit"
                onMouseLeave={() => setHover(0)}
            >
                {[1, 2, 3, 4, 5].map((estrella) => {
                    // CÁLCULO DE LLENADO: Determina si la estrella debe verse vacía, media o llena.
                    let fillPercent = "0%";
                    if (valorActual >= estrella) fillPercent = "100%";
                    else if (valorActual >= estrella - 0.5) fillPercent = "50%";

                    return (
                        <div key={estrella} className="relative text-4xl cursor-pointer">
                            <div className="text-gray-300">★</div>
                            <div 
                                className="absolute top-0 left-0 overflow-hidden text-yellow-400 pointer-events-none"
                                style={{ width: fillPercent }}
                            >★</div>

                            {/* DETECTORES DE ZONA: Divide la estrella en dos mitades invisibles para capturar el 0.5 y el 1.0. */}
                            <div 
                                className="absolute top-0 left-0 w-1/2 h-full z-10"
                                onMouseEnter={() => setHover(estrella - 0.5)}
                                onClick={() => !loading && handleVotar(estrella - 0.5)}
                            />
                            <div 
                                className="absolute top-0 right-0 w-1/2 h-full z-10"
                                onMouseEnter={() => setHover(estrella)}
                                onClick={() => !loading && handleVotar(estrella)}
                            />
                        </div>
                    );
                })}
            </div>

            {/* FEEDBACK: Texto descriptivo de la nota y mensajes de éxito/error. */}
            <p className="text-sm font-medium text-gray-500">
                {valorActual > 0 ? `${valorActual} estrellas` : 'Selecciona una nota'}
            </p>

            {mensaje && (
                <p className={`text-sm mt-1 ${mensaje.error ? "text-red-500" : "text-green-600"}`}>
                    {mensaje.texto}
                </p>
            )}
        </div>
    );
}