import React from 'react'

const Logo = ( {color}: {color?: string}) => {
  return (
    <span className={`${color} text-4xl font-(family-name:--font-bagel-fat-one)`}>Planazo</span>
  )
}

export default Logo