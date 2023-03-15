import React from 'react'
import { type NextPage } from 'next'
import classNames from 'classnames';
import { api } from "~/utils/api";
import Layout from "~/components/Layout";
import ArticleLink from '~/components/ArticleLink';


export type LabelType = "SAME_EVENT" | "SAME_STORY" | "SAME_TOPIC" | "DIFFERENT";

const Home: NextPage = () => {
	const latestArticles = api.article.latest.useQuery();
	const submitLabels = api.label.create.useMutation();
	const [labellingEnabled, toggleLabelling] = React.useState(false);
	const [pageNumberLoaded, setPageNumberLoaded] = React.useState(1);
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
		submitLabels.mutate({ids: labelledArticles, label: currentLabel});
		setLabelledArticles([]);
	}

	return (
		<Layout>
			<button onClick={() => toggleLabelling(!labellingEnabled)}>toggle labelling {!labellingEnabled ? "on": "off"}</button>
			<div className="container mx-auto px-32">
				{labellingEnabled && <div className="flex gap-4">
					<div onClick={() => setCurrentLabel("SAME_EVENT")} className={classNames("hover:bg-green-200 p-[2px]", {
						"hover:cursor-pointer": labellingEnabled,
						"bg-green-300": currentLabel === "SAME_EVENT",
					})}>SAME_EVENT</div>
					<div onClick={() => setCurrentLabel("SAME_STORY")} className={classNames("hover:bg-blue-200 p-[2px]", {
						"hover:cursor-pointer": labellingEnabled,
						"bg-blue-300": currentLabel === "SAME_STORY",
					})}>SAME_STORY</div>
					<div onClick={() => setCurrentLabel("SAME_TOPIC")} className={classNames("hover:bg-fuchsia-200 p-[2px]", {
						"hover:cursor-pointer": labellingEnabled,
						"bg-fuchsia-300": currentLabel === "SAME_TOPIC",
					})}>SAME_TOPIC</div>
					<div onClick={() => setCurrentLabel("DIFFERENT")} className={classNames(" hover:bg-rose-200 p-[2px]", {
						"hover:cursor-pointer": labellingEnabled,
						"bg-rose-300": currentLabel === "DIFFERENT",
					})}>DIFFERENT</div>
					<button onClick={handleSubmit}>Submit</button>
				</div>}
				{/* <button onClick={() => createFeed.mutate(newFeed)}>Click me to create new feed!</button> */}
				<div className="flex flex-col items-start justify-center gap-4">
					{latestArticles.data ? latestArticles.data.map((article) => (
						<ArticleLink selected={labellingEnabled && labelledArticles.includes(article.id) ? currentLabel : undefined} onClick={() => toggleArticleToLabelled(article.id)} key={article.id} article={article}>{article.title}</ArticleLink>
					)) : <div>Loading...</div>}
				</div>
			</div>
		</Layout>
	)
}

export default Home