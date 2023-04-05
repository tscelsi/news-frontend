import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import ContentLoader from "react-content-loader"

export type LgNavbarProps = {
  buttonLeftRoute?: string
  buttonRightRoute?: string | (() => void)
  buttonLeftText?: string
  buttonRightText?: string
  subHeader?: React.ReactNode
  smaller?: boolean
} & React.PropsWithChildren

const LgNavbar = ({ children, buttonLeftRoute, buttonRightRoute, buttonLeftText, buttonRightText, subHeader, smaller }: LgNavbarProps) => {
  return (
    <div>
      <div className={classNames("relative font-satoshi flex justify-center lg:pt-16 font-black z-50", {
        "lg:pb-16": !smaller,
        "pb-8": !smaller,
        "pb-none": smaller,
      })}>
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
    </div>
  )
}

export default LgNavbar