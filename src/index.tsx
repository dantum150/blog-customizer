import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Select } from './components/select';
import { RadioGroup } from './components/radio-group';
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const defaultStyleOptions = {
		fontFamily: fontFamilyOptions[0],
		fontSize: fontSizeOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		width: contentWidthArr[0],
	};

	const [options, setOptions] = useState(defaultStyleOptions);

	const [isVisible, setIsVisible] = useState(false);

	const [style, setStyle] = useState(defaultStyleOptions);

	function onClick() {
		setIsVisible(!isVisible);
	}

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStyle(options);
	}

	function onChange(key: string, option: OptionType) {
		setOptions({ ...options, [key]: option });
	}

	function reset() {
		setOptions(defaultStyleOptions);
		setStyle(defaultStyleOptions);
	}
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': style.fontFamily.value,
					'--font-size': style.fontSize.value,
					'--font-color': style.fontColor.value,
					'--container-width': style.width.value,
					'--bg-color': style.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				changeAside={onClick}
				isVisible={isVisible}
				changePageVisual={onSubmit}
				reset={reset}>
				<div className={styles.selectGroup}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						selected={options.fontFamily}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(option) => onChange('fontFamily', option)}
					/>
					<RadioGroup
						title='размер шрифта'
						selected={options.fontSize}
						options={fontSizeOptions}
						name='размер шрифта'
						onChange={(option) => onChange('fontSize', option)}
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
						selected={options.width}
						options={contentWidthArr}
						title='ширина контента'
						onChange={(option) => onChange('width', option)}
					/>
				</div>
			</ArticleParamsForm>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
