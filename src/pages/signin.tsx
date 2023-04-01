import React from 'react'
import { signIn } from "next-auth/react"
import Navbar from '~/components/organisms/Navbar'
import Button from '~/components/Button'
import useWindowSize from '~/hooks/useWindowSize'

const Login = () => {
  const { breakpoint } = useWindowSize()
  return (
    <div className="font-satoshi min-h-screen bg-[#F43F5E]">
      {breakpoint !== 'sm' ? <Navbar type='lg' props={{
        buttonLeftText: "back to feed",
        buttonLeftRoute: '/feed'
      }}>Sign In</Navbar> :
        <Navbar type='sm'>Sign In</Navbar>}
      <div className="flex justify-center items-center mt-8">
        <div className="flex flex-col items-center w-full mx-8 lg:w-1/4 bg-white border-4 border-black rounded-xl">
          <div className="mt-12 mb-16">
            <p className="mb-6 font-black text-xl">Sign in to your account</p>
            <Button onClick={() => signIn("google", { callbackUrl: "/feed" })} variant='outlined' textAlign="start" image={"/goog.png"}>Google</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login