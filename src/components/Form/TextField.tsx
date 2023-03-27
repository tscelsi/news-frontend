/* eslint-disable react/display-name */
import React from 'react'
import classNames from 'classnames'
import type { UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  label?: string
  bolden?: boolean
  editable?: boolean
} & Partial<UseFormRegisterReturn>


const TextField = React.forwardRef(({ label, bolden, editable = true }: Props, ref: React.ForwardedRef<HTMLInputElement>) => (
  <div className={classNames("flex flex-col gap-2", {
    "opacity-70": !editable,
  })}>
    {label && <span className="text-xs font-medium pl-2">{label}</span>}
    <input disabled={!editable} ref={ref} type="text" className={classNames("pl-3 focus:outline focus:outline-offset-2 focus:shadow-none focus:outline-black border-black border-4 rounded-lg h-12 transition-all", {
      "font-bold": bolden,
      "font-medium": !bolden,
      "hover:shadow-blak": editable,
      "hover:cursor-default": !editable,
    })} />
  </div>
))

export default TextField