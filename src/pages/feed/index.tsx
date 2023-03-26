import React from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link';
import classNames from 'classnames';
import { getServerAuthSession } from '~/server/auth';
import { api } from "~/utils/api";
import ArticleLink from '~/components/ArticleLink';
import Label from '~/components/Label';
import Navbar from '~/components/Navbar';
import Button from '~/components/Button';
import ScrapingJobStatus from '~/components/ScrapingJobStatus';

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
  const { data: feed } = api.feed.get.useQuery(undefined, { refetchInterval: false, refetchOnWindowFocus: false });
  const { data: articles, error } = api.article.listPrivate.useQuery(undefined, { refetchInterval: false, refetchOnWindowFocus: false });
  const { data: scrapingJob } = api.scrapingJob.get.useQuery(undefined, { refetchInterval: false, refetchOnWindowFocus: false });
  console.log(error?.data)
  console.log(scrapingJob)
  // const submitLabels = api.label.create.useMutation();
  const [labellingEnabled, toggleLabelling] = React.useState(false);
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
      <Navbar
        buttonLeftRoute='/feed/manage'
        buttonLeftText='manage my feed'
        buttonRightRoute={() => toggleLabelling(!labellingEnabled)}
        buttonRightText={labellingEnabled && feed ? 'stop labelling' : feed ? 'start labelling' : undefined}
        subHeader={scrapingJob ? <ScrapingJobStatus scrapingJob={scrapingJob} /> : undefined}
      >{feed?.name}</Navbar>
      {error && error.data?.code === "BAD_REQUEST" && <div className="lg:w-1/2 ml-32 absolute top-0 h-screen flex flex-col gap-8 justify-center">
        <h3 className="font-bold text-5xl">Looks like you don&apos;t have a feed yet.</h3>
        <Link className="max-w-sm" href='/feed/manage'>
          <Button>Create my feed</Button>
        </Link>
      </div>}
      <div className="flex flex-col items-center justify-start">
        <div className="lg:w-1/2 mx-8 flex flex-col items-start justify-center gap-4">
          {labellingEnabled &&
            <div className="w-full flex gap-4 mb-9">
              <Label boundLabel='SAME_EVENT' currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />
              <Label boundLabel='SAME_STORY' currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />
              <Label boundLabel='SAME_TOPIC' currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />
              <Label boundLabel='DIFFERENT' currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />
            </div>}
          <div className="flex flex-col gap-4">
            {scrapingJob && scrapingJob.status === "finished"}
            {articles && articles.map((article) => (
              <ArticleLink
                key={article.id}
                labellingEnabled={labellingEnabled}
                isSelected={labellingEnabled && labelledArticles.includes(article.id)}
                labellingCategory={currentLabel}
                onClick={() => toggleArticleToLabelled(article.id)}
                article={article}
                linkActive
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed