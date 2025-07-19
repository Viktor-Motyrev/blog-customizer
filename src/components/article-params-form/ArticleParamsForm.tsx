import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	appliedParams: ArticleStateType;
	setAppliedParams: (params: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	appliedParams,
	setAppliedParams,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(appliedParams);
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setFormState(appliedParams);
	}, [appliedParams]);

	useEffect(() => {
		if (!isOpen) return;
		function handleClick(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [isOpen]);

	const handleFieldChange = (field: keyof ArticleStateType, value: any) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setAppliedParams(formState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setAppliedParams(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				ref={ref}
			>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
				>
					<h2 className={styles.formTitle}>Задайте параметры</h2>
					<div className={styles.section}>
						<div className={styles.field}>
							<Select
								selected={formState.fontFamilyOption}
								options={fontFamilyOptions}
								title='Шрифт'
								onChange={(option) => handleFieldChange('fontFamilyOption', option)}
							/>
						</div>
						<div className={styles.field}>
							<RadioGroup
								name='fontSize'
								options={fontSizeOptions}
								selected={formState.fontSizeOption}
								title='Размер шрифта'
								onChange={(option) => handleFieldChange('fontSizeOption', option)}
							/>
						</div>
						<div className={styles.field}>
							<Select
								selected={formState.fontColor}
								options={fontColors}
								title='Цвет шрифта'
								onChange={(option) => handleFieldChange('fontColor', option)}
							/>
						</div>
					</div>
					<Separator />
					<div className={styles.section}>
						<div className={styles.field}>
							<Select
								selected={formState.backgroundColor}
								options={backgroundColors}
								title='Цвет фона'
								onChange={(option) => handleFieldChange('backgroundColor', option)}
							/>
						</div>
						<div className={styles.field}>
							<Select
								selected={formState.contentWidth}
								options={contentWidthArr}
								title='Ширина контейнера'
								onChange={(option) => handleFieldChange('contentWidth', option)}
							/>
						</div>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
