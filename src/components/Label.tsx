import React from 'react'
import type { LabelType } from '~/pages/news';
import classNames from 'classnames';

type Props = {
  boundLabel: LabelType
  currentLabel: LabelType
  setCurrentLabel: (label: LabelType) => void
}

type ColourType = Record<LabelType, {
  hoverbg: string
  hovershadow: string
  selected: string
  border: string
}>

const colours: ColourType = {
  SAME_EVENT: {
    hoverbg: "bg-green-200",
    hovershadow: "shadow-green",
    border: "border-green-500",
    selected: "bg-green-300",
  },
  SAME_STORY: {
    hoverbg: "bg-blue-200",
    hovershadow: "shadow-blue",
    border: "border-blue-500",
    selected: "bg-blue-300",
  },
  SAME_TOPIC: {
    hoverbg: "bg-purple-200",
    hovershadow: "shadow-purple",
    border: "border-purple-500",
    selected: "bg-purple-300",
  },
  DIFFERENT: {
    hoverbg: "bg-red-200",
    hovershadow: "shadow-red",
    border: "border-red-500",
    selected: "bg-red-300",
  },
}

const getColour = (label: LabelType) => {
  return colours[label]
}

const Label = ({ boundLabel, currentLabel, setCurrentLabel }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setCurrentLabel(boundLabel);
  }
  const colour = getColour(boundLabel)
  return (
    <div onClick={handleClick} className={classNames(`flex items-center justify-center px-4 font-satoshi text-center h-12 border-4 rounded-lg ${colour.border} p-[2px] hover:${colour.hovershadow} hover:cursor-pointer hover:${colour.hoverbg} transition-all`, {
      [colour.selected]: currentLabel === boundLabel,
      "grow": currentLabel === boundLabel,
    })}>
      <p className="font-black">{boundLabel.replace("_", " ")}</p>
    </div>
  )
}

export default Label