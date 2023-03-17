import React from 'react'
import { type NextPage } from 'next'
import classNames from 'classnames';
import { api } from "~/utils/api";
import ArticleLink from '~/components/ArticleLink';
import Label from '~/components/Label';
import Navbar from '~/components/Navbar';


export type LabelType = "SAME_EVENT" | "SAME_STORY" | "SAME_TOPIC" | "DIFFERENT";

const Feed: NextPage = () => {
	const latestArticles = api.article.latest.useQuery();
	const submitLabels = api.label.create.useMutation();
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

	const handleSubmit = () => {
		if (labelledArticles.length === 0) return;
		submitLabels.mutate({ ids: labelledArticles, label: currentLabel });
		setLabelledArticles([]);
	}

	return (
		<div className={classNames("min-h-screen", {
			"bg-[#F43F5E]": !labellingEnabled,
			"bg-white": labellingEnabled,
		})}>
			<Navbar toggleLabelling={toggleLabelling} labellingEnabled={labellingEnabled}>Manage my feed</Navbar>
		</div>
	)
}

export default Feed