import { Vendor } from '../../../../entities/Vendors/model/types/VendorsSchema';

export interface UpdateVendorSchema {
	form: CreateVendorForm;
	selectedItems?: Vendor[];
	isLoading: boolean;
	error?: boolean;
}

export interface CreateVendorForm {
	name: string;
	regCode: string;
	address: string;
}
