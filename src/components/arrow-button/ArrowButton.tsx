import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export const ArrowButton = (props: {
	changeAside: OnClick;
	isVisible: boolean;
}) => {
	console.log(props.isVisible);

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={props.changeAside}
			className={clsx({
				[styles.container]: true,
				[styles.container_open]: props.isVisible,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: true,
					[styles.arrow_open]: props.isVisible,
				})}
			/>
		</div>
	);
};
