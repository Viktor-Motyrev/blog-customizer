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
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	open: boolean;
	onOpen: () => void;
	onClose: () => void;
	initialParams: ArticleStateType;
	onApply: (params: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	open,
	onOpen,
	onClose,
	initialParams,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(initialParams);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setFormState(initialParams);
	}, [initialParams]);

	useEffect(() => {
		if (!open) return;
		function handleClick(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClose();
			}
		}
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [open, onClose]);

	const handleFieldChange = (field: keyof ArticleStateType, value: any) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(initialParams);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={open} onClick={open ? onClose : onOpen} />
			<aside
				className={`${styles.container} ${open ? styles.container_open : ''}`}
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
								onChange={(option) =>
									handleFieldChange('fontFamilyOption', option)
								}
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
								onChange={(option) =>
									handleFieldChange('backgroundColor', option)
								}
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
