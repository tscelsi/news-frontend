import React from 'react'
import classNames from 'classnames';
import type { ArticleLatest } from "~/server/api/routers/article";
import type { LabelType } from '~/pages/news';

type Props = {
  article: ArticleLatest
  onClick?: React.MouseEventHandler
  isSelected?: boolean
  labellingEnabled?: boolean
  labellingCategory?: LabelType
} & React.PropsWithChildren

const ArticleLink = ({ children, article, isSelected, labellingCategory, labellingEnabled, ...rest }: Props) => {
  return (
    <div {...rest} className={classNames("flex gap-4 border-4 items-center rounded-xl border-black px-4 py-3 shadow-none hover:cursor-pointer transition-shadow", {
      // labelling styles
      "hover:shadow-green": labellingEnabled && labellingCategory === "SAME_EVENT",
      "border-green-500": labellingEnabled && labellingCategory === "SAME_EVENT",
      "hover:shadow-blue": labellingEnabled && labellingCategory === "SAME_STORY",
      "border-blue-500": labellingEnabled && labellingCategory === "SAME_STORY",
      "hover:shadow-purple": labellingEnabled && labellingCategory === "SAME_TOPIC",
      "border-purple-500": labellingEnabled && labellingCategory === "SAME_TOPIC",
      "hover:shadow-red": labellingEnabled && labellingCategory === "DIFFERENT",
      "border-red-500": labellingEnabled && labellingCategory === "DIFFERENT",
      // label selected styles
      "bg-green-200": isSelected && labellingEnabled && labellingCategory === "SAME_EVENT",
      "bg-blue-200": isSelected && labellingEnabled && labellingCategory === "SAME_STORY",
      "bg-purple-200": isSelected && labellingEnabled && labellingCategory === "SAME_TOPIC",
      "bg-red-200": isSelected && labellingEnabled && labellingCategory === "DIFFERENT",
    })}>
      <div className="flex flex-col">
        <p className="text-sm">
          {article.outlet}
        </p>
        <div className="text-lg grow">
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