import React from 'react'
import { api } from '~/utils/api'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import Navbar from '~/components/Navbar'
import Button from '~/components/Button'
import TextField from '~/components/TextField'


const Account = () => {
  const { data: session } = useSession()
  const { register, reset } = useForm()
  const deleteAccount = api.user.delete.useMutation()

  React.useEffect(() => {
    if (session?.user) {
      reset({
        name: session.user.name,
        email: session.user.email,
      })
    }
  }, [session, reset])

  const handleDeleteAccount = async () => {
    await deleteAccount.mutateAsync()
  }

  return (
    <div className="font-satoshi min-h-screen bg-[#F43F5E]">
      <Navbar buttonLeftText="back to feed" buttonLeftRoute='/_feed'>My Account</Navbar>
      <div className="flex justify-center items-center">
        <div className="w-2/5 bg-white border-4 border-black rounded-xl">
          <div className="mx-16 mt-16 mb-12">
            <div className="flex flex-col gap-4">
              <TextField label="Name" editable={false} {...register('name')} />
              <TextField label="Email" editable={false} {...register('email')} />
            </div>
            <div className="mt-12 border-red-500 border-4 rounded-xl">
              <div className="my-4 mx-6">
                <p className="font-black text-red-500">Dangerzone</p>
                <div className="mt-6 mb-12">
                  <Button onClick={handleDeleteAccount}>Delete account</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account