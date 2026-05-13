import React from 'react'

// Wordmark de Planazo. El color es opcional para adaptarlo a fondos claros u oscuros.
const Logo = ( {color}: {color?: string}) => {
  return (
    <span className={`${color} text-4xl font-normal font-(family-name:--font-bagel-fat-one)`}>Planazo</span>
  )
}

export default Logo