import { StateSchema } from 'app/store/config/StateSchema';

export const getCategorySortedBy = (state: StateSchema) =>
	state.categories.sortedBy;
