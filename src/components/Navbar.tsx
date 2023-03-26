import React from 'react'
import Link from 'next/link'

type Props = {
  buttonLeftRoute?: string
  buttonRightRoute?: string | (() => void)
  buttonLeftText?: string
  buttonRightText?: string
  subHeader?: React.ReactNode
} & React.PropsWithChildren

const Navbar = ({ children, buttonLeftRoute, buttonRightRoute, buttonLeftText, buttonRightText, subHeader }: Props) => {
  return (
    <div className="relative font-satoshi flex justify-center pt-16 pb-16 font-black z-50">
      <div className="flex justify-between items-center w-4/5">
        <div className="flex-1 mr-auto">
          {buttonLeftRoute ? typeof buttonLeftRoute === 'function' ? <a onClick={buttonLeftRoute} className="hover:cursor-pointer">{buttonLeftText}</a> :
            <Link href={buttonLeftRoute} className="hover:cursor-pointer">{buttonLeftText}</Link> : null}
        </div>
        <div className="flex-1 flex flex-col gap-2 items-center">
          <h1 className="text-4xl text-center">{children}</h1>
          {subHeader && <div className="text-center">{subHeader}</div>}
        </div>
        <div className="flex-1 text-end">{buttonRightRoute ? typeof buttonRightRoute === 'function' ? <a onClick={buttonRightRoute} className="hover:cursor-pointer">{buttonRightText}</a> :
          <Link href={buttonRightRoute} className="hover:cursor-pointer">{buttonRightText}</Link> : null}
        </div>
      </div>
    </div>
  )
}

export default Navbar