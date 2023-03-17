import React from 'react'
import classNames from 'classnames'

type Props = {
  label?: string
  bolden?: boolean
}

const TextField = (props: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {props?.label && <span className="text-xs font-medium pl-2">{props.label}</span>}
      <input type="text" className={classNames("pl-3 focus:outline focus:outline-offset-2 focus:shadow-none focus:outline-black border-black border-4 rounded-lg h-12 hover:shadow-blak transition-all", {
        "font-bold": props.bolden,
        "font-medium": !props.bolden,
      })} />
    </div>
  )
}

export default TextField