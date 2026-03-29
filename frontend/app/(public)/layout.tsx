import React from 'react'

const PublicLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
    <div className="min-h-screen flex">
        <div className="flex-1 flex items-center justify-center bg-base-100 p-8">
            {children}
        </div>
        <div className="hidden lg:flex flex-1 bg-primary items-center justify-center">
          <p className="text-2xl">hola mundo</p>
            <img src="src/images/auth/amigos12.png" alt="" />
        </div>
    </div>
    </>
  )
}

export default PublicLayout