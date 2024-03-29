import cls from 'classnames';
import { FC, memo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema';
import { getCategoryList } from 'entities/Categories';
import { getProductsList } from 'entities/Products';
import { thunkGetFilteredProductsList } from 'entities/Products/model/services/thunkGetFilteredProductsList';
import { getProductFiltersData } from 'features/ProductFilters/model/selectors/getProductFiltersData/getProductFiltersData';
import {
	productFiltersActions,
	productFiltersReducer,
} from 'features/ProductFilters/model/slice/productFiltersSlice';
import { createQueryParams } from 'shared/helpers/filters/createQueryParams';
import { Button, Input, InputWithHint } from 'shared/ui';

import {
	DynamicModuleLoader,
	ReducersList,
} from '../../../../shared/config/components/DynamicModuleLoader';

import { getProductFiltersCategory } from '../../model/selectors/getProductFiltersCategory/getProductFiltersCategory';
import { getProductFiltersName } from '../../model/selectors/getProductFiltersName/getProductFiltersName';
import { getProductFiltersOwner } from '../../model/selectors/getProductFiltersOwner/getProductFiltersOwner';
import { getProductFiltersPriceMax } from '../../model/selectors/getProductFiltersPriceMax/getProductFiltersPriceMax';
import { getProductFiltersPriceMin } from '../../model/selectors/getProductFiltersPriceMin/getProductFiltersPriceMin';
import { getProductFiltersVendor } from '../../model/selectors/getProductFiltersVendor/getProductFiltersVendor';

import s from './FilterMenu.module.scss';

interface ProfileMenuProps {
	onClose?: () => void;
	onClear?: () => void;
	className?: string;
	onClick?: () => void;
	isLoading?: boolean;
}

const initialState: ReducersList = {
	productsFilters: productFiltersReducer,
};

export const FilterMenu = memo(
	({ className, onClose, isLoading }: ProfileMenuProps) => {
		const categories = useAppSelector(getCategoryList);
		const productsList = useAppSelector(getProductsList);
		const name = useAppSelector(getProductFiltersName);
		const category = useAppSelector(getProductFiltersCategory);
		const price_min = useAppSelector(getProductFiltersPriceMin);
		const price_max = useAppSelector(getProductFiltersPriceMax);
		const vendor = useAppSelector(getProductFiltersVendor);
		const owner = useAppSelector(getProductFiltersOwner);

		const productFilters = useAppSelector(getProductFiltersData);
		const dispatch = useAppDispatch();

		const [categoriesFocus, setCategoriesFocus] = useState(false);
		const [productsFocus, setProductsFocus] = useState(false);

		const onHandleProductHint = (hint) => {
			dispatch(productFiltersActions.setName(hint));
		};
		const onHandleCategoryHint = (hint) => {
			dispatch(productFiltersActions.setCategory(hint));
		};

		const onChangeName = (event) => {
			dispatch(productFiltersActions.setName(event.target.value));
		};
		const onChangeCategory = (event) => {
			dispatch(productFiltersActions.setCategory(event.target.value));
		};
		const onChangePriceMin = (event) => {
			dispatch(productFiltersActions.setPriceMin(event.target.value));
		};
		const onChangePriceMax = (event) => {
			dispatch(productFiltersActions.setPriceMax(event.target.value));
		};
		const onChangeVendor = (event) => {
			dispatch(productFiltersActions.setVendor(event.target.value));
		};
		const onChangeOwner = (event) => {
			dispatch(productFiltersActions.setOwner(event.target.value));
		};

		const onSubmitFilters = () => {
			const params = createQueryParams(productFilters);
			if (params) {
				dispatch(thunkGetFilteredProductsList(params));
			}
			onClose();
		};
		if (isLoading) {
			return <div>...loading</div>;
		}

		return (
			<DynamicModuleLoader reducers={initialState}>
				<div className={cls(s.FilterMenu, className)}>
					<ul className={s.filterWrapper}>
						<li className={s.filterItem}>
							<h4>Product</h4>
							<InputWithHint
								onChange={onChangeName}
								value={name}
								onFocus={() => setProductsFocus(true)}
								// @ts-ignore //TODO ts-ignore
								hint={productsList.map((item) => item.name)}
								isHintOpen={productsFocus}
								onCloseHint={() => setProductsFocus(false)}
								onHandleSelect={(e) => onHandleProductHint(e)}
								position={'right'}
							/>
						</li>
						<li className={s.filterItem}>
							<h4>Category</h4>
							<InputWithHint
								onChange={onChangeCategory}
								value={category}
								onFocus={() => setCategoriesFocus(true)}
								hint={categories.map((item) => item._id)}
								isHintOpen={categoriesFocus}
								onCloseHint={() => setCategoriesFocus(false)}
								onHandleSelect={(e) => onHandleCategoryHint(e)}
								position={'right'}
							/>
						</li>
						<li className={s.filterItem}>
							<h4>Price</h4>
							<div className={s.range}>
								<Input
									onChange={onChangePriceMin}
									value={price_min}
									variant={'secondary'}
									sizeContainer={'adaptive'}
								/>
								<span className={s.rangeHelp}>to</span>
								<Input
									onChange={onChangePriceMax}
									value={price_max}
									variant={'secondary'}
									sizeContainer={'adaptive'}
								/>
							</div>
						</li>
						<li className={s.filterItem}>
							<h4>Vendor</h4>
							<Input
								onChange={onChangeVendor}
								value={vendor}
								variant={'secondary'}
								sizeContainer={'adaptive'}
							/>
						</li>
						<li className={s.filterItem}>
							<h4>Owner</h4>
							<Input
								onChange={onChangeOwner}
								value={owner}
								variant={'secondary'}
								sizeContainer={'adaptive'}
							/>
						</li>
					</ul>
					<div className={s.buttonWrapper}>
						<Button
							size={'small'}
							className={s.button}
							onClick={onSubmitFilters}
						>
							Search
						</Button>
					</div>
				</div>
			</DynamicModuleLoader>
		);
	},
);
