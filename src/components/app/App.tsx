import { useState, CSSProperties } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import styles from '../../styles/index.module.scss';

const App = () => {
	// Применённые параметры
	const [appliedParams, setAppliedParams] = useState(defaultArticleState);

	const handleApply = (newParams: ArticleStateType) => {
		setAppliedParams(newParams);
	};

	const handleReset = () => {
		setAppliedParams(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
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
				initialParams={defaultArticleState}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

export { App };