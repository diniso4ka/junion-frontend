import cls from 'classnames';
import { FC } from 'react';

import { Link } from 'react-router-dom';
import { Preloader, Text } from 'shared/ui/index';

import { SortType } from '../../../pages/Private/Home/model/types/sort';
import { routeConfig } from '../../config/routeConfig/routeConfig';

import s from './List.module.scss';

interface ListProps {
	className?: string;
	isLoading: boolean;
	data: {
		title: string;
		items: {
			label: string;
			value: string;
			type: SortType;
		}[];
	};
	onClick?: (type, title, boolean) => void;
	isOpen?: boolean;
	title?: string;
	titleCount?: string;
}

export const List: FC<ListProps> = ({
	className,
	data,
	isLoading,
	onClick,
	isOpen = false,
	title,
	titleCount,
}) => {
	return isLoading ? (
		<div className={cls(s.List, className, s.loading)}>
			<Preloader />
		</div>
	) : (
		<div className={cls(s.List, className)}>
			<div className={s.titleWrapper}>
				<Text weight={'bold'} className={s.title} subtitle={data.title} />
				{titleCount && (
					<Link
						className={
							isOpen && title === data.title ? cls(s.value, s.active) : s.value
						}
						to={routeConfig.PRODUCTS}
					>
						<span
							onClick={() => onClick?.(SortType.WITHOUT_QUANTITY, title, true)}
						>
							{titleCount}
						</span>
					</Link>
				)}
			</div>
			<ul>
				{data.items.map((item) => (
					<li key={item.label} className={s.item}>
						<Text
							className={s.label}
							weight={isOpen && title === item.label ? 'bold' : 'medium'}
							subtitle={item.label}
						/>
						<span
							onClick={() => onClick?.(item.type, item.label, true)}
							className={
								isOpen && title === item.type ? cls(s.value, s.active) : s.value
							}
						>
							{item.value}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};
