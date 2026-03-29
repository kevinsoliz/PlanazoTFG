import React from 'react'

const PublicLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
    <div className="min-h-screen flex">
        <div className="flex-1 flex items-center justify-center bg-base-100 p-8">
            {children}
        </div>
        <div className="hidden lg-flex flex-1 bg-primary items-center justify-center">
            
        </div>
    </div>
    </>
  )
}

export default PublicLayout