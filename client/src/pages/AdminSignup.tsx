import LoginSignup from '@/components/LoginSignup'
// import React from 'react'

const AdminSignup = () => {
  return (
    <div className='flex justify-center items-center h-[calc(100vh-80px)]'>
        <LoginSignup method='Signup' user='seller'/>
    </div>
  )
}

export default AdminSignup