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
  disabled?: boolean
} & React.HTMLAttributes<HTMLButtonElement>

const Button = ({ variant = "filled", type = "button", children, onClick, textAlign, image, disabled, ...rest }: Props) => {
  return (
    <button type={type} onClick={onClick} className={classNames("p-4 w-full flex gap-2 justify-center items-center text-center text-lg h-14 bg-black font-bold rounded-xl hover:cursor-pointer ring-black ring-offset-1 hover:ring-2 transition-all", {
      "border-4 border-black": variant === "outlined",
      "bg-white": variant === "outlined",
      "text-black": variant === "outlined",
      "text-white": variant === "filled",
      "text-gray-400": disabled,
      "hover:shadow-none": disabled,
      "hover:cursor-default": disabled,
      "text-start": textAlign === "start",
      "text-end": textAlign === "end",
    })} {...rest} disabled={disabled}>
      {image && <Image src={image} height={24} width={24} alt="button-image" />}
      {children}
    </button>
  )
}

export default Button