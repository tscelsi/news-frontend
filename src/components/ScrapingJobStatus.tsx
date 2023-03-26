import React from 'react'
import type { ScrapingJob } from '@prisma/client'

type Props = {
  scrapingJob: ScrapingJob
}

const ScrapingJobStatus = ({ scrapingJob }: Props) => {
  if (scrapingJob.status === "running") {
    return <div className="text-green-500 font-medium animate-pulse">Updating your feed</div>
  } else if (scrapingJob.status === "finished") {
    return <div className="text-gray-800 font-medium">{`Last updated: ${scrapingJob.modified_at.toLocaleDateString()} ${scrapingJob.modified_at.toLocaleTimeString()}`}</div>
  }
  return <div className="text-gray-800 font-medium">Your feed is up to date</div>
}

export default ScrapingJobStatus