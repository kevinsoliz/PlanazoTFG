import React from 'react'

const Oruga = () => {
  return (
    <div className="flex items-center justify-center gap-4">
        <div className="flex -space-x-3">
            <img src="/images/profiles/person1.png" className="w-10 h-10 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
            <img src="/images/profiles/person2.png" className="w-10 h-10 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
            <img src="/images/profiles/person3.png" className="w-10 h-10 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
            <img src="/images/profiles/person4.png" className="w-10 h-10 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
            <img src="/images/profiles/person5.png" className="w-10 h-10 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
            <img src="/images/profiles/person6.png" className="w-10 h-10 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.4)]" />
        </div>
        <p><b className='text-teal-500'>+2000</b> personas ya se han unido!</p>
    </div>
  )
}

export default Oruga