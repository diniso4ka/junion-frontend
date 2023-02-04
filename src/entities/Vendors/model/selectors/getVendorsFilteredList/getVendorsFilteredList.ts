import { StateSchema } from 'app/store/config/StateSchema';

export const getVendorsFilteredList = (state: StateSchema) =>
	state?.vendors?.filteredItems;
