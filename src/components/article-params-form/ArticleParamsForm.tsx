import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { ReactNode } from 'react';

export const ArticleParamsForm = (props: {
	changeAside: () => void;
	changePageVisual: (event: React.FormEvent<HTMLFormElement>) => void;
	reset: () => void;
	isVisible: boolean;
	children: ReactNode;
}) => {
	return (
		<>
			<ArrowButton
				changeAside={props.changeAside}
				isVisible={props.isVisible}
			/>
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: props.isVisible,
				})}>
				<form onSubmit={props.changePageVisual} className={styles.form}>
					{props.children}
					<div className={styles.bottomContainer}>
						<Button onClick={props.reset} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
