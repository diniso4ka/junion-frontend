import cls from 'classnames';
import { FC, useEffect, useState } from 'react';

import { Checkbox, Text } from 'shared/ui';

import {
	DynamicModuleLoader,
	ReducersList,
} from '../../../../shared/config/components/DynamicModuleLoader';

import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { getUpdateProductSelectedList } from '../../../../features/UpdateProduct/model/selectors/getUpdateProductSelectedList/getUpdateProductSelectedList';
import {
	updateProductActions,
	updateProductReducer,
} from '../../../../features/UpdateProduct/model/slice/updateProductSlice';
import { UpdateProductModal } from '../../../../features/UpdateProduct/ui/UpdateProductModal/UpdateProductModal';
import { SortType } from '../../../../pages/Private/Home/model/types/sort';
import { ProductType } from '../../model/types/ProductsSchema';

import closeIcon from 'shared/assets/images/icons/close.svg';

import s from './FilteredList.module.scss';

interface FilteredListProps {
	className?: string;
	title: string;
	variant?: 'quantity' | 'price' | 'category' | 'none';
	data: {
		type: SortType;
		items: ProductType[];
	};
	isOpen: boolean;
	onClose: () => void;
	modalIsOpen: boolean;
	modalOnClose: () => void;
	error: string;
}

const initialState: ReducersList = {
	updateProduct: updateProductReducer,
};

export const FilteredList: FC<FilteredListProps> = ({
	className,
	data,
	isOpen,
	variant,
	onClose,
	title,
	modalIsOpen,
	modalOnClose,
	error,
}) => {
	const dispatch = useAppDispatch();
	const selectedItems = useAppSelector(getUpdateProductSelectedList);
	const onHandleSelect = (item) => {
		dispatch(updateProductActions.selectProduct(item));
	};
	const allSelected =
		selectedItems.length === data.items.length && !!data?.items?.length;
	const onHandleMultiSelect = () => {
		if (allSelected) {
			dispatch(updateProductActions.clearSelect());
		} else {
			data.items.forEach((item) => {
				if (!selectedItems.find((product) => item._id === product._id)) {
					dispatch(updateProductActions.selectProduct(item));
				}
			});
		}
	};
	useEffect(() => {
		dispatch(updateProductActions.clearSelect());
	}, [data]);
	return (
		<DynamicModuleLoader reducers={initialState} removeAfterUnmount={true}>
			<div
				className={cls(s.FilteredList, className, {
					[s.opened]: isOpen,
				})}
			>
				<img onClick={onClose} className={s.closeIcon} src={closeIcon} />
				<div className={s.table}>
					<Text className={s.title} title={title} />
					{variant === 'price' && !!data.items.length && (
						<div className={cls(s.heading, s[variant])}>
							<Checkbox
								value={allSelected && selectedItems.length !== 0}
								onClick={() => onHandleMultiSelect()}
							/>
							<Text className={s.subtitle} mediumText={'Code'} />
							<Text className={s.subtitle} mediumText={'Name'} />
							<Text className={s.subtitle} mediumText={'Price,$'} />
							<Text className={s.subtitle} mediumText={'Quantity'} />
							<Text className={s.subtitle} mediumText={'Owner'} />
						</div>
					)}
					{variant === 'category' && !!data.items.length && (
						<div className={cls(s.heading)}>
							<Checkbox
								value={allSelected && selectedItems.length !== 0}
								onClick={() => onHandleMultiSelect()}
							/>
							<Text className={s.subtitle} mediumText={'Code'} />
							<Text className={s.subtitle} mediumText={'Category'} />
							<Text className={s.subtitle} mediumText={'Name'} />
							<Text className={s.subtitle} mediumText={'Quantity'} />
							<Text className={s.subtitle} mediumText={'Owner'} />
						</div>
					)}
					{variant === 'none' && !!data.items.length && (
						<div className={cls(s.heading)}>
							<Text className={s.subtitle} mediumText={'Code'} />
							<Text className={s.subtitle} mediumText={'Price,$'} />
							<Text className={s.subtitle} mediumText={'Category'} />
							<Text className={s.subtitle} mediumText={'Name'} />
							<Text className={s.subtitle} mediumText={'Quantity'} />
							<Text className={s.subtitle} mediumText={'Owner'} />
						</div>
					)}

					<div className={s.items}>
						{!data.items.length && (
							<Text className={s.error} theme={'error'} subtitle={error} />
						)}
						{variant === 'price' &&
							data.items.map((item) => (
								<div key={item._id} className={cls(s.row, s[variant])}>
									<Checkbox
										value={
											!!selectedItems.find(
												(product) => item._id === product._id,
											)
										}
										onClick={() => {
											onHandleSelect(item);
										}}
									/>
									<Text text={item.art ? item.art : 'none'} />
									<Text text={item.name} />
									<Text text={item.price.toString()} />
									<Text text={item.quantity.toString()} />
									<Text text={item.owner} />
								</div>
							))}
						{variant === 'category' &&
							data.items.map((item) => (
								<div key={item._id} className={cls(s.row, s[variant])}>
									<Checkbox
										value={
											!!selectedItems.find(
												(product) => item._id === product._id,
											)
										}
										onClick={() => {
											onHandleSelect(item);
										}}
									/>
									<Text text={item.art ? item.art : 'none'} />
									<Text text={item.category[0]} />
									<Text text={item.name} />
									<Text text={item.quantity.toString()} />
									<Text text={item.owner} />
								</div>
							))}
						{variant === 'none' &&
							data.items.map((item) => (
								<div key={item._id} className={cls(s.row, s[variant])}>
									<Text text={item.art ? item.art : 'none'} />
									<Text text={item.price.toString()} />
									<Text text={item.category[0]} />
									<Text text={item.name} />
									<Text text={item.quantity.toString()} />
									<Text text={item.owner} />
								</div>
							))}
					</div>
				</div>
				{modalIsOpen && (
					<UpdateProductModal
						withDiscountPrice={false}
						withVendorCode={false}
						withVendor={false}
						isOpen={!!modalIsOpen}
						onClose={modalOnClose}
						item={data.items.find((item) => item._id === selectedItems[0]?._id)}
					/>
				)}
			</div>
		</DynamicModuleLoader>
	);
};
