import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const SessionAvatar = () => {
  const session = useSession()
  return (
    session?.data && <div className="font-satoshi fixed right-16 bottom-8">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex items-center justify-center hover:cursor-pointer">
          {session.data?.user?.image ? (
            <Image
              className="rounded-full hover:shadow-blak transition-all"
              src={session.data?.user?.image}
              height={48}
              width={48}
              alt="avatar"
            />) : (
            <Image
              // style={{ filter: "blur(12px)", borderRadius: "9999px" }}
              src="/Avatar.png"
              height={48}
              width={48}
              alt="avatar"
            />
          )}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="flex flex-col w-[128px] mb-1">
            <DropdownMenu.Item className="bg-white pl-3 flex justify-start items-center h-12 border-t-4 border-b-2 border-black border-x-4 first:rounded-t-lg hover:bg-gray-100 hover:cursor-pointer focus:outline-none">
              <Link href="/account/overview">Account</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => { void signOut({ callbackUrl: "/home" }) }}
              className="bg-white flex justify-start pl-3 items-center h-12 border-b-4 border-black border-4 rounded-b-lg hover:bg-gray-100 hover:cursor-pointer focus:outline-none">
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

export default SessionAvatar