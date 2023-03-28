import React from 'react'
import { api } from '~/utils/api'
import { HiCheck, HiQuestionMarkCircle, HiEmojiSad } from "react-icons/hi";

type Props = {
  outletId: string
  endpoint: string
  baseUrl?: string
  setEndpointValidity: (valid: boolean) => void
}

const Endpoint = ({ outletId, endpoint, baseUrl, setEndpointValidity }: Props) => {
  const [debouncedUrl, setDebouncedUrl] = React.useState(endpoint)
  const [isDebouncing, setIsDebouncing] = React.useState(false)
  const poke = api.outlet.poke.useQuery({ id: outletId, endpoint: debouncedUrl }, { refetchInterval: false, refetchOnWindowFocus: false, enabled: endpoint !== "" })

  // debounce the setting of the endpoint. Hacky way
  // to debounce triggering the useQuery hook.
  React.useEffect(() => {
    setIsDebouncing(true)
    const timeout = setTimeout(() => {
      setDebouncedUrl(endpoint)
      setIsDebouncing(false)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [endpoint])

  React.useEffect(() => {
    setEndpointValidity(poke.data?.success ?? false)
  }, [poke.data?.success, setEndpointValidity])

  return baseUrl ? (
    <div className="flex gap-2 items-center justify-start ">
      <span className="text-normal text-gray-500">
        {baseUrl + "/" + endpoint}
      </span>
      {isDebouncing || poke.isLoading ? <HiQuestionMarkCircle size={24} /> : poke.data?.success ? <HiCheck size={24} /> : <HiEmojiSad size={24} />}
    </div>
  ) : null
}

export default Endpoint