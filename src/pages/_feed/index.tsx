import React from 'react'
import { useSession } from 'next-auth/react';
import { type NextPage } from 'next'
import classNames from 'classnames';
import { api } from "~/utils/api";
import ArticleLink from '~/components/ArticleLink';
import Label from '~/components/Label';
import Navbar from '~/components/Navbar';


export type LabelType = "SAME_EVENT" | "SAME_STORY" | "SAME_TOPIC" | "DIFFERENT";


const Feed: NextPage = () => {
  const { data: session } = useSession();
  const latestArticles = api.article.latest.useQuery();
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
        buttonLeftRoute='/_feed/manage'
        buttonLeftText='manage my feed'
        buttonRightRoute={() => toggleLabelling(!labellingEnabled)}
        buttonRightText={labellingEnabled ? 'stop labelling' : 'start labelling'}
      >Global Climate</Navbar>
      <div className="flex flex-col items-center justify-start">
        {/* <button onClick={() => createFeed.mutate(newFeed)}>Click me to create new feed!</button> */}
        <div className="lg:max-w-4xl mx-8 flex flex-col items-start justify-center gap-4">
          {labellingEnabled &&
            <div className="w-full flex gap-4 mb-9">
              <Label boundLabel='SAME_EVENT' currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />
              <Label boundLabel='SAME_STORY' currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />
              <Label boundLabel='SAME_TOPIC' currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />
              <Label boundLabel='DIFFERENT' currentLabel={currentLabel} setCurrentLabel={setCurrentLabel} />
            </div>}
          <div className="flex flex-col gap-4">
            {latestArticles.data ? latestArticles.data.map((article) => (
              <ArticleLink
                key={article.id}
                labellingEnabled={labellingEnabled}
                isSelected={labellingEnabled && labelledArticles.includes(article.id)}
                labellingCategory={currentLabel}
                onClick={() => toggleArticleToLabelled(article.id)}
                article={article} />
            )) : <div>Loading...</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed