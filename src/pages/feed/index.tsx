import React from 'react'
import { useSession } from 'next-auth/react';
import { type NextPage } from 'next'
import classNames from 'classnames';
import { api } from "~/utils/api";
import ArticleLink from '~/components/ArticleLink';
import Label from '~/components/Label';
import Navbar from '~/components/Navbar';
import Button from '~/components/Button';
import Link from 'next/link';


export type LabelType = "SAME_EVENT" | "SAME_STORY" | "SAME_TOPIC" | "DIFFERENT";


const Feed: NextPage = () => {
  const { data: session } = useSession();
  const { data: feed, error: feedError } = api.feed.get.useQuery(undefined, { refetchInterval: false, refetchOnWindowFocus: false });
  const { data: articles, error } = api.article.listPrivate.useQuery(undefined, { refetchInterval: false, refetchOnWindowFocus: false });
  console.log(error?.data)
  // const submitLabels = api.label.create.useMutation();
  const [labellingEnabled, toggleLabelling] = React.useState(false);
  const [currentLabel, setCurrentLabel] = React.useState<LabelType>("SAME_EVENT");
  const [labelledArticles, setLabelledArticles] = React.useState<string[]>([]);
  if (!session) {
    return <div>Not logged in</div>
  }
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
      "bg-[#F43F5E]": !labellingEnabled,
      "bg-white": labellingEnabled,
    })}>
      <Navbar
        buttonLeftRoute='/feed/manage'
        buttonLeftText='manage my feed'
        buttonRightRoute={() => toggleLabelling(!labellingEnabled)}
        buttonRightText={labellingEnabled && feed ? 'stop labelling' : feed ? 'start labelling' : undefined}
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