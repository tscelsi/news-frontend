import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react"
import { HiOutlineX } from 'react-icons/hi'
import { useMobileMenu } from '~/context/MobileMenuContext'

type MenuItem = {
    name: string
    path: string | (() => void)
    onlyShowAuthed?: boolean
    onlyShowNotAuthed?: boolean
}

const menuItems: MenuItem[] = [
    {
        name: "my feed",
        path: "/feed",
        onlyShowAuthed: true,
        onlyShowNotAuthed: false,
    },
    {
        name: "manage my feed",
        path: "/feed/manage",
        onlyShowAuthed: true,
        onlyShowNotAuthed: false,
    },
    {
        name: "docs",
        path: "/docs/mission",
        onlyShowAuthed: false,
        onlyShowNotAuthed: false,
    },
    {
        name: "contact",
        path: "/contact",
        onlyShowAuthed: false,
        onlyShowNotAuthed: false,
    },
    {
        name: "account",
        path: "/account",
        onlyShowAuthed: true,
        onlyShowNotAuthed: false,
    },
    {
        name: "sign out",
        path: () => void signOut(),
        onlyShowAuthed: true,
        onlyShowNotAuthed: false,
    },
    {
        name: "sign in",
        path: () => void signIn(),
        onlyShowAuthed: false,
        onlyShowNotAuthed: true,
    }
]

const MobileMenu = () => {
    const { data: session } = useSession()
    const { toggleMenu } = useMobileMenu()

    const renderLink = (key: number, item: MenuItem) => {
        if (item.onlyShowAuthed && !session?.user) return null
        if (item.onlyShowNotAuthed && session?.user) return null
        if (typeof item.path === "string") {
            return (
                <Link onClick={toggleMenu} className="first:mt-0 mt-12" key={key} href={item.path}>
                    <div className="text-whyte flex items-center hover:cursor-pointer hover:text-violet-100 transition-colors">
                        {item.name}
                    </div>
                </Link>
            )
        }
        return (<div key={key} onClick={item.path} className="text-whyte flex items-center hover:cursor-pointer hover:text-violet-100 transition-colors">
            {item.name}
        </div>)
    }

    return (
        <div className="fixed px-8 py-6 z-50 top-0 left-0 h-full w-full flex flex-col bg-white font-satoshi">
            <HiOutlineX onClick={toggleMenu} size={32} />
            <div className="font-medium">
                {menuItems.map((item, idx) => renderLink(idx, item))}
            </div>
            <div className="grow flex flex-col justify-end">
                <div className="flex gap-2 justify-start items-center text-sm h-8">
                    <div className="text-whyte">
                        <span className="font-bold">Version</span> <span className="text-xs align-super mt-[-4px]">0.0.1</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileMenu