import React from 'react'
import SmNavbar from './SmNavbar'
import LgNavbar from './LgNavbar'
import type { SmNavbarProps } from './SmNavbar'
import type { LgNavbarProps } from './LgNavbar'

type NavbarProps2 = {
  type: 'sm'
  props?: SmNavbarProps
} & React.PropsWithChildren
| {
  type: 'lg'
  props: LgNavbarProps
} & React.PropsWithChildren

const Navbar: React.FC<NavbarProps2> = ({ type, props, children }) => {
  if (type === 'sm') return <SmNavbar {...props} >{children}</SmNavbar>
  else return <LgNavbar {...props} >{children}</LgNavbar>
}

export default Navbar