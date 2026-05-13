import React from 'react'

// Grupo de avatares solapados con el contador de "+2000 personas ya se han unido".
const Oruga = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex -space-x-3">
            <img src="/images/landing/oruga-avatars/person1.png" className="w-10 h-10 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
            <img src="/images/landing/oruga-avatars/person2.png" className="w-10 h-10 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
            <img src="/images/landing/oruga-avatars/person3.png" className="w-10 h-10 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
            <img src="/images/landing/oruga-avatars/person4.png" className="w-10 h-10 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
            <img src="/images/landing/oruga-avatars/person5.png" className="w-10 h-10 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
            <img src="/images/landing/oruga-avatars/person6.png" className="w-10 h-10 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
        </div>
        <p><b className='text-teal-500'>+2000</b> personas ya se han unido!</p>
    </div>
  )
}

export default Oruga