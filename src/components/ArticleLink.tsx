import React from 'react'
import classNames from 'classnames';
import type { ArticleLatest } from "~/server/api/routers/article";
import type { LabelType } from '~/pages/news';
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

type Props = {
  article: ArticleLatest
  onClick?: React.MouseEventHandler
  isSelected?: boolean
  labellingEnabled?: boolean
  labellingCategory?: LabelType
}

const ArticleLink = ({ article, isSelected, labellingCategory, labellingEnabled, ...rest }: Props) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div {...rest} className={classNames("font-satoshi w-full flex gap-4 border-4 items-center rounded-xl border-black px-4 py-2 shadow-none transition-shadow", {
      // non-labelling styles
      "hover:shadow-blak": !labellingEnabled,
      "bg-white": !labellingEnabled,
      // labelling styles
      "hover:cursor-pointer": labellingEnabled,
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
        <p className="text-sm font-medium">
          {article.outlet}
        </p>
        <div className="text-lg font-bold grow">
          {article.title}
        </div>
        <div className={classNames("mt-2 mb-4", {
          "hidden": !expanded || labellingEnabled,
        })}>
          {article.body.substring(0, 150)}...
        </div>
        <div className="flex gap-4 text-sm">
          {article.author.length !== 0 && <p>{article.author.join(" & ")}</p>}
          <p>{article.published.toDateString()}</p>
        </div>
      </div>
      {!labellingEnabled && <div className="flex grow self-start justify-end">
        {!expanded ? <HiChevronDown onClick={() => setExpanded(true)} className="hover:cursor-pointer" size={24} /> :
          <HiChevronUp onClick={() => setExpanded(false)} className="hover:cursor-pointer" size={24} />}
      </div>}
    </div>
  )
}

export default ArticleLink