import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema';
import {
	categoriesActions,
	getCategoryFilteredList,
	getCategoryList,
	getCategoryStatus,
} from 'entities/Categories';
import { CategoriesTable } from 'entities/Categories/ui/CategoriesTable/CategoriesTable';
import { getDate } from 'shared/helpers/date/getDate';
import { AdvancedSearch, Text } from 'shared/ui';

import { getCategoryError } from '../../../entities/Categories/model/selectors/getCategoryError/getCategoryError';

import s from './CategoriesPage.module.scss';

const CategoriesPage: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const categories = useAppSelector(getCategoryList);
	const filteredCategories = useAppSelector(getCategoryFilteredList);
	const error = useAppSelector(getCategoryError);
	const status = useAppSelector(getCategoryStatus);
	const dispatch = useAppDispatch();
	const date = getDate();
	const filteredItems = filteredCategories
		? filteredCategories.filter((item) =>
				item._id.toLowerCase().includes(searchValue.toLowerCase()),
		  )
		: categories.filter((item) =>
				item._id.toLowerCase().includes(searchValue.toLowerCase()),
		  );
	const onHandleClear = () => {
		setSearchValue('');
	};

	useEffect(() => {
		return () => {
			dispatch(categoriesActions.clearSort());
		};
	}, [dispatch]);
	return (
		<div className={s.CategoriesPage}>
			<div className={s.navigation}>
				<Text className={s.title} title='Categories' />
				<AdvancedSearch
					value={searchValue}
					onChange={(e) => setSearchValue(e)}
					onClick={(e) => e.stopPropagation()}
					canClear={!!searchValue}
					onClear={onHandleClear}
				></AdvancedSearch>
				<Text
					className={s.date}
					date={`${date.mounth} ${date.number}, ${date.year}`}
				/>
			</div>
			<CategoriesTable
				isLoading={status}
				error={!!error}
				items={filteredItems.filter((category) => category.quantity)}
			/>
		</div>
	);
};

export default CategoriesPage;
