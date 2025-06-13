import LoginSignup from '@/components/LoginSignup'
// import React from 'react'

const LoginUser = () => {
  return (
    <div className='  h-[calc(100vh-80px)] flex items-center justify-center'>
        <LoginSignup method='Login' user='user'/>
    </div>
  )
}

export default LoginUser;