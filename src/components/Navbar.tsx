import React from 'react'

type Props = {
  labellingEnabled: boolean
  toggleLabelling: (labellingEnabled: boolean) => void
}

const Navbar = ({ labellingEnabled, toggleLabelling }: Props) => {
  return (
    <div className="font-satoshi flex justify-center pt-20 pb-16 font-black">
      <div className="flex justify-between items-end w-4/5">
        <p className="hover:cursor-pointer">manage my feed</p>
        <h1 className="text-3xl text-center">Global Climate</h1>
        <p className="text-end hover:cursor-pointer" onClick={() => toggleLabelling(!labellingEnabled)}>{labellingEnabled ? 'stop' : 'start'} labelling</p>
      </div>
    </div>
  )
}

export default Navbar