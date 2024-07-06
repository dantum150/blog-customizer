import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [options, setOptions] = useState(defaultArticleState);

	const [style, setStyle] = useState(defaultArticleState);

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStyle(options);
	}

	function onChange(key: string, option: OptionType) {
		setOptions({ ...options, [key]: option });
	}

	function reset() {
		setOptions(defaultArticleState);
		setStyle(defaultArticleState);
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': style.fontFamilyOption.value,
					'--font-size': style.fontSizeOption.value,
					'--font-color': style.fontColor.value,
					'--container-width': style.contentWidth.value,
					'--bg-color': style.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				options={options}
				onChange={onChange}
				changePageVisual={onSubmit}
				reset={reset}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
