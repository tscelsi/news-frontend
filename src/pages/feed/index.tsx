import React from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link';
import classNames from 'classnames';
import { getServerAuthSession } from '~/server/auth';
import { api } from "~/utils/api";
import ArticleLink from '~/components/molecules/ArticleLink';
import Label from '~/components/Label';
import Navbar from '~/components/organisms/Navbar';
import Button from '~/components/Button';
import ScrapingJobStatus from '~/components/molecules/ScrapingJobStatus';
import { type Article } from '@prisma/client';
import useWindowSize from '~/hooks/useWindowSize';
import LoadingSVG from '~/components/Loading';

export type LabelType = "SAME_EVENT" | "SAME_STORY" | "SAME_TOPIC" | "DIFFERENT";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

const Feed: NextPage = () => {
  const { breakpoint } = useWindowSize();
  const [cursor, setCursor] = React.useState<string>();
  const { data: feed, isLoading } = api.feed.get.useQuery(undefined, { refetchInterval: false, refetchOnWindowFocus: false });
  const { data: articles, isLoading: articlesLoading } = api.article.listPrivate.useQuery(!feed || !feed.outlets.length ? { cursor } : { feed, cursor }, { enabled: !!feed, keepPreviousData: true });
  const [allArticles, setAllArticles] = React.useState<Article[]>([]);
  const { data: scrapingJob } = api.scrapingJob.get.useQuery();
  const [labellingEnabled] = React.useState(false);
  const [currentLabel, setCurrentLabel] = React.useState<LabelType>("SAME_EVENT");
  const [labelledArticles, setLabelledArticles] = React.useState<string[]>([]);
  const toggleArticleToLabelled = (articleId: string) => {
    // insert article if not exists already
    if (labellingEnabled && !labelledArticles.includes(articleId)) {
      setLabelledArticles([...labelledArticles, articleId]);
    } else if (labellingEnabled && labelledArticles.includes(articleId)) {
      setLabelledArticles(labelledArticles.filter((id) => id !== articleId));
    }
  }

  React.useEffect(() => {
    if (articles && articles.length) {
      if (allArticles && allArticles.length === 0) setAllArticles([...allArticles, ...articles]);
      else if (allArticles[allArticles.length - 1]?.id !== articles[articles.length - 1]?.id) setAllArticles([...allArticles, ...articles])
    }
  }, [allArticles, articles])

  // const handleSubmit = () => {
  //   if (labelledArticles.length === 0) return;
  //   submitLabels.mutate({ ids: labelledArticles, label: currentLabel });
  //   setLabelledArticles([]);
  // }

  return (
    <div className={classNames("min-h-screen", {
      // "bg-[#F43F5E]": !labellingEnabled,
      "bg-white": labellingEnabled,
    })}>
      {breakpoint !== 'sm' ? <Navbar type='lg' props={{
        buttonLeftText: "manage my feed",
        buttonLeftRoute: '/feed/manage',
        subHeader: scrapingJob ? <ScrapingJobStatus scrapingJob={scrapingJob} /> : undefined,
      }}>{feed?.name}</Navbar> :
        <Navbar type='sm' props={{
          subHeader: scrapingJob ? <ScrapingJobStatus scrapingJob={scrapingJob} /> : undefined,
        }}>{feed?.name}</Navbar>}
      {!isLoading && (!feed || !feed.outlets.length) && <div className="lg:w-1/2 lg:ml-32 m-10 h-screen flex flex-col gap-8 font-satoshi">
        <h3 className="font-black text-5xl">Looks like you don&apos;t have a feed yet.</h3>
        <Link className="max-w-sm" href='/feed/manage'>
          <Button>Create a feed</Button>
        </Link>
      </div>}
      <div className="mt-6 flex flex-col items-center justify-start">
        <div className="sm:w-1/2 mx-8 flex flex-col items-start justify-center gap-4">
          {labellingEnabled &&
            <div className="w-full flex gap-4 mb-9">
              <Label boundLabel='SAME_EVENT' currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />
              <Label boundLabel='SAME_STORY' currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />
              <Label boundLabel='SAME_TOPIC' currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />
              <Label boundLabel='DIFFERENT' currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />
            </div>}
          <div className="flex flex-col gap-4 items-center justify-center mb-4 w-full">
            {!articlesLoading ? allArticles && allArticles.map((article) => (
              <ArticleLink
                key={article.id}
                labellingEnabled={labellingEnabled}
                isSelected={labellingEnabled && labelledArticles.includes(article.id)}
                labellingCategory={currentLabel}
                onClick={() => toggleArticleToLabelled(article.id)}
                article={article}
                linkActive
              />
            )) : <div className="w-full flex justify-center">
              <LoadingSVG />
            </div>}
          </div>
          <div className="w-full mb-6 flex justify-center">
            {articles && articles.length ? (
              <p className="font-bold text-lg hover:text-gray-800 hover:cursor-pointer" onClick={() => setCursor(articles[articles.length - 1]?.id)}>load more</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed