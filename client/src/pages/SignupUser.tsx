import LoginSignup from '@/components/LoginSignup'
// import React from 'react'

const SignupUser = () => {
  return (
    <div className='flex justify-center items-center h-[calc(100vh-80px)]'>
        <LoginSignup method='Signup' user='user'/>
    </div>
  )
}

export default SignupUser