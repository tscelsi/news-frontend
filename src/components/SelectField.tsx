import React from 'react'
import Select from 'react-select'
import classNames from 'classnames'

type Option = {
  label: string
  value: string
}

type Props = {
  label?: string
  options?: Option[]
}

const SelectField = ({ options, label }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-xs font-medium pl-2">{label}</span>}
      <Select
        unstyled
        placeholder="Select an option"
        options={options ?? []}
        // override option display style
        styles={{
          option: () => ({
            display: 'flex',
          }),
          noOptionsMessage: () => ({
            display: 'flex'
          }),
        }}
        classNames={{
          control: (state) => classNames("hover:cursor-pointer bg-white px-3 border-black border-4 rounded-lg h-12 transition-all", {
            "hover:shadow-blak": !state.menuIsOpen,
            "hover:shadow-none": state.menuIsOpen,
            "rounded-b-none": state.menuIsOpen,
          }),
          option: () => "bg-white flex pl-4 justify-start items-center h-12 border-t-0 border-b-2 last:border-b-4 border-black border-4 last:rounded-b-lg hover:bg-gray-100 hover:cursor-pointer",
          placeholder: () => "text-gray-400 font-medium",
          noOptionsMessage: () => "bg-gray-300 flex pl-4 justify-start items-center h-12 border-t-0 text-gray-400 font-medium border-black border-4 rounded-b-lg",
        }}
      />
    </div>
  )
}

export default SelectField