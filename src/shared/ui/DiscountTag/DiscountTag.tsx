import cls from 'classnames';
import { FC, memo } from 'react';

import s from './DiscountTag.module.scss';

interface DiscountTagProps {
	className?: string;
	discount: number;
}

export const DiscountTag = memo(({ className, discount }: DiscountTagProps) => {
	return (
		<div className={cls(s.DiscountTag, className)}>
			{discount < 0 ? 'error' : `-${discount}%`}
		</div>
	);
});
