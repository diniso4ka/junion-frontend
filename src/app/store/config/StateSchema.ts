import { CombinedState } from 'redux';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { NavigateOptions } from 'react-router';
import {
	AnyAction,
	EnhancedStore,
	Reducer,
	ReducersMapObject,
} from '@reduxjs/toolkit';
import { To } from '@remix-run/router/history';
import { CategoriesSchema } from 'entities/Categories/model/types/CategoriesSchema';
import { ProductsSchema } from 'entities/Products/model/types/ProductsSchema';
import { UserSchema } from 'entities/User/model/types/user';
import { VendorsSchema } from 'entities/Vendors/model/types/VendorsSchema';
import { LoginSchema } from 'features/AuthByMail/model/types/LoginSchema';
import { CreateProductSchema } from 'features/CreateProduct/model/types/CreateProductSchema';
import { CreateVendorSchema } from 'features/CreateVendor/model/types/CreateVendorSchema';
import { ProductFiltersSchema } from 'features/ProductFilters/model/types/ProductFiltersSchema';
import { RegisterSchema } from 'features/RegisterByMail/model/types/RegisterSchema';

import { RetrievePasswordSchema } from '../../../features/RetrievePassword/model/types/RetrievePasswordSchema';
import { UpdateProductSchema } from '../../../features/UpdateProduct/model/types/UpdateProductSchema';
import { UpdateVendorSchema } from '../../../features/UpdateVendor/model/types/UpdateVendorSchema';
import { AppDispatch, RootState } from './store';

export interface StateSchema {
	user: UserSchema;
	products: ProductsSchema;
	categories: CategoriesSchema;
	vendors: VendorsSchema;

	// Ассинхронные редюсеры
	loginForm?: LoginSchema;
	registerForm?: RegisterSchema;
	createProduct?: CreateProductSchema;
	updateProduct?: UpdateProductSchema;
	updateVendor?: UpdateVendorSchema;
	productsFilters?: ProductFiltersSchema;
	createVendor?: CreateVendorSchema;
	retrievePassword?: RetrievePasswordSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
