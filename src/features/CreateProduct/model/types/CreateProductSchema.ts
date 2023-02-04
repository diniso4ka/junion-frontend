export interface CreateProductSchema {
	form: CreateProductForm;
	isLoading: boolean;
	error?: boolean;
}

export interface CreateProductForm {
	name: string;
	price: string;
	quantity: string;
	unit: string;
	category: string;
	status: string;
	discountPrice: string;
	vendor: string;
	regCode: string;
}
