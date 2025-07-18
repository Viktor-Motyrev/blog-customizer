import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние открытия сайдбара
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	// Применённые параметры
	const [appliedParams, setAppliedParams] = useState(defaultArticleState);
	// Начальные параметры (для сброса)
	const [initialParams] = useState(defaultArticleState);

	// Применить новые параметры
	const handleApply = (newParams: ArticleStateType) => {
		setAppliedParams(newParams);
		// Обновляем CSS-переменные
		document.documentElement.style.setProperty(
			'--font-family',
			newParams.fontFamilyOption.value
		);
		document.documentElement.style.setProperty(
			'--font-size',
			newParams.fontSizeOption.value
		);
		document.documentElement.style.setProperty(
			'--font-color',
			newParams.fontColor.value
		);
		document.documentElement.style.setProperty(
			'--container-width',
			newParams.contentWidth.value
		);
		document.documentElement.style.setProperty(
			'--bg-color',
			newParams.backgroundColor.value
		);
		setSidebarOpen(false);
	};

	// Сбросить к начальному состоянию
	const handleReset = () => {
		setAppliedParams(initialParams);
		document.documentElement.style.setProperty(
			'--font-family',
			initialParams.fontFamilyOption.value
		);
		document.documentElement.style.setProperty(
			'--font-size',
			initialParams.fontSizeOption.value
		);
		document.documentElement.style.setProperty(
			'--font-color',
			initialParams.fontColor.value
		);
		document.documentElement.style.setProperty(
			'--container-width',
			initialParams.contentWidth.value
		);
		document.documentElement.style.setProperty(
			'--bg-color',
			initialParams.backgroundColor.value
		);
		setSidebarOpen(false);
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
			<ArticleParamsForm
				open={isSidebarOpen}
				onClose={() => setSidebarOpen(false)}
				initialParams={appliedParams}
				onApply={handleApply}
				onReset={handleReset}
				onOpen={() => setSidebarOpen(true)}
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
