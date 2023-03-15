import React from 'react'

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="font-serif">{children}</div>
  )
}

export default Layout