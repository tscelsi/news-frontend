import React from 'react'
import classNames from 'classnames';
import type { LabelType } from '~/pages/feed';
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import type { Article } from '@prisma/client';

type PartialArticle = Pick<Article,
  | 'id'
  | 'title'
  | 'published'
  | 'modified'
  | 'outlet'
  | 'author'
  | 'body'
  | 'url'
  | 'prefix'>

type Props = {
  article: PartialArticle
  onClick?: React.MouseEventHandler
  isSelected?: boolean
  labellingEnabled?: boolean
  labellingCategory?: LabelType
  linkActive?: boolean
}

const formatDate = (date: Date) => {
  // convert to something like: January 3rd, 2023
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}${day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'}, ${year}`;
}

const ArticleLink = ({ article, isSelected, labellingCategory, labellingEnabled, linkActive, ...rest }: Props) => {
  const [expanded, setExpanded] = React.useState(false);

  const onLinkClick = (article: PartialArticle) => {
    // TODO: fingerprint
    if (window) {
      window.open(article.url, '_blank')
    }
  }

  return (
    <div {...rest} className={classNames("font-satoshi w-full flex gap-4 border-4 items-center rounded-xl border-black px-4 py-2 shadow-none transition-shadow", {
      // non-labelling styles
      "hover:shadow-blak": !labellingEnabled,
      "bg-white": !labellingEnabled || labellingEnabled && !isSelected,
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
          {article.outlet} - {article.prefix}
        </p>
        <div className="mt-2 flex gap-1 items-center text-lg font-bold grow">
          <span onClick={linkActive ? () => onLinkClick(article) : undefined} className={classNames({
            "hover:cursor-pointer": linkActive,
            "hover:underline": linkActive,
          })}>{article.title}</span>
        </div>
        {expanded && article.author.length !== 0 && <div className={classNames("text-sm font-semibold mt-2 mb-2")}>
          <p>by: {article.author.join(" & ")}</p>
        </div>}
        {expanded && <div className={classNames("mt-2 mb-2")}>
          {article.body.substring(0, 150)}...
        </div>}
        <div className="text-sm text-gray-700 mt-2">
          <p>{formatDate(article.modified)} {article.modified.toLocaleTimeString()}</p>
          {/* {article.author.length !== 0 && <p>{article.author.join(" & ")}</p>} */}
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