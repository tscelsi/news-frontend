import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from "next-auth/react"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const SessionAvatar = () => {
  const router = useRouter()
  const session = useSession()
  return (
    session?.data && <div className="font-satoshi fixed right-16 bottom-8">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex items-center justify-center hover:cursor-pointer focus-visible:outline-none">
          {session.data?.user?.email && (
            <div
              className="bg-white h-12 w-12 text-xl flex items-center justify-center rounded-full blur:outline-none hover:shadow-blak transition-all font-black border-4 border-black"
            >{session.data?.user?.email.slice(0, 1).toLocaleUpperCase()}</div>)}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="flex flex-col w-[128px] mb-1 font-semibold font-satoshi">
            <DropdownMenu.Item className="bg-white pl-3 flex justify-start items-center h-12 border-t-4 border-b-0 border-black border-x-4 first:rounded-t-lg hover:bg-red-100 hover:cursor-pointer focus:outline-none transition-colors">
              <Link href="/account">Account</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => { void signOut() }}
              className="bg-white flex justify-start pl-3 items-center h-12 border-black border-b-0 border-t-2 border-x-4 hover:bg-red-100 hover:cursor-pointer focus:outline-none transition-colors">
              Sign out
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => { void router.push("/contact") }}
              className="bg-white flex justify-start pl-3 items-center h-12 border-black border-b-0 border-t-2 border-x-4 hover:bg-red-100 hover:cursor-pointer focus:outline-none transition-colors">
              Contact
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => { void router.push('/docs/mission') }}
              className="bg-white flex justify-start pl-3 items-center h-12 border-b-4 border-black border-t-2 border-x-4 rounded-b-lg hover:bg-red-100 hover:cursor-pointer focus:outline-none transition-colors">
              Docs
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

export default SessionAvatar