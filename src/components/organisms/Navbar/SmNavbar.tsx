import React from 'react'
import { HiMenu } from 'react-icons/hi'
import MobileMenu from './MobileMenu'
import { useMobileMenu } from '~/context/MobileMenuContext'

export type SmNavbarProps = {
  subHeader?: React.ReactNode
} & React.PropsWithChildren

const SmNavbar = ({ children, subHeader }: SmNavbarProps) => {
  const { toggleMenu, menuOpen } = useMobileMenu()
  return (
    <div>
      <div onClick={toggleMenu} className="pl-8 py-6">
        <HiMenu size={32} />
      </div>
      <div className="relative font-satoshi flex justify-center lg:pt-16 font-black z-10">
        <div className="flex justify-between items-center w-4/5">
          <div className="flex-1 flex flex-col gap-2 items-center">
            <h1 className="text-4xl text-center">{children}</h1>
            {subHeader && <div className="text-center">{subHeader}</div>}
          </div>
        </div>
      </div>
      {menuOpen && <MobileMenu />}
    </div>
  )
}

export default SmNavbar