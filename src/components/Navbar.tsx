import React from 'react'
import Link from 'next/link'

type Props = {
  buttonLeftRoute?: string
  buttonRightRoute?: string | (() => void)
  buttonLeftText?: string
  buttonRightText?: string
} & React.PropsWithChildren

const Navbar = ({ children, buttonLeftRoute, buttonRightRoute, buttonLeftText, buttonRightText }: Props) => {
  return (
    <div className="font-satoshi flex justify-center pt-20 pb-16 font-black">
      <div className="flex justify-between items-end w-4/5">
      {buttonLeftRoute ? typeof buttonLeftRoute === 'function' ? <a onClick={buttonLeftRoute} className="hover:cursor-pointer">{buttonLeftText}</a> :
          <Link href={buttonLeftRoute} className="hover:cursor-pointer">{buttonLeftText}</Link> : null}
        <h1 className="text-3xl text-center">{children}</h1>
        {buttonRightRoute ? typeof buttonRightRoute === 'function' ? <a onClick={buttonRightRoute} className="hover:cursor-pointer">{buttonRightText}</a> :
          <Link href={buttonRightRoute} className="hover:cursor-pointer">{buttonRightText}</Link> : null}
      </div>
    </div>
  )
}

export default Navbar