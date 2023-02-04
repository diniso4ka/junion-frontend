import { ProductType } from '../../../../entities/Products/model/types/ProductsSchema';

export interface UpdateProductSchema {
	form: UpdateProductForm;
	selectedItems?: ProductType[];
	isLoading: boolean;
	error?: boolean;
}

export interface UpdateProductForm {
	name: string;
	price: string;
	quantity: string;
	unit: string;
	category: string;
	status: string;
	discountPrice: string;
	vendor: string;
	_id: string;
}
