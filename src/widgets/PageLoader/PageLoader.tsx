import cls from 'classnames';
import { FC } from 'react';

import { Preloader } from 'shared/ui';

import s from './PageLoader.module.scss';

export const PageLoader: FC = () => {
	return (
		<div className={cls(s.PageLoader)}>
			<Preloader />
		</div>
	);
};
