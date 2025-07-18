import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import { ArrowButton } from './ui/arrow-button/ArrowButton';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Применённые параметры
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [appliedParams, setAppliedParams] = useState(defaultArticleState);

	const handleApply = (newParams: ArticleStateType) => {
		setAppliedParams(newParams);
	};

	const handleReset = () => {
		setAppliedParams(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedParams.fontFamilyOption.value,
					'--font-size': appliedParams.fontSizeOption.value,
					'--font-color': appliedParams.fontColor.value,
					'--container-width': appliedParams.contentWidth.value,
					'--bg-color': appliedParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArrowButton isOpen={isSidebarOpen} onClick={() => setSidebarOpen(!isSidebarOpen)} />
			<ArticleParamsForm
				open={isSidebarOpen}
				onClose={() => setSidebarOpen(false)}
				onOpen={() => setSidebarOpen(true)}
				initialParams={appliedParams}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
