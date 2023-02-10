import cls from 'classnames';
import { FC } from 'react';

import { Link } from 'react-router-dom';

import { Category } from '../../../model/types/CategoriesSchema';

import s from './TableRow.module.scss';

interface TableRow {
	className?: string;
	selected?: boolean;
	onSelect?: (item) => void;
	item: Category;
}

export const TableRow: FC<TableRow> = ({
	className,
	item,
	selected,
	onSelect,
}) => {
	return (
		<Link to={`/products?category=${item._id}`} className={cls(s.TableRow)}>
			<li className={s.item}>{item._id}</li>
			<li className={s.item}>{item.quantity}</li>
		</Link>
	);
};
