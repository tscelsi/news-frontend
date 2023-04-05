import React from 'react'
import Link from 'next/link'
import { api } from '~/utils/api'
import type { Session } from 'next-auth'
import ArticleLink from '~/components/molecules/ArticleLink'
import type { LabelType } from '~/pages/feed'
import useWindowSize from '~/hooks/useWindowSize'

const categories: LabelType[] = [
  "SAME_EVENT",
  "SAME_STORY",
  "SAME_TOPIC",
  "DIFFERENT",
]

// generate random number between min and max
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

const LgHome = ({ session }: { session: Session | null }) => {
  const getRandCategory = React.useCallback(() => categories[random(0, categories.length - 1)], [])
  const { breakpoint } = useWindowSize()
  console.log(breakpoint)
  const { data: latestArticles } = api.article.latest20.useQuery(undefined, { refetchOnWindowFocus: false, refetchInterval: false });
  return (
    <div className="font-satoshi min-h-screen bg-white">
      <div className="max-w-md w-full flex flex-col sm:h-screen sm:gap-12 items-start justify-center sm:pb-16 sm:ml-24 bg-transparent">
        <h1 className="relative z-10 sm:text-8xl sm:text-start font-black">pileof.news</h1>
        <h3 className="relative z-10 sm:text-2xl sm:text-start font-black mt-2">See all your news in one <br /> place.</h3>
      </div>
      {(breakpoint === "lg" || breakpoint === "xl" || breakpoint == '2xl') && <div className="absolute top-0 right-0 w-screen h-screen overflow-hidden">
        <div className="absolute min-w-fit top-[-15rem] md:right-[-60%] xl:right-[-30%] 2xl:right-[-10%] sm:rotate-[-15deg] lg:rotate-[-25deg] flex flex-col gap-4">
          {latestArticles ? latestArticles.map((article, index) => (
            <ArticleLink
              key={index}
              labellingEnabled={Math.random() < 0.5}
              isSelected={Math.random() < 0.5}
              labellingCategory={getRandCategory()}
              article={article} />
          )) : <div>Loading...</div>}
        </div>
      </div>}
      <div className="text-xl font-black absolute bottom-12 left-12 flex flex-col gap-3">
        <Link className="hover:text-gray-700 transition-all" href={session ? '/feed' : '/signin'}>{!session ? 'sign in' : 'my feed'}</Link>
        <Link href='/contact'>contact</Link>
        <Link href='/docs/mission'>docs</Link>
      </div>
    </div>
  )
}

export default LgHome