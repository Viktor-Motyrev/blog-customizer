import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

// Типы пропсов
interface ArticleParamsFormProps {
	open: boolean;
	onClose: () => void;
	onOpen: () => void;
	initialParams: {
		fontFamilyOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
	};
	onApply: (params: any) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	open,
	onClose,
	onOpen,
	initialParams,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState(initialParams);
	const ref = useRef<HTMLDivElement>(null);

	// Сброс формы при открытии
	useEffect(() => {
		if (open) setFormState(initialParams);
	}, [open, initialParams]);

	// Закрытие по клику вне панели
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

	return (
		<>
			<ArrowButton isOpen={open} onClick={open ? onClose : onOpen} />
			<aside
				className={`${styles.container} ${open ? styles.container_open : ''}`}
				ref={ref}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply(formState);
					}}
					onReset={(e) => {
						e.preventDefault();
						onReset();
					}}>
					<h2>Настройки статьи</h2>
					<Separator />
					<div style={{ margin: '16px 0' }}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={(option) =>
								setFormState((s) => ({ ...s, fontFamilyOption: option }))
							}
						/>
					</div>
					<div style={{ margin: '16px 0' }}>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={(option) =>
								setFormState((s) => ({ ...s, fontColor: option }))
							}
						/>
					</div>
					<div style={{ margin: '16px 0' }}>
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={(option) =>
								setFormState((s) => ({ ...s, backgroundColor: option }))
							}
						/>
					</div>
					<div style={{ margin: '16px 0' }}>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							title='Ширина контейнера'
							onChange={(option) =>
								setFormState((s) => ({ ...s, contentWidth: option }))
							}
						/>
					</div>
					<div style={{ margin: '16px 0' }}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							title='Размер шрифта'
							onChange={(option) =>
								setFormState((s) => ({ ...s, fontSizeOption: option }))
							}
						/>
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
