import React from 'react'
import classNames from 'classnames'

type Props = {
  labellingEnabled: boolean
  toggleLabelling: (labellingEnabled: boolean) => void
  buttonLeftOnClick?: () => void
  buttonRightOnClick?: () => void
  buttonLeftText?: string
  buttonRightText?: string
} & React.PropsWithChildren

const Navbar = ({ children, labellingEnabled, toggleLabelling, buttonLeftOnClick, buttonRightOnClick, buttonLeftText, buttonRightText }: Props) => {
  return (
    <div className="font-satoshi flex justify-center pt-20 pb-16 font-black">
      <div className="flex justify-between items-end w-4/5">
        <p onClick={buttonLeftText ? buttonLeftOnClick : undefined} className="hover:cursor-pointer">{buttonLeftText}</p>
        <h1 className="text-3xl text-center">{children}</h1>
        <p className="text-end hover:cursor-pointer" onClick={buttonRightText ? buttonRightOnClick : undefined}>{buttonRightText}</p>
      </div>
    </div>
  )
}

export default Navbar