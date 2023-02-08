import cls from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema';
import {
	getProductsList,
	getProductsQuantity,
	getProductsStatus,
} from 'entities/Products';
import { FilteredList } from 'entities/Products/ui/FilteredList/FilteredList';
import { getDate } from 'shared/helpers/date/getDate';
import { List, Text } from 'shared/ui';

import { getProductsAllList } from '../../../entities/Products/model/selectors/getProductsAllList/getProductsAllList';
import { getProductsInitialize } from '../../../entities/Products/model/selectors/getProductsInitialize/getProductsInitialize';
import { getUpdateProductSelectedList } from '../../../features/UpdateProduct/model/selectors/getUpdateProductSelectedList/getUpdateProductSelectedList';
import { thunkDeleteProduct } from '../../../features/UpdateProduct/model/services/thunkDeleteProduct';
import { ConfirmModal } from '../../../shared/ui/ConfirmModal/ConfirmModal';
import { SideButton } from '../../../shared/ui/SideButton';
import { getListError } from './model/services/getListError';
import { sortProducts } from './model/services/sort';
import { SortType } from './model/types/sort';

import s from './HomePage.module.scss';

const HomePage: FC = () => {
	const [listIsOpen, setListIsOpen] = useState<boolean>(false);
	const [changeModalIsOpen, setChangeModalIsOpen] = useState<boolean>(false);
	const [confirmModalIsOpen, setConfirmModalIsOpen] = useState<boolean>(false);
	const [clearListError, setClearListError] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const dispatch = useAppDispatch();
	const productsList = useAppSelector(getProductsList);
	const allProductsList = useAppSelector(getProductsAllList);
	const productInitialize = useAppSelector(getProductsInitialize);
	const productsQuantity = useAppSelector(getProductsQuantity);
	const productsStatus = useAppSelector(getProductsStatus);
	const selectedItems = useAppSelector(getUpdateProductSelectedList);

	const [selectedSort, setSelectedSort] = useState({
		type: SortType.NONE,
		items: [],
	});
	const tablesData = {
		products: {
			title: 'Product information:',
			items: [
				{
					label: 'Products without quantity:',
					value: `${
						sortProducts(productsList, SortType.WITHOUT_QUANTITY).items.length
					}`,
					type: SortType.WITHOUT_QUANTITY,
				},
				{
					label: 'Products without price:',
					value: `${
						sortProducts(productsList, SortType.WITHOUT_PRICE).items.length
					}`,
					type: SortType.WITHOUT_PRICE,
				},
				{
					label: 'Products without category:',
					value: `${
						sortProducts(productsList, SortType.WITHOUT_CATEGORY).items.length
					}`,
					type: SortType.WITHOUT_CATEGORY,
				},
			],
		},
		employee: {
			title: 'Users information:',
			items: [
				{
					label: 'Products added today:',
					value: `${
						sortProducts(productsList, SortType.ADDED_TODAY).items.length
					}`,
					type: SortType.ADDED_TODAY,
				},
				{
					label: 'Products deleted today:',
					value: `${
						sortProducts(allProductsList, SortType.DELETED_TODAY).items.length
					}`,
					type: SortType.DELETED_TODAY,
				},
			],
		},
	};

	const onHandleClose = () => {
		setListIsOpen(false);
	};
	const onHandleOpen = useCallback(
		(action, title, open) => {
			setSelectedSort(sortProducts(allProductsList, action));
			setClearListError(getListError(action));
			setTitle(action);
			if (open) {
				setListIsOpen(true);
			}
		},
		[allProductsList],
	);

	const onHandleDelete = () => {
		selectedItems.forEach((item) => {
			dispatch(thunkDeleteProduct(item._id));
		});
		setConfirmModalIsOpen(false);
	};

	useEffect(() => {
		if (productsStatus === false) {
			onHandleOpen(SortType.WITHOUT_PRICE, title, false);
		}
		//TODO eslint-ignore
		// eslint-disable-next-line
	}, [productsStatus]);

	useEffect(() => {
		if (selectedSort.items.length) {
			setSelectedSort(sortProducts(allProductsList, selectedSort.type));
		}
		//TODO eslint-ignore
		// eslint-disable-next-line
	}, [productsList, allProductsList]);
	const date = getDate();

	return (
		<div className={s.wrapper}>
			<div className={cls(s.HomePage)}>
				<div className={s.information}>
					<Text className={s.title} title='Information board' />
					<Text
						className={s.title}
						date={`${date.mounth} ${date.number}, ${date.year}`}
					/>
				</div>

				<div className={s.items}>
					<List
						isLoading={!productInitialize}
						data={tablesData.products}
						className={s.item}
						onClick={onHandleOpen}
						isOpen={listIsOpen}
						titleCount={`${productsQuantity}`}
						title={title}
					/>
					<List
						isLoading={!productInitialize}
						data={tablesData.employee}
						className={s.item}
						onClick={onHandleOpen}
						isOpen={listIsOpen}
						title={title}
					/>
				</div>
				{listIsOpen && (
					<FilteredList
						title={title}
						data={selectedSort}
						isOpen={listIsOpen}
						onClose={onHandleClose}
						variant={
							selectedSort?.type === SortType.WITHOUT_PRICE
								? 'price'
								: selectedSort?.type === SortType.WITHOUT_CATEGORY ||
								  selectedSort?.type === SortType.WITHOUT_QUANTITY
								? 'category'
								: 'none'
						}
						modalIsOpen={changeModalIsOpen}
						modalOnClose={() => setChangeModalIsOpen(false)}
						error={clearListError}
					/>
				)}
				{confirmModalIsOpen && (
					<ConfirmModal
						onClose={() => setConfirmModalIsOpen(false)}
						isOpen={confirmModalIsOpen}
						onConfirm={onHandleDelete}
						text={'Do you really want to remove it?'}
					/>
				)}
			</div>
			{!(selectedItems.length < 1) && (
				<div className={s.btns}>
					<SideButton
						variant='update'
						className={s.update}
						disable={selectedItems.length !== 1}
						onClick={() => setChangeModalIsOpen(true)}
						active={changeModalIsOpen}
					/>
					<SideButton
						disable={selectedItems.length < 1}
						variant='delete'
						className={s.delete}
						onClick={() => setConfirmModalIsOpen(true)}
						active={confirmModalIsOpen}
					/>
				</div>
			)}
		</div>
	);
};

export default HomePage;
