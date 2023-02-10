import cls from 'classnames';
import { FC } from 'react';

import { TableHeading } from 'shared/ui';
import { Text } from 'shared/ui/Text/Text';

import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { getUpdateProductSelectedList } from '../../../../features/UpdateProduct/model/selectors/getUpdateProductSelectedList/getUpdateProductSelectedList';
import { updateProductActions } from '../../../../features/UpdateProduct/model/slice/updateProductSlice';
import TableRowLoader from '../../../../shared/ui/LoaderSkeleton/TableRowLoader/TableRowLoader';
import { productsActions } from '../../model/slice/productsSlice';
import { ProductSortType, ProductType } from '../../model/types/ProductsSchema';
import { TableRow } from './TableRow/TableRow';

import s from './ProductsTable.module.scss';

interface ProductsTableProps {
	className?: string;
	items: ProductType[];
	isLoading?: boolean;
	error?: boolean;
}

export const ProductsTable: FC<ProductsTableProps> = ({
	className,
	items,
	isLoading = false,
	error = false,
}) => {
	const dispatch = useAppDispatch();
	const headings = [
		{
			sort: true,
			type: ProductSortType.PRODUCT_CODE,
			value: 'Code',
			onHandleSort: () => dispatch(productsActions.sortByCode()),
		},
		{
			sort: true,
			type: ProductSortType.PRODUCT_CATEGORY,
			value: 'Category',
			onHandleSort: () => dispatch(productsActions.sortByCategory()),
		},
		{
			sort: true,
			type: ProductSortType.PRODUCT_NAME,
			value: 'Name',
			onHandleSort: () => dispatch(productsActions.sortByName()),
		},
		{
			sort: true,
			type: ProductSortType.PRODUCT_PRICE,
			value: 'Price, $',
			onHandleSort: () => dispatch(productsActions.sortByPrice()),
		},
		{
			sort: true,
			type: ProductSortType.PRODUCT_QUANTITY,
			value: 'Quantity',
			onHandleSort: () => dispatch(productsActions.sortByQuantity()),
		},
		{
			sort: true,
			type: ProductSortType.PRODUCT_UNIT,
			value: 'Unit',
			onHandleSort: () => dispatch(productsActions.sortByUnit()),
		},
		{ sort: false, value: 'Owner' },
	];

	const selectedItems = useAppSelector(getUpdateProductSelectedList);

	const onHandleSelect = (item) => {
		dispatch(updateProductActions.selectProduct(item));
	};
	const allSelected = selectedItems.length === items?.length && !!items?.length;
	const onHandleMultiSelect = () => {
		if (allSelected) {
			dispatch(updateProductActions.clearSelect());
		} else {
			items.forEach((item) => {
				if (!selectedItems.find((product) => item._id === product._id)) {
					dispatch(updateProductActions.selectProduct(item));
				}
			});
		}
	};

	return (
		<div className={cls(s.ProductsTable, className)}>
			<TableHeading
				type={'products'}
				headings={headings}
				onSelect={onHandleMultiSelect}
				selected={allSelected}
			/>
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
			{!isLoading && !!items.length && !error && (
				<div className={s.items}>
					{items.map((product) => (
						<TableRow
							selected={
								!!selectedItems.find((item) => item._id === product._id)
							}
							onSelect={onHandleSelect}
							key={product._id}
							item={product}
						/>
					))}
				</div>
			)}
		</div>
	);
};
