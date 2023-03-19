import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'

type Props = {
  variant?: 'filled' | 'outlined'
  textAlign?: 'center' | 'start' | 'end'
  type?: 'button' | 'submit' | 'reset'
  image?: string
  children: React.ReactNode
  onClick?: () => void
} & React.HTMLAttributes<HTMLButtonElement>

const Button = ({ variant = "filled", type = "button", children, onClick, textAlign, image, ...rest }: Props) => {
  return (
    <button type={type} onClick={onClick} className={classNames("p-4 w-full flex gap-2 items-center text-center text-lg h-14 bg-black font-bold rounded-md hover:cursor-pointer ring-black ring-offset-1 hover:ring-2 transition-all", {
      "border-4 border-black": variant === "outlined",
      "bg-white": variant === "outlined",
      "text-black": variant === "outlined",
      "text-white": variant === "filled",
      "text-start": textAlign === "start",
      "text-end": textAlign === "end",
    })} {...rest}>
      {image && <Image src={image} height={24} width={24} alt="button-image" />}
      {children}
    </button>
  )
}

export default Button