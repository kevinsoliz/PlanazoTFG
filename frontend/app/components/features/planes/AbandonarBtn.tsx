'use client'
import { abandonarPlan } from '@/app/actions/planes'
import React from 'react'

const AbandonarBtn = ({plan_id}: {plan_id: number}) => {

    const handleClick = async () => {
        await abandonarPlan(plan_id);
    }

  return (
<button onClick={handleClick} className="btn btn-warning btn-xs">Abandonar</button>
  )
}

export default AbandonarBtn
