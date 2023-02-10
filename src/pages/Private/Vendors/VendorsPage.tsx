import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/store';
import { getVendorsStatus, vendorsActions } from 'entities/Vendors';
import { getVendorsError } from 'entities/Vendors/model/selectors/getVendorsError/getVendorsError';
import { getVendorsFilteredList } from 'entities/Vendors/model/selectors/getVendorsFilteredList/getVendorsFilteredList';
import { getVendorsList } from 'entities/Vendors/model/selectors/getVendorsList/getVendorsList';
import { VendorsTable } from 'entities/Vendors/ui/VendorsTable/VendorsTable';
import { CreateVendorModal } from 'features/CreateVendor';
import { FilterMenu, productFiltersActions } from 'features/ProductFilters';
import {
	getUpdateVendorSelectedList,
	UpdateVendorModal,
} from 'features/UpdateVendor';
import { thunkDeleteVendor } from 'features/UpdateVendor/model/services/thunkDeleteVendor';
import { updateVendorReducer } from 'features/UpdateVendor/model/slice/updateVendorSlice';
import { getDate } from 'shared/helpers/date/getDate';
import { searchVendorsByIncludes } from 'shared/helpers/filters/search';
import { AdvancedSearch, Button, Text } from 'shared/ui';
import { ConfirmModal } from 'shared/ui/ConfirmModal/ConfirmModal';
import { SideButton } from 'shared/ui/SideButton';

import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/config/components/DynamicModuleLoader';

import s from './VendorsPage.module.scss';

const initialState: ReducersList = {
	updateVendor: updateVendorReducer,
};

const VendorsPage: FC = () => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>('');
	const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
	const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);

	const dispatch = useAppDispatch();
	const vendorsList = useAppSelector(getVendorsList);
	const selectedItems = useAppSelector(getUpdateVendorSelectedList);
	const status = useAppSelector(getVendorsStatus);
	const error = useAppSelector(getVendorsError);
	const vendorsFilteredList = useAppSelector(getVendorsFilteredList);

	const date = getDate();
	const filteredItems = searchVendorsByIncludes(
		vendorsFilteredList ? vendorsFilteredList : vendorsList,
		searchValue,
	).reverse();

	const onClear = () => {
		setSearchValue('');
	};

	const onHandleDelete = async () => {
		selectedItems.forEach((item) => {
			dispatch(thunkDeleteVendor(item._id));
		});
		setConfirmModalIsOpen(false);
	};

	useEffect(() => {
		return () => {
			dispatch(vendorsActions.clearSort());
		};
	}, [dispatch]);
	return (
		<DynamicModuleLoader reducers={initialState} removeAfterUnmount={true}>
			<div className={s.VendorsPage}>
				<div className={s.header}>
					<Text className={s.title} title='Vendors' />
					<AdvancedSearch
						value={searchValue}
						onChange={(e) => setSearchValue(e)}
						onClick={(e) => e.stopPropagation()}
						canClear={!!searchValue}
						onClear={() => onClear()}
						className={s.vendorsSearch}
					>
						<FilterMenu />
					</AdvancedSearch>
					<Button
						onClick={() => setModalIsOpen(true)}
						variant={'rounded'}
						theme={'orange'}
					>
						Add new vendor
					</Button>
					<Text
						className={s.date}
						date={`${date.mounth} ${date.number}, ${date.year}`}
					/>
				</div>
				<div className={s.tableWrapper}>
					<VendorsTable
						isLoading={status}
						error={!!error}
						items={filteredItems}
					/>
				</div>
				{!(selectedItems.length < 1) && (
					<div className={s.btns}>
						<SideButton
							active={modalIsOpen}
							disable={selectedItems.length !== 1}
							variant='update'
							className={s.update}
							onClick={() => setUpdateModalIsOpen(true)}
						/>
						<SideButton
							disable={selectedItems.length < 1}
							variant='delete'
							className={s.delete}
							onClick={() => setConfirmModalIsOpen(true)}
						/>
					</div>
				)}
				{modalIsOpen && (
					<CreateVendorModal
						isOpen={modalIsOpen}
						onClose={() => setModalIsOpen(false)}
					/>
				)}
				{updateModalIsOpen && (
					<UpdateVendorModal
						isOpen={updateModalIsOpen}
						onClose={() => setUpdateModalIsOpen(false)}
						data={selectedItems[0]}
					/>
				)}
				{confirmModalIsOpen && (
					<ConfirmModal
						onConfirm={onHandleDelete}
						isOpen={confirmModalIsOpen}
						onClose={() => setConfirmModalIsOpen(false)}
						text={'Do you really want to remove it?'}
						isLoading={status}
					/>
				)}
			</div>
		</DynamicModuleLoader>
	);
};

export default VendorsPage;
