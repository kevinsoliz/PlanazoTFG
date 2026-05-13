'use client'
import { abandonarPlan } from '@/app/actions/planes'
import React from 'react'

// Botón para salir de un plan al que el usuario está apuntado.
const AbandonarBtn = ({plan_id}: {plan_id: number}) => {

    const handleClick = async () => {
        await abandonarPlan(plan_id);
    }

  return (
<button onClick={handleClick} className="btn btn-outline btn-error btn-xs">Abandonar</button>
  )
}

export default AbandonarBtn
