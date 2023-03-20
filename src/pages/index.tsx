import React from 'react'
import Link from 'next/link'
import { api } from '~/utils/api'
import ArticleLink from '~/components/ArticleLink'
import type { LabelType } from './feed'

const categories: LabelType[] = [
  "SAME_EVENT",
  "SAME_STORY",
  "SAME_TOPIC",
  "DIFFERENT",
]

// generate random number between min and max
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

const Home = () => {
  const latestArticles = api.article.latest.useQuery(undefined, { refetchOnWindowFocus: false, refetchInterval: false });
  return (
    <div className="font-satoshi min-h-screen bg-[#F43F5E]">
      <div className="max-w-md flex flex-col gap-12 h-screen justify-center pb-16 lg:ml-16 bg-transparent">
        <h1 className="text-8xl font-black">pileof.news</h1>
        <h3 className="text-2xl font-black">See all your news articles in the one place. Help create the world&apos;s largest dataset of labelled news articles.</h3>
      </div>
      <div className="absolute top-0 right-0 w-screen h-screen overflow-hidden">
        <div className="lg:w-1/2 absolute top-[-15rem] lg:left-[60%] rotate-[-20deg] flex flex-col gap-4">
          {latestArticles.data ? latestArticles.data.map((article) => (
            <ArticleLink
              key={article.id}
              labellingEnabled={Math.random() < 0.5}
              isSelected={Math.random() < 0.5}
              labellingCategory={categories[random(0, categories.length - 1)]}
              article={article} />
          )) : <div>Loading...</div>}
        </div>
      </div>
      <div className="text-xl font-black absolute bottom-12 left-12 flex flex-col gap-3">
        <Link href='/login'>login</Link>
        <Link href='#' className='opacity-60'>mission</Link>
      </div>
    </div>
  )
}

export default Home