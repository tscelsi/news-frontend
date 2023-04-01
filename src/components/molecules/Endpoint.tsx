import React from 'react'
import { api } from '~/utils/api'
import { HiCheck, HiX } from "react-icons/hi";
import classNames from 'classnames';
import useWindowSize from '~/hooks/useWindowSize'

type Props = {
  outletId: string
  endpoint: string
  baseUrl?: string
  setEndpointValidity: (valid: boolean) => void
}

const Endpoint = ({ outletId, endpoint, baseUrl, setEndpointValidity }: Props) => {
  const { breakpoint } = useWindowSize()
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
      <span className={classNames("font-medium text-gray-500", {
        "animate-pulse": isDebouncing || poke.isLoading,
        "text-green-500": poke.data?.success,
        "text-red-500": !poke.data?.success && !isDebouncing && !poke.isLoading,
      })}>
        {baseUrl + "/" + endpoint}
      </span>
      {breakpoint !== 'sm' && <div>
        {isDebouncing || poke.isLoading ? null : poke.data?.success ? <HiCheck className="text-green-500" size={24} /> : <HiX className="text-red-500" size={24} />}
      </div>}
    </div>
  ) : null
}

export default Endpoint