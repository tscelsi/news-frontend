import React from 'react'
import Navbar from '~/components/organisms/Navbar'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { HiOutlineMail } from 'react-icons/hi'
import useWindowSize from '~/hooks/useWindowSize'

const Contact = () => {
  const { breakpoint } = useWindowSize()
  const { data: session } = useSession()
  return (
    <div className="font-satoshi min-h-screen">
      {breakpoint !== 'sm' ? <Navbar type='lg' props={{
        buttonLeftText: session?.user ? "back to feed" : "back home",
        buttonLeftRoute: session?.user ? '/feed' : '/',
      }}>Contact</Navbar> :
        <Navbar type='sm'>Contact</Navbar>
      }
      <div className="flex flex-col mt-6 justify-center items-center font-medium gap-4">
        <div className="min-w-[150px] flex gap-2 items-center border-black border-4 p-2 rounded-lg hover:shadow-blak hover:cursor-pointer transition-all">
          {/* <HiOutlineMail size={48} /> */}
          <span>Email</span>
        </div>
        <div className="min-w-[150px] flex gap-2 items-center border-black border-4 p-2 rounded-lg hover:shadow-blak hover:cursor-pointer transition-all">
          {/* <Image src="/linkedin_small.svg" alt="linkedin logo" height={48} width={48} /> */}
          <span>LinkedIn</span>
        </div>
        <div className="min-w-[150px] flex gap-2 items-center border-black border-4 p-2 rounded-lg hover:shadow-blak hover:cursor-pointer transition-all">
          {/* <Image src="/github-mark.svg" alt="linkedin logo" height={48} width={48} /> */}
          <span>Github</span>
        </div>
      </div>
    </div >
  )
}

export default Contact