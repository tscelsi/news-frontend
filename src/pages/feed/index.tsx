import React from 'react'
import { api } from '~/utils/api';


const Feed = () => {
  const feeds = api.feed.list.useQuery()
  const deleteFeed = api.feed.delete.useMutation()
  return !feeds.data ? <div>Loading...</div> : (
    <div className="flex flex-col gap-4">
      {feeds.data.map((feed) => (
        <div key={feed.id}>
          <div className="flex gap-4">
            <p className="text-lg">{feed.name}</p>
            <a className="hover:cursor-pointer" onClick={() => deleteFeed.mutate({ id: feed.id })}>delete</a>
          </div>
          <ul>
            {feed.outlets.map((outlet) => (
              <li key={outlet.id}>{outlet.outlet.name} - {outlet.prefix}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Feed