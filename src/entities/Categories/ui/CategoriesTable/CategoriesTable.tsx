import cls from 'classnames';
import { FC } from 'react';

import { TableHeading, TableRow, Text } from 'shared/ui';
import TableRowLoader from 'shared/ui/LoaderSkeleton/TableRowLoader/TableRowLoader';

import { useAppDispatch } from '../../../../app/store';
import { categoriesActions } from '../../model/slice/categoriesSlice';
import {
	CategoriesSortType,
	Category,
} from '../../model/types/CategoriesSchema';

import s from './CategoriesTable.module.scss';

interface CategoriesTableProps {
	className?: string;
	items: Category[];
	isLoading?: boolean;
	error?: boolean;
}

export const CategoriesTable: FC<CategoriesTableProps> = ({
	className,
	items,
	isLoading = false,
	error,
}) => {
	const dispatch = useAppDispatch();
	const headings = [
		{
			sort: true,
			type: CategoriesSortType.CATEGORY_CATEGORY,
			value: 'Category',
			onHandleSort: () => dispatch(categoriesActions.sortByCategory()),
		},
		{
			sort: true,
			type: CategoriesSortType.CATEGORY_QUANTITY,
			value: 'Quantity',
			onHandleSort: () => dispatch(categoriesActions.sortByQuantity()),
		},
	];

	return (
		<div className={cls(s.CategoriesTable, className)}>
			<TableHeading type={'categories'} headings={headings} />
			{!isLoading && error && (
				<Text
					className={s.error}
					theme={'error'}
					subtitle={'An error has occurred'}
				/>
			)}
			{!isLoading && !items.length && (
				<Text className={s.error} subtitle={'Nothing found!'} theme={'error'} />
			)}
			{isLoading && (
				<div className={s.items}>
					<TableRowLoader />
				</div>
			)}
			{!isLoading && (
				<div className={s.items}>
					{items.map((category) => (
						<TableRow key={category._id} type={'categories'} item={category} />
					))}
				</div>
			)}
		</div>
	);
};
