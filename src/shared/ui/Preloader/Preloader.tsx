import s from './Preloader.module.scss';

export const Preloader = () => {
	return (
		<div className={s.ldsEllipsis}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};
