'use client'
import { anularPlan } from '@/app/actions/planes'
import React from 'react'

const AnularBtn = ({plan_id}: {plan_id: number}) => {
    
    const handleClick = async () => {
        await anularPlan(plan_id);
    }

  return (
<button onClick={handleClick} className="btn btn-warning btn-xs">Anular</button>
  )
}

export default AnularBtn