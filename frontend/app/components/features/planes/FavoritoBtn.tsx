'use client'
import { marcarFavoritoPlan, desmarcarFavoritoPlan } from '@/app/actions/planes'
import { useState, useTransition } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const FavoritoBtn = ({ plan_id, es_favorito }: { plan_id: number, es_favorito: boolean }) => {

    const [favorito, setFavorito] = useState(es_favorito)
    const [pending, startTransition] = useTransition()

    const handleClick = () => {
        const anterior = favorito
        setFavorito(!anterior)

        startTransition(async () => {
            const res = anterior
                ? await desmarcarFavoritoPlan(plan_id)
                : await marcarFavoritoPlan(plan_id)

            if (res.error) {
                setFavorito(anterior)
            }
        })
    }

    return (
        <button
            onClick={handleClick}
            disabled={pending}
            aria-label={favorito ? "Quitar de favoritos" : "Marcar como favorito"}
            className="btn btn-ghost btn-xs"
        >
            {favorito ? <FaHeart className="text-error h-4 w-4" /> : <FaRegHeart className="h-4 w-4" />}
        </button>
    )
}

export default FavoritoBtn
