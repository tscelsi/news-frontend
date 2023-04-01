import React from 'react'
import Link from 'next/link'
import Navbar from '~/components/organisms/Navbar'
import Button from '~/components/Button'
import Image from 'next/image'


const SmHome = () => {
  return (
    <div className="font-satoshi min-h-screen bg-white">
      <Navbar type='sm' />
      <div className="mt-10 h-[calc(100vh-80px)] flex flex-col justify-between">
        <div className="max-w-md w-full flex flex-col items-center sm:justify-center bg-transparent">
          <h1 className="text-6xl sm:text-start text-center font-black">pileof.news</h1>
          <h3 className="text-xl sm:text-start text-center font-black mt-2">See all your news in one <br /> place.</h3>
          <div className="w-full px-16 mt-8">
            <Link className="relative z-10" href='/signin'>
              <Button glass variant="filled">get started</Button>
            </Link>
          </div>
        </div>
        <div className="mt-[-80px] w-full h-[600px] relative">
          <Image className="object-cover object-top" src="/lg_pileofnews.png" alt="pileofnews articles" fill />
        </div>
      </div>
    </div>
  )
}

export default SmHome