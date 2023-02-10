import { CREATE_VENDOR_VALIDATE_ERRORS } from './consts';

export function nameValidate(name) {
	if (!name) {
		return CREATE_VENDOR_VALIDATE_ERRORS.NAME_IS_REQUIRED;
	}
	if (name) {
		const nameArr = name.split('');
		for (let i = 0; nameArr.length > i; i++) {
			if (!isNaN(nameArr[i])) {
				return CREATE_VENDOR_VALIDATE_ERRORS.INCORRECT_NAME;
			}
		}
	}
	return;
}

export function addressValidate(address) {
	if (!address) {
		return CREATE_VENDOR_VALIDATE_ERRORS.ADDRESS_IS_REQUIRED;
	}
	if (address.length < 10) {
		return CREATE_VENDOR_VALIDATE_ERRORS.INCORRECT_ADDRESS;
	}

	return;
}

export function regCodeValidate(regCode) {
	if (!regCode) {
		return CREATE_VENDOR_VALIDATE_ERRORS.REG_CODE_IS_REQUIRED;
	}
	if (regCode.length !== 8) {
		return CREATE_VENDOR_VALIDATE_ERRORS.INCORRECT_REG_CODE;
	}
	return;
}
