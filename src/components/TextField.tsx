/* eslint-disable react/display-name */
import React from 'react'
import classNames from 'classnames'
import type { UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  // label?: string
  // bolden?: boolean
} & Partial<UseFormRegisterReturn>


const TextField = React.forwardRef((props, ref) => (
    <div className="flex flex-col gap-2">
      {/* {label && <span className="text-xs font-medium pl-2">{label}</span>} */}
      <input ref={ref} type="text" className={classNames("pl-3 focus:outline focus:outline-offset-2 focus:shadow-none focus:outline-black border-black border-4 rounded-lg h-12 hover:shadow-blak transition-all", {
        // "font-bold": bolden,
        // "font-medium": !bolden,
      })} {...props} />
    </div>
  ))

export default TextField