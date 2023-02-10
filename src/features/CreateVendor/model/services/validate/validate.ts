import { CreateVendorForm } from '../../types/CreateVendorSchema';
import { addressValidate, nameValidate, regCodeValidate } from './regex';

export interface createVendorValidateErrors {
	name?: string;
	address?: string;
	regCode?: string;
}

export function validate(vendorData: CreateVendorForm) {
	const { name, address, regCode } = vendorData;
	const nameErrors = nameValidate(name);
	const addressErrors = addressValidate(address);
	const regCodeErrors = regCodeValidate(regCode);
	const errors: createVendorValidateErrors = {};
	if (nameErrors) {
		errors.name = nameErrors;
	}
	if (addressErrors) {
		errors.address = addressErrors;
	}
	if (regCodeErrors) {
		errors.regCode = regCodeErrors;
	}

	if (Object.values(errors).length) {
		return errors;
	}
}
