import React from 'react'
import classNames from 'classnames';
import type { ArticleLatest } from "~/server/api/routers/article";
import type { LabelType } from '~/pages/news';

type Props = {
  article: ArticleLatest
  onClick?: React.MouseEventHandler
  selected?: LabelType
} & React.PropsWithChildren

const ArticleLink = ({ children, article, selected, ...rest }: Props) => {
  return (
    <div {...rest} className={classNames("flex h-[95px] gap-4 border-4 items-center rounded-xl border-black px-4 py-3 shadow-none hover:shadow-blak hover:cursor-pointer transition-shadow", {
      "bg-green-300": selected === "SAME_EVENT",
      "bg-blue-300": selected === "SAME_STORY",
      "bg-fuchsia-300": selected === "SAME_TOPIC",
      "bg-rose-300": selected === "DIFFERENT",
    })}>
      <div className="flex flex-col">
        <p className="text-sm">
          {article.outlet}
        </p>
        <div className="text-lg">
          {children}
        </div>
        <div className="flex gap-4 text-sm">
          {article.author.length !== 0 && <p>{article.author.join(" & ")}</p>}
          <p>{article.published.toDateString()}</p>
        </div>
      </div>
      <div className="self-start">
        chev
      </div>
    </div>
  )
}

export default ArticleLink