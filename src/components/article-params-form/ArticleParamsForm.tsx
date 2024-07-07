import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useRef } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import {
	OptionType,
	fontFamilyOptions,
	backgroundColors,
	fontColors,
	fontSizeOptions,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
export const ArticleParamsForm = (props: {
	changePageVisual: (event: React.FormEvent<HTMLFormElement>) => void;
	reset: () => void;
	onChange: (key: string, option: OptionType) => void;
	options: typeof defaultArticleState;
}) => {
	const { options, onChange } = props;
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: () => setIsMenuOpen(true),
	});

	function onClick(event: React.MouseEvent<HTMLDivElement>) {
		event.stopPropagation();
		setIsMenuOpen(!isMenuOpen);
	}

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		props.changePageVisual(event);
		setIsMenuOpen(false);
	}

	function onReset() {
		props.reset();
		setIsMenuOpen(false);
	}
	return (
		<>
			<ArrowButton changeAside={onClick} isMenuOpen={isMenuOpen} />
			<aside
				ref={rootRef}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isMenuOpen,
				})}>
				<form onSubmit={onSubmit} className={styles.form}>
					<div className={styles.selectGroup}>
						<Text size={31} weight={800} family='open-sans' uppercase={true}>
							Задайте параметры
						</Text>

						<Select
							selected={options.fontFamilyOption}
							options={fontFamilyOptions}
							title='шрифт'
							onChange={(option) => onChange('fontFamilyOption', option)}
						/>
						<RadioGroup
							title='размер шрифта'
							selected={options.fontSizeOption}
							options={fontSizeOptions}
							name='размер шрифта'
							onChange={(option) => onChange('fontSizeOption', option)}
						/>

						<Select
							selected={options.fontColor}
							options={fontColors}
							title='цвет шрифта'
							onChange={(option) => onChange('fontColor', option)}
						/>
					</div>

					<div className={styles.selectGroup}>
						<Select
							selected={options.backgroundColor}
							options={backgroundColors}
							title='цвет фона'
							onChange={(option) => onChange('backgroundColor', option)}
						/>
						<Select
							selected={options.contentWidth}
							options={contentWidthArr}
							title='ширина контента'
							onChange={(option) => onChange('contentWidth', option)}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button onClick={onReset} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
