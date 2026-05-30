'use client'
import { marcarFavoritoPlan, desmarcarFavoritoPlan } from '@/app/actions/planes'
import { useState, useTransition } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

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
            
        >
            {favorito ? <AiFillHeart className="text-error" size={25} /> : <AiOutlineHeart size={25} />}
        </button>
    )
}

export default FavoritoBtn
